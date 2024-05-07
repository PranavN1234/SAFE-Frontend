import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";
import { useAuth } from "../hooks/AuthContext";
import { tokens } from "../theme"; // Ensure the correct path to your theme tokens
import Header from "./Header";

const LoanPayment = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { auth } = useAuth();
  const customerId = auth?.customer_id;

  const [loans, setLoans] = useState([]);
  const [balances, setBalances] = useState({ checking: 0, savings: 0 });
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentAccountType, setPaymentAccountType] = useState("checking");

  useEffect(() => {
    if (customerId) {
      fetchLoanDetails();
      fetchBalances();
    }
  }, [customerId]);

  const handlePayment = async (index) => {
    const loan = loans[index];
    console.log(
      `Making payment for loan account number: ${loan.account_number} from ${loan.paymentAccountType}`
    );
    try {
      const response = await fetch("http://127.0.0.1:8000/pay_loan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loanAccountNumber: loan.account_number, // The loan account number to which the payment is made
          paymentAccountType: loan.paymentAccountType, // Either 'checking' or 'savings', from where the payment is made
          paymentAmount: loan.paymentAmount, // The amount to be paid towards the loan
          customerId: customerId, // Customer ID making the payment
        }),
      });
      if (response.ok) {
        alert("Payment successful!");
        fetchLoanDetails(); // Refresh loan details
        fetchBalances(); // Refresh account balances
      } else {
        const data = await response.json();
        alert("Payment failed: " + data.error);
      }
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed: " + error.message);
    }
  };

  const handlePaymentAmountChange = (value, index) => {
    const updatedLoans = loans.map((loan, idx) =>
      idx === index ? { ...loan, paymentAmount: value } : loan
    );
    setLoans(updatedLoans);
  };

  const handleAccountTypeChange = (value, index) => {
    const updatedLoans = loans.map((loan, idx) =>
      idx === index ? { ...loan, paymentAccountType: value } : loan
    );
    setLoans(updatedLoans);
  };
  const fetchLoanDetails = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/loan_status_by_customer/${customerId}`
      );
      if (response.ok) {
        const data = await response.json();
        const enrichedLoans = data.map((loan) => ({
          ...loan,
          paymentAmount: "",
          paymentAccountType: "checking",
        }));
        setLoans(enrichedLoans);
      } else {
        console.error("Failed to fetch loan details");
      }
    } catch (error) {
      console.error("Error fetching loan details:", error);
    }
  };

  const fetchBalances = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/balances/${customerId}`
      );
      if (response.ok) {
        const data = await response.json();
        setBalances({
          checking: data.checking_balance,
          savings: data.savings_balance,
        });
      } else {
        console.error("Failed to fetch balances");
      }
    } catch (error) {
      console.error("Error fetching balances:", error);
    }
  };

  return (
    <Box m="20px">
      <Header
        title="Pay Loan"
        subTitle="Pay loan from your Checking or Savings Account"
      />
      {loans.map((loan, index) => (
        <Paper
          key={index}
          elevation={3}
          sx={{ p: 3, m: 2, mb: 4, bgcolor: colors.primary[400] }}
        >
          <Typography variant="h6">
            Loan Details (Account: {loan.account_number})
          </Typography>
          <Box display="flex" justifyContent="space-around" mb={4}>
            <LoanDetailCard
              title="Loan Amount"
              value={loan.loan_amount}
              theme={theme}
              colors={colors}
            />
            <LoanDetailCard
              title="Amount Paid"
              value={loan.loan_paid}
              theme={theme}
              colors={colors}
            />
            <LoanDetailCard
              title="Remaining Balance"
              value={loan.remaining_loan}
              theme={theme}
              colors={colors}
            />
            <LoanDetailCard
              title="Checking Balance"
              value={balances.checking}
              theme={theme}
              colors={colors}
            />
            <LoanDetailCard
              title="Savings Balance"
              value={balances.savings}
              theme={theme}
              colors={colors}
            />
          </Box>
          <TextField
            label="Payment Amount"
            value={loan.paymentAmount}
            onChange={(e) => handlePaymentAmountChange(e.target.value, index)}
            type="number"
            fullWidth
            margin="normal"
          />
          <TextField
            select
            label="From Account Type"
            value={loan.paymentAccountType}
            onChange={(e) => handleAccountTypeChange(e.target.value, index)}
            SelectProps={{ native: true }}
            fullWidth
            margin="normal"
          >
            <option value="Checking">Checking</option>
            <option value="Savings">Savings</option>
          </TextField>
          <Button
            onClick={() => handlePayment(index)}
            variant="contained"
            sx={{ mt: 2, bgcolor: theme.palette.secondary.main }}
          >
            Make Payment
          </Button>
        </Paper>
      ))}
    </Box>
  );
};

const LoanDetailCard = ({ title, value, theme, colors }) => (
  <Card
    sx={{
      minWidth: 150,
      textAlign: "center",
      bgcolor:
        theme.palette.mode === "dark" ? colors.gray[500] : colors.primary[400],
      color:
        theme.palette.mode === "dark"
          ? theme.palette.text.primary
          : colors.gray[400],
    }}
  >
    <CardContent>
      <Typography variant="h5" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="h6">${value}</Typography>
    </CardContent>
  </Card>
);

export default LoanPayment;
