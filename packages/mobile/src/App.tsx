import { Suspense, useRef } from 'react';
import {
  IonApp,
  IonRouterOutlet,
  IonSpinner,
  IonSplitPane,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

import Menu from './common/components/Menu';
import MainPage from './pages/MainPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
// import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

import { SettingsPage } from './settings/SettingsPage';
import { NetworkConstants, Toaster } from './common';
import { useFetchCalendarsQuery } from './store/services/calendarsApi';
import { PreferredCalendarsSelectionPage } from './settings/PreferredCalendarsSelectionPage';
import { useLanguageHandler } from '@fusul/common';
import { selectPreferences, useAppSelector } from './store';

setupIonicReact();

const App: React.FC = () => {
  const menuRef = useRef<HTMLIonMenuElement>(null);
  const { language } = useAppSelector(selectPreferences);
  useLanguageHandler(language);
  useFetchCalendarsQuery(false, { ...NetworkConstants });

  const baseElement = document.querySelector('base');
  const basename = baseElement?.getAttribute('href') ?? '/';

  return (
    <Suspense
      fallback={<IonSpinner style={{ display: 'block', margin: '0 auto' }} />}>
      <IonApp>
        <Toaster />
        <IonReactRouter basename={basename}>
          <IonSplitPane contentId="main">
            <Menu ref={menuRef} onDismiss={() => menuRef.current?.close()} />
            <IonRouterOutlet id="main">
              <Route path="/" exact>
                <Redirect to="/main" />
              </Route>
              <Route path="/main" exact>
                <MainPage />
              </Route>
              <Route path="/settings" exact>
                <SettingsPage />
              </Route>
              <Route path="/preferred-calendars-selection" exact>
                <PreferredCalendarsSelectionPage />
              </Route>
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    </Suspense>
  );
};

export default App;
