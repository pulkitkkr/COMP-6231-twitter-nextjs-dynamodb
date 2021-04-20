import Page from 'components/Page/index';
import React, { useContext, useState } from 'react';
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
import Button from '../../components/CustomButtons/Button';

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

const View = () => {
  const classes = useStyles();
  const { addNotification } = useContext(NotificationContext);
  const [tweet, setTweet] = useState(null);

  const initialValues = React.useMemo(() => {
    return {
      tweet_id: '',
    };
  }, []);

  const validationSchema = React.useMemo(() => {
    return yup.object().shape({
      tweet_id: yup.string().required('Tweet ID is Required'),
    });
  }, []);

  const form = useFormik({
    initialValues,
    validationSchema,
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

  const {
    values: { tweet_id },
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
              <h4 className={classes.cardTitleWhite}>View Tweet</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Tweet ID"
                    id="tweet-id"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      error: !!errors.tweet_id,
                      value: tweet_id,
                      onChange: handleChange('tweet_id'),
                    }}
                    error={errors.tweet_id}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer>
                <Hidden mdDown>
                  <GridItem md={5} />
                </Hidden>
                <GridItem xs={12} sm={12} md={2}>
                  <Button fullWidth color="info" onClick={handleSubmit}>
                    View Tweet
                  </Button>
                </GridItem>
                <Hidden mdDown>
                  <GridItem md={5} />
                </Hidden>
              </GridContainer>

              <br />
              {tweet && (
                <GridContainer>
                  <Card>
                    <CardHeader color="success">
                      <h4 className={classes.cardTitleWhite}>{tweet.writer}</h4>
                    </CardHeader>
                    <CardBody>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          {tweet.body}
                        </GridItem>
                      </GridContainer>
                    </CardBody>
                  </Card>
                </GridContainer>
              )}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </Page>
  );
};

export default View;
