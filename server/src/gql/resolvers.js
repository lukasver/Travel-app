const resolvers = {
  Query: {
    options: (_, __, { dataSources }) =>
      dataSources.FlightsDataset.getAllOptions(),
    budget_options: (_, { budget, origin }, { dataSources }) =>
      dataSources.FlightsDataset.getAllBudgetOptions(budget, origin),
    return_flights_options: (
      _,
      { budget, origin, passengers, destination, date },
      { dataSources }
    ) =>
      dataSources.FlightsDataset.getAllBudgetOptions(
        budget,
        null,
        origin,
        passengers,
        destination,
        date
      ),
    fetch_bookings: (_, __, { dataSources }) =>
      dataSources.Supabase.fetchBookings(),
  },
  Mutation: {
    update_flights_availability: (_, { input }, { dataSources }) =>
      dataSources.FlightsDataset.updateAvailability(input),
    post_booking: (_, { input }, { dataSources }) =>
      dataSources.Supabase.postBooking(input),
  },
};

export default resolvers;
