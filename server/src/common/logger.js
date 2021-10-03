import pino from 'pino';

const l = pino({
  prettyPrint: { colorize: true },
});

export default l;
