import React from 'react';
import './App.css';
import {nricValidator} from './SingaporeNricValidator';
import {branchNameCodes} from './BranchCodes';
import * as yup from "yup";
import { Formik } from "formik";
import { Form, Col, Button, Container, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const nricSchema = yup.string().required()
const contactNumberSchema = yup.string().required().min(8, 'Invalid contact number').max(8,'Invalid contact number')
const branchCodeSchema = yup.string().required().length(3, 'Branch code must be 3 digits');

const schema = yup.object().shape({
  customerName: yup.string().required(),
  customerAge: yup.number().required().min(18, 'Customer must be at least 18 years old'),
  nric: nricSchema.test('nric', 'Invalid NRIC',
  async value => {
    if (await nricSchema.isValid(value))
    return (nricValidator(value))
  }),
  contactNumber: contactNumberSchema.test('contactNumber', 'Invalid contact number', 
  async value => {
    if (await contactNumberSchema.isValid(value)) {
      return ['6','8','9'].includes(value[0])
    }
  }),
  branchCode: branchCodeSchema.test('branchCode', 'Invalid branch code',
  async value => {
    if (await branchCodeSchema.isValid(value)) {
      return (branchNameCodes[parseInt(value)])
    }
  }),
  terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
});

function FormExample() {
  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values, { setSubmitting, resetForm}) => {
           setTimeout(() => {
             alert(JSON.stringify(values, null, 2));
             setSubmitting(false);
           }, 400);
           resetForm()
           }}
      initialValues={{
        customerName: '',
        customerAge: '',
        nric: '',
        contactNumber: '',
        productType: '',
        branchCode: '',
        terms: false,
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        errors,
      }) => (
        <Container className = 'border'>
        <Form noValidate onSubmit={handleSubmit}>
        <Image className = 'img' src="https://logos-download.com/wp-content/uploads/2016/12/DBS_Bank_logo_logotype.png"/>
          <Form.Row>
            <Form.Group as={Col} md="5" controlId="validationFormik01">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                type="text"
                placeholder= 'Customer Name'
                name="customerName"
                value={values.customerName}
                onChange={handleChange}
                onBlur ={handleBlur}
                isInvalid={touched.customerName && !!errors.customerName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.customerName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationFormik02">
              <Form.Label>Customer Age</Form.Label>
              <Form.Control
                type="text"
                placeholder= 'Customer Age'
                name="customerAge"
                value={values.customerAge}
                onChange={handleChange}
                onBlur ={handleBlur}
                isInvalid={touched.customerAge && !!errors.customerAge}
                isValid={touched.customerAge && !errors.customerAge}
              />

              <Form.Control.Feedback type="invalid">
                {errors.customerAge}
              </Form.Control.Feedback>
              <Form.Control.Feedback></Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormik04">
              <Form.Label>NRIC</Form.Label>
              <Form.Control
                type="text"
                placeholder="NRIC"
                name="nric"
                value={values.nric}
                onChange={handleChange}
                onBlur ={handleBlur}
                isInvalid={touched.nric && !!errors.nric}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nric}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="5" controlId="validationFormik03">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Contact Number"
                name="contactNumber"
                value={values.contactNumber}
                onChange={handleChange}
                onBlur ={handleBlur}
                isInvalid={touched.contactNumber && !!errors.contactNumber}
              />

              <Form.Control.Feedback type="invalid">
                {errors.contactNumber}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormik04">
              <Form.Label>Product Type</Form.Label>
              <Form.Control as="select" name= 'productType' custom>
                <option>Current Account</option>
                <option>Savings Account</option>
                <option>Fixed Deposit</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationFormik05">
              <Form.Label>Branch Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Branch Code"
                name="branchCode"
                value={values.branchCode}
                onChange={handleChange}
                onBlur ={handleBlur}
                isInvalid={touched.branchCode && !!errors.branchCode}
                isValid={touched.branchCode && !errors.branchCode}
              />

              <Form.Control.Feedback type="invalid">
                {errors.branchCode}
              </Form.Control.Feedback>
              <Form.Control.Feedback type="valid">
                {branchNameCodes[parseInt(values.branchCode)]}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.Check id="validationFormik0" custom>
              <Form.Check.Input
                  required
                  name="terms"
                  onChange={handleChange}
                  onBlur ={handleBlur}
                  isInvalid={touched.terms && !!errors.terms}
              />
              <Form.Check.Label> Agree to the <a target="_blank" href="https://www.dbs.com.sg/iwov-resources/pdf/deposits/termsupdate.pdf">Terms and Conditions </a> </Form.Check.Label>
              <Form.Control.Feedback type="invalid">
                {errors.terms}
              </Form.Control.Feedback>
            </Form.Check>
          </Form.Group>
          <Button type="submit" variant='danger'>Submit form</Button>
        </Form>
        </Container>
      )}
    </Formik>
  );
}

let App = () => {
  return <FormExample />;
}

export default App