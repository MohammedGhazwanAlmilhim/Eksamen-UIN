export default {
  name: 'game',
  title: 'Game',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
    },
    {
      name: 'apiid',
      title: 'API-id',
      type: 'number',
    },
    {
      name: 'hoursplayed',
      title: 'Hours Played',
      type: 'string',
    },
    {
      name: 'genres',
      title: 'Genres',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'genre' } }],
    },
    {
      name: 'img',
      title: 'Image',
      type: 'image',
    },
    {
      name: 'released',
      title: 'Released date',
      type: 'date',
    },
    {
      name: 'steamlink',
      title: 'Steam Link',
      type: 'url',
    },
  ],
}