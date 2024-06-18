const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/user.model");
const dotenv = require("dotenv")



dotenv.config({  
    path:"./.env"
})

const app = express();
const PORT = process.env.PORT || 8001;  

app.use(express.json());
app.use(cors());

console.log(process.env.MONGODB_IP + process.env.DB_NAME )
mongoose.connect(process.env.MONGODB_IP + process.env.DB_NAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
}).then(() => {
    console.log("MongoDB connected");
}).catch(err => console.error("MongoDB connection error:", err));

app.post('/user', (req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.status(400).json(err));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
