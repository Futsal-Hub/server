const db = require("../config/mongo");
const request = require("supertest");
const app = require("../app");
const { hashPassword, comparePassword } = require("../helpers/password");
const { generateToken } = require("../helpers/jwt");
let token;
let courtId;
let ownerId;
const mockCreate = {
  name: "lapangan A",
  price: 120000,
  type: "grass",
  position: {
    lat: 1232425.5,
    long: 234252,
  },
  schedule: [
    {
      start: 20,
      end: 22,
    },
  ],
  owner: {},
};

const insertOne = {
  name: "lapangan C",
  price: 120000,
  type: "grass",
  position: {
    lat: 1232425.5,
    long: 234252,
  },
  schedule: [
    {
      start: 20,
      end: 22,
    },
  ],
};
const formData = new FormData();

let insertOwner = {
  username: "sangOwner",
  email: "owner@gmail.com",
  password: hashPassword("123456789"),
  role: "owner",
};
afterAll(async (done) => {
  await db.collection("courts").drop();
  await db.collection("users").drop();
  done();
});

beforeAll(async (done) => {
  try {
    const responses = await Promise.all([
      db.collection("users").insertOne(insertOwner),
    ]);
    let insertedOwner = responses[0].ops[0];
    mockCreate.owner = responses[0].ops[0];
    const insertedCourt = await db.collection("courts").insertOne(mockCreate);
    courtId = insertedCourt.ops[0]._id;
    token = generateToken({
      id: insertedOwner._id,
      email: insertedOwner.email,
    });
    ownerId = insertOwner._id;
    done();
  } catch (error) {
    done(error);
  }
});

describe("Read Court GET /court", () => {
  describe("Get all court with valid authentication", () => {
    test("Valid token", (done) => {
      request(app)
        .get("/court")
        .set("access_token", token)
        .end((err, res) => {
          const { body, status } = res;
          if (err) return done(err);

          expect(status).toBe(200);
          expect(body).toEqual(expect.any(Array));
          done();
        });
    });
  });
});

describe("Read Court GET /court/:id", () => {
  describe("Get court with valid id", () => {
    test("Valid id", (done) => {
      request(app)
        .get("/court/" + courtId)
        .set("access_token", token)
        .end((err, res) => {
          const { body, status } = res;
          if (err) return done(err);

          expect(status).toBe(200);
          expect(body).toEqual(expect.any(Object));
          done();
        });
    });
  }),
    describe("Get court with invalid id", () => {
      test("Invalid id", (done) => {
        request(app)
          .get("/court/" + "fsljflsjflskjfl")
          .set("access_token", token)
          .end((err, res) => {
            const { body, status } = res;
            if (err) return done(err);

            expect(status).toBe(500);
            expect(body).toHaveProperty("message");
            done();
          });
      });
    });
});

describe("Read Court GET /owner/:ownerId", () => {
  describe("Get court with valid id", () => {
    test("Valid id", (done) => {
      request(app)
        .get("/court/owner/" + ownerId)
        .set("access_token", token)
        .end((err, res) => {
          const { body, status } = res;
          if (err) return done(err);
          console.log(body, "<<<< find by owner");
          expect(status).toBe(200);
          expect(body).toEqual(expect.any(Array));
          done();
        });
    });
  }),
    describe("Get court with invalid id", () => {
      test("Invalid id", (done) => {
        request(app)
          .get("/court/" + "fsljflsjflskjfl")
          .set("access_token", token)
          .end((err, res) => {
            const { body, status } = res;
            if (err) return done(err);

            expect(status).toBe(500);
            expect(body).toHaveProperty("message");
            done();
          });
      });
    });
});

describe("Create Court POST /court", () => {
  // describe("Success Create Court", () => {
  //   test("Create Court with valid body value", (done) => {
  //     request(app)
  //       .post("/court")
  //       .set("access_token", token)
  //       .send({
  //         name: "lapangan A",
  //         price: 120000,
  //         type: "grass",
  //         position: JSON.stringify({
  //           lat: 1232425.5,
  //           long: 234252,
  //         }),
  //         schedule: JSON.stringify({
  //           start: 20,
  //           end: 22,
  //         }),
  //         address: "Jl. Agung Raya 2",
  //         owner: JSON.stringify({ name: "sangga" }),
  //       })
  //       .end((err, res) => {
  //         const { body, status } = res;
  //         if (err) done(err);
  //         expect(status).toBe(201);
  //         expect(body).toHaveProperty("name", "lapangan A");
  //         expect(body).toHaveProperty("price", 120000);
  //         expect(body).toHaveProperty("type", "grass");
  //         done();
  //       });
  //   }),
  describe("Create Court POST /court", () => {
    describe("Success Create Court", () => {
      test("Create Court with valid body value", (done) => {
        request(app)
          .post("/court")
          .set("access_token", token)
          .field("name", "lapangan A")
          .field("price", 12000)
          .field("type", "grass")
          .field("position", JSON.stringify({ start: 20, end: 22 }))
          .field("schedule", JSON.stringify({ start: 20, end: 22 }))
          .field("address", "Jl. agung raya")
          .field("owner", JSON.stringify({ name: "string" }))
          .attach(
            "photos",
            "testPhoto/1DE9AE63-EDD8-4BBB-A034-ABF3A19C946F.jpg"
          )
          .end(function (err, res) {
            console.log(err, "<<< rest");
            const { body, status } = res;
            if (err) done(err);
            expect(status).toBe(201);
            expect(body).toHaveProperty("name");
            expect(body).toHaveProperty("price");
            expect(body).toHaveProperty("type");
            done();
          });
      });
    }),
      describe("Fail Create Court", () => {
        test("Create Court with valid Invalid body value", (done) => {
          request(app)
            .post("/court")
            .set("access_token", token)
            .send({
              price: 120000,
              type: "grass",
              position: {
                lat: 1232425.5,
                long: 234252,
              },
              schedule: [
                {
                  start: 20,
                  end: 22,
                },
              ],
            })
            .end((err, res) => {
              const { body, status } = res;
              if (err) done(err);
              expect(status).toBe(500);
              expect(body).toHaveProperty("message");

              //expect(body).toHaveProperty("position", expect.any(Object));
              done();
            });
        });
      });
  });
});

describe("Update Court PUT/court/:id", () => {
  describe("Success Update Court", () => {
    test("Update Court With valid Body value", (done) => {
      request(app)
        .put("/court/" + courtId)
        .set("access_token", token)
        .send({
          name: "lapangan abc",
          type: "grass",
          schedule: [
            {
              id: "1",
              start: 8,
              end: 10,
            },
          ],
          address: "jl.baru",
          position: {
            lon: 892803,
            lat: 9328092,
          },
        })
        .end((err, res) => {
          if (err) console.log(err);
          const { body, status } = res;
          expect(status).toBe(200);
          expect(body).toHaveProperty("name", "lapangan abc");
          expect(body).toHaveProperty("type", "grass");
          expect(body).toHaveProperty("schedule", [
            {
              id: "1",
              start: 8,
              end: 10,
            },
          ]);
          expect(body).toHaveProperty("address", "jl.baru");
          expect(body).toHaveProperty("position");
          done();
        });
    });
  }),
    describe("Fail Update Court", () => {
      test("Update Court With valid Body value", (done) => {
        request(app)
          .put("/court/" + "sjfljsfk")
          .set("access_token", token)
          .send({
            name: "lapangan abc",
            type: "grass",
            schedule: [
              {
                id: "1",
                start: 8,
                end: 10,
              },
            ],
            address: "jl.baru",
            position: {
              lon: 892803,
              lat: 9328092,
            },
          })
          .end((err, res) => {
            if (err) console.log(err);
            const { body, status } = res;
            expect(status).toBe(500);
            expect(body).toHaveProperty("message");
            done();
          });
      });
    });
});

describe("Update Court PUT/court/:id", () => {
  describe("Success Update Court", () => {
    test("Update Court with valid body value", (done) => {
      request(app)
        .put("/court/" + courtId)
        .set("access_token", token)
        .field("name", "lapangan A")
        .field("price", 12000)
        .field("type", "grass")
        .field("position", JSON.stringify({ start: 20, end: 22 }))
        .field("schedule", JSON.stringify({ start: 20, end: 22 }))
        .field("address", "Jl. agung raya")
        .field("owner", JSON.stringify({ name: "string" }))
        .attach("photos", "testPhoto/1DE9AE63-EDD8-4BBB-A034-ABF3A19C946F.jpg")
        .end(function (err, res) {
          console.log(err, "<<< rest");
          const { body, status } = res;
          if (err) done(err);
          expect(status).toBe(201);
          expect(body).toHaveProperty("name");
          expect(body).toHaveProperty("price");
          expect(body).toHaveProperty("type");
          done();
        });
    });
  }),
    describe("Fail Update Court", () => {
      test("Update Court With valid Body value", (done) => {
        request(app)
          .put("/court/" + "sjfljsfk")
          .set("access_token", token)
          .send({
            name: "lapangan abc",
            type: "grass",
            schedule: [
              {
                id: "1",
                start: 8,
                end: 10,
              },
            ],
            address: "jl.baru",
            position: {
              lon: 892803,
              lat: 9328092,
            },
          })
          .end((err, res) => {
            if (err) console.log(err);
            const { body, status } = res;
            expect(status).toBe(500);
            expect(body).toHaveProperty("message");
            done();
          });
      });
    });
});

describe("Delete Court DELETE /court/:id", () => {
  describe("Success Delete Court", () => {
    test("Delete court with valid id", (done) => {
      request(app)
        .delete("/court/" + courtId)
        .set("access_token", token)
        .end((err, res) => {
          const { body, status } = res;
          if (err) return done(err);

          expect(status).toBe(200);
          expect(body).toHaveProperty(
            "message",
            "Resource Deleted Successfully"
          );
          done();
        });
    });
  }),
    describe("Faild Delete Court", () => {
      test("Delete court with invalid id", (done) => {
        request(app)
          .delete("/court/" + "lfjlfjslkfjslk")
          .set("access_token", token)
          .end((err, res) => {
            const { body, status } = res;
            if (err) return done(err);

            expect(status).toBe(500);
            expect(body).toHaveProperty("message");
            done();
          });
      });
    });
});
