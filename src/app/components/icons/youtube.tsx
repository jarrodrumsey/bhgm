
import { SVGAttributes } from "react";

export function YoutubeIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
        <path  stroke= 'none' strokeWidth={1} strokeDasharray = 'none' strokeLinecap= 'butt' strokeLinejoin = 'miter' strokeMiterlimit={10} fillRule= 'nonzero' opacity= {1} stroke-linecap="round"  d="M 88.119 23.338 c -1.035 -3.872 -4.085 -6.922 -7.957 -7.957 C 73.144 13.5 45 13.5 45 13.5 s -28.144 0 -35.162 1.881 c -3.872 1.035 -6.922 4.085 -7.957 7.957 C 0 30.356 0 45 0 45 s 0 14.644 1.881 21.662 c 1.035 3.872 4.085 6.922 7.957 7.957 C 16.856 76.5 45 76.5 45 76.5 s 28.144 0 35.162 -1.881 c 3.872 -1.035 6.922 -4.085 7.957 -7.957 C 90 59.644 90 45 90 45 S 90 30.356 88.119 23.338 z M 36 58.5 v -27 L 59.382 45 L 36 58.5 z"/>
    </svg>
  );
}


