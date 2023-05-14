import client from "../sanityClient";

//This is for GameShop Section
export const getNewestGames = async () => {
  const query = `*[_type == "game" && references(*[_type == "genre"]._id)] | order(released desc) [0..2]{
    _id,
    apiid,
    title,
    bilde ,
    sjangere[]->{
      _id,
      navn
    }
  }`;
  const response = await client.fetch(query);
  return response;
};

//Hent ut de 20 nyeste spillene for visning på gameshop siden 
export const getTenLatestGames = async () => {
  const query = `*[_type == "game" && references(*[_type == "genre"]._id)] | order(released desc){
    _id,
    apiid,
    title,
    bilde ,
    sjangere[]->{
      _id,
      navn
    }
  }`;
  const response = await client.fetch(query);
  return response;
};



//This is for MyGames Section
export const getFourActionGames = async () => {
  const query = `{
    "games": *[_type == "game" && references(*[_type == "genre" && navn == "Action"]._id)] | order(released desc) [0..3]{
      _id,
      apiid,
      title,
      bilde ,
      sjangere[]->{
        _id,
        navn
      }
    },
    "count": count(*[_type == "game" && references(*[_type == "genre"]._id)])
  }`;
  const response = await client.fetch(query);
  return response;
};


export const getTweentyActionGames = async () => {
  const query = `*[_type == "game" && references(*[_type == "genre" && navn == "Action"]._id)] | order(released desc){
    _id,
    apiid,
    title,
    bilde ,
    sjangere[]->{
      _id,
      navn
    }
  }`;
  const response = await client.fetch(query);
  console.log(response);
  return response;
};







