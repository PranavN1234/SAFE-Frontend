import React, { useState } from 'react';

function AccountCreationModal({ customerId }) {

        const [AccountInfo, setAccountInfo] = useState({
                acctStreet: '',
                acctCity: '',
                acctState: '',
                acctZip: '',
                acctType: 'Checking', // Default to checking
            });

            // State for specific account types
        const [CheckingInfo, setCheckingInfo] = useState({
            serviceCharge: '10', // Default service charge
        });

        const [SavingsInfo, setSavingsInfo] = useState({
            interestRate: '0.5', // Default interest rate
        });

        const [LoanInfo, setLoanInfo] = useState({
            loanRate: '0.05', // Default loan rate
            loanAmount: '',
            loanMonths: '',
            loanType: 'Student', // Default loan type
            // Home Loan specifics
            builtyear: '',
            hianumber: '',
            icname: '',
            icstreet: '',
            iccity: '',
            icstate: '',
            iczip: '',
            premium: '',
            // Student Loan specifics
            studentid: '',
            studentStatus: 'Graduated', // Changed from status to avoid naming conflicts with form status or other uses
            expecteddate: '',
            universityname: ''
        });

        const handleAccountInfoChange = (e) => {
            const { name, value } = e.target;
            setAccountInfo(prev => ({ ...prev, [name]: value }));
        };

        const handleCheckingInfoChange = (e) => {
            const { name, value } = e.target;
            setCheckingInfo(prev => ({ ...prev, [name]: value }));
        };

        const handleSavingsInfoChange = (e) => {
            const { name, value } = e.target;
            setSavingsInfo(prev => ({ ...prev, [name]: value }));
        };

        const handleLoanInfoChange = (e) => {
            const { name, value } = e.target;
            console.log(`Name: ${name}, Value: ${value}`);
            setLoanInfo(prev => ({ ...prev, [name]: value }));
        };

        const handleSubmit = async (e) => {
            e.preventDefault();

            const combinedData = {
                ...AccountInfo,
                ...CheckingInfo,
                ...SavingsInfo,
                ...LoanInfo,
                customerId
            };

            console.log("Combined Data:", combinedData);


             const response = await fetch('http://127.0.0.1:8000/create_account', {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify(combinedData)
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
                        <select id="acctType"
                                name="acctType"
                                value={AccountInfo.accountType}
                                onChange={handleAccountInfoChange}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                            <option value="Checking">Checking</option>
                            <option value="Savings">Savings</option>
                            <option value="Loan">Loan</option>
                        </select>
                    </div>

                    {/* Common fields */}

                     <input name="acctStreet" value={AccountInfo.acctStreet} onChange={handleAccountInfoChange} placeholder="Street" className="block w-full mt-1 p-2 border rounded-md" />
                     <input name="acctCity" value={AccountInfo.acctCity} onChange={handleAccountInfoChange} placeholder="City" className="block w-full mt-1 p-2 border rounded-md" />
                     <input name="acctState" value={AccountInfo.acctState} onChange={handleAccountInfoChange} placeholder="State" className="block w-full mt-1 p-2 border rounded-md" />
                     <input name="acctZip" value={AccountInfo.acctZip} onChange={handleAccountInfoChange} placeholder="Zip Code" className="block w-full mt-1 p-2 border rounded-md" />

                    {/* Specific fields based on account type */}
                    {AccountInfo.acctType === 'Checking' && (
                        <fieldset>
                            <legend className="text-base font-medium text-gray-900">Service Charge</legend>
                            <div className="mt-4 space-y-4">
                                <div className="flex items-center">
                                    <input id="serviceCharge10" name="serviceCharge" type="radio" value="50" checked={CheckingInfo.serviceCharge === '50'} onChange={handleCheckingInfoChange} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                                    <label htmlFor="serviceCharge10" className="ml-3 block text-sm font-medium text-gray-700">
                                        Regular $50
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input id="serviceCharge20" name="serviceCharge" type="radio" value="300" checked={CheckingInfo.serviceCharge === '300'} onChange={handleCheckingInfoChange} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                                    <label htmlFor="serviceCharge20" className="ml-3 block text-sm font-medium text-gray-700">
                                        Premium $300
                                    </label>
                                </div>
                            </div>
                        </fieldset>
                    )}
                    {AccountInfo.acctType === 'Savings' && (
                        <fieldset>
                            <legend className="text-base font-medium text-gray-900">Interest Rate</legend>
                            <div className="mt-4 space-y-4">
                                <div className="flex items-center">
                                    <input id="interestRate05" name="interestRate" type="radio" value="0.5" checked={SavingsInfo.interestRate === '0.5'} onChange={handleSavingsInfoChange} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                                    <label htmlFor="interestRate05" className="ml-3 block text-sm font-medium text-gray-700">
                                        0.5%
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input id="interestRate1" name="interestRate" type="radio" value="1" checked={SavingsInfo.interestRate === '1'} onChange={handleSavingsInfoChange} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                                    <label htmlFor="interestRate1" className="ml-3 block text-sm font-medium text-gray-700">
                                        1%
                                    </label>
                                </div>
                            </div>
                        </fieldset>
                    )}
                    {AccountInfo.acctType === 'Loan' && (
                        <>
                            <fieldset>
                                <legend className="text-base font-medium text-gray-900">Loan Rate</legend>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <input id="loanRate05" name="loanRate" type="radio" value="0.05" checked={LoanInfo.loanRate === '0.05'} onChange={handleLoanInfoChange} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                                        <label htmlFor="loanRate05" className="ml-3 block text-sm font-medium text-gray-700">
                                            0.05%
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input id="loanRate10" name="loanRate" type="radio" value="0.1" checked={LoanInfo.loanRate === '0.1'} onChange={handleLoanInfoChange} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                                        <label htmlFor="loanRate10" className="ml-3 block text-sm font-medium text-gray-700">
                                            0.1%
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                            <input name="loanAmount" value={LoanInfo.loanAmount} onChange={handleLoanInfoChange} placeholder="Loan Amount" className="block w-full mt-1 p-2 border rounded-md" />
                            <input name="loanMonths" value={LoanInfo.loanMonths} onChange={handleLoanInfoChange} placeholder="Loan Months" className="block w-full mt-1 p-2 border rounded-md" />
                            <fieldset>
                                <legend className="text-base font-medium text-gray-900">Loan Type</legend>
                                <select name="loanType" value={LoanInfo.loanType} onChange={handleLoanInfoChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                    <option value="Student">Student Loan</option>
                                    <option value="Personal">Personal Loan</option>
                                    <option value="Home">Home Loan</option>
                                </select>
                            </fieldset>
                             {LoanInfo.loanType === 'Home' && (
                            <>
                                <input name="builtyear" value={LoanInfo.builtyear} onChange={handleLoanInfoChange} placeholder="Built Year" className="block w-full mt-1 p-2 border rounded-md" />
                                <input name="hianumber" value={LoanInfo.hianumber} onChange={handleLoanInfoChange} placeholder="Home Insurance Number" className="block w-full mt-1 p-2 border rounded-md" />
                                <input name="icname" value={LoanInfo.icname} onChange={handleLoanInfoChange} placeholder="Insurance Company Name" className="block w-full mt-1 p-2 border rounded-md" />
                                <input name="icstreet" value={LoanInfo.icstreet} onChange={handleLoanInfoChange} placeholder="Insurance Company Street" className="block w-full mt-1 p-2 border rounded-md" />
                                <input name="iccity" value={LoanInfo.iccity} onChange={handleLoanInfoChange} placeholder="Insurance Company City" className="block w-full mt-1 p-2 border rounded-md" />
                                <input name="icstate" value={LoanInfo.icstate} onChange={handleLoanInfoChange} placeholder="Insurance Company State" className="block w-full mt-1 p-2 border rounded-md" />
                                <input name="iczip" value={LoanInfo.iczip} onChange={handleLoanInfoChange} placeholder="Insurance Company ZIP" className="block w-full mt-1 p-2 border rounded-md" />
                                <input name="premium" value={LoanInfo.premium} onChange={handleLoanInfoChange} placeholder="Premium" className="block w-full mt-1 p-2 border rounded-md" />
                            </>
                        )}
                        {LoanInfo.loanType === 'Student' && (
                            <>
                                <input name="studentid" value={LoanInfo.studentid} onChange={handleLoanInfoChange} placeholder="Student ID" className="block w-full mt-1 p-2 border rounded-md" />
                               <div className="mt-1">
                                           <label htmlFor="studentStatus" className="block text-sm font-medium text-gray-700">Status</label>
                                           <select
                                               name="studentStatus"
                                               value={LoanInfo.studentStatus}
                                               onChange={handleLoanInfoChange}
                                               className="block w-full pl-3 pr-10 py-2 mt-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                           >
                                               <option value="Graduated">Graduated</option>
                                               <option value="Not Graduated">Not Graduated</option>
                                           </select>
                                       </div>
                                <input name="expecteddate" value={LoanInfo.expecteddate} onChange={handleLoanInfoChange} placeholder="Expected Graduation Date" type="date" className="block w-full mt-1 p-2 border rounded-md" />
                                <input name="universityname" value={LoanInfo.universityname} onChange={handleLoanInfoChange} placeholder="University Name" className="block w-full mt-1 p-2 border rounded-md" />
                            </>
                        )}
                        </>
                    )}

                     <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300">
                            Create Account
                        </button>
                </form>
            </div>
        );
}



export default AccountCreationModal;


