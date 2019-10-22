const Koa = require('koa');
const Router = require('koa-router');
const glob = require("glob");
const { resolve } = require('path')
const fs = require('fs')



const app = new Koa();
const router = new Router({
    prefix:'/api'
});
console.log(1);
console.log(glob.sync(resolve('./api', "./tsconfig.json")));
console.log(1);
glob.sync(resolve('./api', "**/*.json")).forEach((item, i) => {
    let apiJsonPath = item && item.split('/api')[1];
    let apiPath = apiJsonPath.replace('.json','');
    console.log(apiPath)
    router.get(apiPath,(ctx,next)=>{
        // console.log(fs.readFileSync(item).toString())
        // ctx.body ={
        //     name:1
        // }
        try{
            let jsonStr = fs.readFileSync(item).toString();
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

app
    .use(router.routes())
    .use(router.allowedMethods())







console.log('serveice is ready')
app.listen(3000);