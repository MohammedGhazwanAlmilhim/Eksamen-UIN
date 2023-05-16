import client from '../sanityClient'

export const getAllUsers = async () =>{
    const data = await client.fetch(`*[_type == "user"]{_id, name, email}[...]`)
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
        throw new Error(error);
    }
}

//Denne funksjonen brukes til å hente alle spill som ligger i favorittlisten i DB
//viser spillene i MyFavourites Komponenten
export async function getUserFavourites(name, email) {
    const data = await client.fetch(`*[_type == "user" && name == '${name}' && email == '${email}']{
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
    }`);
  
    const games = data[0].favoriteGames;
    const count = data[0].count;
    return { games, count };
  }


//Denne funksjonen brukes til å legge spill på favoritt listen til brukeren
//brukes i GameProfile Komponenten
export const addUserFavourites = async (email, gameApiId) => {
  try {
    const game = await client.fetch(`*[_type == "game" && apiid == ${gameApiId}][0]`);
    const user = await client.fetch(`*[_type == "user" && email == "${email}"][0]`);

    // Check if the game already exists in the user's favorite games
    const isGameAlreadyAdded = user.favoriteGames && user.favoriteGames.some(favGame => favGame._ref === game._id);
    if (isGameAlreadyAdded) {
      console.log('Game already added to favorites.');
      return;
    }

    const favoriteGames = user.favoriteGames || [];
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


//Her er en funksjon som kan sjekke om spillet er lagret i favorittlisten til brukeren:

  export const checkFavoriteGame = async (email, gameApiId) => {
    const data = await client.fetch(
      `*[_type == "user" && email == $email && favoriteGames[]._ref == $gameApiId]`,
      { email, gameApiId }
    );
    return data.length > 0;
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

  