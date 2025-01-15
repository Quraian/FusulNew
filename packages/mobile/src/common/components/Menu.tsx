import { forwardRef } from 'react';
import {
  IonContent,
  IonItem,
  IonLabel,
  IonMenu,
  IonMenuToggle,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';

import './Menu.css';
import { Language } from '@fusul/common';
import {
  useAppDispatch,
  useAppSelector,
  selectPreferences,
  setLanguage,
} from '../../store';
import { useTranslation } from 'react-i18next';

const Menu = forwardRef<HTMLIonMenuElement, { onDismiss: () => unknown }>(
  function Menu({ onDismiss, ...rest }: { onDismiss: () => unknown }, ref) {
    const { language } = useAppSelector(selectPreferences);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    return (
      <IonMenu
        {...rest}
        ref={ref}
        contentId="main-content"
        type="overlay"
        side="start">
        <IonContent>
          <IonMenuToggle>
            <IonItem routerLink="/settings">
              <IonLabel>{t('Settings')}</IonLabel>
            </IonItem>
            <IonItem>
              <IonSelect
                aria-label={t('Language')}
                value={language}
                okText={t('Ok')}
                cancelText={t('Cancel')}
                onClick={() => onDismiss()}
                onIonChange={(e) => {
                  dispatch(setLanguage(e.detail.value as Language));
                }}>
                <IonSelectOption value="ar">عربي</IonSelectOption>
                <IonSelectOption value="en">English</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonMenuToggle>
        </IonContent>
      </IonMenu>
    );
  }
);

export default Menu;
