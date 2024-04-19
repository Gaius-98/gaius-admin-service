export interface ParamsItem {
  key: string;
  value: string;
  var: string | null;
}
export interface Obj {
  [key: string]: any;
}
export interface BodyItem extends ParamsItem {}
export type HeaderItem = Pick<ParamsItem, 'key' | 'value'>;
