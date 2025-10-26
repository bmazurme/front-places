import React from 'react';

import OauthLayout from '../../layouts/oauth-layout';
import Content from '../../components/content';

import withUser from '../../hocs/with-user';

function OauthPage() {
  return (<Content children={<OauthLayout />} />);
}

export default withUser(OauthPage, false);
