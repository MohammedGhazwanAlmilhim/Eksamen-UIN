import {createUser, checkUser } from "../lib/services/userService"
import {useState} from 'react'
//import { useLocalStorage } from "../functions/LocalStorage"

export default function Signin({user, setUser}) {

const [formData, setFormData] = useState({
    name: '',
    email: '',
})

const [loggedInn, setLoggedInn] = useState(false);


const handleFormData = (event) =>{
    const {name} = event.currentTarget
    const {value} = event.currentTarget
    setFormData((prev) => ({...prev, [name]: value}))
}

const init = (event) => {
    event.preventDefault()
  }
const formSubmit = async (email) => {
        const name = email.split('@')[0].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
        if (
          email === '' ||
          email.indexOf('@') === -1 ||
          email.indexOf('.') === -1
          
        ) {
          return null
        }
    
        const getExistingUsers = async (name, email) => {
          const data = await checkUser(name, email)
          return data
        }
        const userCount = await getExistingUsers(name, email)
    
        if (userCount.length > 0) {
          /* HAM: Bruker eksisterer, trenger ikke lage ny. Setter i stedet navn i localStorage */
          const userArray = Object.values(userCount[0])
          console.log("bruker finnes")
          setUser(userArray)
          setLoggedInn(true)       
        } else {
            console.log("bruker finnes ikke")
          /* HAM: Bruker eksisterer ikke. Sett inn bruker i databasen. Lagre navn i localStorage */
          try {
            await createUser(name, email)
          } catch (error) {
            console.log(error.message)
          }
          setUser([email, name])
          setLoggedInn(true)
        }
    }

return user.length !== 0 ? (
        <>
          <p>Logget inn</p>
          {setTimeout(() => {
            window.location.href = '/dashboard'
          }, 500)}
        </>
      ) :  (
        <main>
        <section id="signin">
          <h2>Sign In</h2>
          <section>
            <form onSubmit={init}>
              <label htmlFor="email">E-mail:</label>
              <input id="email" name="email" type="email" placeholder="username@gamehub.com" value={formData.email} onChange={handleFormData} />
              <button id="signin" onClick={() => {formSubmit(formData.email)}}>Sign In</button>

            </form>
          </section>
        </section>
      </main>
   )
}