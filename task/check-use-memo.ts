import $ from 'fire-keeper'

// function

const main = async (): Promise<void> => {
  const listResult: string[] = []
  const listSource = await $.source('./src/**/*.tsx')
  await Promise.all(listSource.map(async source => {
    const content = (await $.read<Buffer>(source)).toString()
    if (!content.includes('const activity = React.useContext(CtxActivity)')) return
    if (content.includes('return React.useMemo(() => (')) return
    listResult.push(source)
  }))
  $.i(listResult)
}

// export
export default main