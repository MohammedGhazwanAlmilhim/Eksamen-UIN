import { newUser } from '../lib/services/userService';
import { useState } from 'react';

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email } = formData;

    try {
      await newUser(email);
      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);
      alert("An error occurred while creating user.");
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <main>
      <section id="signin">
        <h2>Sign In</h2>
        <p>Note: You must use your email to gain access.</p>
        <section>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">E-mail:</label>
            <input id="email" name="email" type="email" value={formData.email} placeholder="username@hiof.no" onChange={handleChange} />
            <button id="signin" type='submit'>Sign In</button>
          </form>
        </section>
      </section>
    </main>
  );
};

export default SignIn;