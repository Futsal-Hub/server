const db = require("../config/mongo");
const request = require("supertest");
const app = require("../app");
const { hashPassword, comparePassword } = require("../helpers/password")
const { generateToken } = require("../helpers/jwt");
let insertUser = {
  username: "sangsangga",
  email: "sangga@gmail.com",
  password: hashPassword("123456789")

}

let user;

let insertOwner = {
  username: "sangOwner",
  email: "owner@gmail.com",
  password: hashPassword("123456789"),
  role: "owner"

}
let token;
let token_owner;
let id;
let insertBooking = {
  schedule: { hour: 20, end: 21 },
  host:{},
  players: [
    { _id: "sfjslfk", username: "sangga" },
    { _id: "sfsflksjfljs", username: "sangga2" },
  ],
  court: { _id: "sfjsfjsl", owner: { _id: "sjflskfjs" } },
}

let ownerId, playerId;

afterAll(async (done) => {
  await db.collection("bookings").drop();
  await db.collection("users").drop();
  done()
});

beforeAll( async (done) => {
  try {
    const responses = await Promise.all([
      db.collection("users").insertOne(insertUser),
      db.collection("users").insertOne(insertOwner),
    ])
    user = await db.collection("users").findOne({email: insertUser.email})
    console.log(user, "<<< user")
    const insertedOwner = await db.collection("users").findOne({email: insertOwner.email})
    insertBooking.court.owner = insertedOwner
    insertBooking.host = user
    const responseBooking = await db.collection("bookings").insertOne(insertBooking)
    const insertedBooking  = await db.collection("bookings").findOne({"host.email": user.email})
    id = insertedBooking._id
    playerId = user._id
    ownerId = insertedOwner._id
    token = generateToken({id:user._id, email: user.email})
    token_owner = generateToken({id: insertedOwner._id, email: insertedOwner.email})
    done()
  } catch (error) {
    done(error)
  }
});


describe("GET/booking", () => {
  describe("Success add bookSchedule", () => {
    test("create bookSchedule with accept body value", (done) => {
      request(app)
        .get("/booking")
        .set("access_token", token)
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          } else {
            expect(status).toBe(200);
            expect(body).toEqual(expect.any(Array))
            done();
          }
        });
    });
  })
});

describe("GET/booking/:id", () => {
  describe("Success get booking by id", () => {
    test("get booking by correct id", (done) => {
      request(app)
        .get("/booking/" + id)
        .set("access_token", token)
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          } else {
            expect(status).toBe(200);
            expect(body).toEqual(expect.any(Object))
            done();
          }
        });
    });
  }),
  describe("Fail get booking by id", () => {
    test("get booking by false id", (done) => {
      request(app)
        .get("/booking/" + "slfjsklfjsl")
        .set("access_token", token)
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          } else {
            expect(status).toBe(500);
            expect(body).toHaveProperty("message")
            done();
          }
        });
    });
  })
});

describe("GET/booking/Owner/Player :id", () => {
  describe("Success get booking by Owner id", () => {
    test("get booking by correct owner id", (done) => {
      request(app)
        .get("/booking/owner/" + ownerId)
        .set("access_token", token)
        .end((err, res) => {
          const { body, status } = res;
          console.log(body, "<<<<correct owner id")
          if (err) {
            return done(err);
          } else {
            expect(status).toBe(200);
            expect(body).toEqual(expect.any(Array))
            done();
          }
        });
    });
  }),
  describe("Fail get booking by owner id", () => {
    test("get booking by false owner id", (done) => {
      request(app)
        .get("/booking/owner/" + "slfjsklfjsl")
        .set("access_token", token)
        .end((err, res) => {
          const { body, status } = res;
          console.log(body, "<<< body false owner")
          if (err) {
            return done(err);
          } else {
            expect(status).toBe(500);
            expect(body).toHaveProperty("message")
            done();
          }
        });
    });
  }),
  describe("Success get booking by Player id", () => {
    test("get booking by correct playuer id", (done) => {
      request(app)
        .get("/booking/player/" + playerId)
        .set("access_token", token)
        .end((err, res) => {
          const { body, status } = res;
          console.log(body, "<<<<correct owner id")
          if (err) {
            return done(err);
          } else {
            expect(status).toBe(200);
            expect(body).toEqual(expect.any(Array))
            done();
          }
        });
    });
  }),
  describe("Fail get booking by owner id", () => {
    test("get booking by false owner id", (done) => {
      request(app)
        .get("/booking/player/" + "slfjsklfjsl")
        .set("access_token", token)
        .end((err, res) => {
          const { body, status } = res;
          console.log(body, "<<< body false owner")
          if (err) {
            return done(err);
          } else {
            expect(status).toBe(500);
            expect(body).toHaveProperty("message")
            done();
          }
        });
    });
  })
});




describe("POST/booking", () => {
  describe("Success add bookSchedule", () => {
    test("create bookSchedule with accept body value", (done) => {
      request(app)
        .post("/booking")
        .set("access_token", token)
        .send({
          schedule: { hour: 20, end: 21 },
          host: { username: "sangga" },
          players: [
            { _id: "sfjslfk", username: "sangga" },
            { _id: "sfsflksjfljs", username: "sangga2" },
          ],
          court: { _id: "sfjsfjsl", owner: { _id: "sjflskfjs" } },
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          } else {
            expect(status).toBe(201);
            console.log(body, "<<<<body");
            expect(body).toHaveProperty("schedule");
            expect(body).toHaveProperty("host", { username: "sangga" });
            expect(body).toHaveProperty("players", expect.any(Array)),
            expect(body).toHaveProperty("court", { _id: "sfjsfjsl", owner: { _id: "sjflskfjs" }});
            done();
          }
        });
    });
  }),
  describe("Fail Add Bookschedule", () => {
    test("create bookSchedule without host", (done) => {
      request(app)
        .post("/booking")
        .set("access_token", token)
        .send({
          schedule: { hour: 20, end: 21 },
          players: [
            { _id: "sfjslfk", username: "sangga" },
            { _id: "sfsflksjfljs", username: "sangga2" },
          ],
          court: { _id: "sfjsfjsl", owner: { _id: "sjflskfjs" } },
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          } else {
            expect(body).toHaveProperty("message", "Internal Server Error")
            done()
          }
        });
    });
  });
});


describe("PATCH/booking", () => {
  describe("Success EDIT booing", () => {
    test("Update player list", (done) => {
      request(app)
        .patch("/booking/" + id)
        .set("access_token", token)
        .send({
          schedule: { hour: 20, end: 21 },
          host: user,
          players: [
            { _id: "sfjslfk", username: "sangga" },
            { _id: "sfsflksjfljs", username: "sangga2" },
            { _id: "slfjslkfjslkf", username: "sangga10"}
          ],
          court: { _id: "sfjsfjsl", owner: { _id: "sjflskfjs" } },
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          } else {
            expect(status).toBe(200);
            console.log(body, "<<<<body edit ");
            expect(body).toHaveProperty("schedule");
            expect(body).toHaveProperty("host");
            expect(body).toHaveProperty("players", [
              { _id: "sfjslfk", username: "sangga" },
              { _id: "sfsflksjfljs", username: "sangga2" },
              { _id: "slfjslkfjslkf", username: "sangga10"}
            ]),
            expect(body).toHaveProperty("court");
            done();
          }
        });
    });
  });
});


describe("PUT/booking", () => {
  describe("Success EDIT booing", () => {
    test("Update player list", (done) => {
      request(app)
        .put("/booking/" + id)
        .set("access_token", token)
        .send({
          schedule: { hour: 22, end: 24 },
          host: { username: "sangga" },
          players: [
            { _id: "sfjslfk", username: "sangga" },
            { _id: "sfsflksjfljs", username: "sangga2" },
            { _id: "slfjslkfjslkf", username: "sangga10"}
          ],
          court: { _id: "sfjsfjsl", owner: { _id: "sjflskfjs" } },
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          } else {
            expect(status).toBe(200);
            expect(body).toHaveProperty("schedule",{ hour: 22, end: 24 });
            expect(body).toHaveProperty("host", { username: "sangga" });
            expect(body).toHaveProperty("players"),
            expect(body).toHaveProperty("court", { _id: "sfjsfjsl", owner: { _id: "sjflskfjs" }});
            done();
          }
        });
    });
  }),
  describe("Fail Update Bookschedule", () => {
    test("Update bookSchedule without host", (done) => {
      request(app)
        .put("/booking/" + id)
        .set("access_token", token)
        .send({
          schedule: { hour: 20, end: 21 },
          players: [
            { _id: "sfjslfk", username: "sangga" },
            { _id: "sfsflksjfljs", username: "sangga2" },
          ],
          court: { _id: "sfjsfjsl", owner: { _id: "sjflskfjs" } },
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          } else {
            expect(body).toHaveProperty("message", "Internal Server Error")
            done()
          }
        });
    });
  });
});


describe("DELETE /booking", () => {
  describe("Success Delete booing", () => {
    test("Update player list", (done) => {
      request(app)
        .delete("/booking/" + id)
        .set("access_token", token)
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          } else {
            expect(body).toHaveProperty("message",'Resource Deleted Successfully' )
            done();
          }
        });
    });
  }),
  describe("Success EDIT booing", () => {
    test("Update player list", (done) => {
      request(app)
        .delete("/booking/" + "fjlsjflskj")
        .set("access_token", token)
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          } else {
            expect(body).toHaveProperty("message",'Internal Server Error' )
            done();
          }
        });
    });
  });
});





