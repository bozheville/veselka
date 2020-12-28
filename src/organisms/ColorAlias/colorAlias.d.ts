import { ColorAlias } from 'types';

export interface ColorAliasProps {
  schema: ColorSchema;
  defaultValue: ColorAlias;
  onChange: (value: ColorAlias) => void;
}
