import React from 'react';
import { Route } from 'react-router-dom';
import { BasicSample, HooksSample, TodoSample, NewsSample } from 'pages';
import { Header } from 'components/common';

function App() {
  return (
    <div>
      <Header />

      <Route path="/" component={BasicSample} exact />
      <Route path="/hooks" component={HooksSample} />
      <Route path="/todos" component={TodoSample} />
      <Route path="/news" component={NewsSample} />
    </div>
  );
}

export default App;
