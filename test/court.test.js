const db = require("./config/mongo");
const request = require("supertest");
const app = require("./app");
let token = "sjflsjfl";
let courtId;

// afterAll(async (done) => {
//   await db.collection("courts").drop();
// });

// beforeAll((done) => {
//   // try {
//   db.collection("users")
//     .insertOne({
//       email: "test@gmail.com",
//       password: "12345",
//     })
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((err) => {
//       console.log(err);
//     });

//   //   const responses = await Promise.all(
//   //     ,
//   //     db.collection("courts").insertOne({
//   //       name: "lapangan A",
//   //       price: 120000,
//   //       type: "grass",
//   //       lat: 1232425.5,
//   //       long: 234252,
//   //     })
//   //   );
//   //   console.log(responses);
//   // } catch (error) {
//   //   console.log("error");
//   //   console.log(error);
//   // }
// });

describe("Create Court POST /court", () => {
  describe("Success Create Court", () => {
    test("Create Court with valid body value", (done) => {
      request(app)
        .post("/court")
        .set("access_token", token)
        .send({
          name: "lapangan A",
          price: 120000,
          type: "grass",
          lat: 1232425.5,
          long: 234252,
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) done(err);
          expect(status).toBe(201);
          expect(body).toHaveProperty("name", "lapangan A");
          expect(body).toHaveProperty("price", 120000);
          expect(body).toHaveProperty("type", "grass");
          expect(body).toHaveProperty("lat", 1232425.5);
          expect(body).toHaveProperty("long", 234252);
        });
    });
  }),
    describe("Fail Create Court", () => {
      test("Not Having TOken", (done) => {
        request(app)
          .post("/court")
          .send({
            name: "lapangan A",
            price: 120000,
            type: "grass",
            position: {
              lon: 758079872,
              lat: 298084902840,
            },
          })
          .end((err, res) => {
            const { body, status } = res;
            if (err) return done(err);
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "You must login first");
            done();
          });
      });
    }),
    describe("Fail Create Court ", () => {
      test("Missing Required Field", (done) => {
        request(app)
          .post("/court")
          .set("access_token", token)
          .send({
            name: "",
            price: 120000,
            type: "grass",
            position: {
              lon: 758079872,
              lat: 298084902840,
            },
          })
          .end((err, res) => {
            const { body, status } = res;
            if (err) return done(err);
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Name Must be Filled");
            done();
          });
      });
    });
});

describe("Update Court PUT/court/:id", () => {
  describe("Success Update Court", () => {
    test("Update Court With valid Body value", (done) => {
      request(app)
        .put("/court/:id")
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
          expect(status).toBe(201);
          expect(body).toHaveProperty("name", "lapangan abc");
          expect(body).toHaveProperty("type", "grass");
          expect(body).toHaveProperty("schedule", "lapangan abc");
          expect(body).toHaveProperty("address", "jl.baru");
          expect(body).toHaveProperty("position", "lsfjlsj");
          done();
        });
    });
  }),
    describe("Fail Update Court", () => {
      test("Didn't send token", (done) => {
        request(app)
          .put("/court/:id")
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
            postion: {
              lon: 892803,
              lat: 9328092,
            },
          })
          .end((err, res) => {
            if (err) console.log(err);
            const { body, status } = res;
            if (err) return done(err);

            console.log(body, "<<<<<");
            console.log(status, "<<<<<");
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "You must login first");
            done();
          });
      });
    }),
    describe("Fail Update Court", () => {
      describe("Missing Required Field", () => {
        test("User input missing required field", (done) => {
          request(app)
            .put("/court/" + court)
            .set("access_token", token)
            .send({
              name: "",
              type: "grass",
              schedule: [
                {
                  id: "1",
                  start: 8,
                  end: 10,
                },
              ],
              address: "jl.baru",
              postion: {
                lon: 892803,
                lat: 9328092,
              },
            })
            .end((err, res) => {
              const { body, status } = res;
              if (err) return done(err);

              expect(status).toBe(400);
              expect(body).toHaveProperty("message", "name must be filled");
              done();
            });
        });
      }),
        describe("Negative Number in Integer Field", () => {
          test("User input negative number on stock or price", (done) => {
            request(app)
              .put("/court/" + courtId)
              .set("access_token", token)
              .send({
                name: "",
                type: "grass",
                schedule: [
                  {
                    id: "1",
                    start: 8,
                    end: 10,
                  },
                ],
                address: "jl.baru",
                postion: {
                  lon: 892803,
                  lat: 9328092,
                },
                price: -1,
              })
              .end((err, res) => {
                const { body, status } = res;
                if (err) return done(err);

                expect(status).toBe(400);
                expect(body).toHaveProperty(
                  "message",
                  "price can't be less than 0"
                );
                done();
              });
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
    describe("Fail Delete Court", () => {
      describe("Not having token", () => {
        test("access without token", (done) => {
          request(app)
            .delete("/court/" + courtId)
            .end((err, res) => {
              const { body, status } = res;
              if (err) return done(err);

              expect(status).toBe(400);
              expect(body).toHaveProperty("message", "You must login first");
              done();
            });
        });
      });
    });
});
