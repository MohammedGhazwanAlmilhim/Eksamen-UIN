import React, { useState } from 'react';
import SigninForm from './SigninForm';
import { createUser, checkUser } from "../lib/services/userService";

export default function Signin({ user, setUser}) {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
  });

  const [loggedIn, setLoggedIn] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);

  const handleFormData = (event) => {
    const { name, value } = event.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const init = (event) => {
    event.preventDefault();
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const email = formData.email;
    const name = email.split('@')[0].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');

    if (!email || email.indexOf('@') === -1 || email.indexOf('.') === -1) {
      return null;
    }

    if (!email.endsWith('@gamehub.com')) {
      setInvalidEmail(true); 
      return;
    }

    try {
      const userCount = await checkUser(name, email);

      if (userCount.length > 0) {
        const email = userCount[0].email;
        const name = userCount[0].name;
        console.log('Brukeren finnes');
        setUser([email, name]);
        setLoggedIn(true);
    } else {
        console.log('Brukeren finnes ikke');
        await createUser(name, email);
        setUser([email, name]);
        setLoggedIn(true);
    }
    
    } catch (error) {
      console.log(error.message);
    }
  };

  return user.length !== 0 ? (
    <>
      <p>Logget inn</p>
      {setTimeout(() => {
        window.location.href = '/dashboard';
      }, 500)}
    </>
  ) : (
    <main>
      <section id="signin">
        <h2>Sign In</h2>
        <section>
          <SigninForm
            handleFormSubmit={handleFormSubmit}
            handleFormData={handleFormData}
            formData={formData}
          />
          {invalidEmail && (
            <p>Ugyldig e-postadresse. Vennligst bruk en "@gamehub.com" adresse.</p>
          )}
        </section>
      </section>
    </main>
  );
}