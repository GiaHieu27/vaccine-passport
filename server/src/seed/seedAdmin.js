const CryptoJS = require("crypto-js");
const { Admin } = require("../models");

exports.createAdmin = async () => {
  const username = process.env.DEFAULT_ADMIN_USERNAME;
  const password = process.env.DEFAULT_ADMIN_PASSWORD;

  try {
    const admin = await Admin.findOne({ username });
    if (admin !== null) return true;
    const newAdmin = new Admin({
      username,
      password: CryptoJS.AES.encrypt(password, process.env.PASSWORD_SECRET_KEY),
    });
    await newAdmin.save();
  } catch (error) {
    console.log(error);
    return false;
  }
};
