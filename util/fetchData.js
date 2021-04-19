// import dotenv from "dotenv";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// const baseURL = `${BASE_URL}/api/${url}`;

export const getData = async (url) => {
  // const reqUrl = `${server}`;
  // dotenv.config({ path: "ENV_FILENAME" });

  const res = await fetch(`${BASE_URL}/api/${url}`, {
    method: "GET",
    origin: "*",
    headers: {
      "User-Agent": "*",
      Accept: "application/json; charset=UTF-8",
    },
  });

  const data = await res.json({});

  return data;
};
export const postData = async (url, post, token) => {
  // const baseURL = `${BASE_URL}/api/${url}`;

  const res = await fetch(`${BASE_URL}/api/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

      Authorization: token,
    },
    body: JSON.stringify(post),
  });
  const data = await res.json();
  return data;
};
export const putData = async (url, post, token) => {
  const res = await fetch(`${server}/api/${url}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(post),
  });
  const data = await res.json();
  return data;
};
