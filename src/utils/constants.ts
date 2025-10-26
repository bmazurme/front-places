/* eslint-disable prefer-destructuring */
export const SHIFT = 30;
export const Urls = {
  BASE: '/',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  OAUTH: {
    INDEX: '/oauth',
    YANDEX: 'https://oauth.yandex.ru',
  },
  TAG: {
    INDEX: '/tag',
  },
  TAGS: {
    INDEX: '/tags',
    CURRENT: '/tag/:id',
  },
  USER: {
    INDEX: '/user',
  },
  USERS: {
    INDEX: '/users',
    CURRENT: '/user/:id',
    CURRENT_EDIT: '/user/:id/:edit',
  },
  CARDS: {
    CURRENT: '/card/:id',
  },
  CARD: {
    CURRENT: '/card',
  },
  KIT: {
    INDEX: '/kit',
  },
  404: '*',
  500: '/internal-server-error',
};
export const Regexp = {
  EMAIL: '[a-z0-9._%+-]+@[a-z0-9.-]+[\\.{0}][a-z]{2,3}$',
};
export const BASE_API_URL = process.env.API_HOST;
export const BASE_HOST_URL = process.env.HOST;
export const YA_ENDPOINT = process.env.YA_ENDPOINT;
