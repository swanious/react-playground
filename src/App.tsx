import React from 'react';
import { Route } from 'react-router-dom';
import { BasicSample, HooksSample, TodoSample } from 'pages';
import { Header } from 'components/common';

function App() {
  return (
    <div>
      <Header />

      <Route path="/" component={BasicSample} exact />
      <Route path="/hooks" component={HooksSample} />
      <Route path="/todos" component={TodoSample} />
    </div>
  );
}

export default App;
