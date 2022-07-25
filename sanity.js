import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Connection to backend
const client = sanityClient({
  projectId: "9ajpyqen",
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-10-21",
});

// Helper function to get image url
const builder = imageUrlBuilder(client);
export const getImageUrl = (source) => builder.image(source);

// RUN this to add exception for localhost 3000 CORS policy
// sanity cors add http://localhost:3000

export default client;
