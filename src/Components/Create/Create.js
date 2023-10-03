import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom'
import './Create.css';
import { FirebaseContext, AuthContext } from '../../store/FirebaseContext'

const Create = () => {
  const { firebase } = useContext(FirebaseContext)
  const { user } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const history = useHistory()

  const handleSubmit = () => {
    let date = new Date();
    firebase.storage().ref(`/images/${image.name}`).put(image).then(({ref}) => {
      ref.getDownloadURL().then(url => {
        console.log(url);
        firebase.firestore().collection('products').add({
          name,
          category,
          price,
          url,
          userId: user.uid,
          createdAt: date.toDateString()
        })
        history.push('/')
      })
    })
  }
 
  return (
      <card>
        <div className="centerDiv">
          
            <label htmlFor="name">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="name"
              name="Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <br />
            <label htmlFor="category">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="category"
              name="category"
              value={category}
              onChange={e => setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="price">Price</label>
            <br />
            <input 
              className="input" 
              type="text" 
              id="price" 
              name="Price" 
              value={price} 
              onChange={e => setPrice(e.target.value)}
            />
            <br />
          
          <br />
          { image && <img alt="Posts" width="200px" height="200px" src={URL.createObjectURL(image)} />}
          
            <br />
            <input onChange={e => {
              setImage(e.target.files[0])
            }} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        
        </div>
      </card>
  );
};

export default Create;
