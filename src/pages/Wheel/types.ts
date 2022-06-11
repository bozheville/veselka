
export interface IWheelContainerProps{}

export interface IWheelProps {}

export interface ColorDataProps {
  colors: {
    [key:string]: string;
  };
}

export interface UrlProps {
  c?: string; // shade color
  w?: number; // scale/shade balance
  a?: string; // color names aliases
  s?: number; // shades for black and white
}
