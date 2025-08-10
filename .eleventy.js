require('dotenv').config();
const contentfulClient = require('./contentful');

module.exports = function (eleventyConfig) {
  // ✅ Passthrough for static assets like CSS
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("scripts");


  // ✅ Add Contentful collection
  eleventyConfig.addCollection('transcriptions', async () => {
    const entries = await contentfulClient.getEntries({
      content_type: 'simplePost', // Replace with your actual Contentful content type ID
    });

    return entries.items;
  });

  // ✅ Return Eleventy directory structure
  return {
    dir: {
      input: 'src',       // Your template/input files go here
      includes: '_includes', // Template includes (like layouts)
      output: 'dist'      // Output directory (can also be '_site' if you prefer)
    }
  };
};
