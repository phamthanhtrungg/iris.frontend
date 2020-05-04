import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './styles.module.scss';

export default function () {
  return (
    <div className={styles.header}>
      <FontAwesomeIcon icon={faSearch} size='6x' color='white' />
      <h1 style={{ color: 'white' }}> Simple Search Engine</h1>
    </div>
  );
}
