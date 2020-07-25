import React, { useContext } from 'react';
// import { ArcProps } from './types'
import WheelContext from './WheelContext';

export interface ArcProps {
  color: string;
  radius: number;
  startAngle: number;
  endAngle: number;
  thickness: number;
}

const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) => {
	const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

	return {
		x: centerX + (radius * Math.cos(angleInRadians)),
		y: centerY + (radius * Math.sin(angleInRadians)),
	};
};

const Arc: React.FC<ArcProps> = ({
  color,
  radius,
  startAngle,
  endAngle,
  thickness,
}) => {
  const { center } = useContext(WheelContext);

  const opts = {
    cx: center.x,
    cy: center.y,
    radius,
    start_angle: startAngle,
    end_angle: endAngle,
    thickness,
  };

  const start = polarToCartesian(opts.cx, opts.cy, opts.radius, opts.end_angle);
  const end = polarToCartesian(opts.cx, opts.cy, opts.radius, opts.start_angle);
  const largeArcFlag = opts.end_angle - opts.start_angle <= 180 ? "0" : "1";

  const cutout_radius = opts.radius - opts.thickness;
  const start2 = polarToCartesian(opts.cx, opts.cy, cutout_radius, opts.end_angle);
  const end2 = polarToCartesian(opts.cx, opts.cy, cutout_radius, opts.start_angle);

  const dProp = [
    "M", start.x, start.y,
    "A", opts.radius, opts.radius, 0, largeArcFlag, 0, end.x, end.y,
    "L", opts.cx, opts.cy,
    "Z",

    "M", start2.x, start2.y,
    "A", cutout_radius, cutout_radius, 0, largeArcFlag, 0, end2.x, end2.y,
    "L", opts.cx, opts.cy,
    "Z"
  ].join(" ");


  return (
    <path
      d={dProp}
      fill={color}
      stroke="none"
      fillRule="evenodd"
    />
  );
};

Arc.displayName = 'Arc';

export default Arc;
