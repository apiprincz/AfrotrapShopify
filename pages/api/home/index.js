import dbConnect from "../../../util/dbConnect";
import dotenv from "dotenv";

import Home from "../../../Models/homeModel";
import Cors from "cors";

dotenv.config({ path: "ENV_FILENAME" });

dbConnect();
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

      await getHomes(req, res);

      break;
  }
};

const getHomes = async (req, res) => {
  try {
    const homes = await Home.find({});
    res.json({
      status: "success",
      result: JSON.stringify(homes.length),
      homes,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
