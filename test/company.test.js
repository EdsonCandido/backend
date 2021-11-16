const axios = require("axios");
const crypto = require("crypto");

const generateRadom = function () {
  return crypto.randomBytes(20).toString("hex");
};

const request = function (url, method, data) {
  url = `http://localhost:5555/${url}`;
  return axios({ url, method, data });
};

test(`Should save one user`, async function () {
  const user = {
    name: generateRadom(),
    cpf: generateRadom(),
    password: generateRadom(),
    email: generateRadom(),
  };

  const response = await request(`company`, `POST`, user);
  expect(201).toBe(response.status);
});

test(`Should get users`, async function () {
  const response = await request(`company`, `get`);

  expect(response.data).toHaveLength(5);
});
