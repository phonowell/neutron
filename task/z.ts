import $ from 'fire-keeper'
import c2a from 'coffee-ahk'

// function

const compile = async () => {
  await $.compile([
    './source/index.coffee',
    './source/index.pug',
    './source/index.styl',
  ], {
    bare: true,
    minify: false,
  })
}

const main = async (): Promise<void> => {
  await compile()
  await c2a('./container/index.coffee')
  await $.exec('start ./container/index.ahk')
}

// export
export default main