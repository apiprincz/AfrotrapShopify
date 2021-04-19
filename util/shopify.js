import Client from "shopify-buy";

// Initializing a client to return content in the store's primary language
export const client = Client.buildClient({
  domain: process.env.DOMAIN,
  storefrontAccessToken: process.env.STOREFRONT_ACCESS_TOKEN,
  "Access-Control-Allow-Origin": " * ",

  // "Access-Control-Allow-Origin": "http://localhost:3000 ",
  // "Access-Control-Allow-Methods": "POST",
  // "Access-Control-Allow-Headers": "Content-Type, Authorization",
});
// Access-Control-Allow-Origin:  http://127.0.0.1:3000
