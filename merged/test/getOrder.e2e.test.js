import axios from 'axios';
import retry from 'async-retry';

import { GetOrderQuery } from '../../common/testHelpers';

const BaseUri = process.env.MERGED_API_URL ?? '';

describe('When getting Order', () => {
  it('should return Order', async () => {
    // ARRANGE
    const requestOptions = {
      headers: {
        'x-api-key': process.env.MERGED_API_KEY ?? '',
        'Content-Type': 'application/json',
      },
      validateStatus: () => true,
    };
    const input = { id: 'xyz' };

    await retry(
      async () => {
        // ACT
        const { data, status } = await axios.post(
          BaseUri,
          { query: GetOrderQuery, variables: { input } },
          requestOptions,
        );

        // ASSERT
        expect(status).toEqual(200);
        expect(data.errors).toBeUndefined();
        expect(data.data.getOrder.quantity).toEqual(42);
      },
      { retries: 3 },
    );
  });
});
