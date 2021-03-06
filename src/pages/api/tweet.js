import dynamoDb from 'lib/dynamo';

const handlePUT = async (req, res) => {
  const item = req.body;

  if (item.tweet_id) {
    await dynamoDb.put({ Item: item });
    return res.status(201).json(item);
  }

  return res.status(500).json({ message: 'tweet_id is required' });
};

const handleGET = async (req, res) => {
  const { Item } = await dynamoDb.get({
    Key: {
      tweet_id: parseInt(req.query.tweet_id),
    },
  });

  if (!Item) {
    return res.status(500).json({ message: `No Tweet found with tweet_id = ${req.query.tweet_id}` });
  }

  return res.status(200).json(Item);
};

const handlePOST = async (req, res) => {
  try {
    const { Attributes } = await dynamoDb.update({
      Key: {
        tweet_id: parseInt(req.body.tweet_id),
      },
      UpdateExpression:
        'SET writer = :writer, post_date = :post_date, body = :body, comment_num = :comment_num, retweet_num = :retweet_num, like_num = :like_num',
      ExpressionAttributeValues: {
        ':writer': req.body.writer,
        ':post_date': req.body.post_date,
        ':body': req.body.body,
        ':comment_num': req.body.comment_num,
        ':retweet_num': req.body.retweet_num,
        ':like_num': req.body.like_num,
      },
      ReturnValues: 'ALL_NEW',
    });
    if (Attributes) {
      return res.status(200).json({ ...Attributes });
    } else {
      return res.status(500).json({ message: 'No Tweet found with ID: ' + req.body.tweet_id });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

const handleDELETE = async (req, res) => {
  try {
    const { Attributes } = await dynamoDb.delete({
      Key: {
        tweet_id: parseInt(req.body.tweet_id),
      },
      ReturnValues: 'ALL_OLD',
    });

    if (Attributes) {
      res.status(200).json({ ...Attributes });
    } else {
      return res.status(500).json({ message: 'No Tweet found with ID: ' + req.body.tweet_id });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

export default async (req, res) => {
  switch (req.method) {
    case 'PUT':
      await handlePUT(req, res);
      break;
    case 'GET':
      await handleGET(req, res);
      break;
    case 'POST':
      await handlePOST(req, res);
      break;
    case 'DELETE':
      await handleDELETE(req, res);
      break;
    default:
      res.status(404).json({ error: `${req.method} does not exist` });
      break;
  }
};
