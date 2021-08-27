import $ from 'fire-keeper'

// function

const countCpt = async (): Promise<string[]> => (await $.source([
  './src/component/**/*.tsx',
  '!./src/component/global/**/*.tsx',
])).map(source => source
  .split('/src/component/')[1]
  .split('.tsx')[0],
)

const countFn = async (): Promise<string[]> => (await $.source('./src/function/**/*.ts'))
  .map(source => source
    .split('/src/function/')[1]
    .split('.ts')[0],
  )

const gitAdd = async (): Promise<void> => {

  const list = await $.source([
    './*.js',
    './*.json',
    './*.yaml',
    './.gitignore',
    './.npmignore',
    './public/index.html',
    './task/*.json',
  ])

  await $.exec(list.map(it => `git add -f ${it}`))
}

const main = async (): Promise<void> => {
  await gitAdd()
  await replaceReadme()
}

const replaceReadme = async (): Promise<void> => {

  type Pkg = {
    scripts: {
      [key: string]: string
    }
  }

  const pkg = await $.read<Pkg>('./package.json')

  const source = './readme.md'
  const name = $.getBasename($.getDirname($.normalizePath(source)))
  let content = (await $.read<string>(source)) || ''

  const listCpt = await countCpt()
  const contCpt = listCpt.length
    ? [
      `## 组件/共${listCpt.length}个`,
      '',
      ...listCpt.map(_name => `- [${_name}](./src/component/${_name}.tsx)`),
      '',
    ]
    : ''

  const listFn = await countFn()
  const contFn = listFn.length
    ? [
      `## 函数/共${listFn.length}个`,
      '',
      ...listFn.map(_name => `- [${_name}](./src/function/${_name}.ts)`),
      '',
    ]
    : ''

  const contTask = [
    `## 任务`,
    '',
    '```shell',
    ...Object.keys(pkg.scripts)
      .filter(key => key !== 'alice')
      .map(key => `npm run ${key} // ${pkg.scripts[key]}`),
    '```',
  ]

  const cont: string = [
    `# ${name}`,
    '',
    '',
    new Date().toLocaleString(),
    '',
    ...contCpt,
    ...contFn,
    ...contTask,
    '---',
  ].join('\n')

  if (content.includes('---')) content = content
    .replace(/[\s\S]*?---/, cont)
  else content = cont

  await $.write(source, content)
}

// export
export default main