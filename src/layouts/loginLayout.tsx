import React from 'react';
import styles from './index.scss';

const LoginLayout = (props:any) => {
  return(
    <div className={styles.background}>{props.children}</div>
  )
}

export default LoginLayout
