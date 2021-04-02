import React from 'react'

type Props = {
  fill: string
}

const ClockIcon: React.FC<Props> = ({ fill }) => (
  <svg width="16" height="16" viewBox="0 0 313 313" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M156.5 279C224.155 279 279 224.155 279 156.5C279 88.8451 224.155 34 156.5 34C88.8451 34 34 88.8451 34 156.5C34 224.155 88.8451 279 156.5 279ZM156.5 313C242.933 313 313 242.933 313 156.5C313 70.0674 242.933 0 156.5 0C70.0674 0 0 70.0674 0 156.5C0 242.933 70.0674 313 156.5 313Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M157 50C169.15 50 179 59.8497 179 72V154.608L223.411 204.348C231.503 213.411 230.716 227.318 221.652 235.411C212.589 243.503 198.682 242.716 190.589 233.652L140.589 177.652C136.99 173.621 135 168.405 135 163V72C135 59.8497 144.85 50 157 50Z"
      fill={fill}
    />
  </svg>
)

export default ClockIcon
