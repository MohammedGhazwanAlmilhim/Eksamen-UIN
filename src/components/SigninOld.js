import { getUserByEmail, createUser } from '../lib/services/userService';

export default function Signin({setLogginn, logginn, exists, setExists}){
    const handleSubmit = (e) =>{
        e.preventDefault() 
    }
    const handleChange = (e) =>{
        const inputName = e.target.name
        const inputValue = e.target.value
        setLogginn((prev) => ({...prev,[inputName]: inputValue}))
    }
    
    const handleClick = async () => {
        const fetchedUser = await getUserByEmail(logginn.email);
        if (fetchedUser) {
          setExists(true);
          //navigate to dashboard
          window.location.href = "/dashboard";
        } else {
          const newUser = await createUser(logginn.email);
          if (newUser) {
            setExists(false);
            alert("A new user has been created.");
            //navigate to dashboard
            window.location.href = "/dashboard";
          } else {
            alert("Failed to create a new user.");
          }
        }
      };
      
    return(
        <main>
      <section id="signin">
        <h2>Sign In</h2>
        <p>Note: You must use your email to gain access.</p>
        <section>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">E-post</label>
            <input id="email" name="email" type="email" placeholder="brukernavn@hiof.no" onChange={handleChange}/>
            <button id="signin" onClick={handleClick}>Sign In</button>
          </form>
        </section>
      </section>
      </main>
    )
}
