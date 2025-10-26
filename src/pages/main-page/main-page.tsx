import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import MainLayout from '../../layouts/main-layout';
import Content from '../../components/content';

import withUser from '../../hocs/with-user';

const MainPage = memo(() => {
  const navigate = useNavigate();

  // Можно добавить логику для проверки авторизации
  // или другие действия при загрузке страницы
  React.useEffect(() => {
    // Пример: проверка, нужно ли перенаправить пользователя
    // if (someCondition) {
    //   navigate(ROUTES.LOGIN);
    // }
  }, [navigate]);

  return (
    <Content>
      <MainLayout />
    </Content>
  );
});

export default withUser(MainPage, false);
