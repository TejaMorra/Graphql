const { ApolloServer, gql } = require('apollo-server');
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  type Query {
    books: [Book]
  }
  type Mutation {
      addBook(title: String!, author: String!): Book
  }
`;

const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];

const resolvers = {
    Query: {
      books: () => books,
    },
    Mutation: {
        addBook: (root, args) => {
          const newBook = { title: args.title, author: args.author };
          books.push(newBook);
          return newBook;
        },
      },
  };

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

// {
//     books {
//       title
//       author
//     }
//   }
  
//   mutation {
//     addBook(title: "TEst", author: "Test") {title}
//   }
