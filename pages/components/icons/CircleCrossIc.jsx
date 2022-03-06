export default function CharmCircleCross(props) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 16 16" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <path d="m10.25 5.75l-4.5 4.5m0-4.5l4.5 4.5"></path>
        <circle cx="8" cy="8" r="6.25"></circle>
      </g>
    </svg>
  )
}
