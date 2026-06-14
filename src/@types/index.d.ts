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
  count: number;
};

type Like = {
  id: number;
  user: User | null;
};

type Card = {
  id: number;
  name: string;
  link: string;
  userId: number;
  count: number;
  isLiked: boolean | null;
  username: string;
  avatar: string;
  createdAt: string;
  tags: string[];
};

type Tag = {
  id: number;
  name: string;
  count: number;
};

type AvatarProps = {
  popup: { avatar: boolean; place: boolean; };
  setPopup: (p: { avatar: boolean; place: boolean; }) => void;
  info: User | null;
  currentUser: User | null;
};

type GetCardsByTagPropsType = { tagName: string; pageId: number; };
type GetCardsByUserPropsType = { userId: number; pageId: number; };
