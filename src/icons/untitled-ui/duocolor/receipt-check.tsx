import type { SVGProps } from 'react'

const Room = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
    <path
      fill='var(--ci-primary-color, currentColor)'
      d='M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z'
      className='ci-primary'
    />
    <rect
      width='32'
      height='64'
      x='256'
      y='232'
      fill='var(--ci-primary-color, currentColor)'
      className='ci-primary'
    />
  </svg>
)

export default Room
