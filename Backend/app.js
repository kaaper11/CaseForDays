const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const userRoute = require('./routes/userRoute');
const itemRoute = require('./routes/itemRoute');
const caseRoute = require('./routes/caseRoute');


dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Działa")
})
app.use("/uploads", express.static("uploads"));


app.use('/users', userRoute);
app.use('/items', itemRoute);
app.use('/cases', caseRoute);

mongoose.connect(process.env.MONGO_URI, {
})
    .then(() => {
        console.log("Połączono z MongoDB");
        app.listen(process.env.PORT, () => {
            console.log(`Serwer działa na porcie ${process.env.PORT}`);
        })
    })
    .catch(err => {
        console.log("Błąd");
        console.log(err)
    });
