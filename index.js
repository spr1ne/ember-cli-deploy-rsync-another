var BasePlugin = require('ember-cli-deploy-plugin');

module.exports = {
  name: 'ember-cli-deploy-ssh',

  createDeployPlugin: function(options) {
    var DeployPlugin = BasePlugin.extend({
      name: options.name,

      defaultConfig: {
        filePattern: '**/*.{js,css,png}' // default filePattern if it isn't defined in config/dpeloy.js
      },

      requiredConfig: ['username', 'host', 'remoteDir', 'privateKeyFile'],

      didBuild: function(context) {
        //do something amazing here once the project has been built
      },

      upload: function(context) {
        this.log('Uploading assets');
        //do something here to actually deploy your app somewhere
      },

      didDeploy: function(context) {
        //do something here like notify your team on slack
      }
    });

    return new DeployPlugin();
  }
};
