// Dashboard.js

import React, { useState } from 'react';
import { useAuth } from '../hooks/AuthContext';  // Adjust the path as needed
import AccountCreationModal from './modals/AccountCreationModal'; // Make sure the path is correct

function Dashboard() {
    const { auth } = useAuth();
    const [isModalOpen, setModalOpen] = useState(false);

    const toggleModal = () => setModalOpen(!isModalOpen);

    return (
        <div>
            <h1>Welcome, {auth.username ? auth.username : "Guest"}!</h1>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300" onClick={toggleModal}>
                Create Account
            </button>
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3 text-center">
                            <AccountCreationModal customerId={auth.customer_id} />
                            <button onClick={toggleModal} className="mt-3 bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
