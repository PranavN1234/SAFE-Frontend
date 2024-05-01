import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/AuthContext";
import { tokens } from "../theme";
import Header from "./Header";
import { Box, useTheme, Typography, Paper, Grid } from "@mui/material";
import BarChart from "../visuals/Barchart";
import Linechart from "../visuals/Linechart";
import PieChart from "../visuals/Piechart";
function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { auth } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [balances, setBalances] = useState([]);
  const [transactionHistory, setTransactionHistory] = useState({
    checkingTransactions: [],
    savingsTransactions: [],
  });
  const [loanInfo, setLoanInfo] = useState([]);
  const [userTransactions, setUserTransactions] = useState([]);


  useEffect(() => {
    const fetchAccounts = async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/get_accounts?customer_id=${auth.customer_id}`
      );
      if (response.ok) {
        const data = await response.json();
        setAccounts(data);
      } else {
        console.error("Failed to fetch accounts");
      }
    };

    const fetchBalances = async () => {
      if (auth.customer_id) {
        const response = await fetch(
          `http://127.0.0.1:8000/balances/${auth.customer_id}`
        );
        if (response.ok) {
          const data = await response.json();
          setBalances([
            { type: "Checking", balance: data.checking_balance || 0 },
            { type: "Savings", balance: data.savings_balance || 0 },
          ]);
        } else {
          console.error("Failed to fetch balances");
        }
      }
    };

    const fetchTransactionHistory = async () => {
      if (auth.customer_id) {
        const response = await fetch(
          `http://127.0.0.1:8000/account_balance_over_time/${auth.customer_id}`
        );
        if (response.ok) {
          const data = await response.json();
          setTransactionHistory({
            checkingTransactions: data.checking || [],
            savingsTransactions: data.savings || [],
          });
        } else {
          console.error("Failed to fetch transaction history");
        }
      }
    };

    const fetchLoanInfo = async () => {
      if (auth.customer_id) {
        const response = await fetch(
          `http://127.0.0.1:8000/loan_status_by_customer/${auth.customer_id}`
        );
        if (response.ok) {
          const data = await response.json();
          setLoanInfo(data);
          console.log("Loan info: ", loanInfo);
        } else {
          console.error("Failed to fetch loan information");
        }
      }
    };

    const fetchUserTransactions = async () => {
      if (auth.customer_id) {
        const response = await fetch(
          `http://127.0.0.1:8000/transactions/${auth.customer_id}`
        );
        if (response.ok) {
          const data = await response.json();
          setUserTransactions(data);
        } else {
          console.error("Failed to fetch user transactions");
        }
      }
    };

    if (auth.customer_id) {
      fetchAccounts();
      fetchBalances();
      fetchTransactionHistory();
      fetchLoanInfo();
      fetchUserTransactions();
    }
  }, []);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subTitle="Welcome to your dashboard" />
      </Box>
      <Box display="flex" gap={2}>
        {/* Checking Account Tile */}
        <Paper elevation={3} sx={{ p: 2, flexGrow: 1 }}>
          <Typography variant="h3" gutterBottom>
            Checking Account
          </Typography>
          {accounts.map((account) => {
            if (account.account_type === "Checking") {
              return (
                <Grid container spacing={1} key={account.account_number}>
                  <Grid item xs={6}>
                    <Typography variant="h6">Account Name:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">{account.account_name}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">Account Number:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">
                      {account.account_number}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">Balance:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">${account.balance}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">Date Opened:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">{account.date_opened}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">Status:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">{account.status}</Typography>
                  </Grid>
                </Grid>
              );
            }
            return null;
          })}
        </Paper>

        {/* Savings Account Tile */}
        <Paper elevation={3} sx={{ p: 2, flexGrow: 1 }}>
          <Typography variant="h3" gutterBottom>
            Savings Account
          </Typography>
          {accounts.map((account) => {
            if (account.account_type === "Savings") {
              return (
                <Grid container spacing={1} key={account.account_number}>
                  <Grid item xs={6}>
                    <Typography variant="h6">Account Name:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">{account.account_name}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">Account Number:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">
                      {account.account_number}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">Balance:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">${account.balance}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">Date Opened:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">{account.date_opened}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">Status:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">{account.status}</Typography>
                  </Grid>
                </Grid>
              );
            }
            return null;
          })}
        </Paper>
      </Box>

      <Box display="flex" my="1.5rem" gap={2}>
          {accounts.map((account) => {
            if (account.account_type === "Loan") {
              return (
                
                  <Paper elevation={3} sx={{ p: 2, flexGrow: 1 }}>
                    
                    <Typography variant="h3" gutterBottom>
                      Loan Account
                    </Typography>
                    <Grid container spacing={1} key={account.account_number}>
                    <Grid item xs={6}>
                    <Typography>
                      Account Name: {account.account_name}
                    </Typography>
                    </Grid>
                    <Grid item xs={6}>
                    <Typography>
                      Account Number: {account.account_number}
                    </Typography>
                    </Grid>
                    <Grid item xs={6}>
                    <Typography>
                      Loan Amount: {account.LoanInfo.loan_amount}
                    </Typography>
                    </Grid>
                    <Grid item xs={6}>
                    <Typography>
                      Loan Months: {account.LoanInfo.loan_months}
                    </Typography>
                    </Grid>
                    <Grid item xs={6}>
                    <Typography>
                      Loan Rate: {account.LoanInfo.loan_rate}
                    </Typography>
                    </Grid>
                    <Grid item xs={6}>
                    <Typography>
                      Loan Type: {account.LoanInfo.loan_type}
                    </Typography>
                    </Grid>
                    {account.LoanInfo.student_id && (
                      <Grid item xs={6}>
                      <Typography>
                        Student ID: {account.LoanInfo.StudentInfo.student_id}
                      </Typography>
                      </Grid>
                    )}
                    {account.LoanInfo.university_name && (
                      <Grid item xs={6}>
                      <Typography>
                        University Name:{" "}
                        {account.LoanInfo.StudentInfo.university_name}
                      </Typography>
                      </Grid>
                    )}
                    <Grid item xs={6}>
                    <Typography>Date Opened: {account.date_opened}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                    <Typography>Status: {account.status}</Typography>
                    </Grid>
                    </Grid>
                  </Paper>
              );
            }
            return null;
          })}
      </Box>
      <Header
        title="Recent transactions"
        subTitle="Here are your recent transactions"
      />
      <Box
        display="grid"
        gridTemplateColumns="repeat(6, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        paddingTop="30px"
      >
        {/* Make box recent Transaction */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.gray[100]}
            p="15px"
          >
            <Typography color={colors.gray[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {userTransactions.map((transaction, i) => (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.transaction_id}
                </Typography>
                <Typography color={colors.gray[100]}>
                  {transaction.from_account}
                </Typography>
              </Box>
              <Box color={colors.gray[100]}>{transaction.timestamp}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.amount}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box m="20px">
        <Header
          title="Your balances"
          subTitle="Here are your Account balances"
        />
        <BarChart data={balances} />
      </Box>
      <Box m="20px">
        <Header
          title="Your Spending Graph"
          subTitle="Here is your spending graph"
        />
        <Linechart transactionHistory={transactionHistory} />
      </Box>
      {loanInfo && loanInfo.length > 0 ? (
        <Box>
          <Header
            title="Your Loan Pie chart"
            subTitle="Here is your loan pie chart"
          />
          {loanInfo.map((loan) => (
            <PieChart key={`loan-${loan.account_number}`} loan={loan} />
          ))}
        </Box>
      ) : null}
    </Box>
  );
}

export default Dashboard;
