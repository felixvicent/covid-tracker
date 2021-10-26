import React from 'react';

import { AppContextProvider } from './contexts/AppContexts';

import MainPage from './modules/main';

function App() {
  return (
    <AppContextProvider>
      <MainPage />
    </AppContextProvider>
  );
}

export default App;
