import { PropsWithChildren } from "react";
import { ConfigProvider, type ThemeConfig } from 'antd';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';


const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: '#2e2e2e',
    colorBgContainer: '#fafafa',
  },
}

const authLink = setContext((_, { headers }) => {
  const token = import.meta.env.VITE_GITHUB_TOKEN
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});


const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export function Providers({ children }: PropsWithChildren) {
  return (
    <ConfigProvider theme={themeConfig}>
      <ApolloProvider client={apolloClient}>
        {children}
      </ApolloProvider>
    </ConfigProvider>
  );
}