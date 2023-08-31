import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    query me {
        me {
        _id
        email
        username
        }
    }
`
export const QUERY_GAMES = gql`
    query games {
        games {
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