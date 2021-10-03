import { gql } from '@apollo/client';

export const POST_BOOKING = gql`
  mutation Mutation($postBookingInput: BookingInput!) {
    post_booking(input: $postBookingInput) {
      success
      message
      data {
        id
        origin_date
        one_way
        client_id
        client_email
        origin
        destination
        passengers
        price
        destination_date
      }
    }
  }
`;

export const UPDATE_AVAILABILITY = gql`
mutation Mutation($updateFlightsAvailabilityInput: AvailabilityInput!) {
  update_flights_availability(input: $updateFlightsAvailabilityInput) {
    success
    message
  }
}
`;
