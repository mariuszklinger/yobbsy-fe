import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './config/setUpAxios';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './index.scss';

window['__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__'] = true; // tslint:disable-line

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
