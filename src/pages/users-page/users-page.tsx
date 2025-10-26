import React from 'react';

import UsersLayout from '../../layouts/users-layout';
import Content from '../../components/content';
import withUser from '../../hocs/with-user';

function UsersPage() {
  return (<Content children={(<UsersLayout />)} />);
}

export default withUser(UsersPage, true);
