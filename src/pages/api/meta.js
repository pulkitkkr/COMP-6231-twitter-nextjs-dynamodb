import dynamoDb from 'lib/dynamo';

const getTableMetaData = async () => {
  return await dynamoDb.describeTable(process.env.TABLE_NAME);
};

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const meta = await getTableMetaData();
        res.status(200).json(meta);
      } catch (err) {
        res.status(500).json({
          message: 'Please Check Table :' + process.env.TABLE_NAME + ' is present from your AWS COnsole',
        });
      }
      break;
    default:
      res.status(404).json({ error: `${req.method} does not exist` });
      break;
  }
};
