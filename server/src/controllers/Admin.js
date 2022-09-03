const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { Admin } = require("../models");

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: "Admin not found" });

    const decryptedPass = CryptoJS.AES.decrypt(
      admin.password,
      process.env.PASSWORD_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);

    if (decryptedPass !== password)
      return res.status(401).json({ message: "Wrong password" });

    const token = jwt.sign({ id: admin._id }, process.env.TOKEN_SECRET_KEY);
    admin.password = undefined;

    res.json({ token, admin });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
