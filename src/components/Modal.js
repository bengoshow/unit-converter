import React from 'react'
import styles from './Modal.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Modal({ isVisible, onCloseButtonClick, children }) {
  if (!isVisible) {
    return null;
  }
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.closeButton}>
          <button onClick={onCloseButtonClick}>
            <FontAwesomeIcon icon={`fa-solid fa-circle-xmark`} size='2x' />
          </button>
        </div>
        {children}
      </div>
    </div>);
}
