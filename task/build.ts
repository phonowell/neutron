import $compile from 'fire-keeper/compile'
import $read from 'fire-keeper/read'
import $remove from 'fire-keeper/remove'
import $source from 'fire-keeper/source'
import $write from 'fire-keeper/write'

// function

const compileMd = async (
  source: string,
) => {

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

const main = async (): Promise<void> => {

  const listMd = await $source([
    './src/**/*.md',
    '!**/include/**/*',
  ])
  for (const source of listMd) {
    // eslint-disable-next-line no-await-in-loop
    await compileMd(source)
  }

  await $compile([
    './src/**/*.styl',
    './src/**/*.yaml',
    '!**/include/**/*',
  ])
}

// export
export default main