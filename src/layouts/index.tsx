import React from 'react';
import LoginLayout from './loginLayout'
import MainLayout from '@/layouts/mainLayout'

const BasicLayout = (props:any) => {
  if(props.location.pathname === '/login')
    return(
      <LoginLayout>{props.children}</LoginLayout>
    )
  return (
    <MainLayout>
      {props.children}
    </MainLayout>
  );
};

export default BasicLayout;
