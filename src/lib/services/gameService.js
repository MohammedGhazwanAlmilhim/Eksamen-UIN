import client from "../sanityClient";

//This is for GameShop Section
export const getNewestGames = async () => {
  const query = `{
    "games": *[_type == "game" && references(*[_type == "genre"]._id)] | order(released desc) [0..2]{
    _id,
    apiid,
    title,
    bilde,
    timerspilt,
    sjangere[]->{
      _id,
      navn
    }
  }
  }`;
  const data = await client.fetch(query);
  return data;
};

//Hent ut de 20 nyeste spillene for visning på gameshop siden 
export const getTenLatestGames = async () => {
  const query = `{
    "games": *[_type == "game" && references(*[_type == "genre"]._id)] | order(released desc) [0..9]{
    _id,
    apiid,
    title,
    bilde,
    timerspilt,
    sjangere[]->{
      _id,
      navn
    }
    },
    "count": count(*[_type == "game" && references(*[_type == "genre"]._id)] | order(released desc) [0..9])
  }`;
  const data = await client.fetch(query);
  return data;
};




//This is for MyGames Section
export const getFourActionGames = async () => {
  const query = `{
    "games": *[_type == "game" && references(*[_type == "genre" && navn == "Action"]._id)] | order(released desc) [0..3]{
      _id,
      apiid,
      title,
      bilde ,
      timerspilt,
      sjangere[]->{
        _id,
        navn
      }
    },
    "count": count(*[_type == "game" && references(*[_type == "genre" && navn == "Action"]._id)] | order(released desc) [0..19])
  }`;
  const data = await client.fetch(query);
  return data;
};

//teller alle action spillene som er 16
export const getTweentyActionGames = async () => {
  const query = `{
    "games": *[_type == "game" && references(*[_type == "genre" && navn == "Action"]._id)] | order(released desc) [0..19]{
    _id,
    apiid,
    title,
    bilde,
    timerspilt,
    sjangere[]->{
      _id,
      navn
    }
    },
    "count": count(*[_type == "game" && references(*[_type == "genre" && navn == "Action"]._id)] | order(released desc) [0..19])
  }`;
  const data = await client.fetch(query);
  return data;
};






