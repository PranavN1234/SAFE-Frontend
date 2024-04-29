import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/AuthContext';
import AccountCreationModal from './modals/AccountCreationModal';

function Dashboard() {
    const { auth } = useAuth();
    const [isModalOpen, setModalOpen] = useState(false);
    const [accounts, setAccounts] = useState([]);

    const toggleModal = () => setModalOpen(!isModalOpen);

    useEffect(() => {
        const fetchAccounts = async () => {
            // Ensure the endpoint and the method to pass customer_id is correct
            const response = await fetch(`http://127.0.0.1:8000/get_accounts?customer_id=${auth.customer_id}`);
            if (response.ok) {
                const data = await response.json();
                setAccounts(data);
            } else {
                console.error('Failed to fetch accounts');
            }
        };

        if (auth.customer_id) {
            fetchAccounts();
        }
    }, []);  // Dependency on customer_id to refetch when it changes

    return (
        <div>
            <h1>Welcome, {auth.username ? auth.username : "Guest"}!</h1>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300" onClick={toggleModal}>
                Create Account
            </button>
            {accounts.length > 0 ? (
                accounts.map(account => (
                    <div key={account.account_number}>
                        <p>{account.account_number}-{account.account_name} - {account.account_type} opened on {account.date_opened}</p>
                    </div>
                ))
            ) : (
                <p>No accounts found.</p>
            )}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center" id="my-modal">
                    <div className="relative mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white overflow-y-auto max-h-[80vh]">
                        <AccountCreationModal customerId={auth.customer_id} />
                        <button onClick={toggleModal} className="mt-3 bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
