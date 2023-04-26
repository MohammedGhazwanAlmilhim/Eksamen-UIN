import client from "../sanityClient";

export const getAllGames = () => {
    return client.fetch('*[_type == "game"]');
  };
  export async function getAllGenres() {
    const query = `*[_type == "genre"]`;
    const response = await client.fetch(query);
    return response;
  }
  
  