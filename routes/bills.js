const express = require('express');
const router = express.Router();

const mockBills = [
    { id: 1, type: 'Electricity Bill', dueDate: '25 July 2025', amount: '₹1,200' },
    { id: 2, type: 'Water Bill', dueDate: '28 July 2025', amount: '₹450' },
    { id: 3, type: 'Gas Bill', dueDate: '25 July 2025', amount: '₹650' },
    { id: 4, type: 'WiFi Bill', dueDate: '30 July 2025', amount: '₹600' },
    { id: 5, type: 'DTH / Cable TV Bill', dueDate: '27 July 2025', amount: '₹500' },
    { id: 6, type: 'Mobile Recharge Bill', dueDate: '1 Aug 2025', amount: '₹299' }
];

router.get('/all', (req, res) => {
    res.json(mockBills);
});

router.post('/pay', (req, res) => {
    const { id, method } = req.body;
    const bill = mockBills.find(b => b.id === id);
    if (!bill) return res.status(404).json({ message: 'Bill not found' });

    console.log(`✅ Paid ${bill.amount} for ${bill.type} via ${method}`);
    res.json({ message: 'Payment successful' });
});

module.exports = router;
