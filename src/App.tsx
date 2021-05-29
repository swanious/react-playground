import React from 'react';
import { Route } from 'react-router-dom';
import { BasicSample, HooksSample } from 'pages';
import { Header } from 'components/common';

function App() {
  return (
    <div>
      <Header />

      <Route path="/" component={BasicSample} exact />
      <Route path="/hooks" component={HooksSample} />
    </div>
  );
}

export default App;
