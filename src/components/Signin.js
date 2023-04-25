export default function Signin() {
    const handleSignIn = (event) => {
      event.preventDefault(); // prevent default form submission behavior
  
      const emailInput = document.getElementById("email");
      const emailValue = emailInput.value.trim();
      
      // email validation regex pattern
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (emailValue === "") {
        alert("Vennligst fyll ut e-postadresse");
        emailInput.focus();
      } else if (!emailPattern.test(emailValue)) {
        alert("Vennligst fyll ut en gyldig e-postadresse");
        emailInput.focus();
      } else {
        // valid email, navigate to dashboard
        window.location.href = "/dashboard";
      }
    }
  
    return (
    <main>
      <section id="signin">
        <h2>Logg inn</h2>
        <p>Obs: Du må bruke eposten din for å få tilgang.</p>
        <section>
          <form>
            <label htmlFor="email">E-post</label>
            <input id="email" name="email" type="email" placeholder="brukernavn@hiof.no"/>
            <button id="signin" onClick={handleSignIn}>Logg inn</button>
          </form>
        </section>
      </section>
      </main>
    )
  }
  