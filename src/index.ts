import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

const init = async () => {
    const app = express();
    const PORT = 3100
    app.use(express.json())
    
    const gqlSever = new ApolloServer({
        typeDefs: `
            type Query {
                hello: String
                say(name: String): String
            }
        `,
        resolvers: {
            Query: {
                hello: () => 'Hello World! GraphQL',
                say: (_, { name }: {name: string}) => `Hello ${name}! GraphQL`
            }
        }
    })
    
    await gqlSever.start();
    
    app.get('/', (req, res) => {
        res.json({message: 'Hello World!'});
    });

    app.use('/graphql', expressMiddleware(gqlSever));
    
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}!`);
    });
}

init()