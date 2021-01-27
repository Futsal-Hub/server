const db = require("../config/mongo");
const request = require("supertest");
const app = require("../app");
const { hashPassword, comparePassword } = require("../helpers/password");
const { generateToken } = require("../helpers/jwt");
let token;
let id;
let insertRequest = {
  origin: {},
  destination: {},
  status: "pending",
};

let user1, user2;

let insertUsers = [
  {
    username: "player1",
    email: "player1@gmail.com",
    password: hashPassword("123456789"),
    role: "player",
  },

  {
    username: "player2",
    email: "player2@gmail.com",
    password: hashPassword("123456789"),
    role: "player",
  },
];

afterAll(async (done) => {
  await db.collection("request").drop();
  await db.collection("users").drop();
  done();
});

beforeAll(async (done) => {
  try {
    const responses = await db.collection("users").insertMany(insertUsers);
    user1 = responses.ops[0];
    user2 = responses.ops[1];
    insertRequest.origin = user1;
    insertRequest.destination = user2;
    const response = await db.collection("request").insertOne(insertRequest);
    id = response.ops[0]._id;
    token = generateToken({ id: user1._id, email: user1.email });
    done();
  } catch (error) {
    done(error);
  }
});

describe("POST/request", () => {
  describe("Success add request", () => {
    test("create request with accept body value", (done) => {
      request(app)
        .post("/request")
        .set("access_token", token)
        .send({
          origin: { name: "sangga 2" },
          destination: { name: "test" },
          status: "pending",
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          } else {
            expect(status).toBe(201);
            expect(body).toHaveProperty("origin", expect.any(Object)),
              expect(body).toHaveProperty("destination", expect.any(Object)),
              expect(body).toHaveProperty("status", "pending");
            done();
          }
        });
    });
  }),
    describe("Faill add request", () => {
      test("create request with invalid body value", (done) => {
        request(app)
          .post("/request")
          .set("access_token", token)
          .send({
            destination: { name: "test" },
            status: "pending",
          })
          .end((err, res) => {
            const { body, status } = res;
            if (err) {
              return done(err);
            } else {
              expect(status).toBe(500);
              expect(body).toHaveProperty("message");
              done();
            }
          });
      });
    });
});

describe("GET/request/sent/:userId", () => {
  describe("Get sent request", () => {
    test("Get sent request with valid origin id", (done) => {
      request(app)
        .get("/request/sent/" + user1._id)
        .set("access_token", token)
        .end((err, res) => {
          const { body, status } = res;
          if (err) done(err);
          expect(status).toBe(200);
          expect(body).toEqual(expect.any(Array));
          done();
        });
    });
  }),
    describe("Fail Get sent request", () => {
      test("Fail Get sent request with invalid origin id", (done) => {
        request(app)
          .get("/request/sent/" + "sfsklfjksj")
          .set("access_token", token)
          .end((err, res) => {
            const { body, status } = res;
            if (err) done(err);
            expect(status).toBe(500);
            expect(body).toHaveProperty("message");
            done();
          });
      });
    });
});

describe("GET/request/received/:userId", () => {
  describe("Get received request", () => {
    test("Get sent request with valid origin id", (done) => {
      request(app)
        .get("/request/received/" + user2._id)
        .set("access_token", token)
        .end((err, res) => {
          const { body, status } = res;
          if (err) done(err);
          expect(status).toBe(200);
          expect(body).toEqual(expect.any(Array));
          done();
        });
    });
  }),
    describe("Fail Get received request", () => {
      test("Fail Get received request with invalid origin id", (done) => {
        request(app)
          .get("/request/received/" + "sfsklfjksj")
          .set("access_token", token)
          .end((err, res) => {
            const { body, status } = res;
            if (err) done(err);
            expect(status).toBe(500);
            expect(body).toHaveProperty("message");
            done();
          });
      });
    });
});

describe("GET/request/:id", () => {
  describe("Get request by id", () => {
    test("Get request with valid request id", (done) => {
      request(app)
        .get("/request/" + id)
        .set("access_token", token)
        .end((err, res) => {
          const { body, status } = res;
          if (err) done(err);
          expect(status).toBe(200);
          expect(body).toEqual(expect.any(Object));
          done();
        });
    });
  }),
    describe("Fail Get/request/:id request", () => {
      test("Fail Get request with invalid  id", (done) => {
        request(app)
          .get("/request/" + "sfsklfjksj")
          .set("access_token", token)
          .end((err, res) => {
            const { body, status } = res;
            if (err) done(err);
            expect(status).toBe(500);
            expect(body).toHaveProperty("message");
            done();
          });
      });
    });
});

describe("PATCH PUT /request", () => {
  describe("Success Edit request", () => {
    test("Update Status", (done) => {
      request(app)
        .patch("/request/" + id)
        .set("access_token", token)
        .send({
          status: "rejected",
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          } else {
            expect(status).toBe(200);
            expect(body).toHaveProperty("status", "rejected");
            done();
          }
        });
    });
  }),
    describe("Fail Edit request", () => {
      test("Invalid id", (done) => {
        request(app)
          .patch("/request/" + "sjflsfjkl")
          .set("access_token", token)
          .send({
            status: "rejected",
          })
          .end((err, res) => {
            const { body, status } = res;
            if (err) {
              return done(err);
            } else {
              expect(status).toBe(500);
              expect(body).toHaveProperty("message");
              done();
            }
          });
      });
    }),
    describe("Success Edit request", () => {
      test("Update All Field", (done) => {
        request(app)
          .put("/request/" + id)
          .set("access_token", token)
          .send({
            status: "rejected",
            origin: { origin1: "klfjslfj" },
            destination: { orignin2: "sfjsfl" },
          })
          .end((err, res) => {
            const { body, status } = res;
            if (err) {
              return done(err);
            } else {
              expect(status).toBe(200);
              expect(body).toHaveProperty("status");
              expect(body).toHaveProperty("origin");
              expect(body).toHaveProperty("destination");
              done();
            }
          });
      });
    });
});

describe("DELETE /request", () => {
  describe("Success Delete request", () => {
    test("Dlete request", (done) => {
      request(app)
        .delete("/request/" + id)
        .set("access_token", token)
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          } else {
            expect(body).toHaveProperty(
              "message",
              "Resource Deleted Successfully"
            );
            done();
          }
        });
    });
  });
});
