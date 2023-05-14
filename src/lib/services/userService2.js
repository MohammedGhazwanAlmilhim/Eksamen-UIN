import client from '../sanityClient'


export const fetchAllUsers = async () =>{
    const data = await client.fetch(`*[_type == "user"]{_id, name, email}[0...5]`)
    return data
}

export const checkUser = async (name, email) => {
    const data = await client.fetch(
    `*[_type == "user" && name == $name && email == $email]{name,email}`, 
    {name, email}
    )
    return data
}

export const createUser = async (name, email) =>{
    try{
        await client.create({_type: 'user', name, email})
    }
    catch(error){
        throw new Error(error)
    }
}