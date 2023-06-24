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
  process.env.ORDERS_API_URL = getApiUrl(ordersStack);
  process.env.ORDERS_API_KEY = getApiKey(ordersStack);
  const usersStackName = 'users-source-dev';
  const usersStack = await getStack(usersStackName);
  process.env.USERS_API_URL = getApiUrl(usersStack);
  process.env.USERS_API_KEY = getApiKey(usersStack);
  const mergedStackName = 'appsync-merged-dev';
  const mergedStack = await getStack(mergedStackName);
  process.env.MERGED_API_URL = getApiUrl(mergedStack);
  process.env.MERGED_API_KEY = getApiKey(mergedStack);
};

const getApiUrl = (stack) => stack.Outputs?.find((o) => o.OutputKey === 'ApiUrl')?.OutputValue;
const getApiKey = (stack) => stack.Outputs?.find((o) => o.OutputKey === 'ApiKey')?.OutputValue;

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
