export const ADD_USER = `
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
export const LOGIN_USER = `
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