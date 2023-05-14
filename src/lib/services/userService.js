import client from '../sanityClient'

//henter bruker
export const getUserByEmail = async (email) => {
    const query = `*[ _type == "user" && email == "${email}" ]`;
    const result = await client.fetch(query);
    return result[0];
  };

//lage bruker
export const createUser = async (email) =>{
    await client.create({_type: 'user', email: email})
}

export const newUser = async (email) => {
  const user = { _type: 'user', email };
  await client.create(user);
};


export async function getMyFavourites(email) {
  console.log(email);
  const query = `*[_type == "user" && email == '${email}']{
    username,
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

  const result = await client.fetch(query);
  const games = result[0].favoriteGames;
  const count = result[0].count;

  console.log(games);

  return { games, count };
  
}




export const addFavoriteGame = async (email, gameApiId) => {
  try {
    const game = await client.fetch(`*[_type == "game" && apiid == ${gameApiId}][0]`);
    const user = await client.fetch(`*[_type == "user" && email == "${email}"][0]`);

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




export const getUserWithGame = async (email) => {
  const query = `*[ _type == "user" && email == "${email}" ][0]{
    ...,
    favoriteGames[]->{ _id, _ref }
  }`;
  const result = await client.fetch(query);
  return result;
};
