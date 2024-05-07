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

const SendMoney = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); // Access the color tokens based on the theme mode
  const { auth } = useAuth(); // Assuming auth contains the customerId
  const customerId = auth?.customer_id; // Ensure you have the correct customerId
  const [balances, setBalances] = useState({ checking: 0, savings: 0 });
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [transferType, setTransferType] = useState("checking");

  useEffect(() => {
    if (customerId) {
      console.log("Customer id got!!");
      fetchBalances();
    }
  }, [customerId]);

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

  const handleSendMoney = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/transfer_money", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from_customer_id: customerId,
          to_acct_no: recipient,
          amount: amount,
          type: transferType,
        }),
      });
      if (response.ok) {
        alert("Transfer Successful!");
        fetchBalances(); // Refresh balances after transfer
      } else {
        const data = await response.json();
        alert("Transfer Failed: " + data.error);
      }
    } catch (error) {
      alert("Transfer Failed:", error);
    }
  };

  return (
    <Box m="20px">
      <Header title="Send Money" subTitle="Send Money to accounts" />
      <Paper
        elevation={3}
        sx={{ p: 3, m: 2, bgcolor: theme.palette.background.default }}
      >
        <Typography variant="h6">Account Balances</Typography>
        <Box display="flex" justifyContent="space-around" mb={4}>
          <Card
            sx={{
              minWidth: 150,
              textAlign: "center",
              bgcolor:
                theme.palette.mode === "dark"
                  ? colors.gray[200]
                  : colors.primary[400],
              color:
                theme.palette.mode === "dark"
                  ? colors.gray[700]
                  : colors.gray[400],
            }}
          >
            <CardContent>
              <Typography variant="h5" color={colors.gray[700]}>
                Checking
              </Typography>
              <Typography variant="h6">${balances.checking}</Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              minWidth: 150,
              textAlign: "center",
              bgcolor:
                  theme.palette.mode === "dark"
                      ? colors.gray[200]
                      : colors.primary[400],
              color:
                  theme.palette.mode === "dark"
                      ? colors.gray[700]
                      : colors.gray[400],
            }}
          >
            <CardContent>
              <Typography variant="h5" color={colors.gray[700]}>
                Savings
              </Typography>
              <Typography variant="h6">${balances.savings}</Typography>
            </CardContent>
          </Card>
        </Box>

        <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }}>
          <TextField
            label="Recipient Account Number"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            fullWidth
            margin="normal"
          />
          <TextField
            select
            label="From Account Type"
            value={transferType}
            onChange={(e) => setTransferType(e.target.value)}
            SelectProps={{ native: true }}
            fullWidth
            margin="normal"
          >
            <option value="Checking">Checking</option>
            <option value="Savings">Savings</option>
          </TextField>
          <Button
            onClick={handleSendMoney}
            variant="contained"
            sx={{ mt: 2, bgcolor: theme.palette.secondary.main }}
          >
            Send Money
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default SendMoney;
