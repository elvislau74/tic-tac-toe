import { useState } from "react";
import { ADD_USER } from '../utils/mutations';
import { useMutation } from "@apollo/client";
import Auth from '../utils/auth';
import { useNavigate } from "react-router-dom";
import { useLogin } from "../utils/LoginContext";
import { SIGNUP } from "../utils/actions";

// Signup form
export default function SignupForm (props) {
    const navigate = useNavigate();
    const [formState, setFormState ] = useState({
      username: '',
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
  
    const [signup, { error }] = useMutation(ADD_USER, {
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
        const { data } = await signup({
          variables: {
            ...formState
          }
        });
  
        const token = data?.addUser.token || '';
        const user = data?.addUser.user || {};
        setShowSuccess(true);
        setUserData(user);

        Auth.login(token);

        dispatch({type: SIGNUP, payload: {user, token}});
        return navigate('/');
      }catch(err){
        console.error(err);
        setShowError(true);
      }
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <h3 className="labels">Username:</h3>
        <input 
          name="username" 
          type="text" 
          placeholder="username" 
          value={formState.username}
          onChange={handleChange}
        />
        <h3 className="labels">Email:</h3>
        <input 
          name="email" 
          type="email" 
          placeholder="email" 
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
        <button type="submit">Signup</button>
        { showError ? (
          <h4 style={{color: "red"}}>
            Error in signup, please try again!
          </h4>
        ) : (
          <></>
        )}
        { showSuccess ? (
          <h4 style={{color: "green"}}>
            Welcome, {userData.username}!
          </h4>
        ) : (
          <></>
        )}
      </form>
    )
  }