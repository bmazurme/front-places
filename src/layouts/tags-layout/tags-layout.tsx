import React from 'react';

import Board from '../../components/board';
import Tags from '../../components/tags';
import { Preloader } from '../../components';

import { useGetTagsQuery } from '../../store';

export default function TagsLayout() {
  const { data: tags, isLoading } = useGetTagsQuery();

  return (
    <Board
      children={isLoading ? <Preloader /> : <Tags tags={tags} />}
    />
  );
}
