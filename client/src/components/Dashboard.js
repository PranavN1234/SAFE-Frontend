// Dashboard.js

import React from 'react';
import { useAuth } from '../hooks/AuthContext';  // Adjust the path as needed

function Dashboard() {
  const { user } = useAuth();  // Accessing user from context

  return (
    <div>
      <h1>Welcome, {user ? user.username : "Guest"}!</h1>
    </div>
  );
}

export default Dashboard;
