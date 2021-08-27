import './Clock.css'
import React from 'react'

// interface

type Content = [string, string, string]

// component

const Clock: React.FC = () => {

  const [content, setContent] = React.useState<Content>(['00', '00', '00'])

  // function

  const next = () => {

    const date = new Date()

    setContent(
      [
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
      ].map(n => n.toString().padStart(2, '0')) as Content,
    )
  }

  // binding

  React.useEffect(() => {
    const timer = window.setInterval(next, 500)
    return () => window.clearInterval(timer)
  }, [])

  // render
  return (
    <div className='clock'>
      <p className='h'>{content[0]}</p>
      <p className='separator'>:</p>
      <p className='m'>{content[1]}</p>
      <p className='separator'>:</p>
      <p className='s'>{content[2]}</p>
    </div>
  )
}

// export
export default Clock