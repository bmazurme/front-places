import React from 'react';

import CardModalLayout from '../../layouts/card-modal-layout';
import withUser from '../../hocs/with-user';

function CardModalPage() {
  return (<CardModalLayout />);
}

export default withUser(CardModalPage, true);
