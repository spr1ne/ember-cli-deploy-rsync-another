/* global require */
/* jslint node: true */
var CoreObject = require('core-object');
var Rsync      = require('rsync');

var Promise    = require('ember-cli/lib/ext/promise');

module.exports = CoreObject.extend({

  init: function(options) {

    this.plugin = options.plugin;

    if (!options.config) {
      throw new Error('Please pass config into lib/rsync-deploy.js constructor');
    }

    this.config = options.config;

  },

  upload: function() {

    var config = this.config;

    var sshConfig = `ssh -p ${config.port} -i ${config.privateKeyFile}`;
    var sourceDir = config.distDir;
    // username@example.com:/remote/dir
    var destination = `${config.username}@${config.host}:${config.remoteDir}`;

    return new Promise((resolve, reject) => {

      var rsync = new Rsync()
        .shell('ssh')
        .flags('az')
        .progress()
        .set('e', sshConfig)
        .exclude('index.html')
        .source(sourceDir)
        .destination(destination);

        if (config.debug) {
          console.log(rsync.command());
        }

        rsync.execute(function(error, code, cmd) {
          if (error) { throw new Error(error); }
          resolve(code, cmd);
        },
        function(data) {
          if (config.progress) {
            console.log(data.toString());
          }
        },
        function(data) {
          reject(data);
        });

      });

  }

});
