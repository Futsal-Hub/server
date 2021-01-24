const db = require("../config/mongo");
const request = require("supertest");
const app = require("../app");
let token="sfjsklfjlskjfl"
let id;
let insertBooking = {
  schedule: { hour: 20, end: 21 },
  host: { username: "sangga" },
  players: [
    { _id: "sfjslfk", username: "sangga" },
    { _id: "sfsflksjfljs", username: "sangga2" },
  ],
  court: { _id: "sfjsfjsl", owner: { _id: "sjflskfjs" } },
}

afterAll(async (done) => {
  await db.collection("bookings").drop();
  done()
});

beforeAll( async (done) => {
  try {
    const response = await db.collection("bookings").insertOne(insertBooking)
    id = response.ops[0]._id
    done()
  } catch (error) {
    done(error)
  }
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
            console.log(body, "<<<<body");
            expect(body).toHaveProperty("schedule");
            expect(body).toHaveProperty("host", { username: "sangga" });
            expect(body).toHaveProperty("players", [
              { _id: "sfjslfk", username: "sangga" },
              { _id: "sfsflksjfljs", username: "sangga2" },
              { _id: "slfjslkfjslkf", username: "sangga10"}
            ]),
            expect(body).toHaveProperty("court", { _id: "sfjsfjsl", owner: { _id: "sjflskfjs" }});
            done();
          }
        });
    });
  });
});


describe("DELETE /booking", () => {
  describe("Success EDIT booing", () => {
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
  });
});

