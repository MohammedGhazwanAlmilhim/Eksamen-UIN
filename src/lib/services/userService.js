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

export const getUserFavourites = async (name, email) => {
  const query = `{
    "games": *[ _type == "user" && name == '${name}' && email == '${email}' ] {
      name,
      email,
       favouriteGames[]->{
        title,
        "slug": slug.current, 
        apiid,
        hoursplayed,
        "img": img.asset->url,
        released,
        genres[]->{
          navn
        }
      },

    "count": count(favouriteGames[])
    }
  }`;

  const data = await client.fetch(query);
  return data;
};



export const getUserByEmail = async (email) => {
  try {
    // Fetch the user from the database based on the provided email
    const user = await client.fetch(`*[_type == "user" && email == "${email}"][0]`);
    return user;
  } catch (error) {
    console.error("Error fetching user:", error.message);
    throw error;
  }
};


//SLETTE????

export async function fetchGamesFromFavorite(user, favouriteGamesArray) {
  try {
    const gameObjects = await Promise.all(
      user.favouriteGames.map(favouriteGamesArray => client.fetch(`*[_id == "${favouriteGamesArray._ref}"][0]`))
    );
    //console.log(gameObjects)
    return gameObjects;
  } catch (error) {
    console.error("Error fetching game objects:", error.message);
    return null
  }
};

//Denne funksjonen brukes til å legge spill på favoritt listen til brukeren
//brukes i GameProfile Komponenten
// UserService.js

// Import the necessary dependencies

export const addUserFavourites = async (email, gameApiId, state) => {
  try {
    // Fetch the game and user from the database based on the provided parameters
    const game = await client.fetch(`*[_type == "game" && apiid == ${gameApiId}][0]`);
    const user = await getUserByEmail(email);
    let updateResult;
    const favouriteGames = user.favouriteGames || [];
    const gameRef = { _type: "reference", _ref: game._id, _key: game._id };
    //console.log(state);
    
    const isFavorite = await state; // Await the promise to get the actual boolean value
    //console.log(isFavorite);

    if (isFavorite === true) {
      // Remove the game from the user's favorite games
      let updatedfavouriteGames = await fetchGamesFromFavorite(user, favouriteGames);
      //console.log(updatedfavouriteGames);
    
      updatedfavouriteGames = updatedfavouriteGames
        .filter((game) => game.apiid !== gameApiId)
        .map((game) => ({
          _type: "reference",
          _ref: game._id,
          _key: game._id,
        }));
    
      //console.log(updatedfavouriteGames);
    
      let updatedUser = await client
        .patch(user._id)
        .set({ favouriteGames: updatedfavouriteGames })
        .commit();
    
      //console.log(updatedUser);
      updateResult = updatedUser;
    } else {
      // Add the game to the user's favorite games
      let updatedUser = await client
        .patch(user._id)
        .set({ favouriteGames: [...favouriteGames, gameRef] })
        .commit();

      //console.log(updatedUser);
      updateResult = updatedUser;
    }
    return updateResult;
  } catch (error) {
    console.error("Error adding favorite game:", error.message);
    throw error;
  }
};





  
  
