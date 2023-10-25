"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
require('dotenv').config();
const mongoose = require('mongoose');
const atlasUsername = process.env.MONGODB_ATLAS_USERNAME;
const atlasPassword = process.env.MONGODB_ATLAS_PASSWORD;
const atlasClusterUrl = process.env.MONGODB_ATLAS_CLUSTER_URL;
const connectToDatabase = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${atlasUsername}:${atlasPassword}@${atlasClusterUrl}`, {
            useNewUrlParser: true, useUnifiedTopology: true
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.connectToDatabase = connectToDatabase;
//# sourceMappingURL=connection.js.map