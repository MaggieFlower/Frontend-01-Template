var Generator = require('yeoman-generator')
module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts);
    this.destinationRoot('../tt-example')
    // console.log( this.destinationRoot('../tt-example') )
  }

  collect () {}
  creating () {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
    );
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'),
    );
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath('src/index.js'),
    );

    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('src/index.html'),
      { title: 'Templating with Yeoman' }
    );
    this.fs.copyTpl(
      this.templatePath('animation.js'),
      this.destinationPath('lib/animation.js')
    );
    this.fs.copyTpl(
      this.templatePath('gesture.js'),
      this.destinationPath('lib/gesture.js')
    );
    this.fs.copyTpl(
      this.templatePath('main.js'),
      this.destinationPath('lib/main.js')
    );
    this.fs.copyTpl(
      this.templatePath('container.css'),
      this.destinationPath('lib/container.css')
    );
    this.fs.copyTpl(
      this.templatePath('component-css-loader.js'),
      this.destinationPath('lib/component-css-loader.js')
    );
    this.fs.copyTpl(
      this.templatePath('main.test.js'),
      this.destinationPath('test/main.test.js')
    );
    this.fs.copyTpl(
      this.templatePath('add.js'),
      this.destinationPath('src/add.js')
    );


    this.npmInstall([
      "babel-loader",
      "@babel/core",
      "@babel/preset-env",
      "@babel/plugin-transform-react-jsx",
      "@istanbuljs/nyc-config-babel",
      "mocha",
      "nyc",
      "webpack",
      "webpack-cli",
      "webpack-dev-server",
      "html-webpack-plugin",
      "clean-webpack-plugin",
      "css",
      "@babel/register"
    ], { 'save-dev': true })
  }
}