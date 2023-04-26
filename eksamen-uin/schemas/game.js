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
        options: {
          source: 'title',
          slugify: input => input
                         .toLowerCase()
                         .replace(/\s+/g, '-')
                         .slice(0, 200)
        }
      },
      {
        name: 'apiid',
        title: 'API-id',
        type: 'number',
      },
      {
        name: 'timerspilt',
        title: 'Timer spilt',
        type: 'string',
      },
      {
        name: 'sjangere',
        title: 'Sjangere',
        type: 'array',
        of: [{ type: 'reference', to: { type: 'genre' } }],
      },
      {
        name: 'bilde',
        title: 'Bilde',
        type: 'url',
      },
    ],
  }