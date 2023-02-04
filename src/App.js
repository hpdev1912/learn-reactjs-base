import Header from 'components/Header';
import AlbumFeature from 'features/Album';
import CartFeature from 'features/Cart';
import ProductFeature from 'features/Product';
import TodoFeature from 'features/Todo';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <Header />

      <Switch>
        <Route path="/" component={ProductFeature} exact></Route>
        <Route path="/todos" component={TodoFeature}></Route>
        <Route path="/albums" component={AlbumFeature}></Route>
        <Route path="/products" component={ProductFeature}></Route>
        <Route path="/carts" component={CartFeature}></Route>

        {/* <Route component={NotFound}></Route> */}
      </Switch>
      {/* <TodoFeature /> */}
      {/* <AlbumFeature /> */}
    </div>
  );
}

export default App;
