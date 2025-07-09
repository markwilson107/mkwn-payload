import { SVGProps } from "react"

function ArrowOutwardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
    {...props}
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M6 6v2h8.59L5 17.59 6.41 19 16 9.41V18h2V6z"></path>
    </svg>
  )
}

export default ArrowOutwardIcon
