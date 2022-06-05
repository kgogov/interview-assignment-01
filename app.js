const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaStatic = require('koa-static');
const KoaBodyParser = require('koa-bodyparser');
const views = require('koa-views');
const cors = require('@koa/cors');
const nunjucks = require('nunjucks');

const app = new Koa();
const router = new KoaRouter();

const PORT = process.env.PORT || 3000;

// helper for returning errors in routes
app.context.error = function (code, obj) {
  this.status = code;
  this.body = obj;
};

app.use(cors());
app.use(KoaBodyParser());

nunjucks.configure('views', { autoescape: true });
app.use(views('./views', { map: { html: 'nunjucks' } }));

// *****************************
// End points middleware
// *****************************
router.get('/', async (ctx, next) => {
  return await ctx.render('./index');
});

router.post('/subscribe', async (ctx, next) => {
  return await ctx.render('./index', { btnSuccessStyle: 'btn-success' });
});

router.post('/validate', async (ctx, next) => {
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
  };
});

// *****************************
// Middleware
// *****************************
app.use(router.routes());
app.use(router.allowedMethods());

app.use(KoaStatic('./public'));

app.listen(PORT, 'localhost', () => console.log(`Listening on port: ${PORT}`));
