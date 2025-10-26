import React from 'react';

import TagLayout from '../../layouts/tag-layout';
import Content from '../../components/content';
import withUser from '../../hocs/with-user';

function TagPage() {
  return (<Content children={(<TagLayout />)} />);
}

export default withUser(TagPage, true);
