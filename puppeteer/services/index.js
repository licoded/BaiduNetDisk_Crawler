const { sleep } = require('../tools');

const getProperty = async (element, property) => {
  if (!element) return undefined;
  return await (await element.getProperty(property)).jsonValue();
};

// services begins

const refreshDialog = async (page) => {
  await page.goto('https://pan.baidu.com/disk/home');
};

const upload = async (page, dirName, filePath) => {
  const path = `/代替qq/B站录播/${dirName}`.replace(/\//g, '%2f');
  await page.goto(`https://pan.baidu.com/disk/home#/all?vmode=list&path=${path}`);
  await sleep(1500);
  const input = await page.$('input#h5Input0');
  await input.uploadFile(filePath);
  // eslint-disable-next-line no-constant-condition
  while (1) {
    const titleEle = await page.$('#web-uploader > div.dialog-min-header > h3');
    const titleText = await getProperty(titleEle, 'innerText');
    if (titleEle && titleText === '上传完成'){
      console.log(new Date().toLocaleString(), '【上传成功】', dirName, filePath);
      break;
    } else {
      // #uploaderList > li > div.info > div.file-status
      // eslint-disable-next-line max-len
      const uploadingEle = await page.$('#uploaderList > li > div.info > div.file-status');
      const uploadingText = await getProperty(uploadingEle, 'innerText');
      console.log(new Date().toLocaleString(), '【正在上传】', dirName, filePath, uploadingText);
      await sleep(10000);
    }
  }
};

const createFolder = async (page, dirName, folderName) => {
  const path = `/代替qq/B站录播/${dirName}`.replace(/\//g, '%2f');
  await page.goto(`https://pan.baidu.com/disk/home#/all?vmode=list&path=${path}`);
  await sleep(1500);
  // eslint-disable-next-line max-len
  const createSelector = '#layoutMain > div.DxdbeCb.g-clearfix > div.dtaqwpMr > div.lzwrAm > div.tcuLAu > span.g-dropdown-button.g-new-create';
  await page.hover(createSelector);
  // eslint-disable-next-line max-len
  const createFolderSelector = '#layoutMain > div.DxdbeCb.g-clearfix > div.dtaqwpMr > div.lzwrAm > div.tcuLAu > span.g-dropdown-button.g-new-create > span > a:nth-child(1)';
  await page.click(createFolderSelector);
  const inputSelector = '#layoutMain > div.KPDwCE > div.ExFGye > div > input';
  await page.$eval(inputSelector, (el, v) => el.value = v, folderName);
  const okSelector = '#layoutMain > div.KPDwCE > div.ExFGye > div > span.qziyGPr0';
  await page.click(okSelector);
};

module.exports = {
  upload,
  refreshDialog,
  createFolder,
};
