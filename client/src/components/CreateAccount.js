import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "./Header";
import { useAuth } from "../hooks/AuthContext";

const CreateAccount = () => {
  const { auth } = useAuth();
  const [AccountInfo, setAccountInfo] = useState({
    acctStreet: "",
    acctCity: "",
    acctState: "",
    acctZip: "",
    acctType: "Checking", // Default to checking
  });

  // State for specific account types
  const [CheckingInfo, setCheckingInfo] = useState({
    serviceCharge: "10", // Default service charge
  });

  const [SavingsInfo, setSavingsInfo] = useState({
    interestRate: "0.5", // Default interest rate
  });

  const [LoanInfo, setLoanInfo] = useState({
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
  });

  const handleAccountInfoChange = (e) => {
    const { name, value } = e.target;
    setAccountInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckingInfoChange = (e) => {
    const { name, value } = e.target;
    setCheckingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSavingsInfoChange = (e) => {
    const { name, value } = e.target;
    setSavingsInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoanInfoChange = (e) => {
    const { name, value } = e.target;
    console.log(`Name: ${name}, Value: ${value}`);
    setLoanInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const combinedData = {
      ...AccountInfo,
      ...CheckingInfo,
      ...SavingsInfo,
      ...LoanInfo,
      customerId: auth.customer_id,
    };

    console.log("Combined Data:", combinedData);

    // const response = await fetch('http://127.0.0.1:8000/create_account', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(combinedData)
    // });
    // if (response.ok) {
    //     const result = await response.json();
    //     alert(result.message);
    // } else {
    //     alert('Error creating account');
    // }
  };

  return (
    <Box m="20px">
        <Header title="Create Account" subTitle="Create Checkings, Savings or Loan Account"/>
    </Box>
  );
};

export default CreateAccount;
