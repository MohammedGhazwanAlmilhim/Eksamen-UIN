import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: 'slkz8ylx',
  dataset: 'production',
  apiVersion: '2023-05-14',
  token: 'skFl8THgzlE5OhUaTcJRV8aPlsOSb7k4p3tfcHschnUqsNagl0Amt1fF5aKzD5pm9sZaC1uDThWG0qzXv6ZnQEXNNOJ4D3cgZE1Sgldg6hC2G7sI6Qp0dPkVYH0lMFMdV3fLl1x6aF5BdpkFTrT78dXJMhZABywJ6eJTtaZqN1KrEixnvIon',
  useCdn: false,
  ignoreBrowserTokenWarning: true,
});

export default sanityClient;
