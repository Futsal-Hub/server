// const db = require("../config/mongo");
// const request = require("supertest");
// const app = require("../app");
// let token;

// afterAll((done) => {
//   db.collection("booking").drop();
// });

// beforeAll((done) => {
//   db.collection("users").insertOne({
//     email: "futsalhub@gmail.com",
//     password: "123456",
//   });
// });

// describe("POST/bookSchedules", () => {
//   describe("Success add bookSchedule", () => {
//     test("create bookSchedule with accept body value", (done) => {
//       request(app)
//         .post("/booking")
//         .set("access_token", token)
//         .send({
//           schedule_id: "sfjkljflskfj",
//           player_id: "fsjlfjs",
//           players: ["fljsflsjf", "slkfjajfslf"],
//           court_id: "sfjsflsjfkljs",
//         })
//         .end((err, res) => {
//           const { body, status } = res;
//           if (err) {
//             return done(err);
//           } else {
//             expect(status).toBe(201);
//             expect(body).toHaveProperty("schedule_id", "sfjkljflskfj");
//             expect(body).toHaveProperty("player_id", "fsjlfjs");
//             expect(body).toHaveProperty("players", [
//               "players",
//               "fljsflsjf",
//               "slkfjajfslf",
//             ]);
//             expect(body).toHaveProperty("court_id", 20);
//             done();
//           }
//         });
//     });
//   }),
//     describe("Fail Add Booking", () => {
//       describe("Missing Required Field", () => {
//         test("Missing schedule_id field", (done) => {
//           request(app)
//             .post("/booking")
//             .set("access_token", token)
//             .send({
//               schedule_id: "",
//               player_id: "fsjlfjs",
//               players: ["fljsflsjf", "slkfjajfslf"],
//               court_id: "sfjsflsjfkljs",
//             })
//             .end((err, res) => {
//               if (err) return done(err);
//               const { body, status } = res;
//               expect(status).toBe(400);
//               expect(body).toHaveProperty("message", "Schedule Id required");
//             });
//         });
//       }),
//         describe("Missing Required Field", () => {
//           test("Missing player_id field", (done) => {
//             request(app)
//               .post("/booking")
//               .set("access_token", token)
//               .send({
//                 schedule_id: "sfljsdklf",
//                 player_id: "",
//                 players: ["fljsflsjf", "slkfjajfslf"],
//                 court_id: "sfjsflsjfkljs",
//               })
//               .end((err, res) => {
//                 if (err) return done(err);
//                 const { body, status } = res;
//                 expect(status).toBe(400);
//                 expect(body).toHaveProperty("message", "Player_id required");
//               });
//           });
//         }),
//         describe("Missing Required Field", () => {
//           test("Missing player_id field", (done) => {
//             request(app)
//               .post("/booking")
//               .set("access_token", token)
//               .send({
//                 schedule_id: "sfljsdklf",
//                 player_id: "",
//                 players: ["fljsflsjf", "slkfjajfslf"],
//                 court_id: "sfjsflsjfkljs",
//               })
//               .end((err, res) => {
//                 if (err) return done(err);
//                 const { body, status } = res;
//                 expect(status).toBe(400);
//                 expect(body).toHaveProperty("message", "Player_id required");
//               });
//           });
//         }),
//         describe("Missing Required Field", () => {
//           test("Missing players field", (done) => {
//             request(app)
//               .post("/booking")
//               .set("access_token", token)
//               .send({
//                 schedule_id: "sfljsdklf",
//                 player_id: "sfjlskjflks",
//                 players: "",
//                 court_id: "fjslfjs",
//               })
//               .end((err, res) => {
//                 if (err) return done(err);
//                 const { body, status } = res;
//                 expect(status).toBe(400);
//                 expect(body).toHaveProperty("message", "players required");
//               });
//           });
//         }),
//         describe("No Access Token", () => {
//           test("Missing access token", (done) => {
//             request(app)
//               .post("/booking")
//               .send({
//                 schedule_id: "sfljsdklf",
//                 player_id: "sfjlskjflks",
//                 players: "",
//                 court_id: "fjslfjs",
//               })
//               .end((err, res) => {
//                 if (err) return done(err);
//                 const { body, status } = res;
//                 expect(status).toBe(400);
//                 expect(body).toHaveProperty(
//                   "message",
//                   "You have to log in firts"
//                 );
//               });
//           });
//         });
//     });
// });
