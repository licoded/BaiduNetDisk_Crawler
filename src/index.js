const { MyKoa } = require('@licoded/koa-puppeteer');
const middlewares = require('./middleware');
const contexts = require('./context');
const routers = require('./controller');

new MyKoa({
  port: 3000,
  debug: false,
  launch: {
    userDataDir: '/Users/lic/dev/products/puppeteer_baiduNetDisk/workspace',
  },
  routers,
  contexts,
  middlewares,
}).run();