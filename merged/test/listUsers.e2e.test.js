import axios from 'axios';
import retry from 'async-retry';

import { ListUsersQuery } from '../../common/testHelpers';

const BaseUri = process.env.MERGED_API_URL ?? '';

describe('When listing Users', () => {
  it('should return array of Users', async () => {
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
          { query: ListUsersQuery, variables: { input } },
          requestOptions,
        );

        // ASSERT
        expect(status).toEqual(200);
        expect(data.errors).toBeUndefined();
        expect(data.data.listUsers[0].name).toEqual('John Galt');
      },
      { retries: 3 },
    );
  });
});
