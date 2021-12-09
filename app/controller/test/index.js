const { createRouter, SuccessResp } = require('../../tools');
const { run } = require('../../../puppeteer/steps');
const { upload, createFolder } = require('../../../puppeteer/services');
const router = createRouter('/test');

router.get('/test', (ctx) => {
  ctx.body = SuccessResp('test');
});

const workspace = '/Users/lic/bilibiliWorkspace';

const roomMap = {
  8989585: '方应杭',
  11330901: '一斤代码',
  12825779: '午后时光',
};

router.post('/webhook', async (ctx) => {
  const { EventTimestamp, EventData, EventType } = ctx.request.body;
  if (EventType !== 'FileClosed') {
    ctx.body = SuccessResp('not time to upload');
    return;
  }
  const { RoomId, RelativePath } = EventData;
  console.log('[webhook]', EventTimestamp, RoomId, RelativePath);
  const dirName = roomMap[RoomId];
  if (!dirName) {
    ctx.body = SuccessResp(`unknown RoomId ${RoomId}`);
  } else {
    const [subDir] = EventTimestamp.split('T');
    await run(createFolder, dirName, subDir);
    const finalPath = [dirName, subDir].join('/');
    console.log('[webhook]', `完成${finalPath}目录创建`);
    await run(upload, [dirName, subDir].join('/'), [workspace, RelativePath].join('/'));
    console.log('[webhook]', `已将${RelativePath}上传至${finalPath}目录`);
    ctx.body = SuccessResp('upload ok');
  }
});

module.exports = router;
