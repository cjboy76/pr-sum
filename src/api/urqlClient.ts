import { Client, cacheExchange, fetchExchange } from 'urql';

export const urqlClient = new Client({
  url: 'https://api.github.com/graphql',
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: () => {
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' },
    };
  },
});