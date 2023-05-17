const SigninForm = ({ handleSubmit, handleChange, formData }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">E-mail:</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="username@gamehub.com"
        value={formData.email}
        onChange={handleChange}
      />
      <button id="signin" type="submit">Sign In</button>
    </form>
  );
};

export default SigninForm;