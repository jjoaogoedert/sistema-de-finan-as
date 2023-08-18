const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Conectando ao banco de dados MongoDB
mongoose.connect('mongodb://localhost:27017/meu_banco_de_dados', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const TransactionSchema = new mongoose.Schema({
  description: String,
  type: String, // 'despesa' ou 'ganho'
  amount: Number,
});
const Transaction = mongoose.model('Transaction', TransactionSchema);

app.use(express.json());

app.post('/api/transactions', async (req, res) => {
  try {
    const { description, type, amount } = req.body;
    const newTransaction = new Transaction({ description, type, amount });
    await newTransaction.save();
    res.status(201).json({ message: 'Transação salva com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao salvar a transação.' });
  }
});

app.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar as transações.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
