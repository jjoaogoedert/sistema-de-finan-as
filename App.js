import React, { useState, useEffect } from 'react';
import './App.css';
import TransactionForm from './TransactionForm';
import TransactionTable from './TransactionTable';
import axios from 'axios';

function App() {
  const [transactions, setTransactions] = useState([]);

  const refreshTransactions = async () => {
    try {
      const response = await axios.get('/api/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    refreshTransactions();
  }, []);

  const total = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'ganho') {
      return acc + transaction.amount;
    } else if (transaction.type === 'despesa') {
      return acc - transaction.amount;
    }
    return acc;
  }, 0);

  return (
    <div className="App">
      <h1>Sistema de Finanças</h1>
      <TransactionForm refreshTransactions={refreshTransactions} />
      <TransactionTable transactions={transactions} />
      <h2>Total: {total}</h2>
    </div>
  );
}

export default App;
