
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
  [key: string]: string | undefined;
  c?: string; // shade color
  w?: string; // scale/shade balance
  a?: string; // color names aliases
  s?: string; // shades for black and white
}
