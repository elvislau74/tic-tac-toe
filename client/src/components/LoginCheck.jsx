import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useLogin } from "../utils/LoginContext";
import { QUERY_ME } from "../utils/queries"
import { LOGIN, LOGOUT } from "../utils/actions";
import Auth from "../utils/auth";

export default function LoginCheck(props) {
    const [state, dispatch] = useLogin();
    const { loading, data: loginData } = useQuery(QUERY_ME, {
        fetchPolicy: "no-cache"
    });

    const token = state.token.length > 0 ? state.token : (Auth.getToken() || '');

    const loggedIn = token.length > 0;

    const user = loginData?.me || {};

    useEffect(() => {
        if (!loading) {
            if (loggedIn && dispatch) {
                Auth.login(token);
                dispatch({
                    type: LOGIN,
                    payload: {
                        user: user,
                        token: token
                    }
                });
            } else if (dispatch) {
                Auth.logout();
                dispatch({
                    type: LOGOUT
                });
            } 
        }
    }, [loading]);

    return (
        // <div>
        //     {props.children}
        // </div>
        <></>
    )
}