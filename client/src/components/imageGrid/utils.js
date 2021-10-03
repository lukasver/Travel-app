import { getRandomImage } from '../../utils/functions';
import Argentina from '../../images/buenosaires.jpg';
import Brazil from '../../images/saopaulo.jpg';
import Chile from '../../images/santiago.jpg';
import Peru from '../../images/lima.webp';
import Colombia from '../../images/bogota.jpg';

export const getDestImage = (destination) => {
  switch (destination.destination) {
    case 'EZE':
      return Argentina;
    case 'GRU':
      return Brazil;
    case 'BOG':
      return Colombia;
    case 'SCL':
      return Chile;
    case 'LIM':
      return Peru;
    default:
      return getRandomImage();
  }
};

export const getSelectedDestinations = (destination, options) => {
  if (!destination || !options) return null;
  return options.filter((option) => option.destination === destination);
};
