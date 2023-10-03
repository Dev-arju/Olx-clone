import React, { useState, useContext } from 'react';
import './Signup.css';
import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/FirebaseContext';
import { useHistory } from 'react-router-dom'

export default function Signup() {
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const { firebase } = useContext(FirebaseContext)

  const handleSubmit = event => {
    event.preventDefault()
    firebase.auth().createUserWithEmailAndPassword(email, password).then(result => {
      result.user.updateProfile({displayName: username}).then(() => {
        firebase.firestore().collection('users').add({
          id: result.user.uid,
          username: username,
          phone: phone
        }).then(() => {
            history.push('/login')
        })
      })
    }).catch(err => alert('password must be six characters'))
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="text"
            id="lname"
            name="phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button type='submit'>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
