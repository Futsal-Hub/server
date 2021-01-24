const db = require("../config/mongo");
const request = require("supertest");
const app = require("../app");
let token="sfjsklfjlskjfl"
let id;
let insertRequest = {
  origin :{name: "sangga"},
  destination: {name: "test"},
  status: "pending"
}

afterAll(async (done) => {
  await db.collection("request").drop();
  done()
});

beforeAll( async (done) => {
  try {
    const response = await db.collection("request").insertOne(insertRequest)
    id = response.ops[0]._id
    done()
  } catch (error) {
    done(error)
  }
});

describe("POST/request", () => {
  describe("Success add request", () => {
    test("create request with accept body value", (done) => {
      request(app)
        .post("/request")
        .set("access_token", token)
        .send({
          origin: {name: "sangga 2"},
          destination: {name: "test"},
          status: "pending"
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          } else {
            expect(status).toBe(201);
            expect(body).toHaveProperty("origin", expect.any(Object)),
            expect(body).toHaveProperty("destination", expect.any(Object)),
            expect(body).toHaveProperty("status", "pending")
            done();
          }
        });
    });
  });
});


describe("PATCH /request", () => {
  describe("Success Edit request", () => {
    test("Update Status", (done) => {
      request(app)
        .patch("/request/" + id)
        .set("access_token", token)
        .send({
          status: "rejected"
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          } else {
            expect(status).toBe(200);
            expect(body).toHaveProperty("status", "rejected")
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
            expect(body).toHaveProperty("message",'Resource Deleted Successfully' )
            done();
          }
        });
    });
  });
});

