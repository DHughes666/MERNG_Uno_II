import express from 'express';
import { config } from "dotenv";
import { connectToDatabase } from './utils/connection';
import { graphqlHTTP } from 'express-graphql';
import schema from './handlers/handlers';
import cors from 'cors';

config();

const app = express();
app.use(cors());

app.use("/graphql", graphqlHTTP({schema, graphiql: true}));



connectToDatabase().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((err) => console.log(err));



