const { createRouter, SuccessResp } = require('../../tools');
const { run } = require('../../../puppeteer/steps');
const { upload, refreshDialog } = require('../../../puppeteer/services');
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
router.get('/test2', async (ctx) => {
  const { dirName, filePath } = ctx.request.query;
  await run(upload, dirName, filePath);
  ctx.body = SuccessResp('upload ok');
});

module.exports = router;
