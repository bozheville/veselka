import React, { useMemo, useContext } from 'react';
import { SectorProps } from './types'
import WheelContext from './WheelContext';

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

interface GetArcDProps {
  startAngle: number;
  endAngle: number;
  x: number;
  y: number;
  radius: number;
}

const getArcD = ({
  startAngle,
  endAngle,
  x,
  y,
  radius,
}: GetArcDProps) => {
  const start = polarToCartesian(x, y, radius, endAngle);
	const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  const d = [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    'L', x, y,
    'Z'
  ].join(' ');

  return d;
}

const Sector: React.FC<SectorProps> = ({
  from,
  to,
  color,
  radius,
}) => {
  const { center } = useContext(WheelContext);

  const dProp = useMemo(() => getArcD({
    startAngle: from,
    endAngle: to,
    ...center,
    radius,
  }), [from, to, center, radius]);

  return (
    <path
      d={dProp}
      fill={color}
      stroke="none"
      fillRule="evenodd"
    />
  );
};

Sector.displayName = 'Sector';

export default Sector;
