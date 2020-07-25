import { RouteComponentProps } from 'react-router-dom';

interface IWheelRouteProps {

}

export interface IWheelContainerProps extends RouteComponentProps<IWheelRouteProps> {}

export interface IWheelProps {}

export interface CircleProps {
  size?: number;
  colors: string[];
}

export interface SectorProps {
  from: number;
  to: number;
  color: string;
  radius: number;
}

export interface FilterColorProps {
  onChange: (color: string, weight: number) => void;
}

export interface ColorDataProps {
  colors: string[];
}

export interface UrlProps {
  c: string;
  w: number;
}
