import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import  configureStore from './store/configureStore';
import './index.css';
import Routes from './Routes';

export const store = configureStore();


const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <LocaleProvider locale={zh_CN}>
          <Component />
        </LocaleProvider>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
}
render(Routes);

if (module.hot) {
  module.hot.accept('./Routes', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./Routes').default;
    render(NextApp);
  });
}
