require("dotenv").config();

module.exports = {
  siteMetadata: {
    siteUrl: "https://blog.ouvill.net",
    title: "おーびるのブログ",
    description: "おーびるのブログです。",
    defaultCover: `${__dirname}/content/assets/site-header.jpg`,
    social: {
      twitter: `Ouvill`,
    },
  },
  plugins: [
    "gatsby-plugin-netlify-cms",
    "gatsby-plugin-emotion",
    "gatsby-plugin-material-ui",
    {
      resolve: "gatsby-plugin-graphql-codegen",
      options: {
        documentPaths: [
          "./src/**/*.{ts,tsx}",
          "./gatsby-node/**/*.{ts,tsx}",
          "./node_modules/gatsby-*/**/*.js",
        ],
      },
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-62592304-9",
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-sharp",
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: "./contents/blog/",
      },
      __key: "blog",
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: require("./src/utils/algolia-queries"),
      },
    },
  ],
};
