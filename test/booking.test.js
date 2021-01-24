const db = require("../config/mongo");
const request = require("supertest");
const app = require("../app");
let token="sfjsklfjlskjfl;

afterAll((done) => {
  db.collection("booking").drop();
});

beforeAll((done) => {
  db.collection("users").insertOne({
    email: "futsalhub@gmail.com",
    password: "123456",
  });
});

describe("POST/bookSchedules", () => {
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
            expect(body).toHaveProperty("schedule", { hour: 20, end: 21 });
            expect(body).toHaveProperty("host", { username: "sangga" });
            expect(body).toHaveProperty("players", [
              { _id: "sfjslfk", username: "sangga" },
              { _id: "sfsflksjfljs", username: "sangga2" },
            ]),
            expect(body).toHaveProperty("court", { _id: "sfjsfjsl", owner: { _id: "sjflskfjs" });
            done();
          }
        });
    });
  });
  // describe("Fail Add Booking", () => {
  //   describe("Missing Required Field", () => {
  //     test("Missing schedule_id field", (done) => {
  //       request(app)
  //         .post("/booking")
  //         .set("access_token", token)
  //         .send({
  //           schedule_id: "",
  //           player_id: "fsjlfjs",
  //           players: ["fljsflsjf", "slkfjajfslf"],
  //           court_id: "sfjsflsjfkljs",
  //         })
  //         .end((err, res) => {
  //           if (err) return done(err);
  //           const { body, status } = res;
  //           expect(status).toBe(400);
  //           expect(body).toHaveProperty("message", "Schedule Id required");
  //         });
  //     });
  //   }),
  //     describe("Missing Required Field", () => {
  //       test("Missing player_id field", (done) => {
  //         request(app)
  //           .post("/booking")
  //           .set("access_token", token)
  //           .send({
  //             schedule_id: "sfljsdklf",
  //             player_id: "",
  //             players: ["fljsflsjf", "slkfjajfslf"],
  //             court_id: "sfjsflsjfkljs",
  //           })
  //           .end((err, res) => {
  //             if (err) return done(err);
  //             const { body, status } = res;
  //             expect(status).toBe(400);
  //             expect(body).toHaveProperty("message", "Player_id required");
  //           });
  //       });
  //     }),
  //     describe("Missing Required Field", () => {
  //       test("Missing player_id field", (done) => {
  //         request(app)
  //           .post("/booking")
  //           .set("access_token", token)
  //           .send({
  //             schedule_id: "sfljsdklf",
  //             player_id: "",
  //             players: ["fljsflsjf", "slkfjajfslf"],
  //             court_id: "sfjsflsjfkljs",
  //           })
  //           .end((err, res) => {
  //             if (err) return done(err);
  //             const { body, status } = res;
  //             expect(status).toBe(400);
  //             expect(body).toHaveProperty("message", "Player_id required");
  //           });
  //       });
  //     }),
  //     describe("Missing Required Field", () => {
  //       test("Missing players field", (done) => {
  //         request(app)
  //           .post("/booking")
  //           .set("access_token", token)
  //           .send({
  //             schedule_id: "sfljsdklf",
  //             player_id: "sfjlskjflks",
  //             players: "",
  //             court_id: "fjslfjs",
  //           })
  //           .end((err, res) => {
  //             if (err) return done(err);
  //             const { body, status } = res;
  //             expect(status).toBe(400);
  //             expect(body).toHaveProperty("message", "players required");
  //           });
  //       });
  //     }),
  describe("No Access Token", () => {
    test("Missing access token", (done) => {
      request(app)
        .post("/booking")
        .send({
          schedule_id: "sfljsdklf",
          player_id: "sfjlskjflks",
          players: [],
          court_id: "fjslfjs",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "You have to login firts");
        });
    });
  });
});
