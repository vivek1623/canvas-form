import React, { Fragment, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'

import useForm from '../../data/hooks/useForm'

import { isEmail } from '../../data/config/utils'
import { REDIRECT_URL } from '../../data/config/constants'

import Form from '../../components/Form'
import InputItem from '../../components/InputItem'
import RadioGroupItem from '../../components/RadioGroupItem'
import CheckboxItem from '../../components/CheckboxItem'
import SelectItem from '../../components/SelectItem'
import DatePickerItem from '../../components/DatePickerItem'
import ConfirmDialog from '../../components/ConfirmDialog'


const useStyles = makeStyles((theme) => ({
  formTitle: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
  },
  btnContainer: {
    paddingTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center'
  },
  btn: {
    margin: theme.spacing(1),
    color: theme.palette.common.white,
    fontWeight: 600
  },
  contactUsLink: {
    marginLeft: theme.spacing(1),
    fontWeight: 500,
    cursor: 'pointer'
  }
}))

const genderItems = [
  { id: 'male', title: 'Male' },
  { id: 'female', title: 'Female' },
  { id: 'other', title: 'Other' },
]

const policies = [
  { id: '1', title: 'Policy 1' },
  { id: '2', title: 'Policy 2' },
  { id: '3', title: 'Policy 3' },
  { id: '4', title: 'Policy 4' },
]

const initialValues = {
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  mobile: '',
  gender: 'male',
  dob: new Date(),
  isSalaried: false,
  policyId: '',
  permanentAddress: '',
  residentialAddress: ''
}

const initialDialogValue = {
  isOpen: false,
  title: '',
  subTitle: ''
}

const InsuranceForm = ({ setNotify }) => {
  const [confirmDialog, setConfirmDialog] = useState(initialDialogValue)

  const classes = useStyles()

  const validate = fieldValue => {
    let currentErrors = { ...errors }
    let currentValues = fieldValue ? fieldValue : values
    if ('firstName' in currentValues)
      currentErrors.firstName = currentValues.firstName ? "" : "First Name is required."
    if ('lastName' in currentValues)
      currentErrors.lastName = currentValues.lastName ? "" : "Last Name is required."
    if ('email' in currentValues)
      currentErrors.email = isEmail(currentValues.email) ? "" : "Email is not valid."
    if ('policyId' in currentValues)
      currentErrors.policyId = currentValues.policyId ? "" : "Policy is required."
    if ('permanentAddress' in currentValues)
      currentErrors.permanentAddress = currentValues.permanentAddress ? "" : "Permanent Address is required."
    if ('residentialAddress' in currentValues)
      currentErrors.residentialAddress = currentValues.residentialAddress ? "" : "Residential Address is required."
    setErrors({ ...currentErrors })
    if (!fieldValue)
      return Object.values(currentErrors).every(x => x === "")
  }

  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(initialValues, true, validate)

  const onSubmitConfirm = () => {
    if (validate()) {
      console.log('submit', values)
      setConfirmDialog(initialDialogValue)
      resetForm()
      setNotify({
        isOpen: true,
        type: 'success',
        message: 'Your Application is submitted sucessfully.'
      })
    } else {
      setConfirmDialog(initialDialogValue)
      setNotify({
        isOpen: true,
        type: 'error',
        message: 'Please enter valid data'
      })
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    setConfirmDialog({
      isOpen: true,
      title: 'Are you sure to submit this record?',
      subTitle: "You can't undo this operation",
      onConfirm: onSubmitConfirm
    })
  }

  return (
    <Fragment>
      <Typography variant='h5' className={classes.formTitle}>Insurance</Typography>
      <Form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <InputItem
              label='First Name'
              placeholder='Enter your first name'
              name='firstName'
              value={values.firstName}
              onChange={handleInputChange}
              error={errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <InputItem
              label='Middle Name'
              placeholder='Enter your middle name'
              name='middleName'
              value={values.middleName}
              onChange={handleInputChange}
              error={errors.middleName}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <InputItem
              label='Last Name'
              placeholder='Enter your last name'
              name='lastName'
              value={values.lastName}
              onChange={handleInputChange}
              error={errors.lastName}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <InputItem
              label='Email'
              placeholder='Enter your email'
              name='email'
              value={values.email}
              onChange={handleInputChange}
              error={errors.email}
            />
            <SelectItem
              name="policyId"
              label="Policy"
              value={values.policyId}
              onChange={handleInputChange}
              options={policies}
              error={errors.policyId}
            />
            <DatePickerItem
              name="dob"
              label="Date of birth"
              value={values.dob}
              onChange={handleInputChange}
            />
            <RadioGroupItem
              name="gender"
              label="Gender"
              value={values.gender}
              onChange={handleInputChange}
              items={genderItems}
            />
            <CheckboxItem
              name="isSalaried"
              label="Salaried Employee"
              value={values.isSalaried}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <InputItem
              label="Mobile"
              name="mobile"
              value={values.mobile}
              onChange={handleInputChange}
              error={errors.mobile}
            />
          </Grid>
        </Grid>
        <InputItem
          multiline
          rows={4}
          label="Permanent Address"
          name="permanentAddress"
          value={values.permanentAddress}
          onChange={handleInputChange}
          error={errors.permanentAddress}
        />
        <InputItem
          multiline
          rows={4}
          label="Residential Address"
          name="residentialAddress"
          value={values.residentialAddress}
          onChange={handleInputChange}
          error={errors.residentialAddress}
        />
        <div className={classes.btnContainer}>
          <Button
            variant='contained'
            className={classes.btn}
            color='secondary'
            onClick={resetForm}
          >
            Reset Application
          </Button>
          <Button
            type='submit'
            variant='contained'
            className={classes.btn}
            color='primary'
          >
            Submit Application
          </Button>
        </div>
      </Form>
      <Typography variant='body1' align='center' gutterBottom>
        Need any help?
        <Link
          className={classes.contactUsLink}
          varient='body1'
          component='a'
          href={REDIRECT_URL}
          target='_blank'
        >
          Don't worry, I am here 
        </Link>
      </Typography>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </Fragment>
  )
}

export default InsuranceForm
