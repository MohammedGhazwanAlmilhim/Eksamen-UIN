import { getUserByEmail } from '../lib/services/userService';

export default function Signin({setLogginn, logginn, exists, setExists}){
    const handleSubmit = (e) =>{
        e.preventDefault() 
    }
    const handleChange = (e) =>{
        const inputName = e.target.name
        const inputValue = e.target.value
        setLogginn((prev) => ({...prev,[inputName]: inputValue}))
    }
    console.log(logginn)
    
    const handleClick = async () => {
        const fetchedUser = await getUserByEmail(logginn.email);
        if (fetchedUser) {
          setExists(true);
          //navigate to dashboard
          window.location.href = "/dashboard";
        } else {
          setExists(false);
        }
      };
      
    console.log(exists)
    return(
        <main>
      <section id="signin">
        <h2>Logg inn</h2>
        <p>Obs: Du må bruke eposten din for å få tilgang.</p>
        <section>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">E-post</label>
            <input id="email" name="email" type="email" placeholder="brukernavn@hiof.no" onChange={handleChange}/>
            <button id="signin" onClick={handleClick}>Logg inn</button>
          </form>
        </section>
      </section>
      </main>
    )
}
