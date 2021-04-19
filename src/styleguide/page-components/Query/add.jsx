import Page from 'components/Page/index';
import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
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

const Add = () => {
  const classes = useStyles();
  const { addNotification } = useContext(NotificationContext);

  const initialValues = React.useMemo(() => {
    const uuid = uuidv4();
    const hex = '0x' + uuid.replace(/-/g, '');
    const bigIntVal = BigInt(hex);

    return {
      tweet_id: bigIntVal.toString().slice(0, 18),
      body: '',
      comment_num: 0,
      like_num: 0,
      post_date: '',
      retweet_num: 0,
    };
  }, []);

  const validationSchema = React.useMemo(() => {
    return yup.object().shape({
      tweet_id: yup.string().required('UUID is Required'),
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
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify({ ...values, tweet_id: parseInt(values.tweet_id) }),
        });

        console.log(await response.json());
        addNotification({
          color: 'Success',
          message: 'Successfully Added Tweet with ID: ' + tweet_id,
        });
      } catch (err) {
        addNotification({
          color: 'Danger',
          message: 'An Error occurred while Adding Tweet',
        });
      }
    },
  });

  const {
    values: { tweet_id, body, comment_num, like_num, retweet_num, post_date },
    errors,
    handleChange,
    handleSubmit,
  } = form;

  return (
    <Page>
      <GridContainer>
        <Hidden mdDown>
          <GridItem md={1} />
        </Hidden>
        <GridItem xs={12} sm={12} md={10}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Add Tweet</h4>
            </CardHeader>
            <CardBody>
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
                <GridItem xs={12} sm={12} md={6}>
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
                <GridItem xs={12} sm={12} md={6}>
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
              </GridContainer>
              <GridContainer>
                <Hidden mdDown>
                  <GridItem md={5} />
                </Hidden>
                <GridItem xs={12} sm={12} md={2}>
                  <Button fullWidth color="rose" onClick={handleSubmit}>
                    Add Tweet
                  </Button>
                </GridItem>
                <Hidden mdDown>
                  <GridItem md={5} />
                </Hidden>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </Page>
  );
};

export default Add;
