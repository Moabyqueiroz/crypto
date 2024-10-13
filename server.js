const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

// Servir o arquivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/quote', async (req, res) => {
    const { carteira, regiao, pais, moeda, crypto, metodoPagamento } = req.body;

    try {
        const response = await axios.get('https://api-sandbox.gatefi.com/onramp/v1/quotes', {
            params: {
                partnerAccountId: 'baa2d9f8-6ff0-48e9-babf-709c9007ffbe',
                payment: metodoPagamento,
                crypto,
                fiat: moeda,
                amount: carteira, // Assumindo que 'carteira' é o valor
                region: regiao
            },
            headers: {
                'Content-Type': 'application/json',
                'api-key': 'fGhKXIdWINsjKFuMZpnKqPrlWOIGocRE',
                'signature': 'dd32b38bc3cd9046ce0d09699c770deaf43fe4f9c06eebc649ecc4ba76802930'
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
