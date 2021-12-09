const puppeteer = require('puppeteer');
const launchOptions = require('../config/launch.json');
const { sleep } = require('../tools/index');

const login = async (page) => {
  await page.goto('https://pan.baidu.com/login');
  if (page.url().startsWith('https://pan.baidu.com/disk/home?')){
    console.log('【已登录】如需更换账号请先退出当前账号');
    return ;
  }
  console.log('【请稍后】正在获取二维码图片...');
  await page.setViewport({ width: 1920, height: 1080 });
  await sleep(1500);
  await page.click('#TANGRAM__PSP_4__footerQrcodeBtn');
  await sleep(1000);
  await page.screenshot({ path: './public/assets/qrcode.png' });
  // eslint-disable-next-line no-constant-condition
  while (1) {
    console.log(page.url());
    if (page.url().startsWith('https://pan.baidu.com/disk/home?')){
      console.log('【登录成功】');
      break;
    } else {
      console.log('【请扫码登录】http://localhost:3002/assets/qrcode.png');
      await sleep(10000);
    }
  }
};

const createBrowser = async()=>{
  return await puppeteer.launch(launchOptions);
};

const getPage = ()=>{
  return new Promise( resolve=>{
    global.browser.then(async browser=>{
      await browser.newPage().then(page=>{
        resolve(page);
      });
    });
  });
};

module.exports = {
  createBrowser,
  getPage,
  login,
};
