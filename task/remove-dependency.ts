import $ from 'fire-keeper'

// function

const main = async (): Promise<void> => {
  const listSource = [
    './src/**/*.tsx',
    // '!./src/component/global/**/*.tsx',
  ];
  (await $.source(listSource)).forEach(async source => {
    const content = (await $.read<Buffer>(source)).toString()
    const cont = content
      .replace(/}, \[[^\n]*?]\)/g, '}, [])')
      .replace(/\), \[[^\n]*?]\)/g, '), [])')
    if (cont === content) return
    await $.write(source, cont)
  })
}

// export
export default main