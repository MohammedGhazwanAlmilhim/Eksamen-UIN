import { newUser } from '../lib/services/userService';
import { useState } from 'react';

const SignUp = () => {
    const [formData, setFormData] = useState({ username: "", email: ""});
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const { username, email } = formData;

      newUser(username, email)

    };
  
    const handleChange = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>
        <label>
          E-mail:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <button type="submit">Sign up</button>
      </form>
    );
  };
  
  export default SignUp;