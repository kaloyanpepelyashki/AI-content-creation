import { formatDocumentsAsString } from "langchain/util/document";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "@langchain/core/prompts";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import * as fs from "fs";

/** This is a class that encapsulates a model, that can be feeded textual data with any data imported in a text file */
class DataFedModel {
  #system_message;
  #user_message;
  #textSplitter;
  #model;
  #outputParser;
  #docs;
  #textFile;
  constructor(fileToRead) {
    this.#textFile = fs.readFileSync(fileToRead, "utf8");
    this.#docs;
    this.#textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 900,
      chunkOverlap: 90,
    });

    //Assigns the AI model to be used
    this.#model = new ChatOpenAI({
      modelName: "gpt-4",
      temperature: 1,
      topP: 0.9,
    });
    //Assigns the text parser to be used
    this.#outputParser = formatDocumentsAsString;
  }
  /** This method splits the content of the document in chuncks, then loads the document content behind the scenes and returns it */
  async #loadDocs() {
    try {
      const docs = await this.#textSplitter.createDocuments([this.#textFile]);
      const splitText = this.#textSplitter.splitDocuments(docs);
      return splitText;
    } catch (e) {
      console.log("Error loading docs: ", e.message);
    }
  }
  async #vectoreStoreCreate(docs) {
    try {
      const vectorStore = await HNSWLib.fromDocuments(
        docs,
        new OpenAIEmbeddings()
      );
      const vectorStoreRetreiver = vectorStore.asRetriever();

      return vectorStoreRetreiver;
    } catch (e) {
      console.log("Error creating vectore store:", e);
      throw new Error("Error creating vector store from document: ", e.message);
    }
  }
  /** This method is the main entry point to prompt the LLM.
   * The method takes in two arguments a temperature integer/double that will set the model's temperature and a messages{} object, that consists of the system message prompt, and the user message prompt.
   * On success, the method will return the prompt result text content
   */
  async create({
    temperature,
    messages: {
      system: { message: systemMessage },
      user: { message: userMessage },
    },
  }) {
    try {
      const model = this.#model;
      const parser = this.#outputParser;
      temperature > 0 ? (model.temperature = temperature) : " ";

      const contentChunks = await this.#loadDocs();
      const vectorStoreRetreiver = await this.#vectoreStoreCreate(
        contentChunks
      );

      const messages = [
        SystemMessagePromptTemplate.fromTemplate(systemMessage),
        HumanMessagePromptTemplate.fromTemplate("{question}"),
      ];

      const prompt = ChatPromptTemplate.fromMessages(messages);
      const chain = RunnableSequence.from([
        {
          context: vectorStoreRetreiver.pipe(parser),
          question: new RunnablePassthrough(),
        },
        prompt,
        model,
      ]);

      //Involkes the created chain, calling the model.
      const response = await chain.invoke(userMessage);
      return response.content;
    } catch (e) {
      console.log("Error in DataFed model:", e);
      throw new Error("DataFedModel failed to generate content: ", e.message);
    }
  }
}
export default DataFedModel;
