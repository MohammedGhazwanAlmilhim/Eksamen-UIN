import client from '../sanityClient'


// Funksjon for å hente alle brukere fra databasen
export const getAllUsers = async () => {
  try {
    // Utfør en API-forespørsel for å hente alle brukere fra Snity-databasen
    const data = await client.fetch(`*[_type == "user"]{_id, name, email}[...]`);

    // Returner brukerne
    return data;
  } catch (error) {
    console.log('Feil under henting av brukere:', error.message);
    // Håndter feilen her, for eksempel vis en feilmelding til brukeren
    return null;
  }
};




// Funksjon for å sjekke om en bruker eksisterer i databasen
export const checkUser = async (name, email) => {
  try {
    // Utfør en API-forespørsel for å sjekke om brukeren eksisterer i Snity-databasen
    const data = await client.fetch(
      `*[_type == "user" && name == $name && email == $email]{name, email}`,
      { name, email }
    );

    // Returner brukeren
    return data;
  } catch (error) {
    console.log('Feil under sjekk av bruker:', error.message);
    // Håndter feilen her, for eksempel vis en feilmelding til brukeren
    return null;
  }
};



// Funksjon for å opprette en ny bruker i databasen
export const createUser = async (name, email) => {
  try {
    // Utfør en API-forespørsel for å opprette en ny bruker i Snity-databasen
    const newUser = { _type: 'user', name, email };
    const createdUser = await client.create(newUser);

    // Returner den opprettede brukeren
    return createdUser;
  } catch (error) {
    console.log('Feil under opprettelse av bruker:', error.message);
    // Håndter feilen her, for eksempel vis en feilmelding til brukeren
    return null;
  }
};


//Denne funksjonen brukes til å hente alle spill som ligger i favorittlisten i DB
//viser spillene i MyFavourites Komponenten
export async function getUserFavourites(name, email) {
    const data = await client.fetch(`*[_type == "user" && name == '${name}' && email == '${email}']{
      name,
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
    }`);
  
    const games = data[0].favoriteGames;
    const count = data[0].count;
    return { games, count };
  }


//Denne funksjonen brukes til å legge spill på favoritt listen til brukeren
//brukes i GameProfile Komponenten


// addfavorite virker som den skal, men når man lager en ny bruker så klarer man ikke å legge til spil i favorit listen sin.
// løsningen på det er å loge ut og logein igjen med samme gmail adresse så vil brukeren kunne legge til i favorit listen sin.
// dette må fikses 
export const addUserFavourites = async (email, gameApiId) => {
  try {
    const game = await client.fetch(`*[_type == "game" && apiid == ${gameApiId}][0]`);
    const user = await client.fetch(`*[_type == "user" && email == "${email}"][0]`);

    const favoriteGames = user.favoriteGames || [];
    const gameRef = {_type: 'reference', _ref: game._id, _key: game._id};

    const updatedFavoriteGames = [...favoriteGames, gameRef];

    const updatedUser = await client
      .patch(user._id)
      .set({favoriteGames: updatedFavoriteGames})
      .commit();
    console.log(updatedUser);
    return updatedUser;
  } catch (error) {
    console.error('Error adding favorite game:', error.message);
    return null;
  }
};


// funksjon som kan brukes til å fjerne et favorittspill fra brukerens favorittliste:
export const removeUserFavorite = async (email, gameApiId) => {
  try {
    const game = await client.fetch(`*[_type == "game" && apiid == ${gameApiId}][0]`);
    const user = await client.fetch(`*[_type == "user" && email == "${email}"][0]`);

    const favoriteGames = user.favoriteGames || [];
    const updatedFavoriteGames = favoriteGames.filter((favGame) => favGame._ref !== game._id);

    const updatedUser = await client
      .patch(user._id)
      .set({ favoriteGames: updatedFavoriteGames })
      .commit();
    
    console.log(updatedUser);
    return updatedUser;
  } catch (error) {
    console.error('Error removing favorite game:', error.message);
    return null;
  }
};


  
  
  
  //?
  export const getUserWithGame = async (email) => {
    const query = `*[ _type == "user" && email == "${email}" ][0]{
      ...,
      favoriteGames[]->{ _id, _ref }
    }`;
    const result = await client.fetch(query);
    return result;
  };
  