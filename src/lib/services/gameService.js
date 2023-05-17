import client from "../sanityClient";

export const getSteamLink = async (id) => {
  const query = `*[_type == "game" && apiid == ${id} && references(*[_type == "genre"]._id)]{
    _id,
    "slug": slug.current, 
    apiid,
    title,
    "bilde": bilde.asset->url,
    steamlink,
    timerspilt,
    sjangere[]->{
      _id,
      navn
    }
  }`;

  const data = await client.fetch(query);
  return data;
};


export const getNewestGames = async () => {
  const query = `{
    "games": *[_type == "game" && references(*[_type == "genre"]._id)] | order(released desc) [0..2]{
    _id,
    "slug": slug.current, 
    apiid,
    title,
    "bilde": bilde.asset->url,
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


export const getTenLatestGames = async () => {
  const query = `{
    "games": *[_type == "game" && references(*[_type == "genre"]._id)] | order(released desc) [0..9]{
    _id,
    "slug": slug.current, 
    apiid,
    title,
    "bilde": bilde.asset->url,
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



export const getFourActionGames = async () => {
  const query = `{
    "games": *[_type == "game" && references(*[_type == "genre" && navn == "Action"]._id)] | order(released desc) [0..3]{
      _id,
      "slug": slug.current, 
      apiid,
      title,
      "bilde": bilde.asset->url,
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

export const getTweentyActionGames = async () => {
  const query = `{
    "games": *[_type == "game" && references(*[_type == "genre" && navn == "Action"]._id)] | order(released desc) [0..19]{
    _id,
    "slug": slug.current, 
    apiid,
    title,
    "bilde": bilde.asset->url,
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






