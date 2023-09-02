import { useState } from "react";
import { LOGIN_USER } from '../utils/mutations';
import { useMutation } from "@apollo/client";
import Auth from '../utils/auth';
import { useNavigate } from "react-router-dom";
import { useLogin } from "../utils/LoginContext";
import { LOGIN } from "../utils/actions";
import '../styles/Login.css'

export default function LoginForm (props) {
    const navigate = useNavigate();
    const [formState, setFormState ] = useState({
      email: '',
      password: ''
    });
  
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [userData, setUserData] = useState({
      _id: '',
      username: '',
      email: ''
    });
  
    const [login, { error }] = useMutation(LOGIN_USER, {
      fetchPolicy: 'no-cache'
    });

    const [state, dispatch] = useLogin();
  
    const handleChange = (event) => {
      event.preventDefault();
  
      const name = event.target.name;
      const value = event.target.value;
  
      setFormState({
        ...formState, // copy the old form state
        [name]: value // update the new value
      });
    }
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(formState);
      setShowError(false);
      setShowSuccess(false);
  
      try{
        const { data } = await login({
          variables: {
            ...formState
          }
        });
  
        console.log(data);
        const token = data?.login.token || '';
        const user = data?.login.user || {};
        setShowSuccess(true);
        setUserData(user);

        Auth.login(token);

        dispatch({type: LOGIN, payload: {user, token}});
        return navigate('/');
      }catch(err){
        console.error(err);
        setShowError(true);
      }
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <h3 className="labels">Email:</h3>
        <input 
          name="email" 
          type="email" 
          placeholder="email@dot.com" 
          value={formState.email}
          onChange={handleChange}
        />
        <h3 className="labels">Password:</h3>
        <input 
          name="password" 
          type="password"
          placeholder="password"
          value={formState.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
        { showError ? (
          <h4 style={{color: "red"}}>
            Wrong password!
          </h4>
        ) : (
          <></>
        )}
        { showSuccess ? (
          <h4 style={{color: "green"}}>
            Good Login! Hello, {userData.username}!
          </h4>
        ) : (
          <></>
        )}
      </form>
    )
  }