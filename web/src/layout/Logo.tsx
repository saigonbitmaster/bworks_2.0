import * as React from "react";
import { SVGProps } from "react";
import { useTheme } from "@mui/material/styles";

const Logo = (props: SVGProps<SVGSVGElement>) => {
  const theme = useTheme();
  return (
    <svg width={234.532} height={30} viewBox="0 0 62.053 5.417" {...props}>
      <g
        aria-label="bWorks"
        style={{
          lineHeight: 1.25,
        }}
        fontWeight={400}
        fontSize={7.056}
        fontFamily="Permanent Marker"
        letterSpacing={0}
        wordSpacing={0}
        strokeWidth={0.265}
        fill="#d50000"
      >
        <text y="5" fontSize="1em">
          BWORKs
        </text>
      </g>
    </svg>
  );
};

export default Logo;
