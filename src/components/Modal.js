import React from 'react'
import FocusLock from 'react-focus-lock';
import { RemoveScroll } from 'react-remove-scroll';

import styles from './Modal.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Modal({ title, handleDismiss, children }) {
  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === 'Escape') {
        handleDismiss();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleDismiss]);

  return (
    <FocusLock returnFocus={true}>
      <RemoveScroll>
        <div className={styles.wrapper}>
          <div
            className={styles.backdrop}
            onClick={handleDismiss}
          />
          <div
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            <button
              className={styles.closeBtn}
              onClick={handleDismiss}
            >
              <FontAwesomeIcon icon={`fa-solid fa-x`} size='xl' fixedWidth={true} />
            </button>

            {title && <h2>{title}</h2>}

            {children}
          </div>
        </div>
      </RemoveScroll>
    </FocusLock>
  );
}

export default Modal;
