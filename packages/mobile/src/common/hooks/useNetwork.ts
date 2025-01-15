import { useEffect, useRef, useState } from 'react';
import { ConnectionStatus, Network } from '@capacitor/network';
import { useTranslation } from 'react-i18next';

export function useNetwork() {
  const [status, setStatus] = useState<ConnectionStatus | undefined>();
  const prevStatusRef = useRef<ConnectionStatus | undefined>();
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const { t } = useTranslation();

  useEffect(() => {
    Network.addListener('networkStatusChange', (status) => {
      setStatus(status);
    });
  }, []);

  useEffect(() => {
    setShowMessage(prevStatusRef.current?.connected !== status?.connected);
    prevStatusRef.current = status;
  }, [status]);

  if (showMessage) {
    return {
      message: status?.connected
        ? t('NetworkOnlineUsingFreshData')
        : t('NetworkOfflineCachedData'),
    };
  }

  return { message: undefined };
}
