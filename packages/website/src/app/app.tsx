import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '@mantine/core/styles.css';

import { useLanguageHandler } from '@fusul/common';

import FusulAppShell from './FusulAppShell';
import { HomePage, PrivacyPage } from './pages';

export function App() {
  useLanguageHandler('en');

  return (
    <Router>
      <FusulAppShell>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/privacy">
            <PrivacyPage />
          </Route>
        </Switch>
      </FusulAppShell>
    </Router>
  );
}

export default App;
