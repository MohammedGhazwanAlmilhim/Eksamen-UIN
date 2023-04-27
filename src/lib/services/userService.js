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

export const getMyFavourites = async () => {
  const query = `
  {
    "games": *[_type == "user" && username == "mohammga"][1].favoriteGames[]-> {
      _id,
      apiid,
      title,
      description,
      img,
    }
  }
  `;
  const response = await client.fetch(query);
  console.log(response);
  return response;
};