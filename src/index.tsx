import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ToastContainer } from 'react-toastify';
import { fetchItems } from './store/items-slice/async-items';
import 'react-toastify/dist/ReactToastify.css';
import './styles.scss';

await store.dispatch(fetchItems());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
