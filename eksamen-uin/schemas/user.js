// user.js
export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
      },
      {
        name: 'favoriteGames',
        title: 'Favorite Games',
        type: 'array',
        of: [{ type: 'reference', to: { type: 'game' } }],
      },
    ],
  };
  