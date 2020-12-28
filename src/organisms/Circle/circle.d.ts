export interface CircleProps {
  size?: number;
  colors: {
    [key: string]: string;
  };
}

export interface SectorProps {
  from: number;
  to: number;
  color: string;
  radius: number;
  centerX?: number;
  centerY?: number;
}

export interface ArcProps {
  color: string;
  radius: number;
  startAngle: number;
  endAngle: number;
  thickness: number;
}
