import client from '../sanityClient'

export const getUserByEmail = async (email) => {
    const query = `*[ _type == "user" && email == "${email}" ]`;
    const result = await client.fetch(query);
    return result[0];
  };