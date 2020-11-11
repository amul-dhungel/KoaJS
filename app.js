const Koa = require('koa')
const json = require('koa-json')
const KoaRouter = require('koa-router')
const bodyParser = require('koa-bodyparser')

const port = 3100
const app = new Koa()
const router = new KoaRouter()

app.use(json())
app.use(bodyParser())

var data = [
    { id: "1", name: "Amul" },
    { id: "2", name: "Dhungel" }
]

router.get('/', async ctx => {
    ctx.body = data
}
)

router.post('/add', add)
router.put('/update', update)
router.delete('/delete', deletedata)

async function add(ctx) {
    var uin = ctx.request.body
    data.push(uin)
    ctx.body = "Data added"
}

async function update(ctx) {
    let uin = ctx.request.body
    const index = data.findIndex((e) => e.id === uin.id)
    let message
    if (index === -1) {
        data.push(uin)
        message = "Data added"
    } else {
        data[index] = uin
        message = "Data updated"
    }

    ctx.body = message
}

async function deletedata(ctx) {
    let uin = ctx.request.body
    const index = data.findIndex((e) => e.id === uin.id)
    let message
    if (index === -1) {
        message = "Data not found"
    } else {
        delete data[index]
        message = "Data deleted"
    }

    ctx.body = message
}


// async function read(ctx) {
//     ctx.body = data
// }

//Simple middle 
//app.use(async ctx => (ctx.body = { Text: "Welcome koa" }))
app.use(router.routes()).use(router.allowedMethods())
app.listen(port, () => console.log('Server Running'))