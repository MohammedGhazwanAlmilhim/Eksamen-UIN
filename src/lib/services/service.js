import client from "../sanityClient";

export async function getAllGenres() {
  const query = `*[_type == "genre"]`;
  const response = await client.fetch(query);
  return response;
}

//This is for GameShop Section
export const getNewestGames = async () => {
  const query = `*[_type == "game"] | order(released desc) [0..2]`;
  const response = await client.fetch(query);
  return response;
};

//This is for MyGames Section
export const getActionGames = async () => {
  const query = `*[_type == "game" && references(^._id) && genre.navn == "Action"] | order(releaseDate desc) [0..3]`;
  const response = await client.fetch(query, { _id: 'genreId' });
  console.log(response);
  return response;
};
