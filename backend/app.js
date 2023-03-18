const express = require('express');
const cors = require('cors');

const paymentRoute = require('./routes/paymentRoute');

const app = express();
const port = 8006;

app.use(express.json());
app.use(cors());

app.use('/payment',paymentRoute);



app.listen(port , () => {
    console.log(`Server start at port number :${port}`);
}) 