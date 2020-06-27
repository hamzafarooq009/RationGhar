import React from 'react'
import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import {Container, LinearProgress,Typography} from '@material-ui/core'
import { TextField } from 'formik-material-ui'
import { useHistory } from "react-router-dom"
import ChatBot from 'react-simple-chatbot';
import styled from 'styled-components'
import Fab from '@material-ui/core/Fab'

// import { connect } from 'react-redux'

// Add 2 more fields (facebook and instagram links ke liye)

const useStyles = makeStyles((theme) => ({
	root: {
    flexGrow: 1,
	},
	rationGharTitle: {
    padding: "25px 0 10px 0",
    color: theme.palette.text.primary,
    fontWeight: 700,
    textAlign: "center",
  },
  displayIcons: {
    display: "inline-block",
    width: "100%",
    float: "left",
    padding: "5px 0 0 0"
  },
}))

export default function SignUpPage() {
  const classes = useStyles()
  let history = useHistory()

  return (
    <div style={{backgroundImage: 'linear-gradient(to right, #e0c2c2 , blue)'}}>
        
      <Container component="main" maxWidth="xs" style={{backgroundColor: 'white', borderStyle: 'solid', borderColor: '#baa5a5', marginTop: 50}}> 
      <Typography variant="h4" className={classes.rationGharTitle}>
          Sign Up for RationGhar
        </Typography>
      
        <Formik
          validateOnChange={false} validateOnBlur={true}
          initialValues = {{
            name: '',
            email:'',
            cnic: '',
            phoneNumber: '',
            location:'',
            password:'',
            confirmPassword:'',
          }}
          validationSchema = {Yup.object({
            name: Yup.string()
              .required('Required'),
            email: Yup.string()
              .required('Required'),
          
            cnic: Yup.string()
              .required('Required'),

            phoneNumber: Yup.string()
              .required('Required'),
              
            location: Yup.string()
              .required('Required')
              ,
            password: Yup.string()
              .required('Required')
              .min(8,'Must be at least 8 characters')
              .max(30,'Must be atmost 30 characters')
              .matches('^[a-zA-Z0-9]+$', 'All passwords must be alphanumeric (no special symbols).'),
            confirmPassword: Yup.string()
            .when("password",{
              is: val => (val && val.length > 0 ? true : false),
              then: Yup.string().oneOf(
                [Yup.ref("newPassword")],"Both passwords need to be the same."
              )
            })
          })}
          onSubmit={(values, { setSubmitting }) => {
            // dispatch(changePassword({ name: values.name, cnic: values.cnic}))
            // .then(() => {
            //   setSubmitting(false)
            // })
            console.log("Submitted")  
          }}
        >
          {({onSubmit, isSubmitting})=>{
            return(
              <Form style={{paddingBottom: "15%"}}>
                <div style={{textAlign:"center"}}>
                  <p>Enter the Information Required</p>
                  <Field
                    component={TextField}
                    variant="filled"
                    margin="normal"
                    required
                    label="Names"
                    name="name"
                    fullWidth
                  ></Field>
                  <br/>

                  <Field
                    component={TextField}
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    label="Email address"
                    name="email"
                  ></Field>

                  <Field
                    component={TextField}
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    label="CNIC"
                    name="cnic"
                  ></Field>
                  <br/>

                  <Field
                    component={TextField}
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    label="Phone Number"
                    name="Phone Number"
                  ></Field>
                  <br/>

                  <Field
                    component={TextField}
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    label="Location"
                    name="location"
                  ></Field>
                  <br/>
                  
                  <Field
                    component={TextField}
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    name="password"
                  ></Field>
                  <br/>

                  <Field
                    component={TextField}
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    label="Confirm Password"
                    name="confirmPassword"
                  ></Field>
                  <br/>
                </div>
                {/* {isSubmitting && <LinearProgress />} */}
                <div className={classes.displayIcons}>
                  <div style={{float: "left"}}>
                    <Fab variant="contained" onClick={() => history.goBack()}>Back</Fab>
                  </div>
                  <div style={{float: "right"}}>
                    <Fab type="submit" variant="contained" color="primary" onClick={onSubmit} >Sign Up</Fab>
                  </div>
                </div>
              </Form>
            )
          }}
        </Formik>
        {/* <ChatBot
          headerTitle="Speech Synthesis"
          speechSynthesis={{ enable: true, lang: 'en' }}
          steps={[
            {
              id: '1',
              message: 'What is your name?',
              trigger: '2',
            },
            {
              id: '2',
              user: true,
              trigger: '3',
            },
            {
              id: '3',
              message: 'Hi {previousValue}, nice to meet you!, How may i help you',
              end: true,
            },
          ]}
          style={{marginLeft: 500, marginBottom: 100}}
        /> */}
      
      </Container>
    </div>
  )
}