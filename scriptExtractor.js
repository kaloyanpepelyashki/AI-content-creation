const fs = require("fs");

// const sanitizeContent = (dataToSanitize) => {
//   try {
//     console.log(`Data to sanitize : ${dataToSanitize}`);
//     const newArray = dataToSanitize.split("(");

//     function sanitize(element) {
//       return element.replace(/\n/g, " ");
//     }

//     let sanitizedArray = newArray.map(sanitize);

//     if (sanitizedArray.length > 1 && sanitizedArray != null) {
//       console.log(`Sanitized Data : ${sanitizedArray}`);
//       return sanitizedArray;
//     } else {
//       console.log("sanitizedArray is empty");
//       return null;
//     }
//   } catch (e) {
//     console.log(`Error sanitizing content : ${e}`);
//   }
// };
const writeToFile = async (contentArray) => {
  try {
    const content = contentArray.join("\n");

    fs.writeFile("Exports/finaltest/script.txt", content, (err) => {
      if (err) {
        console.log(`Error writing to file ${err}`);
      } else {
        console.log("Script data written");
      }
    });
  } catch (e) {
    console.log("Error writing script to file: ", e.message);
  }
};
const extractScript = (content) => {
  try {
    //Function to sanitize each of the array elements
    function sanitize(element) {
      return element.replace("**Script:", "").replace("**", "");
    }

    const regex = /\*\*(.*?)\*\*/g;

    let scriptArray = [];
    content.forEach((element) => {
      const match = element.match(regex);

      if (match) {
        scriptArray.push(match.join(" "));
      }
    });

    const scriptsExtracted = scriptArray.map(sanitize);

    if (scriptsExtracted.length > 0) {
      return scriptsExtracted;
    } else {
      console.log("scripts are empty");
      return null;
    }
  } catch (e) {
    console.log(`Error extracting script : ${e}`);
  }
};

function scriptExtractor(content) {
  //   const sanitizedContent = sanitizeContent(content);
  const script = extractScript(content);

  if (script != null) {
    if (script.length > 0 && script != null) {
      console.log(script);
      writeToFile(script);
      return script;
    } else {
      return null;
    }
  } else {
    console.log("script is null");
  }
}

module.exports = scriptExtractor;
