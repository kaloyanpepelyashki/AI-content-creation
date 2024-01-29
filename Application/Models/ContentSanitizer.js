class ContentSanitizer {
  constructor() {
    if (this instanceof ContentSanitizer) {
      throw new Error("A static class cannot be instantiated");
    }
  }

  static removeWhiteSpaces(dataToSanitize) {
    try {
      console.log(`Data in sanitizer : ${dataToSanitize}`);
      const newArray = dataToSanitize.split("(");

      function sanitize(element) {
        return element.replace(/\n/g, " ");
      }

      let sanitizedArray = newArray.map(sanitize);

      if (sanitizedArray.length > 1 && sanitizedArray != null) {
        console.log(sanitizedArray);
        return sanitizedArray;
      } else {
        console.log("sanitizedArray is empty");
        return null;
      }
    } catch (e) {
      console.log(`Error sanitizing content : ${e}`);
    }
  }
}

module.exports = ContentSanitizer;
