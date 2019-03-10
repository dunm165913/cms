# be


```bash
$ create empty database with name "cms_be"
$ npm i
$ npx sequelize db:migrate
```
Note: Change variable enviroment (plugin.js, config.json, config.default.js)


```bash
$ npm install
$ npm test
```

publish your framework to npm, then change app's dependencies:

```js
// {app_root}/index.js
require('be').startCluster({
  baseDir: __dirname,
  // port: 7001, // default to 7001
});

```

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

