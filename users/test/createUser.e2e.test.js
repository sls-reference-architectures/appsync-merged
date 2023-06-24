import axios from 'axios';
import retry from 'async-retry';

import { CreateUserQuery } from '../../common/testHelpers';

const BaseUri = process.env.USERS_API_URL ?? '';

describe('When creating User', () => {
  it('should succeed and return User', async () => {
    // ARRANGE
    const requestOptions = {
      headers: {
        'x-api-key': process.env.USERS_API_KEY ?? '',
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
          { query: CreateUserQuery, variables: { input } },
          requestOptions,
        );

        // ASSERT
        expect(status).toEqual(200);
        expect(data.errors).toBeUndefined();
        expect(data.data.createUser.name).toEqual('John Galt');
      },
      { retries: 3 },
    );
  });
});
