const { createRouter } = require('@licoded/koa-puppeteer/lib/router');
const { run } = require('@licoded/koa-puppeteer/lib/utils');
const { upload, createFolder, getFileList } = require('../../service');
const router = createRouter('/test');

router.get('/test', (ctx) => {
  ctx.success('test');
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
    ctx.success('not time to upload');
    return;
  }
  const { RoomId, RelativePath } = EventData;
  console.log('[webhook]', EventTimestamp, RoomId, RelativePath);
  const dirName = roomMap[RoomId];
  if (!dirName) {
    ctx.success(`unknown RoomId ${RoomId}`);
  } else {
    const [subDir] = EventTimestamp.split('T');
    // 如果不存在就新建文件夹
    const fileList = await run(getFileList, dirName);
    const existFlag = fileList.some((item) => item.type === 'folder' && item.name === subDir);
    const finalPath = [dirName, subDir].join('/');
    if (!existFlag) {
      await run(createFolder, dirName, subDir);
      console.log('[webhook]', `完成${finalPath}目录创建`);
    }
    // 上传文件
    setTimeout(async () => {
      console.log('[webhook]', `开启上传任务：将${RelativePath}上传至${finalPath}目录`);
      await run(upload, [dirName, subDir].join('/'), [workspace, RelativePath].join('/'));
      console.log('[webhook]', `已将${RelativePath}上传至${finalPath}目录`);
    }, 0);
    ctx.success('uploading');
  }
});

module.exports = router;