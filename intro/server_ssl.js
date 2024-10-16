const https = require('https');
const fs = require('fs');
const express = require('express');

const app = express();

// Configuração SSL/TLS
const options = {
    key: fs.readFileSync('certs/certificado_auto_assinado.key'),
    cert: fs.readFileSync('certs/certificado_auto_assinado.crt'),

    // Configurações adicionais de SSL
    minVersion: 'TLSv1.2',
    // Define quais suites de criptografia devem ser usadas pelo servidor. Ajuda a evitar alguns ataques
    ciphers: 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384',
    honorCipherOrder: true
};
app.get('/', (req, res) => {
    console.log('Requisição recebida');
    res.send('Servidor seguro com configurações avançadas!');
});

// 0.0.0.0 é um curinga que significa que o servidor vai escutar em todas as interfaces de rede
https.createServer(options, app).listen(8443, "0.0.0.0", () => {
    console.log('Servidor seguro rodando');
});


