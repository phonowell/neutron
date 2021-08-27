import './Clock.css'
import React from 'react'

// interface

type Content = [
  number, number,
  number, number,
  number, number,
]

type PropsGroup = {
  current: number
  max: number
}

// component

const Group: React.FC<PropsGroup> = props => {

  const style = {
    transform: `translateY(-${props.current * 20}px)`,
  }

  // render
  return (
    <div
      className='group'
      style={style}
    >
      {
        new Array(1 + props.max).fill(0)
          .map((_n, i) => (
            <div
              className='item'
              key={i}
            >{i}</div>
          ))
      }
    </div>
  )
}

const Clock: React.FC = () => {

  const [content, setContent] = React.useState<Content>([0, 0, 0, 0, 0, 0])

  // function

  const next = () => {

    const date = new Date()

    setContent(
      [
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
      ]
        .map(n => n.toString().padStart(2, '0'))
        .join('')
        .split('')
        .map(n => parseInt(n, 10)) as Content,
    )
  }

  // binding

  React.useEffect(() => {
    const timer = window.setInterval(next, 500)
    next()
    return () => window.clearInterval(timer)
  }, [])

  // render
  return (
    <div className='clock'>

      <Group
        current={content[0]}
        max={2}
      ></Group>
      <Group
        current={content[1]}
        max={9}
      ></Group>

      <p className='separator'>:</p>

      <Group
        current={content[2]}
        max={6}
      ></Group>
      <Group
        current={content[3]}
        max={9}
      ></Group>

      <p className='separator'>:</p>

      <Group
        current={content[4]}
        max={6}
      ></Group>
      <Group
        current={content[5]}
        max={9}
      ></Group>

    </div>
  )
}

// export
export default Clock