const request = require("supertest");
const app = require("../app");

describe("POST/owner/register", () => {
  describe("Success register owner", () => {
    test("response  with success message", (done) => {
      request(app)
        .post("/owner/register")
        .send({
          username: "test",
          email: "futsalhub@gmail.com",
          password: "123456",
          role: "owner",
          courts: [],
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
            expect(body).toHaveProperty("role", "owner");
            expect(body).toHaveProperty(
              "courts",
              "email",
              expect.arrayContaining([])
            );
            done();
          }
        });
    });
  });
});

// describe("POST/owner/register", () => {
//   describe("Error register Owner", () => {
//     test("error empty field email", (done) => {
//       request(app)
//         .post("/owner/register")
//         .send({
//           username: "test",
//           email: "",
//           password: "123456",
//           role: "owner",
//           courts: [],
//         })
//         .end((err, res) => {
//           const { body, status } = res;
//           if (err) {
//             return done(err);
//           } else {
//             expect(status).toBe(400);
//             expect(body).toHaveProperty("message", "Email is required");
//             done();
//           }
//         });
//     });
//   });
// });

// describe("POST/owner/register", () => {
//   describe("Error owner/register", () => {
//     test("error empty field password", (done) => {
//       request(app)
//         .post("/owner/register")
//         .send({
//           username: "test",
//           email: "futsalhub@gmail.com",
//           password: "",
//           role: "owner",
//           courts: [],
//         })
//         .end((err, res) => {
//           const { body, status } = res;
//           if (err) {
//             return done(err);
//           } else {
//             expect(status).toBe(400);
//             expect(body).toHaveProperty("message", "Password is required");
//             done();
//           }
//         });
//     });
//   });
// });

// describe("POST/owner/register", () => {
//   describe("Error register Owner", () => {
//     test("error empty field role", (done) => {
//       request(app)
//         .post("/owner/register")
//         .send({
//           username: "test",
//           email: "futsalhub@gmail.com",
//           password: "123456",
//           role: "",
//           courts: [],
//         })
//         .end((err, res) => {
//           const { body, status } = res;
//           if (err) {
//             return done(err);
//           } else {
//             expect(status).toBe(400);
//             expect(body).toHaveProperty("message", "Role is required");
//             done();
//           }
//         });
//     });
//   });
// });

// describe("POST/owner/register", () => {
//   describe("Error register Owner", () => {
//     test("error courts value is not an array", (done) => {
//       request(app)
//         .post("/owner/register")
//         .send({
//           username: "test",
//           email: "futsalhub@gmail.com",
//           password: "123456",
//           role: "owner",
//           courts: "",
//         })
//         .end((err, res) => {
//           const { body, status } = res;
//           if (err) {
//             return done(err);
//           } else {
//             expect(status).toBe(400);
//             expect(body).toHaveProperty(
//               "message",
//               "courts must be alist of array"
//             );
//             done();
//           }
//         });
//     });
//   });
// });

// describe("POST/owner/register", () => {
//   describe("Error register Owner", () => {
//     test("error email field input validity", (done) => {
//       request(app)
//         .post("/owner/register")
//         .send({
//           username: "test",
//           email: "futsalhub",
//           password: "123456",
//           role: "owner",
//           courts: [],
//         })
//         .end((err, res) => {
//           const { body, status } = res;
//           if (err) {
//             return done(err);
//           } else {
//             expect(status).toBe(400);
//             expect(body).toHaveProperty(
//               "message",
//               "Email input must be a valid email"
//             );
//             done();
//           }
//         });
//     });
//   });
// });

describe("POST/owner/register", () => {
  describe("Error register Owner", () => {
    test("error email field input uniqueness", (done) => {
      request(app)
        .post("/owner/register")
        .send({
          username: "test",
          email: "futsalhub@gmail.com",
          password: "123456",
          role: "owner",
          courts: [],
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

describe("POST/owner/login", () => {
  describe("Success login Owner", () => {
    test("response  with access token", (done) => {
      request(app)
        .post("/owner/login")
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

// describe("POST/owner/login", () => {
//   describe("Error login Owner", () => {
//     test("error empty field email", (done) => {
//       request(app)
//         .post("/owner/login")
//         .send({
//           email: "",
//           password: "123456",
//         })
//         .end((err, res) => {
//           const { body, status } = res;
//           if (err) {
//             return done(err);
//           } else {
//             expect(status).toBe(400);
//             expect(body).toHaveProperty("message", "Email is required");
//             done();
//           }
//         });
//     });
//   });
// });

// describe("POST/owner/login", () => {
//   describe("Error owner/login", () => {
//     test("error empty field password", (done) => {
//       request(app)
//         .post("/owner/login")
//         .send({
//           email: "futsalhub@gmail.com",
//           password: "",
//         })
//         .end((err, res) => {
//           const { body, status } = res;
//           if (err) {
//             return done(err);
//           } else {
//             expect(status).toBe(400);
//             expect(body).toHaveProperty("message", "Password is required");
//             done();
//           }
//         });
//     });
//   });
// });

// describe("POST/owner/login", () => {
//   describe("Error owner/login", () => {
//     test("error email field input validity", (done) => {
//       request(app)
//         .post("/owner/login")
//         .send({
//           email: "futsalhub",
//           password: "123456",
//         })
//         .end((err, res) => {
//           const { body, status } = res;
//           if (err) {
//             return done(err);
//           } else {
//             expect(status).toBe(400);
//             expect(body).toHaveProperty(
//               "message",
//               "Email input must be a valid email"
//             );
//             done();
//           }
//         });
//     });
//   });
// });

describe("POST/owner/login", () => {
  describe("Error Login Owner", () => {
    test("email is exist, but password is wrong", (done) => {
      request(app)
        .post("/owner/login")
        .send({
          email: "futsalhub@gmail.com",
          password: "123",
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

describe("POST/owner/login", () => {
  describe("Error owner/login", () => {
    test("email doesn't exist in database", (done) => {
      request(app)
        .post("/owner/login")
        .send({
          email: "futsalhub_palsu@gmail.com",
          password: "123456",
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
