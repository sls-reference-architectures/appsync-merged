import { AppSyncClient, GetIntrospectionSchemaCommand } from '@aws-sdk/client-appsync';
import { diff } from '@graphql-inspector/core';
import { buildSchema } from 'graphql';
import Logger from '@dazn/lambda-powertools-logger';
import fs from 'fs/promises';
import path from 'path';

describe('GraphQL schema changes', () => {
  it('should not break existing contract', async () => {
    // ARRANGE
    const existingSchema = await getExistingSchema();
    const newSchema = await getNewSchema();

    // ACT
    const changes = await diff(existingSchema, newSchema);
    Logger.debug('changes', { changes });

    // ASSERT
    expect(hasBreakingChanges(changes)).toBeFalse();
  });
});

const getExistingSchema = async () => {
  const appSyncClient = new AppSyncClient({ region: process.env.AWS_REGION });
  const input = {
    apiId: process.env.USERS_API_ID,
    format: 'SDL',
    includeDirectives: true,
  };
  const { schema } = await appSyncClient.send(new GetIntrospectionSchemaCommand(input));
  const schemaAsText = Buffer.from(schema).toString('utf-8');

  return buildSchema(schemaAsText);
};

const getNewSchema = async () => {
  const fileName = 'schema.api.graphql';
  const filePath = path.join(__dirname, '../', fileName);
  const schemaAsText = await fs.readFile(filePath, { encoding: 'utf-8' });

  return buildSchema(schemaAsText);
};

const hasBreakingChanges = (changes) => {
  let result = false;
  changes.forEach((change) => {
    result = result || change.criticality.level === 'BREAKING';
  });

  Logger.debug('Result', { result });

  return result;
};
