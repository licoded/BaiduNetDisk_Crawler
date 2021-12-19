const { MyKoa } = require('@licoded/koa-puppeteer');

new MyKoa({
  port: 3000,
  debug: false,
  launch: {
    userDataDir: '/Users/lic/dev/products/puppeteer_baiduNetDisk/workspace',
  },
  routers: [],
}).run();