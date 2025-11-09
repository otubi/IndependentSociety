require('dotenv').config({ path: "./config.env" });
const app = require("./contract_system");
const mongoose = require("mongoose");
const path = require("path");

const port = process.env.PORT || 4000;

const startServer = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_STR, {  
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("DATABASE SUCCESSFULLY CONNECTED!");

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });

    } catch (err) {
        console.error("FAILED TO CONNECT TO THE DATABASE!", err); 
        process.exit(1); 
    }
};


startServer();
