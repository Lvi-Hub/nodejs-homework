import mongoose from "mongoose";
import request from "supertest";
import "dotenv/config";

import app from "../../app.js";

import User from "../../models/user.js";

const { PORT, DB_HOST } = process.env;

describe("test login route", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(DB_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  beforeEach(async () => {});

  afterEach(async () => {
    await User.deleteMany({});
  });

  test("test login with correct data", async () => {
    const loginData = {
      email: "vasylyna3@ukr.net",
      password: "123456",
    };

    const { statusCode, body } = await request(app)
      .post("/api/auth/login")
      .send(loginData);

    expect(statusCode).toBe(200);
    // expect(body.name).toBe(loginData.email);
    // expect(body.token).toBe(typeof String);
    console.log(body.token);

    const user = await User.findOne({ email: loginData.email });
    expect(user.email).toBe(loginData.email);
    expect(user.name).toBe(loginData.name);
  });
});
