import React from 'react';

import CardLayout from '../../layouts/card-layout';
import Content from '../../components/content';
import withUser from '../../hocs/with-user';

function CardPage() {
  return (<Content children={(<CardLayout />)} />);
}

export default withUser(CardPage, true);
