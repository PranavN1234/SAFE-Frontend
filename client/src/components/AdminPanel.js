import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../theme'; // Adjust the path as necessary
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import Header from './Header';

const AdminPanel = () => {
  const [accounts, setAccounts] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectionModel, setSelectionModel] = useState([]);

  const fetchAccounts = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/pending_accounts');
      const data = await response.json();
      if (response.ok) {
        setAccounts(data);
      } else {
        console.error('Failed to fetch accounts:', data);
      }
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleApprove = async () => {
    console.log('Approve clicked:', selectionModel);
    try {
        const response = await fetch('http://127.0.0.1:8000/approve_accounts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ account_numbers: selectionModel })
        });
        const data = await response.json();
        if (response.ok) {
            console.log('Accounts approved successfully:', data);
            fetchAccounts(); // Refresh the accounts list
        } else {
            console.error('Failed to approve accounts:', data);
        }
    } catch (error) {
        console.error('Error approving accounts:', error);
    }
  };


  const columns = [
    { field: 'customer_name', headerName: 'Customer Name', width: 150 },
    { field: 'customer_id', headerName: 'Customer ID', width: 120 },
    { field: 'account_number', headerName: 'Account Number', width: 150 },
    { field: 'account_type', headerName: 'Account Type', width: 130, renderCell: ({ value }) => (
        <Box display="flex" alignItems="center">
          {value === 'Checking' && <AccountBalanceWalletIcon color="secondary" />}
          {value === 'Savings' && <SavingsOutlinedIcon color="secondary" />}
          {value === 'Loan' && <CreditCardOutlinedIcon color="action" />}
          <Typography sx={{ ml: 1 }}>{value}</Typography>
        </Box>
      )
    },
    { field: 'loan_type', headerName: 'Loan Type', width: 130 },
    { field: 'loan_amount', headerName: 'Loan Amount', type: 'number', width: 130 }
  ];

  return (
    <Box m="20px">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Header title="Admin Dashboard" subTitle="Approve/Disapprove pending accounts"/>
        <Button
          variant="contained"
          color="primary"
          onClick={handleApprove}
          disabled={selectionModel.length === 0}
        >
          Approve Selected
        </Button>
      </Box>
      
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={accounts}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setSelectionModel(newRowSelectionModel);
          }}
          selectionModel={selectionModel}
          getRowId={(row) => row.account_number} // Ensuring account_number is used as the unique ID
        />
      </Box>
    </Box>
  );
};

export default AdminPanel;
