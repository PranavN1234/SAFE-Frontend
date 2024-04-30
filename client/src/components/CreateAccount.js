import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import { Field, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "./Header";
import { useAuth } from "../hooks/AuthContext";
import { RadioGroup } from "formik-material-ui";

const CreateAccount = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { auth } = useAuth();
  const handleFormSubmit = async (values) => {
    console.log("Submit clicked!!!");
    console.log("Submitted values:");
    console.log(values);
    values["customerId"] = auth.customer_id
    const response = await fetch("http://127.0.0.1:8000/create_account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      const result = await response.json();
      alert(result.message);
    } else {
      alert("Error creating account");
    }
  };

  

  const initialValues = {
    acctStreet: "",
    acctCity: "",
    acctState: "",
    acctZip: "",
    acctType: "Checking", // Default to checking
    serviceCharge: "",
    interestRate: "0.5",
    loanRate: "0.05", // Default loan rate
    loanAmount: "",
    loanMonths: "",
    loanType: "Student", // Default loan type
    // Home Loan specifics
    builtyear: "",
    hianumber: "",
    icname: "",
    icstreet: "",
    iccity: "",
    icstate: "",
    iczip: "",
    premium: "",
    // Student Loan specifics
    studentid: "",
    studentStatus: "Graduated", // Changed from status to avoid naming conflicts with form status or other uses
    expecteddate: "",
    universityname: "",
  };

  const userSchema = yup.object().shape({
    acctStreet: yup.string().required("Street is required"),
    acctCity: yup.string().required("City is required"),
    acctState: yup.string().required("State is required"),
    acctZip: yup
      .string()
      .matches(/^\d{5,6}$/, "ZIP code must be 5 or 6 digits")
      .required("ZIP code is required"),
    acctType: yup.string().required("Account type is required"),
  });

  return (
    <Box m="20px">
      <Header
        title="Create Account"
        subTitle="Create Checkings, Savings or Loan Account"
      />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "&>div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Account Street"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.acctStreet}
                name="acctStreet"
                error={!!touched.acctStreet && !!errors.acctStreet}
                helperText={touched.acctStreet && errors.acctStreet}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Account City"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.acctCity}
                name="acctCity"
                error={!!touched.acctCity && !!errors.acctCity}
                helperText={touched.acctCity && errors.acctCity}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Account State"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.acctState}
                name="acctState"
                error={!!touched.acctState && !!errors.acctState}
                helperText={touched.acctState && errors.acctState}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Account Zip"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.acctZip}
                name="acctZip"
                error={!!touched.acctZip && !!errors.acctZip}
                helperText={touched.acctZip && errors.acctZip}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl component="fieldset" sx={{ gridColumn: "span 4" }}>
                <FormLabel component="legend">Account Type</FormLabel>
                <Field component={RadioGroup} name="acctType">
                  <FormControlLabel
                    value="Checking"
                    control={<Radio />}
                    label="Checking"
                  />
                  <FormControlLabel
                    value="Savings"
                    control={<Radio />}
                    label="Savings"
                  />
                  <FormControlLabel
                    value="Loan"
                    control={<Radio />}
                    label="Loan"
                  />
                </Field>
              </FormControl>

              {values.acctType === "Checking" && (
                <FormControl component="fieldset" sx={{ gridColumn: "span 4" }}>
                  <FormLabel component="legend">Service Charge</FormLabel>
                  <Field component={RadioGroup} name="serviceCharge">
                    <FormControlLabel
                      value="50"
                      control={<Radio />}
                      label="Regular $50"
                    />
                    <FormControlLabel
                      value="300"
                      control={<Radio />}
                      label="Premium $300"
                    />
                  </Field>
                </FormControl>
              )}

              {values.acctType === "Savings" && (
                <FormControl component="fieldset" sx={{ gridColumn: "span 4" }}>
                  <FormLabel component="legend">Interest Rate</FormLabel>
                  <Field component={RadioGroup} name="serviceCharge">
                    <FormControlLabel
                      value="0.05"
                      control={<Radio />}
                      label="Low yield - 0.05%"
                    />
                    <FormControlLabel
                      value="0.1"
                      control={<Radio />}
                      label="High Yield - 0.1%"
                    />
                  </Field>
                </FormControl>
              )}

              {values.acctType === "Loan" && (
                <>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Loan Amount"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.loanAmount}
                    error={!!touched.loanAmount && !!errors.loanAmount}
                    helperText={touched.loanAmount && errors.loanAmount}
                    name="loanAmount"
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Loan Months"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.loanMonths}
                    error={!!touched.loanMonths && !!errors.loanMonths}
                    helperText={touched.loanMonths && errors.loanMonths}
                    name="loanMonths"
                    sx={{ gridColumn: "span 2" }}
                  />

                  <FormControl
                    component="fieldset"
                    sx={{ gridColumn: "span 4" }}
                  >
                    <FormLabel component="legend">Interest Rate</FormLabel>
                    <Field component={RadioGroup} name="loanRate">
                      <FormControlLabel
                        value="0.05"
                        control={<Radio />}
                        label="short - 0.05%"
                      />
                      <FormControlLabel
                        value="0.1"
                        control={<Radio />}
                        label="long - 0.1%"
                      />
                    </Field>
                  </FormControl>

                  <FormControl fullWidth sx={{ gridColumn: "span 4" }}>
                    <FormLabel component="legend">Loan Type</FormLabel>
                    <Select
                      name="loanType"
                      value={values.loanType}
                      onChange={handleChange}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value="Home">Home Loan</MenuItem>
                      <MenuItem value="Personal">Personal Loan</MenuItem>
                      <MenuItem value="Student">Student Loan</MenuItem>
                    </Select>
                  </FormControl>

                  {values.loanType === "Home" && (
                    <>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Built Year"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.builtyear}
                        name="builtyear"
                        sx={{ gridColumn: "span 2" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Home Insurance Number"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.hianumber}
                        name="hianumber"
                        sx={{ gridColumn: "span 2" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Insurance Company Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.icname}
                        name="icname"
                        sx={{ gridColumn: "span 2" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Insurance Company Street"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.icstreet}
                        name="icstreet"
                        sx={{ gridColumn: "span 2" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Insurance Company City"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.iccity}
                        name="iccity"
                        sx={{ gridColumn: "span 2" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Insurance Company State"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.icstate}
                        name="icstate"
                        sx={{ gridColumn: "span 2" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Insurance Company Zip Code"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.iczip}
                        name="iczip"
                        sx={{ gridColumn: "span 2" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Insurance Company Premium"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.premium}
                        name="premium"
                        sx={{ gridColumn: "span 2" }}
                      />
                    </>
                  )}

                  {values.loanType === "Student" && (
                    <>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Student Id"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.studentid}
                        name="studentid"
                        sx={{ gridColumn: "span 2" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="University Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.universityname}
                        name="universityname"
                        sx={{ gridColumn: "span 2" }}
                      />
                      <FormControl fullWidth sx={{ gridColumn: "span 4" }}>
                        <FormLabel component="legend">
                          Graduation Status
                        </FormLabel>
                        <Select
                          name="studentStatus"
                          value={values.studentStatus}
                          onChange={handleChange}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          <MenuItem value="Graduated">Graduated</MenuItem>
                          <MenuItem value="Not Graduated">
                            Not Graduated
                          </MenuItem>
                        </Select>
                      </FormControl>

                      <TextField
                        fullWidth
                        variant="filled"
                        type="date"
                        label="Graduation Date"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.expecteddate}
                        name="expecteddate"
                        InputLabelProps={{ shrink: true }}
                        sx={{ gridColumn: "span 4" }}
                      />
                    </>
                  )}
                </>
              )}
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateAccount;
