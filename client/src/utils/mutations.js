import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            email
            username
        }
        }
    }
`;
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
        user {
            _id
            email
            username
        }
        }
    }  
`;
export const ADD_GAME = gql`
    mutation addGame($gameData: GameHistoryInput) {
        addGame(gameData: $gameData) {
            _id
            cellsFilled
            createTime
            draw
            userThatPlayed {
                _id
                email
                username
            }
            win
        }
    }
`;