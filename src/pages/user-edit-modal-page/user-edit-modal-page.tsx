import React from 'react';

import UserEditModalLayout from '../../layouts/user-edit-modal-layout';
import withUser from '../../hocs/with-user';

function UserEditModalPage() {
  return (<UserEditModalLayout />);
}

export default withUser(UserEditModalPage, true);
