var BasePlugin = require('ember-cli-deploy-plugin');
var RsyncDeploy = require('./lib/rsync-deploy');
var fs         = require('fs');
var path       = require('path');

module.exports = {
  name: 'ember-cli-deploy-ssh',

  createDeployPlugin: function(options) {
    var DeployPlugin = BasePlugin.extend({
      name: options.name,

      requiredConfig: ['username', 'host', 'remoteDir', 'privateKeyFile'],

      /**
       * @typedef {Object} Config
       * @param {String} username
       * @param {String} host
       * @param {String} privateKeyFile
       * @param {String} remoteDir
       * @param {Number} [port=22]
       * @param {Boolean} [progress=false]
       * @param {Boolean} [debug=false]
       * @param {Boolean} [index=true] - exclude index.html?
       * @param {String} [distDir] - by default, returned from ember-cli-deploy-build
       * @param {String} [revisionKey] - by default, returned from ember-cli-deploy-build
       */
      defaultConfig: {
        username: null,
        host: null,
        port: 22,
        privateKeyFile: null,
        remoteDir: null,
        progress: false,
        debug: false,
        index: true,
        filePattern: '**/*',
        distDir: function(context) {
          return context.distDir;
        },
        revisionKey: function(context) {
          var revisionKey = context.revisionData && context.revisionData.revisionKey;
          return context.commandOptions.revision || revisionKey;
        },
      },

      upload: function(context) {
        var self = this;

        var rsync_config = {
            host: this.readConfig('host'),
            username: this.readConfig('username'),
            port: this.readConfig('port'),
            remoteDir: this.readConfig('remoteDir'),
            privateKeyFile: this.readConfig('privateKeyFile'),
            distDir: this.readConfig('distDir'),
            revisionKey: this.readConfig('revisionKey'),
            progress: this.readConfig('progress'),
            debug: this.readConfig('debug')
          };

        rsync_config.privateKey = fs.readFileSync(rsync_config.privateKeyFile);
        if (!rsync_config.privateKey) {
          throw new Error(`Can't read ssh key, by path: ${rsync_config.privateKeyFile}`);
        }

        // 1. Resolve absolute path
        // 2. Trailing slash with asterisk for copying content of directory
        rsync_config.distDir = path.resolve(rsync_config.distDir) + '/*';
        if (!rsync_config.distDir) {
          throw new Error('Before, please install ember-cli-deploy-build. Or add it to package.json');
        }

        var rsyncDeploy = new RsyncDeploy({ plugin: this, config: rsync_config });
        return rsyncDeploy.upload();

      }

    });

    return new DeployPlugin();
  }
};
