import productApi from 'api/productApi';
import Header from 'components/Header';
import AlbumFeature from 'features/Album';
import CounterFeature from 'features/Counter';
import ProductFeature from 'features/Product';
import TodoFeature from 'features/Todo';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

function App() {
  useEffect(() => {
    const getProductData = async () => {
      const params = {
        _limit: 10,
      };
      const dataPost = await productApi.getAll(params);

      return dataPost;
    };

    getProductData();
  }, []);
  return (
    <div className="app">
      <Header />

      <Switch>
        <Route path="/" component={CounterFeature} exact></Route>
        <Route path="/todos" component={TodoFeature}></Route>
        <Route path="/albums" component={AlbumFeature}></Route>
        <Route path="/products" component={ProductFeature}></Route>

        {/* <Route component={NotFound}></Route> */}
      </Switch>
      {/* <TodoFeature /> */}
      {/* <AlbumFeature /> */}
    </div>
  );
}

export default App;
