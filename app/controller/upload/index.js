const { createRouter, SuccessResp } = require('../../tools');
const { run } = require('../../../puppeteer/steps');
const { upload, refreshDialog, createFolder, getFileList } = require('../../../puppeteer/services');
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
  ctx.body = SuccessResp('refresh ok');
});

//, dirName = '方应杭', filePath = '/Users/lic/Downloads/滴滴电子发票.pdf'
// ?dirName=方应杭&filePath=/Users/lic/Downloads/滴滴电子发票.pdf
router.get('/upload', async (ctx) => {
  const { dirName, filePath } = ctx.request.query;
  await run(upload, dirName, filePath);
  ctx.body = SuccessResp('upload ok');
});

router.get('/createFolder', async (ctx) => {
  const { dirName, folderName } = ctx.request.query;
  const fileList = await run(getFileList, dirName);
  const existFlag = fileList.some((item) => item.type === 'folder' && item.name === folderName);
  if (existFlag) {
    ctx.body = SuccessResp('ever exists');
  } else {
    await run(createFolder, dirName, folderName);
    ctx.body = SuccessResp('create ok');
  }
});

router.get('/getFileList', async (ctx) => {
  const { dirName } = ctx.request.query;
  const fileList = await run(getFileList, dirName);
  ctx.body = SuccessResp(fileList);
});

module.exports = router;
