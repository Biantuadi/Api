const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const newUser = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });

    newUser
      .save()
      .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
      .catch((err) => {
        if (err.message.includes("name"))
          res.status(409).json({ error: err, name: "Nom déjà pris !" });

        if (err.message.includes("email"))
          res.status(409).json({ error: err, email: "Email déjà utilisé !" });
      });
  });
};

exports.login = (req, res) => {
  userModel
    .findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ email: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ password: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              {
                userId: user._id,
                role: user.role,
              },
              process.env.JWT_KEY,
              { expiresIn: "24h" }
            ), 
          });
        })
        .catch((err) => res.status(500).json({ error: err }));
    })
    .catch((err) => res.status(500).json({ error: err }));
};

exports.users = (req, res) => {
  userModel
    .find()
    .select("-password")
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(500).json({ error: err }));
};

exports.user = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_KEY);
  const userId = decodedToken.userId;
  const role = decodedToken.role;

  if (role === "admin" || userId === req.params.id) {
    userModel
      .findOne({ _id: req.params.id })
      .select("-password")
      .then((user) => res.status(200).json(user))
      .catch((err) => res.status(500).json({ error: err }));
  }
};

exports.update = (req, res) => {
  if (
    req.body.bio === undefined ||
    req.body.adress === undefined ||
    req.body.bio === "" ||
    req.body.adress === ""
  )
    return res.status(400).json({ error: "Champs manquants !" });

  // get user data
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_KEY);
  const userId = decodedToken.userId;

  userModel.findOne({ _id: userId }).then((user) => {
    const oldBio = user.bio;
    const oldAdress = user.adress;

    if (oldBio === req.body.bio || oldAdress === req.body.adress)
      return res.status(400).json({ error: "Aucune modification !" });

    userModel
      .updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: "Utilisateur modifié !" }))
      .catch((err) => res.status(500).json({ error: err }));
  });
};

exports.delete = (req, res) => {
  // decode the token to get the user id & role
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_KEY);
  const userId = decodedToken.userId;
  const role = decodedToken.role;

  // if the user is an admin, delete the user
  if (role === "admin" || userId === req.params.id) {
    userModel
      .deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: "Utilisateur supprimé !" }))
      .catch((err) => res.status(500).json({ error: err }));
  } else {
    res.status(401).json({ error: "Vous n'êtes pas autorisé !" });
  }
};
