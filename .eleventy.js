require('dotenv').config();
const contentfulClient = require('./contentful'); // Adjust path if needed
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');

module.exports = function (eleventyConfig) {
  // ✅ Passthrough static files
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("scripts");

  // ✅ Add filter for rich text rendering
  eleventyConfig.addFilter("richtext", function (value) {
    if (!value) return '';
    return documentToHtmlString(value);
  });

  // ✅ Custom Contentful collection
  eleventyConfig.addCollection('transcriptions', async () => {
    const entries = await contentfulClient.getEntries({
      content_type: 'simplePost',
    });

    return entries.items;
  });

  // ✅ Return config object
  return {
    dir: {
      input: 'src',
      includes: '_includes',
      output: 'dist',
    },
  };
};
