import $ from 'fire-keeper'

// function

const main = async (): Promise<void> => {

  await $.exec([
    'npm run alice prepare',
    'npm run alice build',
    'npm run build',
    'npm run alice end',
  ])
}

// export
export default main