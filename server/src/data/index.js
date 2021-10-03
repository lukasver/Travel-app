import { DataSource } from 'apollo-datasource';
import dataset from '../../../dataset.json';
import { matchSorter } from 'match-sorter';

import { intlStations } from '../utils/stations';
import { filterArray } from '../utils/functions';

class FlightsDataset extends DataSource {
  constructor() {
    super();
    this.dataset = [];
  }

  async initialize(config) {
    this.context = config.context;
    this.dataset = this.excludeInvalidFlights(dataset);
    this.options = intlStations;
  }

  getAllOptions() {
    return this.dataset;
  }

  getAllBudgetOptions(
    budget,
    originCountry,
    originAirport,
    passengers,
    destinationAirport,
    returnDate
  ) {
    try {
      const filters = {
        price: (price) => price < budget,
      };

      // If request is a "State" look for arpt options departing from that state
      // else if request has origin & destination arpt codes, only look for options departing from that arpt code
      if (originCountry) {
        const stationsArray = this.options.find(
          (country) => country.name === originCountry
        ).airports[0].stations;
        filters.origin = (origin) => stationsArray.includes(origin);
      } else if (originAirport && destinationAirport) {
        filters.origin = (origin) => origin === originAirport;
        filters.destination = (destination) =>
          destination === destinationAirport;
        filters.availability = (availableSeats) => availableSeats >= passengers;
      }

      const orderArray = ['price', 'origin'];

      // Only lookup flights ahead of requested date
      if (returnDate) {
        filters.date = (flightDate) =>
          new Date(flightDate.replace(/-/g, '/')) >
          new Date(returnDate.replace(/-/g, '/'));
        orderArray.unshift('date');
      }

      let options = matchSorter(filterArray(this.dataset, filters), '', {
        keys: orderArray,
      });

      // If no options were found with specific origin requested, response will be ALL available flights
      if (!options.length) {
        delete filters.origin;
        options = matchSorter(filterArray(this.dataset, filters), '', {
          keys: ['price'],
        });
      }

      const destinations = this.formatOptionsResponse(options);
      if (originAirport) {
        return {
          success: true,
          count: options.length,
          destinations,
          options,
        };
      } else {
        return {
          success: true,
          matchOrigin: originCountry && filters.origin ? true : false,
          count: options.length,
          destinations,
          options,
        };
      }
    } catch (error) {
      return {
        success: false,
        count: 0,
        message: 'Error fetching data',
      };
    }
  }

  updateAvailability(input) {
    const { passengers,
      origin_date,
      origin_origin,
      origin_destination,
      return_date,
      return_origin,
      return_destination,
    } = input;

    try {
      const indexOfOriginatingFlight = this.dataset.findIndex((flight) =>
        flight.date === origin_date && flight.origin === origin_origin && flight.destination && origin_destination)
      if (indexOfOriginatingFlight < 0) throw { message: 'Originating flight not found' }
      if ((this.dataset[indexOfOriginatingFlight].availability - passengers) < 0) throw { message: 'Availability cannot be setted below 0' }
      this.dataset[indexOfOriginatingFlight].availability = this.dataset[indexOfOriginatingFlight].availability - passengers;

      if (return_date && return_origin && return_destination) {
        const indexOfReturnFlight = this.dataset.findIndex((flight) =>
          flight.date === return_date && flight.origin === return_origin && flight.destination && return_destination)
        if (indexOfOriginatingFlight < 0) throw { message: 'Return flight not found' }
        if ((this.dataset[indexOfReturnFlight].availability - passengers) < 0) throw { message: 'Availability cannot be setted below 0' }
        this.dataset[indexOfReturnFlight].availability = this.dataset[indexOfReturnFlight].availability - passengers;
      }

      return {
        success: true,
        message: 'Flights avaialability updated successfully'
      }
    } catch (error) {
      return {
        success: false,
        message: error?.message || error
      }
    }
  }

  formatOptionsResponse(options) {
    return [
      ...new Set(
        options.map((opt) => {
          let dest = {};
          intlStations.forEach((country) => {
            if (country.airports[0].stations.includes(opt.destination)) {
              dest.name = country.airports[0].name;
            }
            dest.destination = opt.destination;
          });
          return JSON.stringify(dest);
        })
      ),
    ].map((elem) => JSON.parse(elem));
  }

  excludeInvalidFlights(dataset) {
    //TODO: remove options with 0 availability // in future with below requested by user
    return dataset.filter(
      (option) => new Date(option.date.replace(/-/g, '/')) > new Date()
    );
  }
}

export default FlightsDataset;
