/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
const __createBinding = (this && this.__createBinding) || (Object.create ? ((o, m, k, k2) => {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, { enumerable: true, get() { return m[k]; } });
}) : ((o, m, k, k2) => {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
}));

const __exportStar = (this && this.__exportStar) || ((m, exports) => {
  for (const p in m) if (p !== 'default' && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
});

__exportStar(require('./icon-base'), exports);
__exportStar(require('./icon-context'), exports);
