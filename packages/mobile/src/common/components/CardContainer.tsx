import { IonCard, IonCardContent, IonCardHeader, IonText } from '@ionic/react';

import { CommonProps } from '../types';

export const CardContainer = ({
  children,
  style,
  errorMessage,
  mode,
  ...rest
}: CommonProps & { errorMessage?: string } & Partial<{
    mode: 'ios' | 'md';
  }>) => {
  if (errorMessage) {
    return (
      <IonCardHeader {...rest} style={{ ...style }} className="ion-text-center">
        <IonText color="danger">
          <h3>{errorMessage}</h3>
        </IonText>
      </IonCardHeader>
    );
  }

  return (
    <IonCard
      {...rest}
      mode={mode}
      color="light"
      style={{
        ...style,
        boxShadow: 'rgb(0 0 0 / 15%) 1px 1px 4px',
        background: '#fff',
      }}>
      <IonCardContent className="ion-no-padding" style={{ height: '100%' }}>
        {children}
      </IonCardContent>
    </IonCard>
  );
};
