/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable no-multi-assign */
/* eslint-disable no-redeclare */
/* eslint-disable no-var */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-rest-params */
/* eslint-disable vars-on-top */
/* eslint-disable react/destructuring-assignment */

import { createElement } from 'react';
import { IconContext, DefaultContext } from './icon-context';

let __assign = (this && this.__assign) || function () {
  __assign = Object.assign || function (t) {
    for (let s, i = 1, n = arguments.length; i < n; i += 1) {
      s = arguments[i];

      for (const p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

const __rest = (this && this.__rest) || function (s, e) {
  const t = {};

  for (const p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === 'function') {
    for (let i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i += 1) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) {
        t[p[i]] = s[p[i]];
      }
    }
  }

  return t;
};

function IconBase(props) {
  const elem = (conf) => {
    const { attr, size, title } = props;
    const svgProps = __rest(props, ['attr', 'size', 'title']);
    const computedSize = size || conf.size || '1em';
    let className;

    if (conf.className) className = conf.className;
    if (props.className) className = (className ? `${className} ` : '') + props.className;

    return (createElement(
      'svg',
      {
        stroke: 'currentColor',
        fill: 'currentColor',
        strokeWidth: '0',
        ...conf.attr,
        ...attr,
        ...svgProps,
        className,
        style: { color: props.color || conf.color, ...conf.style, ...props.style },
        height: computedSize,
        width: computedSize,
        xmlns: 'http://www.w3.org/2000/svg',
      },
      title && createElement('title', null, title),
      props.children,
    ));
  };

  return IconContext !== undefined
    ? createElement(IconContext.Consumer, null, (conf) => elem(conf))
    : elem(DefaultContext);
}

function Tree2Element(tree) {
  return tree && tree.map((node, i) => createElement(node.tag, { key: i, ...node.attr }, Tree2Element(node.child)));
}

function GenIcon(data) {
  return function (props) {
    return createElement(IconBase, { attr: { ...data.attr }, ...props }, Tree2Element(data.child));
  };
}

const _GenIcon = GenIcon;
const _IconBase = IconBase;

export { _IconBase as IconBase, _GenIcon as GenIcon };
