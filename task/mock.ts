/* eslint-disable camelcase, sort-keys */
import $ from 'fire-keeper'
import Koa from 'Koa'
import Router from 'koa-router'
// import User from '../data/mock/user.json'
import cors from '@koa/cors'
import koaBody from 'koa-body'
import mock from '../src/api.json'

// function

// function random(max: number): number {
//   return 1 + Math.trunc((Math.random() * max))
// }

// function randomUser(): typeof User[number] {
//   return User[random(User.length - 1)]
// }

const register = (
  router: Router, route: string,
  callback: (ctx: Koa.ParameterizedContext) => void,
) => {

  const _route = route.startsWith('/')
    ? route
    : `/${route}`

  router.post(_route, ctx => {
    $.info(_route)
    $.i(callback(ctx))
  })
}

const wrap = (
  data: unknown = {},
): {

  code: number
  msg: string
  data: unknown
} => {
  return {
    code: 0,
    data,
    msg: '',
  }
}

// router
const router = new Router()

Object.keys(mock).forEach(key => {
  register(router, key, ctx => {
    const data = wrap(mock[key])
    ctx.body = data
    return data.data
  })
})

// app
new Koa()
  .use(cors({
    credentials: true,
    origin: 'http://mimiko.bilibili.com',
  }))
  .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(8080)

// export
const main = (): void => {
  $.info("use 'npm run mock' instead")
}
export default main