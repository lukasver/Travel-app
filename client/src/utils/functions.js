import humanizeDuration from 'humanize-duration';
import { DateTime } from 'luxon';

export function getLocalFormattedDate(date) {
  if (!date) return;
  return DateTime.fromFormat(date, 'yyyy-MM-dd').toLocaleString();
}

export const getHumanizedDuration = ({isoDate, largest, units, lang = 'es'}) => {
  const options = {
    delimiter: ', ',
    largest: largest || 1,
    round: true,
    conjunction: lang === 'es' ? ' y ' : ' and ',
    serialComma: false,
    units: units || ['mo', 'd', 'h'],
    language: lang,
    fallbacks: ['es', 'en'],
  };

  if (isoDate instanceof Date || typeof isoDate === 'string') {
    return humanizeDuration(
      DateTime.fromJSDate(new Date(isoDate)).diffNow().toMillis(),
      options
    );
  } else {
    return humanizeDuration(
      DateTime.fromISO(isoDate).diffNow().toMillis(),
      options
    );
  }
};

export function getCityFromAirportCode(arptCode) {
  if (!arptCode || typeof arptCode !== 'string' || arptCode.length > 3) return;
  arptCode = arptCode.toUpperCase();
  const mapping = {
    AEP: 'Aeroparque - Buenos Aires',
    EPA: 'El Palomar - Buenos Aires',
    BHI: 'Bahía Blanca - Buenos Aires',
    MSQ: 'Mar del Plata - Buenos Aires',
    COR: 'Córdoba',
    ROS: 'Rosario - Santa Fe',
    BRC: 'Bariloche - Río Negro',
    VDM: 'Viedma - Río Negro',
    CTC: 'Catamarca',
    RES: 'Resistencia - Chaco',
    CRD: 'Comodoro Rivadavia - Chubut',
    REL: 'Trelew - Chubut',
    PMY: 'Puerto Madryn - Chubut',
    CNQ: 'Corrientes',
    PRA: 'Paraná - Entre Ríos',
    FMA: 'Formosa',
    JUJ: 'Jujuy',
    RSA: 'La Pampa',
    IRJ: 'La Rioja',
    MDZ: 'Mendoza',
    AFA: 'Mendoza',
    IGR: 'Iguazú - Misiones',
    PSS: 'Posadas - Misiones',
    NQN: 'Neuquén',
    CPC: 'Chapelco - Neuquén',
    SLA: 'Salta',
    UAQ: 'San Juan',
    LUQ: 'San Luis',
    SFN: 'Santa Fe',
    FTE: 'El Calafate - Santa Cruz',
    RGL: 'Río Gallegos - Santa Cruz',
    SDE: 'Santiago Del Estero',
    RGA: 'Río Grande - Tierra del Fuego',
    USH: 'Ushuaia  - Tierra del Fuego',
    TUC: 'Tucumán',
    EZE: 'Buenos Aires - Argentina',
    GRU: 'Sao Paulo - Brazil',
    LIM: 'Lima - Perú',
    BOG: 'Bogotá - Colombia',
    SCL: 'Santiago - Chile',
  };
  return mapping[arptCode] || null;
}

export const getRandomImage = (str) => `https://source.unsplash.com/1600x900/${str ? '?' + str : ''}`;
