import Logger from '@dazn/lambda-powertools-logger';

export const listUsers = async (event) => {
  Logger.debug('In listUsers Lambda', { event });

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
  Logger.debug('In getUser Lambda', { event });

  // TODO: flesh out service call
  return {
    id: 'xyz',
    name: 'John Galt',
    address: 'Atlantis, CO',
  };
};

export const createUser = async (event) => {
  Logger.debug('In createUser Lambda', { event });

  // TODO: flesh out service call
  return {
    id: 'xyz',
    name: 'John Galt',
    address: 'Atlantis, CO',
  };
};
