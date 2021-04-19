import { client } from "../../util/shopify";
import dotenv from "dotenv";
import Cors from "cors";
// import { createCheckOut } from "../../store/Actions";

// const env = require("../../../env-config.js");

dotenv.config({ path: "ENV_FILENAME" });

const cors = Cors({
  methods: ["GET", "HEAD"],
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await runMiddleware(req, res, cors);

      await createCheckOut(req, res);

      break;
  }
};

export const createCheckOut = async (req, res) => {
  try {
    const checkout = client.checkout.create();
    res.json({
      checkout,
    });
    console.log(checkout);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
