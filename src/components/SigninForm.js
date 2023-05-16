import React, { useState } from 'react';

const SigninForm = ({ handleFormSubmit, handleFormData, formData }) => {
  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="email">E-mail:</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="username@gamehub.com"
        value={formData.email}
        onChange={handleFormData}
      />
      <button id="signin" type="submit">
        Sign In
      </button>
    </form>
  );
};

export default SigninForm;


