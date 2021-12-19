const { createRouter } = require('@licoded/koa-puppeteer/lib/router/index.js');
const { run } = require('@licoded/koa-puppeteer/lib/utils');
const { upload, refreshDialog, createFolder, getFileList } = require('../../service');
const router = createRouter('/upload');

router.get('/refresh', async (ctx) => {
  await run(refreshDialog);
  await run(refreshDialog);
  await run(refreshDialog);
  await run(refreshDialog);
  await run(refreshDialog);
  await run(refreshDialog);
  await run(refreshDialog);
  await run(refreshDialog);
  await run(refreshDialog);
  ctx.success('refresh ok');
});

//, dirName = '方应杭', filePath = '/Users/lic/Downloads/滴滴电子发票.pdf'
// ?dirName=方应杭&filePath=/Users/lic/Downloads/滴滴电子发票.pdf
router.get('/upload', async (ctx) => {
  const { dirName, filePath } = ctx.request.query;
  await run(upload, dirName, filePath);
  ctx.success('upload ok');
});

router.get('/createFolder', async (ctx) => {
  const { dirName, folderName } = ctx.request.query;
  const fileList = await run(getFileList, dirName);
  const existFlag = fileList.some((item) => item.type === 'folder' && item.name === folderName);
  if (existFlag) {
    ctx.success('ever exists');
  } else {
    await run(createFolder, dirName, folderName);
    ctx.success('create ok');
  }
});

router.get('/getFileList', async (ctx) => {
  const { dirName } = ctx.request.query;
  const fileList = await run(getFileList, dirName);
  ctx.success(fileList);
});

module.exports = router;