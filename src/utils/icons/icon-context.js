import { createContext } from 'react';

export const DefaultContext = {
  color: undefined,
  size: undefined,
  className: undefined,
  style: undefined,
  attr: undefined,
};
export const IconContext = createContext && createContext(DefaultContext);
