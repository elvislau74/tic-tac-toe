import reducer from '../../utils/reducers';
import { LOGIN, SIGNUP, LOGOUT } from '../utils/actions';

const initialState = {
    users: [
        {
            id: 1,
            username: 'testuser1',
            email: 'test1@test.com',
            password: 'password12345',
            loggedIn: false,
        },
        {
            id: 2,
            username: 'testuser2',
            email: 'test2@test.com',
            password: 'password54321',
            loggedIn: false,
        }
    ],
};

test('LOGIN', () => {
    let newState = reducer(initialState, {
        type: LOGIN,
        payload: 1,
    });
    expect(initialState.users[0].username).toBe('testuser1');
    expect(newState.users[0].username).toBe('testuser1');
    expect(initialState.users[0].password).toBe('password12345');
    expect(newState.users[0].password).toBe('password12345');
    expect(newState.users.loggedIn).toBe(true);
});

test('SIGNUP', () => {
    let newState = reducer(initialState, {
        type: SIGNUP,
        payload: [
            {
                username: 'testuser3',
                email: 'test3@test.com', 
                password: 'password67890',
                isLoggedIn: true,  
            },
        ],
    });
    expect(initialState.users.length).toBe(2);
    expect(newState.users.length).toBe(3);
    expect(newState.users[3].loggedIn).toBe(true);
});

test('LOGOUT', () => {
    let newState = reducer(initialState, {
        type: LOGOUT,
        payload: 3,
    });
    expect(initialState.users.length).toBe(3);
    expect(newState.users.length).toBe(2);
});