import React from 'react';

import SigninLayout from '../../layouts/signin-layout';
import Content from '../../components/content';
import withUser from '../../hocs/with-user';

function SignInPage() {
  return (<Content children={<SigninLayout />} />);
}

export default withUser(SignInPage, false);
