import { DataSource } from 'apollo-datasource';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

class Supabase extends DataSource {
  constructor() {
    super();
  }

  async initialize(config) {
    this.context = config.context;
    this.db = createClient(supabaseUrl, supabaseKey);
  }

  async fetchBookings(limit) {
    const { data, error, status } = await this.db
      .from('bookings')
      .select(
        `*,
      clients(
        email
      )`
      )
      .limit(limit || null);

    if (error) throw { error, status };

    return data.map((booking) => ({
      origin: booking.origin,
      origin_date: booking.origin_date,
      destination: booking.destination,
      destination_date: booking.destination_date,
      one_way: booking.one_way,
      price: booking.price,
      passengers: booking.passengers,
      client: booking.clients?.email,
    }));
  }

  async postBooking(data) {
    const {
      data: foundClient,
      error: clientError,
      status: clientStatus,
    } = await this.db.from('clients').select('*').eq('email', data.client);
    if (clientError) throw { error: clientError, status: clientStatus };
    let client = foundClient[0];
    if (!client) {
      const { data: newClient } = await this.db
        .from('clients')
        .insert([{ email: data.client }]);
      client = newClient[0];
    }

    delete data.client;
    data.client_id = client.id;

    const { data: response, error, status } = await this.db
      .from('bookings')
      .insert([data]);
    if (error) throw { error, status };
    response[0].client_email = client.email;
    return {
      success: true,
      data: response[0],
    };
  }
}

export default Supabase;
