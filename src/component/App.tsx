import 'core-js'
import './App.css'
import React from 'react'
import Stage from './Stage'

// interface

declare global {
  interface Window {
    $: {
      alert: <T extends string>(msg: T) => T
    }
  }
}

// component
const App: React.FC = () => <Stage></Stage>

// export
export default App