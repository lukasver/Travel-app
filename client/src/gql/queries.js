import { gql } from '@apollo/client';

export const BUDGET_QUERY = gql`
  query Query($budgetOptionsBudget: Int!, $budgetOptionsOrigin: String) {
    budget_options(budget: $budgetOptionsBudget, origin: $budgetOptionsOrigin) {
      count
      matchOrigin
      success
      message
      destinations {
        destination
        name
      }
      options {
        date
        origin
        destination
        price
        availability
      }
    }
  }
`;

export const RETURN_FLIGHTS_QUERY = gql`
  query Query(
    $returnFlightsOptionsBudget: Int!
    $returnFlightsOptionsOrigin: Stations!
    $returnFlightsOptionsDate: String!
    $returnFlightsOptionsDestination: Stations!
    $returnFlightsOptionsPassengers: Int!
  ) {
    return_flights_options(
      budget: $returnFlightsOptionsBudget
      origin: $returnFlightsOptionsOrigin
      date: $returnFlightsOptionsDate
      destination: $returnFlightsOptionsDestination
      passengers: $returnFlightsOptionsPassengers
    ) {
      success
      message
      destinations {
        destination
        name
      }
      count
      options {
        date
        origin
        destination
        price
        availability
      }
    }
  }
`;
