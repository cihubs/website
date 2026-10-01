const StyleDictionary = require("style-dictionary");

constsd = StyleDictionary.extend({
  source: ["tokens/tokens.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "src/styles/tokens/",
      files: [
        {
          destination: "_variables.css",
          format: "css/variables",
        },
      ],
    },
    js: {
      transformGroup: "js",
      buildPath: "src/styles/tokens/",
      files: [
        {
          destination: "_variables.js",
          format: "javascript/module",
        },
      ],
    },
    json: {
      transformGroup: "json",
      buildPath: "src/styles/tokens/",
      files: [
        {
          destination: "_variables.json",
          format: "json/flat",
        },
      ],
    },
  },
});

sd.buildAllPlatforms();

console.log("Style Dictionary tokens generated successfully!");
