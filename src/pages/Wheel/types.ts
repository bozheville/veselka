import { RouteComponentProps } from 'react-router-dom';

interface IWheelRouteProps {}

export interface IWheelContainerProps extends RouteComponentProps<IWheelRouteProps> {}

export interface IWheelProps {}

export interface FilterColorProps {
  onChange: (color: string, weight: number) => void;
  onViewDetailsClick: () => void;
}

export interface ColorDataProps {
  colors: {
    [key:string]: string;
  };
}

export interface UrlProps {
  c?: string; // mask color
  w?: number; // mask weight
  a?: string; // color names aliases
  s?: number; // shades for black and white
}
