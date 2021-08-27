import $ from 'fire-keeper'

// interface

type Pkg = {
  title: string
}

// function

const main = async (): Promise<void> => {

  const { title } = await $.read<Pkg>('./package.json')

  if (!await validate(title)) throw new Error('invalid index.html')

  await replaceIndex(title)
}

const makeNote = (
  title: string,
): string => {

  const message: string = [
    title,
    '/',
    `${makeTime()} @ Mimiko`,
  ].join(' ')

  return `<!-- ${message} -->`
}

const makeTime = (): string => {
  const date: Date = new Date()
  return [
    date.getFullYear(),
    '/',
    date.getMonth() + 1,
    '/',
    date.getDate(),
    ' ',
    date.getHours(),
    ':',
    date.getMinutes().toString()
      .padStart(2, '0'),
    ':',
    date.getSeconds().toString()
      .padStart(2, '0'),
  ].join('')
}

const replaceIndex = async (
  title: string,
): Promise<void> => {

  const content = (await $.read<string>('./build/index.html'))

    // static
    .replace(/ href="\/static/g, ` href="static`)
    .replace(/ src="\/static/g, ` src="static`)

    // replace
    .replace(/<title.*?<\/title>/u, `<title>${title}</title>`)

  await $.write('./build/index.html', [
    makeNote(title),
    content,
  ].join('\n'))
}

const validate = async (
  title: string,
): Promise<boolean> => {
  const html = await $.read('./build/index.html')
  if (!html) return false
  return !html.startsWith(`<!-- ${title}`)
}

// export
export default main