const { ApolloServer, gql } = require('apollo-server')

var Sequelize = require('sequelize');
var connection = new Sequelize('demo_schema', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: { connectTimeout: 1000 }
});

var TodoTable = connection.define('todo', {
    title: Sequelize.STRING,
    completed: Sequelize.BOOLEAN,
})

connection.sync().then(function () {
    // TodoTable.create({
    //     title: 'Take out the trash',
    //     completed: false
    // })

    TodoTable.findByPk(3).then(function (article) {
        console.log("Log: -----> : article", article.dataValues)
    })
});

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