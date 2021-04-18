import dynamoDb from 'lib/dynamo';

const buildParams = (company) => ({
  FilterExpression: 'contains(#body, :company)',
  ExpressionAttributeNames: {
    '#body': 'body',
  },
  ExpressionAttributeValues: {
    ':company': company,
  },
});

const handleGET = async (req, res) => {
  const company = req.query.company;

  if (!company) return res.status(500).json({ message: 'Please Select a company' });

  const params = buildParams(company);

  try {
    const resp = await dynamoDb.scan(params);
    res.status(200).json(resp);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Error Occurred while Querying DynamoDB' });
  }
};

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await handleGET(req, res);
      break;
    default:
      res.status(404).json({ error: `${req.method} does not exist` });
      break;
  }
};
