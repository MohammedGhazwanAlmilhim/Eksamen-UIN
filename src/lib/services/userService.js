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

export async function getMyFavourites() {
  const query = `*[_type == "user" && username == "mohammga"]{
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

  return { games, count };
}
