import { SVGProps } from 'react'

function ArrowBackSharp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="none"
        stroke-linecap="square"
        stroke-miterlimit="10"
        stroke-width="48"
        d="M244 400 100 256l144-144M120 256h292"
      ></path>
    </svg>
  )
}

export default ArrowBackSharp
