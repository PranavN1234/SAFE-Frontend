import React, { useState, useEffect } from "react";
import {Box, Typography, TextField, Button, Paper, Card, CardContent} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Header from "./Header";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {useAuth} from "../hooks/AuthContext";
import {tokens} from "../theme";

const AddMoney = () => {
    const theme = useTheme();
    const stripe = useStripe();
    const colors = tokens(theme.palette.mode);
    const elements = useElements();
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const { auth } = useAuth(); // Assuming auth contains the customerId
    const customerId = auth?.customer_id; // Ensure you have the correct customerId
    const [balances, setBalances] = useState({ checking: 0, savings: 0 });

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
            return;
        }
        setLoading(true);

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.log('[error]', error);
            setLoading(false);
        } else {
            console.log('PaymentMethod', paymentMethod);
            await processPayment(paymentMethod.id);
        }
    };

    const processPayment = async (paymentMethodId) => {
        const response = await fetch('http://127.0.0.1:8000/add_funds', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ paymentMethodId, amount, customer_id: customerId}),
        });
        const responseData = await response.json();
        setLoading(false);
        if (response.ok) {
            alert('Payment successful!');
            fetchBalances();
        } else {
            alert(`Payment failed: ${responseData.error}`);
        }
    };

    return (
        <Box m="20px">
            <Header title="Add Money" subTitle="Add Money to Checking Account" />
            <Paper elevation={3} sx={{ p: 3, m: 2, bgcolor: theme.palette.background.default }}>
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
                </Box>
                <form onSubmit={handleSubmit}>

                    <CardElement />
                    <TextField
                        label="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        type="number"
                        fullWidth
                        margin="normal"
                    />
                    <Button type="submit" disabled={!stripe} variant="contained" sx={{ mt: 2 }}>
                        {loading ? "Processing…" : "Add Money"}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default AddMoney;
