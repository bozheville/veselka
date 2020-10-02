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

export interface ColorShadesProps {
  schema?: ColorSchema;
}

export interface SchemaOutputProps {
  exportType: string;
  value: string;
  onExportTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
