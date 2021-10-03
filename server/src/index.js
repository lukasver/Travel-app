import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server';

import resolvers from './gql/resolvers';
import FlightsDataset from './data';
import Supabase from './data/supabase';
import typeDefs from './gql/schema';
import l from './common/logger';

dotenv.config();
const { PORT } = process.env;

const getDatasets = () => {
  if (process.env.SUPABASE_KEY || process.env.SUPABASE_URL) {
    return {
      FlightsDataset: new FlightsDataset(),
      Supabase: new Supabase(),
    };
  } else {
    return {
      FlightsDataset: new FlightsDataset(),
    };
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => getDatasets(),
});

server.listen(PORT || 4000).then(({ url }) => {
  l.info('Travel App!!');
  l.info(`Server running at ${url}`);
});
