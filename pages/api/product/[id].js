import dbConnect from "../../../util/dbConnect";
import dotenv from "dotenv";

import Products from "../../../Models/productModel";
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

      await getProduct(req, res);

      break;
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.query;

    const product = await Products.findById(id);
    if (!product) return res.status(400).json("This product does not exist");
    res.json({
      product,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
