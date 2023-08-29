import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import LoginForm from './components/LoginForm';
import LoginProvider from './utils/LoginContext';
import { Outlet } from 'react-router-dom';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('user_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [count, setCount] = useState(0)
  // get token, if null, empty string will be the token
  const token = localStorage.getItem('user_token') || '';
  // want to set the proper state from the beginning if we are initially logged in
  const loggedIn = token.length > 0;

  return (
    <ApolloProvider client={client}>
      <LoginProvider token={token}>
        <Outlet />
      </LoginProvider>
    </ApolloProvider>
  )
}

export default App
