const request = require("supertest");
const app = require("../app");

describe("POST/register player", () => {
  describe("Success register player", () => {
    test("response  with success message", (done) => {
      request(app)
        .post("/registerPlayer")
        .send({
          username: "test",
          email: "futsalhub@gmail.com",
          password: "123456",
          role: "player",
          position: {
              long: 1234,
              lat: 1234
          }
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          } else {
            expect(status).toBe(200);
            expect(body).toHaveProperty("username");
            expect(body).toHaveProperty("email", expect.any(String));
            expect(body).toHaveProperty("password", expect.any(String));
            expect(body).toHaveProperty("role", "player");
            expect(body.position).toHaveProperty("long", expect.any(Number))
            expect(body.position).toHaveProperty("lat", expect.any(Number))
            done();
          }
        });
    });
  });
});

describe("POST/registerPlayer", () => {
  describe("Error register player", () => {
    test("error empty field email", (done) => {
      request(app)
        .post("/registerPlayer")
        .send({
          username: "test",
          email: "",
          password: "123456",
          role: "player",
          position: {
              long: 1234,
              lat: 1234
          }
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          } else {
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Email is required");
            done();
          }
        });
    });
  });
});

describe("POST/registerPlayer", () => {
  describe("Error registerPlayer", () => {
    test("error empty field password", (done) => {
      request(app)
        .post("/registerPlayer")
        .send({
          username: "test",
          email: "futsalhub@gmail.com",
          password: "",
          role: "player",
          position: {
              long: 1234,
              lat: 1234
          }
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          } else {
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Password is required");
            done();
          }
        });
    });
  });
});

describe("POST/registerPlayer", () => {
  describe("Error register player", () => {
    test("error empty field role", (done) => {
      request(app)
        .post("/registerPlayer")
        .send({
          username: "test",
          email: "futsalhub@gmail.com",
          password: "123456",
          role: "",
          position: {
              long: 1234,
              lat: 1234
          }
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          } else {
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Role is required");
            done();
          }
        });
    });
  });
});

describe("POST/registerPlayer", () => {
  describe("Error register player", () => {
    test("error position long and lat not a number value", (done) => {
      request(app)
        .post("/registerPlayer")
        .send({
          username: "test",
          email: "futsalhub@gmail.com",
          password: "123456",
          role: "player",
          position: {
            long: '1234',
            lat: '1234'
            }
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          } else {
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "position longitude must be a float number");
            expect(body).toHaveProperty("message", "position longitude must be a float number");
            done();
          }
        });
    });
  });
});

describe("POST/registerPlayer", () => {
  describe("Error register player", () => {
    test("error email field input validity", (done) => {
      request(app)
        .post("/registerPlayer")
        .send({
          username: "test",
          email: "futsalhub",
          password: "123456",
          role: "player",
          position: {
              long: 1234,
              lat: 1234
          }
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          } else {
            expect(status).toBe(400);
            expect(body).toHaveProperty(
              "message",
              "Email input must be a valid email"
            );
            done();
          }
        });
    });
  });
});

describe("POST/registerPlayer", () => {
  describe("Error register player", () => {
    test("error email field input uniqueness", (done) => {
      request(app)
        .post("/registerPlayer")
        .send({
          username: "test",
          email: "futsalhub@gmail.com",
          password: "123456",
          role: "player",
          position: {
              long: 1234,
              lat: 1234
          }
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          } else {
            expect(status).toBe(400);
            expect(body).toHaveProperty(
              "message",
              "Email input is already used"
            );
            done();
          }
        });
    });
  });
});

// =======================================

describe("POST/loginPlayer", () => {
  describe("Success login player", () => {
    test("response  with access token", (done) => {
      request(app)
        .post("/loginPlayer")
        .send({
          email: "futsalhub@gmail.com",
          password: "123456"
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          } else {
            expect(status).toBe(200);
            expect(body).toHaveProperty("access_token", expect.any(String));
            done();
          }
        });
    });
  });
});

describe("POST/loginPlayer", () => {
  describe("Error login player", () => {
    test("error empty field email", (done) => {
      request(app)
        .post("/loginPlayer")
        .send({
          email: "",
          password: "123456"
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          } else {
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Email is required");
            done();
          }
        });
    });
  });
});

describe("POST/loginPlayer", () => {
  describe("Error loginPlayer", () => {
    test("error empty field password", (done) => {
      request(app)
        .post("/loginPlayer")
        .send({
          email: "futsalhub@gmail.com",
          password: ""
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          } else {
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Password is required");
            done();
          }
        });
    });
  });
});

describe("POST/loginPlayer", () => {
  describe("Error loginPlayer", () => {
    test("error email field input validity", (done) => {
      request(app)
        .post("/loginPlayer")
        .send({
          email: "futsalhub",
          password: "123456"
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          } else {
            expect(status).toBe(400);
            expect(body).toHaveProperty(
              "message",
              "Email input must be a valid email"
            );
            done();
          }
        });
    });
  });
});

describe("POST/loginPlayer", () => {
  describe("Error Login player", () => {
    test("email is exist, but password is wrong", (done) => {
      request(app)
        .post("/loginPlayer")
        .send({
          email: "futsalhub@gmail.com",
          password: "123"
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          } else {
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Invalid email/password");
            done();
          }
        });
    });
  });
});

describe("POST/LoginPlayer", () => {
  describe("Error LoginPlayer", () => {
    test("email doesn't exist in database", (done) => {
      request(app)
        .post("/loginPlayer")
        .send({
          email: "futsalhub_palsu@gmail.com",
          password: "123456"
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          } else {
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Invalid account");
            done();
          }
        });
    });
  });
});