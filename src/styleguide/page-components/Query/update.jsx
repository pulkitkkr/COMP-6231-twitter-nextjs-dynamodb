import Page from 'components/Page/index';
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { NotificationContext } from 'context/NotificationContext';
import GridContainer from 'components/Grid/GridContainer';
import Hidden from '@material-ui/core/Hidden';
import GridItem from '../../components/Grid/GridItem';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';
import CustomInput from '../../components/CustomInput/CustomInput';
import Button from 'components/CustomButtons/Button';

const styles = {
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
};

const useStyles = makeStyles(styles);

const Update = () => {
  const classes = useStyles();
  const { addNotification } = useContext(NotificationContext);
  const [tweet, setTweet] = React.useState(null);

  const viewInitialValue = React.useMemo(() => ({ tweet_id: '' }), []);

  const viewValidationSchema = React.useMemo(() => {
    return yup.object().shape({
      tweet_id: yup.string().required('Tweet ID is Required'),
    });
  }, []);

  const viewForm = useFormik({
    initialValues: viewInitialValue,
    validationSchema: viewValidationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      try {
        const tweet_id = parseInt(values.tweet_id);

        if (!tweet_id) {
          addNotification({
            color: 'danger',
            message: 'Please Enter a Valid tweet_id',
          });
          return;
        }
        let response = await fetch('/api/tweet?tweet_id=' + tweet_id);

        const body = await response.json();

        if (response.status === 500) {
          addNotification({
            color: 'danger',
            message: body.message ? body.message : 'An Error occurred while Getting Tweet',
          });
          return;
        }

        setTweet(body);
      } catch (err) {
        addNotification({
          color: 'danger',
          message: err.message ? err.message : 'An Error occurred while Getting Tweet',
        });

        console.log(err);
      }
    },
  });

  console.log(viewForm);

  const {
    values: { tweet_id: view_tweet_id },
    errors: view_errors,
    handleChange: viewHandleChange,
    handleSubmit: viewHandleSubmit,
  } = viewForm;

  const initialValues = React.useMemo(() => {
    return {
      tweet_id: '',
      body: '',
      comment_num: 0,
      like_num: 0,
      post_date: '',
      retweet_num: 0,
      writer: '',
    };
  }, []);

  const validationSchema = React.useMemo(() => {
    return yup.object().shape({
      tweet_id: yup.string().required('tweet_id is Required'),
      writer: yup.string().required('Writer is Required'),
      body: yup.string().required('Body is Required'),
      comment_num: yup.number().required('Comment Number is Required').min(0, 'It must be greater than 0'),
      like_num: yup.number().required('Like Number is Required').min(0, 'It must be greater than 0'),
      retweet_num: yup.number().required('Retweet Number is Required').min(0, 'It must be greater than 0'),
      post_date: yup.date().required('Post Date is Required'),
    });
  }, []);

  const form = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      try {
        let response = await fetch('/api/tweet', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify({ ...values, tweet_id: parseInt(values.tweet_id) }),
        });

        console.log(await response.json());
        addNotification({
          color: 'Success',
          message: 'Successfully Updated Tweet with ID: ' + tweet_id,
        });
      } catch (err) {
        addNotification({
          color: 'Danger',
          message: 'An Error occurred while Updating Tweet',
        });
      }
    },
  });

  const {
    values: { tweet_id, body, comment_num, like_num, retweet_num, post_date, writer },
    errors,
    handleChange,
    handleSubmit,
    setValues,
  } = form;

  React.useEffect(() => {
    if (!tweet) return;

    if (tweet && tweet_id !== '') return;

    setValues({
      tweet_id: tweet.tweet_id,
      body: tweet.body,
      comment_num: tweet.comment_num,
      like_num: tweet.like_num,
      post_date: tweet.post_date,
      retweet_num: tweet.retweet_num,
      writer: tweet.writer,
    });
  }, [tweet]);

  return (
    <Page>
      <GridContainer>
        <Hidden mdDown>
          <GridItem md={1} />
        </Hidden>
        <GridItem xs={12} sm={12} md={10}>
          <Card>
            <CardHeader color="rose">
              <h4 className={classes.cardTitleWhite}>Update Tweet</h4>
            </CardHeader>
            <CardBody>
              {!tweet ? (
                <>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Tweet ID"
                        id="view-tweet-id"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          error: !!view_errors.tweet_id,
                          value: view_tweet_id,
                          onChange: viewHandleChange('tweet_id'),
                        }}
                        error={view_errors.tweet_id}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <Hidden mdDown>
                      <GridItem md={5} />
                    </Hidden>
                    <GridItem xs={12} sm={12} md={2}>
                      <Button fullWidth color="rose" onClick={viewHandleSubmit}>
                        Fetch Tweet Details
                      </Button>
                    </GridItem>
                    <Hidden mdDown>
                      <GridItem md={5} />
                    </Hidden>
                  </GridContainer>
                </>
              ) : (
                <>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Tweet ID"
                        id="tweet-id"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          error: !!errors.tweet_id,
                          value: tweet_id,
                          disabled: true,
                          onChange: handleChange('tweet_id'),
                        }}
                        error={errors.tweet_id}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Body"
                        id="body"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          error: !!errors.body,
                          value: body,
                          onChange: handleChange('body'),
                        }}
                        error={errors.body}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Writer"
                        id="writer"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          error: !!errors.writer,
                          value: writer,
                          onChange: handleChange('writer'),
                        }}
                        error={errors.writer}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Post Date"
                        id="post_date"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          error: !!errors.post_date,
                          type: 'date',
                          value: post_date,
                          onChange: handleChange('post_date'),
                          placeholder: '',
                        }}
                        error={errors.post_date}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Number of Comments"
                        id="comment_num"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          error: !!errors.comment_num,
                          type: 'number',
                          value: comment_num,
                          onChange: handleChange('comment_num'),
                        }}
                        error={errors.comment_num}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Number of Likes"
                        id="like_num"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          error: !!errors.like_num,
                          type: 'number',
                          value: like_num,
                          onChange: handleChange('like_num'),
                        }}
                        error={errors.like_num}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Number of Retweets"
                        id="retweet_num"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          error: !!errors.retweet_num,
                          type: 'number',
                          value: retweet_num,
                          onChange: handleChange('retweet_num'),
                        }}
                        error={errors.retweet_num}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <Hidden mdDown>
                      <GridItem md={5} />
                    </Hidden>
                    <GridItem xs={12} sm={12} md={2}>
                      <Button fullWidth color="rose" onClick={handleSubmit}>
                        Update Tweet
                      </Button>
                    </GridItem>
                    <Hidden mdDown>
                      <GridItem md={5} />
                    </Hidden>
                  </GridContainer>
                </>
              )}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </Page>
  );
};

export default Update;
