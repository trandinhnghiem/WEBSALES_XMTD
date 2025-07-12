const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
app.use(cors());
app.use(express.json());

const distributorRoutes = require("./routes/distributors");
app.use("/api/distributors", distributorRoutes);
const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);
const creditRoutes = require("./routes/credit");
app.use("/api/accounts/credit-info", creditRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server chạy tại http://localhost:${PORT}`));
