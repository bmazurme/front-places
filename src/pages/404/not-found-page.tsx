import React from 'react';

import NotFoundLayout from '../../layouts/not-found-layout';
import Content from '../../components/content';
import withUser from '../../hocs/with-user';

function NotFoundPage() {
  return (<Content children={(<NotFoundLayout />)} />);
}

export default withUser(NotFoundPage, false);
