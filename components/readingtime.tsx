import React from 'react'
import ClockIcon from './icons/clockicon'

type Props = {
  value: string
}

const ReadingTime: React.FC<Props> = ({ value }) => {
  const rt = readingTime(value)
  if (rt < 2) {
    return null
  }
  return (
    <span style={{ color: '#909090' }}>
      <ClockIcon fill={'#909090'} /> {Math.round(rt)} minutes
    </span>
  )
}

const readingTime = (str: string) => {
  const wpm = 200
  const words = str
    .trim()
    .replace(/[^\w\s]|_/g, '')
    .replace(/\s+/g, ' ')
    .match(/\S+/g).length

  return words / wpm
}

export default ReadingTime
