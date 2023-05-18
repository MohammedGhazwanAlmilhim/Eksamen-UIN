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
          name
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
    const user = await client.fetch(`*[_type == "user" && email == "${email}"][0]`);
    return user;
  } catch (error) {
    console.error("Error fetching user:", error.message);
    throw error;
  }
};

export const fetchGamesFromFavourite = async (user, favouriteGamesArray) => {
  try {
    const gameObjects = await Promise.all(
      favouriteGamesArray.map(async (favouriteGame) => {
        const gameObject = await client.fetch(`*[_id == "${favouriteGame._ref}"][0]`);
        return gameObject;
      })
    );
    return gameObjects;
  } catch (error) {
    console.error("Error fetching game objects:", error.message);
    return null;
  }
};

export const addUserFavourites = async (email, gameApiId, state) => {
  try {
    const game = await client.fetch(`*[_type == "game" && apiid == ${gameApiId}][0]`);
    const user = await getUserByEmail(email);
    let updateResult;
    const favouriteGames = user.favouriteGames || [];
    const gameRef = { _type: "reference", _ref: game._id, _key: game._id };
    
    const isFavourite = await state;

    let updatedUser;
    if (isFavourite === true) {
      const updatedfavouriteGames = await fetchGamesFromFavourite(user, favouriteGames)
        .then(games => games.filter(game => game.apiid !== gameApiId))
        .then(games => games.map(game => ({ _type: "reference", _ref: game._id, _key: game._id })));

      updatedUser = await client
        .patch(user._id)
        .set({ favouriteGames: updatedfavouriteGames })
        .commit();
    } else {
      updatedUser = await client
        .patch(user._id)
        .set({ favouriteGames: [...favouriteGames, gameRef] })
        .commit();
    }
    updateResult = updatedUser;
    return updateResult;
  } catch (error) {
    console.error("Error adding favourite game:", error.message);
    throw error;
  }
};