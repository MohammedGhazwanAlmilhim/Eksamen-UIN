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

//SLETTE????

export async function fetchGamesFromFavorite(user, favoriteGamesArray) {
  try {
    const gameObjects = await Promise.all(
      user.favoriteGames.map(favoriteGamesArray => client.fetch(`*[_id == "${favoriteGamesArray._ref}"][0]`))
    );
    //console.log(gameObjects)
    return gameObjects;
  } catch (error) {
    console.error("Error fetching game objects:", error.message);
    return null
  }
  return null
};

//Denne funksjonen brukes til å hente alle spill som ligger i favorittlisten i DB
//viser spillene i MyFavourites Komponenten
export async function getUserFavourites(name, email) {
  const data = await client.fetch(`*[_type == "user" && name == '${name}' && email == '${email}']{
    name,
    email,
    "favoriteGames": favoriteGames[]->{
      title,
      "slug": slug.current, 
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

  // Check if data array has at least one element
  if (data && data.length > 0) {
    const games = data[0].favoriteGames;
    const count = data[0].count;
    return { games, count };
  } else {
    // Return empty array and count 0 if no user was found
    return { games: [], count: 0 };
  }
}

























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
    const favoriteGames = user.favoriteGames || [];
    const gameRef = { _type: "reference", _ref: game._id, _key: game._id };
    //console.log(state);
    
    const isFavorite = await state; // Await the promise to get the actual boolean value
    //console.log(isFavorite);

    if (isFavorite === true) {
      // Remove the game from the user's favorite games
      let updatedFavoriteGames = await fetchGamesFromFavorite(user, favoriteGames);
      //console.log(updatedFavoriteGames);
    
      updatedFavoriteGames = updatedFavoriteGames
        .filter((game) => game.apiid !== gameApiId)
        .map((game) => ({
          _type: "reference",
          _ref: game._id,
          _key: game._id,
        }));
    
      //console.log(updatedFavoriteGames);
    
      let updatedUser = await client
        .patch(user._id)
        .set({ favoriteGames: updatedFavoriteGames })
        .commit();
    
      //console.log(updatedUser);
      updateResult = updatedUser;
    } else {
      // Add the game to the user's favorite games
      let updatedUser = await client
        .patch(user._id)
        .set({ favoriteGames: [...favoriteGames, gameRef] })
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





  
  
