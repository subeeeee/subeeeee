const Koa = require('koa');
const Router = require('koa-router');
const glob = require("glob");
const { resolve } = require('path')
const fs = require('fs')



const app = new Koa();

app.use(async (ctx, next)=> {
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:8888');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200;
  } else {
    await next();
  }
});

const router = new Router({
  prefix:'/api'
});
glob.sync(resolve('./api', "**/*.json")).forEach((item, i) => {
  let apiJsonPath = item && item.split('/api')[1];
  let apiPath = apiJsonPath.replace('.json','');
  console.log(apiPath)
  router.get(apiPath,(ctx,next)=>{
    try{
      console.log(apiPath)
      let jsonStr = fs.readFileSync(item).toString();
      jsonStr = JSON.stringify(ctx)
      ctx.body = {
        data: JSON.parse(jsonStr),
        state: 200,
        type: 'success'
      }
    }catch(err){
      ctx.throw('server on errror')
    }
  })
})








router.get('/name',(ctx,next)=>{

  ctx.body = {name:'asdf'}
})

app.use(router.routes()).use(router.allowedMethods())






console.log('serveice is ready')
app.listen(3000);