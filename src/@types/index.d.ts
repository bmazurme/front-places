declare module '*.css';
declare module 'interpolate-html-plugin';
declare module 'html-webpack-preconnect-plugin';

type Action<T> = {
  type: string;
  payload: T;
};

type Reducer<T> = (state: T, action: Action<T>) => T;

type User = {
  id: number;
  name: string;
  about: string;
  avatar: string;
  email: string;
};

type Like = {
  id: number;
  user: User | null;
};

type Card = {
  id: number;
  name: string;
  link: string;
  userid: number;
  count: number;
  isliked: boolean | null;
  username: string;
};

type Tag = {
  id: number;
  name: string;
};

type AvatarProps = {
  popup: { avatar: boolean; place: boolean; };
  setPopup: (p: { avatar: boolean; place: boolean; }) => void;
  info: User | null;
  currentUser: User | null;
};

type GetCardsByTagPropsType = { tagName: string; pageId: number; };
type GetCardsByUserPropsType = { userId: number; pageId: number; };
