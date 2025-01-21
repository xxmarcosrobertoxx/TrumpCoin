const express = require('express');
const cors = require('cors');
const mercadopago = require('mercadopago');

// Configure suas credenciais do Mercado Pago
mercadopago.configure({
    access_token: 'APP_USR-39534f64-cb2b-4c81-b23d-a2fa22f78f3b'
});

const app = express();
app.use(cors());
app.use(express.json());

// Rota para gerar o QR Code
app.post('/generate-qrcode', async (req, res) => {
    const { valor } = req.body;

    if (!valor || valor <= 0) {
        return res.status(400).json({ error: 'Valor inválido' });
    }

    try {
        const preference = await mercadopago.preferences.create({
            items: [
                {
                    title: 'Investimento TrumpCoin',
                    quantity: 1,
                    currency_id: 'BRL',
                    unit_price: parseFloat(valor)
                }
            ]
        });

        res.json({ qr_code: preference.sandbox_init_point });
    } catch (error) {
        console.error('Erro ao gerar QR Code:', error);
        res.status(500).json({ error: 'Erro ao processar a requisição' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
