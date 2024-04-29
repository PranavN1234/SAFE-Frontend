import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className='app'>
            <SidebarComp/>
            <main className='content'>
              <Topbar/>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                {/* <Route path="/register" element={<RegistrationPage />} /> */}
                <Route path="/dashboard" element={<Dashboard />} />
                {/* <Route path="/profile" element={<ProfilePage />} /> */}
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/create-account" element={<CreateAccount />} />

                {/* <Route path="/support" element={<HelpSupportPage />} /> */}
              </Routes>
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
