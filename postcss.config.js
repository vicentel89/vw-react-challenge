module.exports = {
  plugins: [
    [
      "@csstools/postcss-global-data",
      {
        files: ["./src/app/custom-media.css"],
      },
    ],
    [
      "postcss-preset-env",
      {
        autoprefixer: {
          flexbox: "no-2009",
        },
        stage: 3,
        features: {
          "custom-properties": false,
        },
      },
    ],
    "postcss-custom-media",
  ],
};
