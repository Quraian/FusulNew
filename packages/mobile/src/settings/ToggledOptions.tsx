import { IonGrid, IonRow, IonToggle } from '@ionic/react';
import { CommonProps } from '../common';

type ToggledOptionsProps = {
  checked: boolean;
  title: string;
  onToggled: (checked: boolean) => void;
} & CommonProps;

export function ToggledOptions({
  checked,
  title,
  onToggled,
  children,
}: ToggledOptionsProps) {
  return (
    <IonGrid className="ion-no-padding">
      <IonRow>
        <IonToggle
          onIonChange={(e) => {
            onToggled(e.detail.checked);
          }}
          checked={checked}>
          {title}
        </IonToggle>
        {children}
      </IonRow>
    </IonGrid>
  );
}
