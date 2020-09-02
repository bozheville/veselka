export interface ColorSchema {
  [color: string]: {
    [shade: number]: string;
  }
}

export interface ColorAlias {
  [color: string]: string;
}

export interface ColorAliasProps {
  value?: ColorSchema;
  onChange: (value: ColorAliasData) => void;
}
