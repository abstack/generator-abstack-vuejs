'use strict';

var generators = require('yeoman-generator');
var simpleFiles = {
  '_babelrc': '.babelrc',
  '_editorconfig': '.editorconfig',
  '_gitignore': '.gitignore',
  '_LICENSE': 'LICENSE',
  '_webpack.config.js': 'webpack.config.js',
  '_eslintrc.json': 'src/.eslintrc.json',
  '_route.js': 'src/route.js',
  '_Hello.vue': 'src/components/Hello.vue',
  '_logo.png': 'src/assets/logo.png'
};
var tplFiles = {
  '_index.html': 'index.html',
  '_main.js': 'src/main.js',
  '_App.vue': 'src/App.vue',
  '_package.json': 'package.json'
};

module.exports = generators.Base.extend({
  prompting: function () {
    var done = this.async();

    this.prompt([{
      type: 'input',
      name: 'project',
      message: 'What\'s your project name?',
      default: this.appname
    },
    {
      type: 'confirm',
      name: 'isUseVueRouter',
      message: 'Would you like to use vue-router?',
      default: true
    }], function (answer) {
      this.extraConfig = this.extraConfig || {};
      this.extraConfig.isUseVueRouter = answer.isUseVueRouter;
      this.appname = answer.project;
      done();
    }.bind(this));
  },
  writing: function () {
    var source;
    var target;

    for (source in simpleFiles) {
      if (!this.extraConfig.isUseVueRouter && source == '_route.js') {
        continue;
      }
      target = simpleFiles[source];
      this._copy(source, target);
    }

    for (source in tplFiles) {
      target = tplFiles[source];
      this._copyTpl(source, target);
    }
  },
  install: function () {
    this.npmInstall(undefined, {
      registry: 'https://registry.npm.taobao.org'
    });
  },
  _copyTpl: function (source, dest) {
    this.fs.copyTpl(this.templatePath(source), this.destinationPath(dest), this);
  },
  _copy: function (source, dest) {
    this.fs.copy(this.templatePath(source), this.destinationPath(dest));
  }
});