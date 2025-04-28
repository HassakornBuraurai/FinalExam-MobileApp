import { createContext } from 'react';

const BookingContext = createContext({
  bookingInfo: null,
  setBookingInfo: () => {},
});

export default BookingContext;
