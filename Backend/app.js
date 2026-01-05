const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const userRoute = require("./routes/userRoute");
const itemRoute = require("./routes/itemRoute");
const caseRoute = require("./routes/caseRoute");

dotenv.config();

if (!process.env.MONGO_URI) {
    console.error("Brak MONGO_URI w .env");
    process.exit(1);
}
if (!process.env.JWT_SECRET) {
    console.error("Brak JWT_SECRET w .env");
    process.exit(1);
}
if (!process.env.PORT) {
    console.error("Brak PORT w .env");
    process.exit(1);
}

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
    res.send("Działa");
});

app.use("/users", userRoute);
app.use("/items", itemRoute);
app.use("/cases", caseRoute);

app.use((err, req, res, next) => {
    console.error("Global error:", err);
    res.status(500).json({
        message: "Błąd serwera",
        error: err.message,
    });
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Połączono z MongoDB");
        app.listen(process.env.PORT, () => {
            console.log(
                `Serwer działa na porcie ${process.env.PORT}`
            );
        });
    })
    .catch((err) => {
        console.error("Błąd połączenia z MongoDB");
        console.error(err);
        process.exit(1);
    });
