import React, { useState } from 'react'
import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import {Container, Typography} from '@material-ui/core'
import { TextField } from 'formik-material-ui'
import { useHistory, withRouter } from "react-router-dom"
import { compose } from 'recompose'
import { withFirebase } from './Firebase'
import ErrorSnackbar from '../ui/ErrorSnackbar'

const useStyles = makeStyles((theme) => ({
	root: {
    flexGrow: 1,
	},
	rationGharTitle: {
    padding: "25px 0 10px 0",
    color: theme.palette.text.primary,
    fontWeight: 700,
    textAlign: "center"
  },
  displayIcons: {
    display: "inline-block",
    width: "100%",
    float: "left",
    padding: "5px 0 0 0"
  },
}))

function SignUpForm(props) {
  const [error, setError] = useState(null)

  const classes = useStyles()
  let history = useHistory()

  return (
    <Container component="main" maxWidth="xs"> 
      <Typography variant="h4" className={classes.rationGharTitle}>
        Sign Up for RationGhar
      </Typography>
      <Formik
        validateOnChange={false} validateOnBlur={true}
        initialValues = {{
          name: '',
          email:'',
          // cnic: '',
          // phoneNumber: '',
          // location:'',
          password:'',
          confirmPassword:'',
          error: null,
        }}
        validationSchema = {Yup.object({
          name: Yup.string()
            .required('Required'),
          email: Yup.string()
            .required('Required'),
          // cnic: Yup.string()
          //   .required('Required'),
          // phoneNumber: Yup.string()
          //   .required('Required'),
          // location: Yup.string()
          //   .required('Required'),
          password: Yup.string()
            .required('Required')
            .min(8,'Must be at least 8 characters')
            .max(30,'Must be at most 30 characters')
            .matches('^[a-zA-Z0-9]+$', 'All passwords must be alphanumeric (no special symbols).'),
          // confirmPassword: Yup.string()
          //   .when("password",{
          //     is: val => (val && val.length > 0 ? true : false),
          //     then: Yup.string().oneOf(
          //       [Yup.ref("newPassword")],"Both passwords need to be the same."
          //     )
          //   })
        })}
        onSubmit={(values, { setSubmitting }) => {
          const name = values.name
          const email = values.email
          const password = values.password
          
          props.firebase
            .doCreateUserWithEmailAndPassword(email, password)
            .then(authUser => {
              props.history.push('/login')
            })
            .catch(error => {
              values.password = ''
              values.confirmPassword = ''
              setError(error)
            })
        }}
      >
        {({onSubmit})=>{
          return(
            <Form style={{paddingBottom: "15%"}}>
              <div style={{textAlign:"center"}}>
                <p>Enter the Information Required</p>
                <Field
                  component={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  label="Name"
                  name="name"
                  fullWidth
                ></Field>
                <br/>

                <Field
                  component={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Email address"
                  name="email"
                ></Field>

                <Field
                  component={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="CNIC"
                  name="cnic"
                ></Field>
                <br/>

                <Field
                  component={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Phone Number"
                  name="Phone Number"
                ></Field>
                <br/>

                <Field
                  component={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Location"
                  name="location"
                ></Field>
                <br/>
                
                <Field
                  component={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  name="password"
                ></Field>
                <br/>

                <Field
                  component={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                ></Field>
                <br/>
              </div>

              <div className={classes.displayIcons}>
                <div style={{float: "left"}}>
                  <Button variant="contained" onClick={() => history.goBack()}>Back</Button>
                </div>
                <div style={{float: "right"}}>
                  <Button type="submit" variant="contained" color="primary" onClick={onSubmit} >Sign Up</Button>
                </div>
              </div>
             {error && <ErrorSnackbar stateError={error.message}/>}
            </Form>
          )
        }}
      </Formik>
    </Container>
  )
}

const SignUpPage = compose (
  withRouter,
  withFirebase,
)(SignUpForm)

export default SignUpPage