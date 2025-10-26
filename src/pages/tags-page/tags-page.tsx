import React from 'react';

import TagsLayout from '../../layouts/tags-layout';
import Content from '../../components/content';
import withUser from '../../hocs/with-user';

function TagsPage() {
  return (<Content children={(<TagsLayout />)} />);
}

export default withUser(TagsPage, true);
