import React, { useState } from 'react';

function AccountCreationModal({ customerId }) {
    const [formData, setFormData] = useState({
        accountType: 'Checking', // Default to checking
        acctName: '',
        acctStreet: '',
        acctCity: '',
        acctState: '',
        acctZip: '',
        serviceCharge: '10', // Default dummy value
        interestRate: '0.5', // Default dummy value
        loanRate: '5', // Default dummy value
        loanAmount: '',
        loanPayment: '',
        loanMonths: '',
        loanType: 'Student Loan' // Default loan type
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        const response = await fetch('http://127.0.0.1:8000/create_account', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formData, customerId })
        });
        if (response.ok) {
            const result = await response.json();
            alert(result.message);
        } else {
            alert('Error creating account');
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="accountType" className="block text-sm font-medium text-gray-700">Account Type</label>
                    <select id="accountType"
                            name="accountType"
                            value={formData.accountType}
                            onChange={handleInputChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                        <option value="Checking">Checking</option>
                        <option value="Savings">Savings</option>
                        <option value="Loan">Loan</option>
                    </select>
                </div>

                {/* Common fields */}
                <input name="acctName" value={formData.acctName} onChange={handleInputChange} placeholder="Account Name" className="block w-full mt-1 p-2 border rounded-md" />
                <input name="acctStreet" value={formData.acctStreet} onChange={handleInputChange} placeholder="Street" className="block w-full mt-1 p-2 border rounded-md" />
                <input name="acctCity" value={formData.acctCity} onChange={handleInputChange} placeholder="City" className="block w-full mt-1 p-2 border rounded-md" />
                <input name="acctState" value={formData.acctState} onChange={handleInputChange} placeholder="State" className="block w-full mt-1 p-2 border rounded-md" />
                <input name="acctZip" value={formData.acctZip} onChange={handleInputChange} placeholder="Zip Code" className="block w-full mt-1 p-2 border rounded-md" />

                {/* Specific fields based on account type */}
                {formData.accountType === 'Checking' && (
                    <fieldset>
                        <legend className="text-base font-medium text-gray-900">Service Charge</legend>
                        <div className="mt-4 space-y-4">
                            <div className="flex items-center">
                                <input id="serviceCharge10" name="serviceCharge" type="radio" value="10" checked={formData.serviceCharge === '10'} onChange={handleInputChange} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                                <label htmlFor="serviceCharge10" className="ml-3 block text-sm font-medium text-gray-700">
                                    $10
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input id="serviceCharge20" name="serviceCharge" type="radio" value="20" checked={formData.serviceCharge === '20'} onChange={handleInputChange} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                                <label htmlFor="serviceCharge20" className="ml-3 block text-sm font-medium text-gray-700">
                                    $20
                                </label>
                            </div>
                        </div>
                    </fieldset>
                )}
                {formData.accountType === 'Savings' && (
                    <fieldset>
                        <legend className="text-base font-medium text-gray-900">Interest Rate</legend>
                        <div className="mt-4 space-y-4">
                            <div className="flex items-center">
                                <input id="interestRate05" name="interestRate" type="radio" value="0.5" checked={formData.interestRate === '0.5'} onChange={handleInputChange} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                                <label htmlFor="interestRate05" className="ml-3 block text-sm font-medium text-gray-700">
                                    0.5%
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input id="interestRate1" name="interestRate" type="radio" value="1" checked={formData.interestRate === '1'} onChange={handleInputChange} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                                <label htmlFor="interestRate1" className="ml-3 block text-sm font-medium text-gray-700">
                                    1%
                                </label>
                            </div>
                        </div>
                    </fieldset>
                )}
                {formData.accountType === 'Loan' && (
                    <>
                        <input name="loanRate" value={formData.loanRate} onChange={handleInputChange} placeholder="Loan Rate" className="block w-full mt-1 p-2 border rounded-md" />
                        <input name="loanAmount" value={formData.loanAmount} onChange={handleInputChange} placeholder="Loan Amount" className="block w-full mt-1 p-2 border rounded-md" />
                        <input name="loanMonths" value={formData.loanMonths} onChange={handleInputChange} placeholder="Loan Months" className="block w-full mt-1 p-2 border rounded-md" />
                        <fieldset>
                            <legend className="text-base font-medium text-gray-900">Loan Type</legend>
                            <select name="loanType" value={formData.loanType} onChange={handleInputChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                <option value="Student Loan">Student Loan</option>
                                <option value="Personal Loan">Personal Loan</option>
                                <option value="Home Loan">Home Loan</option>
                            </select>
                        </fieldset>
                    </>
                )}
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300">Create Account</button>
            </form>
        </div>
    );
}

export default AccountCreationModal;
