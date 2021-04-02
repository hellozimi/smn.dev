import { FunctionComponent } from 'react'
import { parseISO, format } from 'date-fns'

const DateDisplay: FunctionComponent<{ value: string }> = ({ value }) => {
  const d = parseISO(value)
  return <time dateTime={value}>{format(d, 'LLLL d, yyyy')}</time>
}

export default DateDisplay
