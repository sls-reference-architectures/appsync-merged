import axios from 'axios';
import retry from 'async-retry';

import { ListMergedOrdersQuery } from '../../common/testHelpers';

const BaseUri = process.env.MERGED_API_URL ?? '';

describe('When listing Orders', () => {
  it('should return array of Orders', async () => {
    // ARRANGE
    const requestOptions = {
      headers: {
        'x-api-key': process.env.MERGED_API_KEY ?? '',
        'Content-Type': 'application/json',
      },
      validateStatus: () => true,
    };
    const input = {};

    await retry(
      async () => {
        // ACT
        const { data, status } = await axios.post(
          BaseUri,
          { query: ListMergedOrdersQuery, variables: { input } },
          requestOptions,
        );

        // ASSERT
        expect(status).toEqual(200);
        expect(data.errors).toBeUndefined();
        expect(data.data.listOrders[0].quantity).toEqual(42);
        expect(data.data.listOrders[0].user.name).toInclude('John');
      },
      { retries: 3 },
    );
  });
});
