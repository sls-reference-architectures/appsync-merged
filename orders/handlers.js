import Logger from '@dazn/lambda-powertools-logger';

export const listOrders = async (event) => {
  Logger.debug('In listOrders Lambda', { event });

  // TODO: flesh out service call
  return [
    {
      id: 'xyz',
      userId: 'abc',
      product: 'placeholder',
      quantity: 42,
    },
  ];
};

export const getOrder = async (event) => {
  Logger.debug('In getOrder Lambda', { event });

  // TODO: flesh out service call
  return {
    id: 'xyz',
    userId: 'abc',
    product: 'placeholder',
    quantity: 42,
  };
};

export const createOrder = async (event) => {
  Logger.debug('In createOrder Lambda', { event });

  // TODO: flesh out service call
  return {
    id: 'xyz',
    userId: 'abc',
    product: 'placeholder',
    quantity: 42,
  };
};
