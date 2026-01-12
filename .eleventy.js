const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// Eleventy configuration
module.exports = function (eleventyConfig) {
    // Add favicon to site
    eleventyConfig.addPassthroughCopy("favicon.ico");
    // Add media folder to site
    eleventyConfig.addPassthroughCopy("media");
    // Set target blank attributes for all external links
    eleventyConfig.addTransform("update-links", async function (content) {
        const dom = new JSDOM(content);
        dom.window.document.querySelectorAll('a').forEach(function (el) {
            if (el.href.startsWith('https://') || el.href.startsWith('http://')) {
                el.setAttribute('target', '_blank');
            }
        });
        return dom.serialize();
    });
};