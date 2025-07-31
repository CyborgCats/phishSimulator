const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.post('/log', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const fecha = new Date().toISOString();
  console.log(`[CLIC REGISTRADO] IP: ${ip} | Fecha: ${fecha}`);
  res.send('OK');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${port}`);
});
