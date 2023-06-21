/* eslint-disable-next-line */
import { CloudFormationClient, DescribeStacksCommand, Stack } from '@aws-sdk/client-cloudformation';

const region = process.env.AWS_REGION || 'us-east-1';
const stage = process.env.STAGE || 'dev';

const setup = async () => {
  process.env.AWS_REGION = region;
  process.env.STAGE = stage;
  process.env.TABLE_NAME = 'appsync-to-http-products';
  const ordersStackName = 'orders-source-dev';
  const ordersStack = await getStack(ordersStackName);
  process.env.ORDERS_GRAPH_API_URL = getGraphApiUrl(ordersStack);
  process.env.ORDERS_GRAPH_API_KEY = getGraphApiKey(ordersStack);
  const usersStackName = 'users-source-dev';
  const usersStack = await getStack(usersStackName);
  process.env.USERS_GRAPH_API_URL = getGraphApiUrl(usersStack);
  process.env.USERS_GRAPH_API_KEY = getGraphApiKey(usersStack);
};

const getGraphApiUrl = (stack) =>
  stack.Outputs?.find((o) => o.OutputKey === 'GraphQLApiUrl')?.OutputValue;
const getGraphApiKey = (stack) =>
  stack.Outputs?.find((o) => o.OutputKey === 'GraphQLApiKey')?.OutputValue;

const getStack = async (stackName) => {
  const cf = new CloudFormationClient({ region });
  const stackResult = await cf.send(
    new DescribeStacksCommand({
      StackName: stackName,
    }),
  );
  const stack = stackResult.Stacks?.[0];
  if (!stack) {
    throw new Error(`Could not find CFN stack with name ${stackName}`);
  }

  return stack;
};

export default setup;
