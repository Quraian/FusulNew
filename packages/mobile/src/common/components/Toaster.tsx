import { useEffect, useState } from 'react';
import { IonToast } from '@ionic/react';

import { useNetwork } from '../hooks';

export function Toaster() {
  const [isOpen, setIsOpen] = useState(false);
  const { message } = useNetwork();

  useEffect(() => {
    setIsOpen(!!message);
  }, [message]);

  return (
    <IonToast
      isOpen={isOpen}
      onDidDismiss={() => setIsOpen(false)}
      message={message}
      duration={3000}
    />
  );
}
