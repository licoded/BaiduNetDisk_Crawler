const { createRouter, SuccessResp } = require('../../tools');
const { run } = require('../../../puppeteer/steps');
const { upload, refreshDialog, createFolder } = require('../../../puppeteer/services');
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
  await run(createFolder, dirName, folderName);
  ctx.body = SuccessResp('create ok');
});

module.exports = router;
