import React from 'react';

import UserLayout from '../../layouts/user-layout';
import Content from '../../components/content';
import withUser from '../../hocs/with-user';

function UserPage() {
  return (<Content children={(<UserLayout />)} />);
}

export default withUser(UserPage, true);
