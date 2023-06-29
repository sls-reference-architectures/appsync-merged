// import Logger from '@dazn/lambda-powertools-logger';
import { Logger } from '@aws-lambda-powertools/logger';

const logger = new Logger({ serviceName: 'users' });

export const listUsers = async (event) => {
  logger.debug('In listUsers Lambda', { event });

  // TODO: flesh out service call
  return [
    {
      id: 'xyz',
      name: 'John Galt',
      address: 'Atlantis, CO',
    },
  ];
};

export const getUser = async (event) => {
  logger.debug('In getUser Lambda', { event });

  // TODO: flesh out service call
  return {
    id: 'xyz',
    name: 'John Galt',
    address: 'Atlantis, CO',
  };
};

export const createUser = async (event) => {
  logger.debug('In createUser Lambda', { event });

  // TODO: flesh out service call
  return {
    id: 'xyz',
    name: 'John Galt',
    address: 'Atlantis, CO',
  };
};
