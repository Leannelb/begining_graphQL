const express = require('express');
const { ApolloServer } = require('apollo-server-express');


// in reality this data would be in a database
const authors = [
    {
        id: '1',
        info: {
            name: 'Joe Kelly',
            age: 32,
            gender: 'M',
        }
    },
    {
        id: '2',
        info: {
            name: 'Mary Jane',
            age: 27,
            gender: 'f', 
        }
    }
];

// ! means its required
// query defines an operation, what the client can request.
const typeDefs = `
    type Author {
        id: ID!
        info: Person
    }
    type Person {
        name: String!
        age: Int
        gender: String
    }
    type Query {
        getAuthors: [Author]
        retrieveAuthor(id: ID!): Author
    }    
`

// resolvers
const resolvers = {
    Query: {
        getAuthors: () => authors,
        retrieveAuthor: ( obj, { id })  => authors.find(author => author.id === id)
    }
};

const PORT = 5011;

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

async function startServer() {
    await server.start();
    server.applyMiddleware({
        app,
        path: '/graphql'
    })  
}

startServer();

// server.applyMiddleware({
//     app,
//     path: '/graphql'
// })

app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}/graphql`);
});