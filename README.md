# Ember-cli-deploy-rsync-another

This README outlines the details of collaborating on this Ember addon.

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

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
