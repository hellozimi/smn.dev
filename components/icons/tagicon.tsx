import React from 'react'

type Props = {
  fill: string
}

const TagIcon: React.FC<Props> = ({ fill }) => (
  <svg width="22" height="12" viewBox="0 0 360 209" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M30 0C13.4315 0 0 13.4315 0 30V179C0 195.569 13.4315 209 30 209H241.977C249.093 209 255.977 206.47 261.401 201.863L349.09 127.363C363.191 115.382 363.191 93.6176 349.09 81.6373L261.401 7.13724C255.978 2.52968 249.093 0 241.977 0H30ZM60 44C51.7157 44 45 50.7157 45 59V149C45 157.284 51.7157 164 60 164H98C106.284 164 113 157.284 113 149V59C113 50.7157 106.284 44 98 44H60Z"
      fill={fill}
    />
  </svg>
)

export default TagIcon
