import axios from 'axios';
import retry from 'async-retry';

import { CreateOrderQuery } from '../../common/testHelpers';

const BaseUri = process.env.MERGED_API_URL ?? '';

describe('When creating Order', () => {
  it('should succeed and return Order', async () => {
    // ARRANGE
    const requestOptions = {
      headers: {
        'x-api-key': process.env.ORDERS_API_KEY ?? '',
        'Content-Type': 'application/json',
      },
      validateStatus: () => true,
    };
    const input = { userId: 'x' };

    await retry(
      async () => {
        // ACT
        const { data, status } = await axios.post(
          BaseUri,
          { query: CreateOrderQuery, variables: { input } },
          requestOptions,
        );

        // ASSERT
        expect(status).toEqual(200);
        expect(data.errors).toBeUndefined();
        expect(data.data.createOrder.quantity).toEqual(42);
      },
      { retries: 3 },
    );
  });
});
