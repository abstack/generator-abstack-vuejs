'use strict';
var generators = require('yeoman-generator');

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
    this._copy('_babelrc', '.babelrc');
    this._copy('_eslintrc.json', 'src/.eslintrc.json');
    this._copy('_editorconfig', '.editorconfig');
    this._copy('_gitignore', '.gitignore');
    this._copy('_webpack.config.js', 'webpack.config.js');
    this._copyTpl('_index.html', 'index.html');
    this._copyTpl('_index.js', 'src/index.js');
    this._copyTpl('_App.vue', 'src/components/App.vue');
    this._copyTpl('_package.json', 'package.json');
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