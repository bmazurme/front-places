/* eslint-disable no-redeclare */
import { CSSProperties, SVGAttributes } from 'react';

export interface IconContext {
    color?: string;
    size?: string;
    className?: string;
    style?: CSSProperties;
    attr?: SVGAttributes<SVGElement>;
}
export declare const DefaultContext = IconContext;
export declare const IconContext = Context<IconContext>;
