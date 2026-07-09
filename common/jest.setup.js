import { CloudFormationClient, DescribeStacksCommand } from '@aws-sdk/client-cloudformation';

const region = process.env.AWS_REGION || 'us-east-1';
const stage = process.env.STAGE || 'dev';

const setup = async () => {
  process.env.AWS_REGION = region;
  process.env.STAGE = stage;
  process.env.TABLE_NAME = 'appsync-to-http-products';

  const [ordersStack, usersStack, mergedStack] = await Promise.all([
    getStack('orders-source-dev'),
    getStack('users-source-dev'),
    getStack('appsync-merged-dev'),
  ]);

  if (ordersStack) {
    process.env.ORDERS_API_URL = getApiUrl(ordersStack);
    process.env.ORDERS_API_KEY = getApiKey(ordersStack);
    process.env.ORDERS_API_ID = getApiId(ordersStack);
  }
  if (usersStack) {
    process.env.USERS_API_URL = getApiUrl(usersStack);
    process.env.USERS_API_KEY = getApiKey(usersStack);
    process.env.USERS_API_ID = getApiId(usersStack);
  }
  if (mergedStack) {
    process.env.MERGED_API_URL = getApiUrl(mergedStack);
    process.env.MERGED_API_KEY = getApiKey(mergedStack);
  }
};

const getApiUrl = (stack) => stack.Outputs?.find((o) => o.OutputKey === 'ApiUrl')?.OutputValue;
const getApiKey = (stack) => stack.Outputs?.find((o) => o.OutputKey === 'ApiKey')?.OutputValue;
const getApiId = (stack) => stack.Outputs?.find((o) => o.OutputKey === 'ApiId')?.OutputValue;

const getStack = async (stackName) => {
  const cf = new CloudFormationClient({ region });
  try {
    const stackResult = await cf.send(new DescribeStacksCommand({ StackName: stackName }));
    return stackResult.Stacks?.[0] ?? null;
  } catch (error) {
    if (error.name === 'ValidationError' && /does not exist/.test(error.message)) {
      return null;
    }
    throw error;
  }
};

export default setup;
