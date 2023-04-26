import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: 'slkz8ylx',
  dataset: 'production',
  useCdn: true,
});
