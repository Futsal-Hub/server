const request = require("supertest");
const app = require("../app");

describe("POST/register", () => {
  describe("Success register user", () => {
    test("response  with success message", (done) => {
      request(app)
        .post("/register")
        .send({
          username: "test",
          email: "futsalhub@gmail.com",
          password: "123456",
          role: "owner",
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          } else {
            expect(status).toBe(201);
            expect(body).toHaveProperty("username");
            expect(body).toHaveProperty("email", expect.any(String));
            expect(body).toHaveProperty("password", expect.any(String));
            expect(body).toHaveProperty("role", "owner");
            done();
          }
        });
    });
  });
});

// describe("POST/register", () => {
//   describe("Error register user", () => {
//     test("error email field input uniqueness", (done) => {
//       request(app)
//         .post("/register")
//         .send({
//           username: "test",
//           email: "futsalhub@gmail.com",
//           password: "123456",
//           role: "owner",
//         })
//         .end((err, res) => {
//           const { body, status } = res;
//           if (err) {
//             return done(err);
//           } else {
//             expect(status).toBe(400);
//             expect(body).toHaveProperty(
//               "message",
//               "Email input is already used"
//             );
//             done();
//           }
//         });
//     });
//   });
// });

// =======================================

describe("POST/login", () => {
  describe("Success login user", () => {
    test("response  with access token", (done) => {
      request(app)
        .post("/login")
        .send({
          email: "futsalhub@gmail.com",
          password: "123456",
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

// describe("POST/login", () => {
//   describe("Error Login user", () => {
//     test("email is exist, but password is wrong", (done) => {
//       request(app)
//         .post("/login")
//         .send({
//           email: "futsalhub@gmail.com",
//           password: "123",
//         })
//         .end((err, res) => {
//           const { body, status } = res;
//           if (err) {
//             return done(err);
//           } else {
//             expect(status).toBe(401);
//             expect(body).toHaveProperty("message", "Invalid email/password");
//             done();
//           }
//         });
//     });
//   });
// });

// describe("POST/login", () => {
//   describe("Error login", () => {
//     test("email doesn't exist in database", (done) => {
//       request(app)
//         .post("/login")
//         .send({
//           email: "futsalhub_palsu@gmail.com",
//           password: "123456",
//         })
//         .end((err, res) => {
//           const { body, status } = res;
//           if (err) {
//             return done(err);
//           } else {
//             expect(status).toBe(401);
//             expect(body).toHaveProperty("message", "Invalid account");
//             done();
//           }
//         });
//     });
//   });
// });
