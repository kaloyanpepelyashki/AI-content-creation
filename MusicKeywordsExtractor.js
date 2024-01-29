const musicExtractor = (content) => {
  try {
    const regEx = /\[Music:(.*?)\]/;

    let musicContent = content.match(regEx);

    if (musicContent.length > 0) {
      let musicKeywords = musicContent[1];
      return musicKeywords.trim(" ");
    } else {
      return null;
    }
  } catch (e) {
    console.log("Error extracting music: ", e);
  }
};

module.exports = musicExtractor;
