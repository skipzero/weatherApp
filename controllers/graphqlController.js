const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const scema = buildSchema(
  type Query {
    weatherEntry(id: Int!): WeatherEntry
    weatherEntries: [WeatherEntry]
  }
)
