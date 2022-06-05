const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaStatic = require('koa-static');
const KoaBodyParser = require('koa-bodyparser');
const views = require('koa-views');

const app = new Koa();
const router = new KoaRouter();

const PORT = process.env.PORT || 3000;

// helper for returning errors in routes
app.context.error = function (code, obj) {
  this.status = code;
  this.body = obj;
};

app.use(KoaBodyParser({
  enableTypes: ['json', 'form'],
  multipart: true,
  formidable: {
    maxFileSize: 32 * 1024 * 1024,
  }
}));

app.use(views('./views'));
app.use(KoaStatic('./public'));

app.use(router.routes());
app.use(router.allowedMethods());

// End points
router.get('/', async ctx => {
  return await ctx.render('./index.html');
});

router.post('/subscribe', async ctx => {
  const data = ctx.request.body;
  const errors = {};

  if (data.firstName.length < 5 || data.lastName.length < 5) {
    errors.name = ['Not enough characters!']
  }

  if (Object.keys(errors).length) {
    return ctx.error(400, {
      status: 400,
      success: false,
      errors
    });
  }

  ctx.body = {
    status: 200,
    success: true
  }
});

app.listen(PORT, 'localhost', () => console.log(`Listening on port: ${PORT}`));
