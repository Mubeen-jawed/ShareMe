import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: true, // set to `true` to fetch from edge cache
  apiVersion: '2023-04-27', // use current date (YYYY-MM-DD) to target the latest API version
  token: process.env.REACT_APP_SANITY_TOKEN // Only if you want to update content with the client
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)