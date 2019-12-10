const { ApolloServer, gql } = require('apollo-server')

const todoData = [
    {
        id: 1,
        title: 'Take out the trash',
        completed: false
    },
    {
        id: 2,
        title: 'Dinner with wife',
        completed: false
    },
    {
        id: 3,
        title: 'Meeting with boss',
        completed: false
    }
]

const typeDefs = gql`
    type Todo {
        id:String
        title: String
        completed: Boolean
    }
    type Query {
        todos:[Todo]
    }

    type Mutation {
        todoAdd:Todo
    }
`

const resolvers = {
    Query: {
        todos: () => todoData,
    },
    Mutation: {
        todoAdd: () => (
            {
                id: 3,
                title: 'Meeting with boss',
                completed: false
            }
        )
    }
}

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});