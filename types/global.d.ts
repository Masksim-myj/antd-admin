declare type Nullable<T> = T | null;
declare type Recordable<T = any> = Record<string, T>;
declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;
declare type TimeoutHandle = ReturnType<typeof setTimeout>;
declare type IntervalHandle = ReturnType<typeof setInterval>;
declare type VueNode = VNodeChild | JSX.Element;
declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null;
declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}
declare interface ViteEnv {
  VITE_PORT: number;
  VITE_PUBLIC_PATH: string;
  VITE_PROXY: [string, string][];
  VITE_GLOB_APP_TITLE: string;
  VITE_GLOB_APP_SHORT_NAME: string;
  VITE_DROP_CONSOLE: boolean;
}
