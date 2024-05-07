import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Box} from "@mui/material"
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import Dashboard from './components/Dashboard';
import ProfilePage from './components/ProfilePage';
import AdminPanel from './components/AdminPanel';
import HelpSupportPage from './components/HelpSupportPage';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from './components/Topbar';
import SidebarComp from './components/Sidebar'
import CreateAccount from './components/CreateAccount';
import SendMoney from './components/SendMoney';
import LoanPayment from './components/LoanPayment'
import AddMoney from "./components/AddMoney";
import { StripeProvider } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

function App() {
  const [theme, colorMode] = useMode();
    const stripePromise = loadStripe('pk_test_51J9GZMKts81N0x0JExVAAOZG5OWJTUmCovHGhuHK6SLJod7c5R4eVjn7i1D0kxaeA2v13JjcKrRXkdL7pYQzu8XD00SJsSq33T');
  return (

        <Elements stripe={stripePromise}>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Router>
                        <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
                            <Box sx={{ width: 256, flexShrink: 0, height: '100vh', overflowY: 'auto' }}>
                                <SidebarComp />
                            </Box>
                            <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                                <Topbar />
                                <Routes>
                                    <Route path="/login" element={<LoginPage />} />
                                    <Route path="/register" element={<RegistrationPage />} />
                                    <Route path="/dashboard" element={<Dashboard />} />
                                    <Route path="/profile" element={<ProfilePage />} />
                                    <Route path="/admin" element={<AdminPanel />} />
                                    <Route path="/create-account" element={<CreateAccount />} />
                                    <Route path="/send-money" element={<SendMoney />} />
                                    <Route path="/support" element={<HelpSupportPage />} />
                                    <Route path="/pay-loan" element={<LoanPayment />} />
                                    <Route path="/add-money" element={<AddMoney/>}/>
                                </Routes>
                            </Box>
                        </Box>
                    </Router>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </Elements>


  );
}

export default App;
