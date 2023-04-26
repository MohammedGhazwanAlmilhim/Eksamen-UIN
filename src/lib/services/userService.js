import client from '../sanityClient'

//henter bruker
export const getUserByEmail = async (email) => {
    const query = `*[ _type == "user" && email == "${email}" ]`;
    const result = await client.fetch(query);
    return result[0];
  };

//lage bruker
export const createUser = async (userId, newEmail) => {
    const patch = {
      set: { email: newEmail },
    };
    try {
      await client.patch(userId).set(patch).commit();
    } catch (error) {
      throw new Error(error);
    }
  };
  