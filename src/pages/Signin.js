import React, { useState } from 'react';
import SigninForm from '../components/SigninForm';
import { createUser, checkUser } from "../lib/services/userService";

export default function Signin({ user, setUser }) {
  const [formData, setFormData] = useState({ email: "", name: "" });
  const [signedIn, setSignedIn] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);

  //se på setFormData

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email } = formData;
    const name = email.split('@')[0].replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');

    if (!email || email.indexOf('@') === -1 || email.indexOf('.') === -1) return null;

    if (!email.endsWith('@gamehub.com')) {
      setInvalidEmail(true);
      return;
    }

    try {
      const [user] = await checkUser(name, email);
      await (user ? setUser([user.email, user.name]) : createUser(name, email));
      setSignedIn(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  return user.length !== 0 ? (
    <> 
    {window.location.href = '/dashboard'}
    </>
  ) : (
    <main>
      <section id="signin">
        <h2>Sign In</h2>
        <section>
          <SigninForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
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
