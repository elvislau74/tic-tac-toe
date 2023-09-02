// const gql = require('@apollo/client');
// const gql = require('graphql-tag');

const typeDefs = `
type User {
    _id: ID
    username: String
    email: String
}
type Auth {
    token: ID!
    user: User
}
type GameHistory {
    _id: ID!
    createTime: String
    cellsFilled: [String]
    win: Boolean
    draw: Boolean
    userThatPlayed: User
}
input GameHistoryInput {
    cellsFilled: [String]!
    win: Boolean!
    draw: Boolean!
}
type Query {
    me: User
    games: [GameHistory]
}
type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addGame(gameData: GameHistoryInput): GameHistory
}
`;

module.exports = typeDefs;