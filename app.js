const Koa = require('koa')
const port = 3100
const app = new Koa()

//Simple middle 
app.use(async ctx => (ctx.body = "Welcome koa"))

app.listen(port, () => console.log('Server Running'))