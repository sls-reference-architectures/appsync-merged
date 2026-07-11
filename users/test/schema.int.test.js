import fs from 'fs/promises';
import path from 'path';
import { execFileSync } from 'child_process';
import { diff } from '@graphql-inspector/core';
import { buildSchema } from 'graphql';
import Logger from '@dazn/lambda-powertools-logger';

describe('GraphQL schema changes', () => {
  it('should not break existing contract', async () => {
    // ARRANGE
    const existingSchema = getPreviousCommittedSchema();
    const newSchema = await getNewSchema();

    // ACT
    const changes = existingSchema ? await diff(existingSchema, newSchema) : [];
    Logger.debug('changes', { changes });

    // ASSERT
    expect(hasBreakingChanges(changes)).toBeFalse();
  });
});

// Compares against the previous git-committed schema rather than a live AppSync
// API, since this project's CI tears down every stack at the end of each run —
// there is never a "previously deployed" API left to introspect against.
const getPreviousCommittedSchema = () => {
  try {
    const schemaAsText = execFileSync('git', ['show', 'HEAD~1:users/schema.api.graphql'], {
      encoding: 'utf-8',
    });

    return buildSchema(schemaAsText);
  } catch {
    return null;
  }
};

const getNewSchema = async () => {
  const fileName = 'schema.api.graphql';
  const filePath = path.join(__dirname, '../', fileName);
  const schemaAsText = await fs.readFile(filePath, { encoding: 'utf-8' });

  return buildSchema(schemaAsText);
};

const hasBreakingChanges = (changes) => {
  const breakingChange = changes.find((change) => change.criticality.level === 'BREAKING');

  return !!breakingChange;
};
