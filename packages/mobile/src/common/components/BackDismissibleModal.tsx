import React, { useEffect, forwardRef } from 'react';
import { IonModal } from '@ionic/react';

interface ModalProps extends React.ComponentProps<typeof IonModal> {
  onDismiss: () => void;
}

export const BackDismissibleModal = forwardRef<HTMLIonModalElement, ModalProps>(
  ({ isOpen, onDismiss, children, ...rest }, ref) => {
    useEffect(() => {
      const handleBackButton = (e: Event) => {
        e.preventDefault();
        onDismiss();
      };

      document.addEventListener('ionBackButton', handleBackButton);

      return () => {
        document.removeEventListener('ionBackButton', handleBackButton);
      };
    }, [onDismiss]);

    return (
      <IonModal ref={ref} isOpen={isOpen} onDidDismiss={onDismiss} {...rest}>
        {children}
      </IonModal>
    );
  }
);
