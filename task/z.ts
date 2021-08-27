import $ from 'fire-keeper'
import c2a from 'coffee-ahk'

// function

const compile = async () => {
  await $.compile([
    './shell/static/index.coffee',
    './shell/static/index.pug',
    './shell/static/index.styl',
  ], {
    bare: true,
    minify: false,
  })
}

const main = async (): Promise<void> => {
  await compile()
  await c2a('./shell/start.coffee')
  await move()
  await $.exec([
    'cd dist',
    'start start.ahk',
  ])
}

const move = async () => {
  await $.remove('./dist')
  await $.copy('./build/**/*', './dist/static')
  await $.copy('./shell/start.ahk', './dist')
}

// export
export default main