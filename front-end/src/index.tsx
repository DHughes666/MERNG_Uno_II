import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client'
import {Provider} from 'react-redux'
import {store} from "./store/index"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const client = new ApolloClient({
  uri:"http://localhost:5000/graphql", 
  cache: new InMemoryCache(),
});
root.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </ApolloProvider>
  </Provider>
);


