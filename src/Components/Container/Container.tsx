import React from 'react'
import styles from './Container.module.css';

export const Container: React.FC=({ children})=><div className={styles.container}>{children}</div>;
export default Container