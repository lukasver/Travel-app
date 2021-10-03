import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    options: [Option]
    budget_options(budget: Int!, origin: String): BudgetResponse
    return_flights_options(
      budget: Int!
      origin: Stations!
      destination: Stations!
      date: String!
      passengers: Int!
    ): ReturnFlightResponse
    fetch_bookings(limit: Int): [Booking]
  }

  type Mutation {
    post_booking(input: BookingInput!): NewBookingResponse
    update_flights_availability(input: AvailabilityInput!): Response
  }

  type Response {
    success: Boolean!
    message: String
  }

  input AvailabilityInput {
    passengers: Int!
    origin_date: String!
    origin_origin: Stations!
    origin_destination: Stations!
    return_date: String
    return_origin: Stations
    return_destination: Stations
  }

  type Booking {
    origin_date: String!
    origin_origin: Stations!
    origin_destination: Stations!
    return_date: String
    return_origin: Stations
    return_destination: Stations
    one_way: Boolean
    price: Float!
    passengers: Int!
    client: String!
  }

  input BookingInput {
    origin_date: String!
    origin_origin: Stations!
    origin_destination: Stations!
    return_date: String
    return_origin: Stations
    return_destination: Stations
    price: Float!
    passengers: Int!
    one_way: Boolean!
    client: String!
  }

  type NewBookingResponse {
    success: Boolean!
    message: String
    data: BookingResponse
  }

  type BookingResponse {
    id: Int!
    origin_date: String
    one_way: Boolean
    client_id: Int!
    client_email: String
    origin: Stations
    destination: Stations
    passengers: Int
    price: Float
    destination_date: String
  }

  type Option {
    date: String
    origin: Stations
    destination: Stations
    price: Float
    availability: Int
  }

  type Destination {
    destination: Stations
    name: String
  }

  type BudgetResponse {
    success: Boolean!
    count: Int!
    matchOrigin: Boolean
    destinations: [Destination]
    options: [Option]
    message: String
  }

  type ReturnFlightResponse {
    success: Boolean!
    count: Int!
    destinations: [Destination]
    options: [Option]
    message: String
  }

  enum Stations {
    EZE
    LIM
    SCL
    GRU
  }
`;

export default typeDefs;
