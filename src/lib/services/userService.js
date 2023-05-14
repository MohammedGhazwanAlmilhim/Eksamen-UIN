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

//Denne funksjonen brukes til å hente alle spill som ligger i favorittlisten i DB
//viser spillene i MyFavourites Komponenten
export async function getMyFavourites(email) {
  console.log(email)
    const query = `*[_type == "user" && email == '${email}']{
      name,
      email,
      "favoriteGames": favoriteGames[]->{
        title,
        slug,
        apiid,
        timerspilt,
        sjangere[]->{
          navn
        },
        bilde,
        released
      },
      "count": count(favoriteGames)
    }`;
    console.log(query)
  
    const result = await client.fetch(query);
    
    console.log(result)
    const games = result[0].favoriteGames;
    const count = result[0].count;
  
    console.log(games)
    console.log(count)

    console.log(games);
  
    return { games, count };
    
  }

//Denne funksjonen brukes til å legge spill på favoritt listen til brukeren
//brukes i GameProfile Komponenten
export const addFavoriteGame = async (email, gameApiId) => {
  try {
    const game = await client.fetch(`*[_type == "game" && apiid == ${gameApiId}][0]`);
    const user = await client.fetch(`*[_type == "user" && email == "${email}"][0]`);

    let favoriteGames = user.favoriteGames;
    if (!Array.isArray(favoriteGames)) {
      favoriteGames = [];
    }

    const gameRef = {_type: 'reference', _ref: game._id, _key: game._id};

    const updatedUser = await client
      .patch(user._id)
      .set({favoriteGames: [...favoriteGames, gameRef]})
      .commit();

    console.log(updatedUser);
    return updatedUser;
  } catch (error) {
    console.error('Error adding favorite game:', error.message);
  }
};


  
  
  
  //?
  export const getUserWithGame = async (email) => {
    const query = `*[ _type == "user" && email == "${email}" ][0]{
      ...,
      favoriteGames[]->{ _id, _ref }
    }`;
    const result = await client.fetch(query);
    return result;
  };
  