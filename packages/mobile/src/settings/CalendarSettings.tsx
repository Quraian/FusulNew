import {
  IonItem,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonCardContent,
  IonList,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonCol,
  IonToggle,
  IonLabel,
} from '@ionic/react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import {
  CommonProps,
  CALENDARS_SELECTION,
  RemainingDaysOptionsSchema,
} from '../common';
import { ToggledOptions } from './ToggledOptions';
import { useCalendarOptions } from './useCalendarOptions';

export function CalendarSettings({
  onNavigation,
  ...rest
}: CommonProps & Partial<{ onNavigation: () => void }>) {
  const { t } = useTranslation();
  const history = useHistory();
  const {
    shouldDisableRemainingDays,
    descriptions,
    eventsCalendarSelection,
    remainingDays,
    onDescriptionToggle,
    onCalendarSelectionChange,
    onRemainingDaysToggle,
    onRemainingDaysChange,
  } = useCalendarOptions();

  return (
    <IonCard {...rest} className="ion-no-border" style={{ boxShadow: 'none' }}>
      <IonCardContent className="ion-no-padding">
        <IonList>
          <IonItem
            button
            onClick={() => {
              onNavigation?.();
              history.push('preferred-calendars-selection');
            }}
            detail>
            <IonLabel>
              <h2>{t('PreferredCalendars')}</h2>
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonToggle
              onIonChange={(e) => {
                onDescriptionToggle(e.detail.checked);
              }}
              checked={descriptions !== 'none'}>
              {t('Descriptions')}
            </IonToggle>
          </IonItem>
          <IonItem>
            <IonSelect
              interface="popover"
              value={eventsCalendarSelection}
              label={t('Calendar') || ''}
              aria-label={t('Calendar') || ''}
              onIonChange={(e) => {
                onCalendarSelectionChange(e.detail.value);
              }}>
              {CALENDARS_SELECTION.map((selection) => (
                <IonSelectOption key={selection} value={selection}>
                  {t(selection)}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem>
            <ToggledOptions
              title={t('RemainingDays')}
              checked={remainingDays !== 'none'}
              onToggled={(checked) => {
                onRemainingDaysToggle(checked);
              }}>
              <IonRadioGroup
                value={remainingDays}
                style={{ width: '100%' }}
                onIonChange={(e) => {
                  onRemainingDaysChange(e.detail.value);
                }}>
                <IonRow className="ion-justify-content-between">
                  <IonCol size="auto">
                    <IonRadio
                      value={RemainingDaysOptionsSchema.Values.extended}
                      disabled={shouldDisableRemainingDays}>
                      {t('Extended')}
                    </IonRadio>
                  </IonCol>
                  <IonCol size="auto">
                    <IonRadio
                      value={RemainingDaysOptionsSchema.Values.short}
                      disabled={shouldDisableRemainingDays}>
                      {t('ShortDaysOnly')}
                    </IonRadio>
                  </IonCol>
                </IonRow>
              </IonRadioGroup>
            </ToggledOptions>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
}
