import aws from 'aws-sdk';

const configParam = {
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION,
};

const tableNameParam = {
  TableName: process.env.TABLE_NAME,
};

const db = new aws.DynamoDB({ ...configParam });

const client = new aws.DynamoDB.DocumentClient({
  ...configParam,
  params: {
    ...tableNameParam,
  },
});

export default {
  get: (params) => client.get(params).promise(),
  put: (params) => client.put(params).promise(),
  query: (params) => client.query(params).promise(),
  update: (params) => client.update(params).promise(),
  delete: (params) => client.delete(params).promise(),
  scan: (params) => client.scan(params).promise(),
  describeTable: (tableName) => db.describeTable({ TableName: tableName }).promise(),
  batchWrite: (params) => client.batchWrite(params).promise(),
};
