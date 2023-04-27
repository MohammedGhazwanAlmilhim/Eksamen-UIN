import { newUser } from '../lib/services/userService';
import { useState } from 'react';

const SignIn = () => {
  const [formData, setFormData] = useState({email: ""});

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const {email } = formData;

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
              <h2>Logg inn</h2>
              <p>Obs: Du må bruke eposten din for å få tilgang.</p>
              <section>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="email">E-post</label>
                  <input id="email" name="email" type="email" value={formData.email} placeholder="brukernavn@hiof.no" onChange={handleChange}/>
                  <button id="signin" type='submit'>Logg inn</button>
                </form>
              </section>
            </section>
            </main>
  );
};

export default SignIn;