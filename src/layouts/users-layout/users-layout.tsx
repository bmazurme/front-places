import React from 'react';

import Board from '../../components/board';
import Users from '../../components/users';
import { Preloader } from '../../ui';

import { useGetUsersQuery } from '../../store';

export default function UsersLayout() {
  const { isLoading } = useGetUsersQuery();

  return (<Board title="Users" children={(isLoading ? <Preloader /> : <Users />)} />);
}
