import { useEffect, useState } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonCheckbox,
  IonPage,
  IonLabel,
} from '@ionic/react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import { useCalendarOptions } from './useCalendarOptions';
import { CalendarGroup, groupBy, isEqual, uniq } from '@fusul/common';

export function PreferredCalendarsSelectionPage() {
  const { t } = useTranslation();
  const {
    calendars,
    preferredCalendars: preferred,
    onPreferredCalendarChange,
  } = useCalendarOptions();
  const [updatedPreferred, setUpdatedPreferred] = useState(preferred || []);
  const [confirmEnabled, setConfirmEnabled] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const enabled = !isEqual(
      [...(preferred || [])].sort(),
      [...updatedPreferred].sort()
    );

    setConfirmEnabled(enabled);
  }, [preferred, updatedPreferred]);

  function goBack() {
    if (history.length > 2) {
      history.goBack();
    } else {
      history.push('/');
    }
  }

  function onSubmit() {
    onPreferredCalendarChange(updatedPreferred);
    goBack();
  }

  function onHeaderClicked(group: CalendarGroup) {
    const calendarsOfGroup = calendars
      .filter((c) => c.group === group)
      .map(({ id }) => id);
    const areAllCalendarsOfGroupInPreferred = calendarsOfGroup.every((id) =>
      updatedPreferred.includes(id)
    );

    if (areAllCalendarsOfGroupInPreferred) {
      setUpdatedPreferred((current) => [
        ...current.filter((id) => !calendarsOfGroup.includes(id)),
      ]);
    } else {
      setUpdatedPreferred((current) => uniq([...current, ...calendarsOfGroup]));
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => goBack()}>{t('Cancel')}</IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={() => onSubmit()} disabled={!confirmEnabled}>
              {t('Confirm')}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {Object.entries(groupBy(calendars, (c) => c.group)).map(
          ([group, calendarsByGroup]) => (
            <IonCard key={group}>
              <IonCardHeader
                style={{
                  backgroundColor: calendarsByGroup.find(
                    (c) => c.group === group
                  )?.color,
                }}
                onClick={() => onHeaderClicked(group)}>
                <IonCardTitle style={{ color: 'white' }}>
                  {t(group)}
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonList>
                  {calendarsByGroup.map(({ id, title, description }, index) => (
                    <IonItem
                      key={id}
                      lines={
                        index === calendarsByGroup.length - 1 ? 'none' : 'full'
                      }>
                      <IonCheckbox
                        checked={updatedPreferred?.includes(id)}
                        onIonChange={(e) => {
                          // eslint-disable-next-line sonarjs/no-nested-functions
                          setUpdatedPreferred((current) =>
                            e.target.checked
                              ? [...current, id]
                              : current.filter((c) => c !== id)
                          );
                        }}>
                        {title}
                        <IonLabel>
                          <p style={{ whiteSpace: 'normal' }}>{description}</p>
                        </IonLabel>
                      </IonCheckbox>
                    </IonItem>
                  ))}
                </IonList>
              </IonCardContent>
            </IonCard>
          )
        )}
      </IonContent>
    </IonPage>
  );
}
