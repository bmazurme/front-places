/* eslint-disable @typescript-eslint/ban-types */
// import { SVGAttributes } from 'react';
export interface IconTree {
  tag: string;
  attr: {
    [key: string]: string;
  };
  child: IconTree[];
}
export interface IconBaseProps extends SVGAttributes<SVGElement> {
  children?: ReactNode;
  size?: string | number;
  color?: string;
  title?: string;
}
export declare type IconType = (props: IconBaseProps) => JSX.Element;
export declare function IconBase(props: IconBaseProps & { attr?: {} }): JSX.Element;
export declare function GenIcon(data: IconTree): (props: IconBaseProps) => JSX.Element;
