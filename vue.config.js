const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === "production" ? "/mint-tally-website/" : "/",
  chainWebpack: (config) => {
    const dir = path.resolve(__dirname, "src/assets/icons");

    config.plugin("html").tap((args) => {
      args[0].title = "薄荷记账";
      return args;
    });

    config.module
      .rule("svg-sprite")
      .test(/\.svg$/)
      .include.add(dir)
      .end()

      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ extract: false })
      .end()

      .use("svgo-loader")
      .loader("svgo-loader");
    // .tap(options => ({...options, plugins: [{removeAttrs: {attrs: 'fill'}}]})).end()

    config
      .plugin("svg-sprite")
      .use(require("svg-sprite-loader/plugin"), [{ plainSprite: true }]);

    config.module.rule("svg").exclude.add(dir);
  },
});
