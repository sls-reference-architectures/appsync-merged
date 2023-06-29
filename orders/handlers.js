// import Logger from '@dazn/lambda-powertools-logger';
import { Logger } from '@aws-lambda-powertools/logger';

const logger = new Logger({ serviceName: 'orders' });

export const listOrders = async (event) => {
  logger.debug('In listOrders Lambda', { event });

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
  logger.debug('In getOrder Lambda', { event });

  // TODO: flesh out service call
  return {
    id: 'xyz',
    userId: 'abc',
    product: 'placeholder',
    quantity: 42,
  };
};

export const createOrder = async (event) => {
  logger.debug('In createOrder Lambda', { event });

  // TODO: flesh out service call
  return {
    id: 'xyz',
    userId: 'abc',
    product: 'placeholder',
    quantity: 42,
  };
};
