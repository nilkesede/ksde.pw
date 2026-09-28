'use client'; 

import {Keyframes, Frame} from './react-keyframes'
import styles from './terminal.module.css'
import {useState} from 'react'

const sleepDuration = 500
const getTypingDuration = () => 80 + (80 * (Math.random() - 0.5))

const Line = ({text, noPrompt = false, noCaret = false}: {
  text: string
  noPrompt?: boolean
  noCaret?: boolean
}) => (
  <>
    {!noPrompt && <span>~ </span>}
    {text}
    {!noCaret && <span className={styles.caret}/>}
  </>
)

const Terminal = () => {
  const [lineCount, setLineCount] = useState(0)

  const renderLine = (text: string) => {
    const frames = []

    frames.push(
      <Frame key={`${text}-first`} duration={sleepDuration}>
        <Line text=""/>
      </Frame>
    )

    for (let i = 0; i < text.length; i++) {
      const isLastLetter = i === text.length - 1
      const duration = isLastLetter ? sleepDuration : getTypingDuration()
      frames.push(
        <Frame key={`${text}-${i}`} duration={duration}>
          <Line text={text.slice(0, i + 1)}/>
        </Frame>
      )
    }

    frames.push(
      <Frame key={`${text}-last`}>
        <Line noCaret text={text}/>
      </Frame>
    )

    return (
      <Keyframes component="div" onEnd={() => setLineCount(c => c + 1)}>
        {frames}
      </Keyframes>
    )
  }

  return (
    <div className={styles.root}>
      <div
        className={`${styles.inner}`}
      >
        <div className={styles.header}>
          <span className={styles.icon}/>
          <span className={styles.icon}/>
          <span className={styles.icon}/>
        </div>
        <div className={styles.body}>
          <a href="https://github.com/nilkesede" target="_blank" rel="noreferrer">{renderLine('# github.com/nilkesede')}</a>
          {lineCount >= 1 && <a href="https://linkedin.com/in/nilkesede/" target="_blank" rel="noreferrer">{renderLine('# linkedin.com/in/nilkesede')}</a>}
          {lineCount >= 2 && <Line text=""/>}
        </div>
      </div>
    </div>
  )
}

export default Terminal
