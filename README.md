# Ember-cli-deploy-rsync-another

## Quick start

* I use it **with forked version of ember-deploy-ssh-index** (with new version ssh2 utility) [ember-deploy-ssh-index](https://github.com/spr1ne/ember-cli-deploy-ssh-index)
```javascript
  // config/environment.js
  ENV['ssh-index'] = {
    allowOverwrite: true,
    username: 'sweet-bob',
    host: 'github-private',
    remoteDir: '/var/www/test/', // Make sure you have enough rights
    privateKeyFile: '~/.ssh/web'
  };
```
* If you using multiple keys on one host, please config (or create) your ~/.ssh/config, for example
```
Host github-private
  HostName github.com
  Port 22
  User sweet-bob
  IdentityFile ~/.ssh/github-company

``` 
* Config ssh
```javascript
  // config/environment.js
  ENV['ssh'] = {
    username: 'sweet-bob',
    host: 'github-private',
    remoteDir: '/var/www/test/', // Make sure you have enough rights
    privateKeyFile: '~/.ssh/web',
  };
````

## Configuration

```javascript
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
```

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
