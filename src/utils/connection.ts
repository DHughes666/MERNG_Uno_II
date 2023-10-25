require('dotenv').config();
const mongoose = require('mongoose');

const atlasUsername = process.env.MONGODB_ATLAS_USERNAME;
const atlasPassword = process.env.MONGODB_ATLAS_PASSWORD;
const atlasClusterUrl = process.env.MONGODB_ATLAS_CLUSTER_URL;

export const connectToDatabase = async() => {
    try {
        await mongoose.connect(`mongodb+srv://${atlasUsername}:${atlasPassword}@${atlasClusterUrl}`, {
            useNewUrlParser: true, useUnifiedTopology: true
        });
    } catch (err) {
        console.log(err);
        
    }
}