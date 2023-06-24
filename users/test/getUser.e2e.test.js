import axios from 'axios';
import retry from 'async-retry';

import { GetUserQuery } from '../../common/testHelpers';

const BaseUri = process.env.USERS_API_URL ?? '';

describe('When getting User', () => {
  it('should User', async () => {
    // ARRANGE
    const requestOptions = {
      headers: {
        'x-api-key': process.env.USERS_API_KEY ?? '',
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
          { query: GetUserQuery, variables: { input } },
          requestOptions,
        );

        // ASSERT
        expect(status).toEqual(200);
        expect(data.errors).toBeUndefined();
        expect(data.data.getUser.name).toEqual('John Galt');
      },
      { retries: 3 },
    );
  });
});
