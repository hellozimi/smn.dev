import { parseISO, format } from 'date-fns'

type Props = {
  value: string
}

const DateDisplay = ({ value }: Props) => {
  const d = parseISO(value)
  return <time dateTime={value}>{format(d, 'LLLL d, yyyy')}</time>
}

export default DateDisplay
