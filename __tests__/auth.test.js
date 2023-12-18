const { signin } = require("../controllers/auth.controller"); // Remplacez avec le chemin correct
const db = require("../models");
const User = db.user;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

jest.mock("bcryptjs");
jest.mock("jsonwebtoken");
jest.mock("node-mailjet");
jest.mock("../models");

describe("signin function", () => {
  it("should sign in the user successfully", async () => {
    const req = {
      body: { email: "bailly.g@hotmail.fr", password: "Admin123" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock pour simuler un utilisateur existant dans la base de données
    User.findOne.mockResolvedValueOnce({
      id: 1,
      email: "bailly.g@hotmaill.fr",
      password: "Admin123",
    });

    // Mock pour simuler que la comparaison de mot de passe est valide
    bcrypt.compareSync.mockReturnValueOnce(true);

    // Mock pour simuler la génération de token
    jwt.sign.mockReturnValueOnce("mockedToken");

    await signin(req, res);

    // Vérifiez que la réponse est correcte
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: 1, token: "mockedToken" });
  });

  it("should handle user not found", async () => {
    // ... test similar to the one above, but with a user not found scenario ...
  });

  it("should handle invalid password", async () => {
    // ... test similar to the one above, but with an invalid password scenario ...
  });

  it("should handle authentication failure", async () => {
    // ... test similar to the one above, but with a general authentication failure scenario ...
  });
});
