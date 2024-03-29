
export interface IWheelProps {
  isWelcomeClosed: boolean;
}

export interface IWheelContainerProps extends IWheelProps{}

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
