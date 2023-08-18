import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const TransactionForm = ({ refreshTransactions }) => {
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/transactions', { description, type, amount });
      setDescription('');
      setType('');
      setAmount('');
      refreshTransactions();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Descrição"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <FormControl variant="outlined" style={{ marginLeft: 10 }}>
        <InputLabel>Tipo</InputLabel>
        <Select
          label="Tipo"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <MenuItem value="despesa">Despesa</MenuItem>
          <MenuItem value="ganho">Ganho</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Valor"
        variant="outlined"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" style={{ marginLeft: 10 }}>
        Cadastrar
      </Button>
    </form>
  );
};

export default TransactionForm;
