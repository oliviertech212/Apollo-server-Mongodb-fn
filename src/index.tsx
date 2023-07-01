import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './components/App';

import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';

// connect apollocrient instance  to aour graphql server
const httpLink=createHttpLink({
  uri: 'http://localhost:5000'
})


const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  </React.StrictMode>
);


