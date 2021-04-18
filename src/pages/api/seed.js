import dynamoDb from 'lib/dynamo';
const fs = require('fs');
import path from 'path';
const csv = require('csv-parser');

// Enable export NODE_OPTIONS="--max-old-space-size=8192" in CLI

const BATCH_SIZE = 25; // MAX-SIZE Allowed

const parseData = (data) => {
  let obj = {};

  for (const key in data) {
    if (key === 'tweet_id') {
      obj['KEY'] = {
        N: parseInt(data[key]),
      };
    } else {
      obj[key] = {
        S: String(data[key] || ''),
      };
    }
  }

  return { PutRequest: { Item: { ...data, tweet_id: parseInt(data.tweet_id) } } };
};

const batchPushData = async (items) => {
  const updatedItems = items.map(parseData);

  const batchWriteParams = {
    RequestItems: {
      [process.env.TABLE_NAME]: updatedItems,
    },
  };

  return dynamoDb.batchWrite(batchWriteParams);
};

export default async (req, res) => {
  let data = [];
  const csvPath = path.resolve('./data/Tweet.csv');
  let counter = 0;
  try {
    const readStream = fs.createReadStream(csvPath).pipe(csv());

    readStream
      .on('data', async function (row) {
        if (counter > 158000) {
          data.push(row);
        }

        counter++;

        const length = data.length;

        if (length === 7000) {
          readStream.destroy();
        }

        if (length > 1000 && length % 1000 === 0) {
          console.log('Read ======> ' + length);
        }
      })
      .on('close', async function () {
        console.log('Data Read Successful');

        while (data.length > 0) {
          const spliceTill = data.length < BATCH_SIZE ? data.length : BATCH_SIZE;

          const itemsToPush = data.splice(0, spliceTill);

          try {
            await batchPushData(itemsToPush);
          } catch (err) {
            console.log(err);
          }

          console.log('Promise Left To Push ====>', data.length);
        }

        console.log(`Seeding is complete`);
      });

    res.status(200).json({ message: 'Data Seed Initiated, Check Console For More Information!' });
  } catch (err) {
    return res.status(500).json({
      message: 'Please ensure Tweet.csv is present in ./data directory in root',
      err,
      path: csvPath,
    });
  }
};
