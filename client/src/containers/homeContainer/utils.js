export const validateSubmit = (values, initialValues) => {
  if (typeof values !== 'object') return true;
  const propertyArray = [];
  for (let property in values) {
    propertyArray.push(property);
  }
  let result = true;
  for (let i = 0; i < propertyArray.length; i++) {
    if (values[propertyArray[i]] !== initialValues[propertyArray[i]]) {
      if (
        typeof values[propertyArray[i]] === 'number' &&
        values[propertyArray[i]] < 0
      ) {
        result = true;
        break;
      }
      result = false;
    } else {
      result = true;
      break;
    }
  }
  return result;
};

export const isBookingCompleted = (booking) => {
  if (!booking) return false;
  if (booking.oneWayTrip && booking.originatingFlight) return true;
  if (
    !booking.oneWayTrip &&
    booking.originatingFlight &&
    booking.returnFlight &&
    booking.passengers
  )
    return true;
  return false;
};
