import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import './satoshi.css';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider, initReactI18next, useTranslation } from "react-i18next";
import i18next from "i18next";
import amharicTransalation from './translations/am/translation.json';
import englishTranslation from './translations/en/translation.json';
import Loader from './Loader';


// import { store } from './app/store';
const queryClient = new QueryClient();
const resources = {
  en: {
    translation: englishTranslation
  },
  am: {
    translation: amharicTransalation
  }
}

i18next
  .use(initReactI18next)
  .init({
    // interpolation: { escapeValue: false },
    resources,
    lng: "en"
  });


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    {/* <Provider store={store}> */}
    <I18nextProvider i18n={i18next}>
      <Suspense fallback={<Loader />}>
        <Router>
          <App />
        </Router>
      </Suspense>


    </I18nextProvider>
  </QueryClientProvider>
);
