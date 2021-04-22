## COMP-6231 Distributed System Design Final Projection

This is a ReactJs (Next) Based Web Application developed as a requirement for the completion of Concordia University's COMP-6231 Distributed System Design Course. The Application illustrates the querying of Amazon's DynamoDB with client-side NextJs Application. 

## Data Source
The Project uses an open database available [here](https://www.kaggle.com/omermetinn/tweets-about-the-top-companies-from-2015-to-2020). The dataset contains over 3 million unique tweets about the Top Companies from 2015 to 2020, with their information such as tweet id, author of the tweet, post date, the text body of the tweet, and the number of comments, likes, and retweets of tweets matched with the related company.

## Seed Database
Note: The steps assume, you have already created `Tweets` table in Amazon DynamoDB with `primary_key` as `tweet_id` of type `Number`.


1. Get csv file from Data Source mentioned above.
2. Place the csv file in `./data/[here]` with name `Tweet.csv`.
3. Start the project after completing the Setup.
4. visit `loclhost:3000/api/seed`, this should trigger a database batch write process.
## Setup

The Project uses NextJs Framework. In order to run the project, Please ensure you have NodeJs installed on your local machine.

1. Copy `.env.example` file to `.env` and set you AWS keys.
2. Create `Tweets` table in Amazon DynamoDB with `primary_key` as `tweet_id` of type `Number`.
3. To Get Started, execute following commands:

```bash
yarn install
yarn run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Team Information
- Team Number: 15

### Members:
- Pulkit Kakkar - pulkitkkr@gmail.com
- Bo Wang
- Dinesh Kumar

## Illustration
<img width="758" alt="Screenshot 2021-04-23 at 3 14 27 AM" src="https://user-images.githubusercontent.com/5182674/115788965-05318580-a3e2-11eb-969e-769ff506831c.png">


