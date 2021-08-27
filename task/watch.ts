import $compile from 'fire-keeper/compile'
import $i from 'fire-keeper/i'
import $read from 'fire-keeper/read'
import $remove from 'fire-keeper/remove'
import $watch from 'fire-keeper/watch'
import $write from 'fire-keeper/write'
import path from 'path'

// interface

type Event = {
  path: string
}

// function

class Compiler {

  isBusy = false
  list: Set<string> = new Set()

  constructor() {
    setInterval(this.next.bind(this), 1e3)
  }

  add(
    source: string,
  ) {
    if (this.list.has(source)) return
    this.list.add(source)
  }

  static async compileMd(
    source: string,
  ) {

    await $compile(source)

    const sourceMd = source.replace('.md', '.html')
    const content = await $read<string>(sourceMd)
    await $remove(sourceMd)

    if (!content) return

    const cont = [
      'const main = {',
      '  dangerouslySetInnerHTML: {',
      `    __html: '${content}',`,
      '  },',
      '}',
      '',
      'export default main',
    ].join('\n')

    await $write(source.replace('.md', '.ts'), cont)
  }

  static async compileStyl(
    source: string,
  ) {

    let content = await $read<string>(source)
    if (!content) {
      const _source = path.relative(source, './src/include/basic.styl')
        .replace('../', '')
        .replace('.styl', '')
      content = `@import '${_source}'\n\n${content.trim()}`
      $write(source, content)
    }

    await $compile(source)
  }

  static async compileTsx(
    source: string,
  ) {

    const content = (await $read<Buffer>(source)).toString()
    if (content) return

    const cont = [
      "import React from 'react'",
      '',
      '// component',
      '',
      'const Component: React.FC = () => {',
      '  return (',
      '    <div></div>',
      '  )',
      '}',
      '',
      '// export',
      'export default Component',
    ].join('\n')

    await $write(source, cont)
  }

  async next() {

    if (!this.list.size) return
    if (this.isBusy) return

    this.isBusy = true

    const source = Array.from(this.list)[0]
    if (!source) return

    if (source.endsWith('.md')) await Compiler.compileMd(source)
    else if (source.endsWith('.styl')) await Compiler.compileStyl(source)
    else if (source.endsWith('.tsx')) await Compiler.compileTsx(source)
    else await $compile(source)

    this.list.delete(source)
    this.isBusy = false
  }
}

const main = (): void => {

  // catch error
  process.on('uncaughtException', e => $i(e.stack))

  const compiler = new Compiler()

  $watch([
    './src/**/*.md',
    './src/**/*.styl',
    './src/**/*.tsx',
    './src/**/*.yaml',
    '!**/include/**/*.styl',
  ], (e: Event) => compiler.add(e.path))
}

// export
export default main