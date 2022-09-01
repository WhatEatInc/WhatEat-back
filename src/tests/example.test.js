const request = require("supertest");
const httpStatus = require("http-status");
const db = require("../config/jest-mongodb.config");
const app = require("../app");

beforeAll(async () => {
  await db.connect();
});

afterEach(async () => {
  await db.clearDatabase();
});

afterAll(async () => {
  await db.closeDatabase();
});

describe("Test Example", () => {
  //it('should get pasta carbo', async () => {
  //    const res = await request(app)
  //        .get('/v0/recipe/get')
  //        .send()
  //    expect(res.statusCode).toEqual(httpStatus.OK)
  //    expect(res.body).toHaveProperty('title')
  //    expect(res.body.title).toBe('pasta carbo')
  //})

  //it('should get always the same recipe', async () => {
  //    const res = await request(app)
  //            .get('/v0/recipe/get')
  //            .send()
  //        expect(res.statusCode).toEqual(httpStatus.OK)
  //        expect(res.body).toHaveProperty('recipes')
  //    })

  it("should post a recipe", async () => {
    const res = await request(app).post("/v0/recipe/post").send({
      hello: "myHello",
      world: "myWorld",
    });
    expect(res.statusCode).toEqual(httpStatus.CREATED);
    expect(res.body).toHaveProperty("hello");
    expect(res.body).toHaveProperty("world");
    expect(res.body).toHaveProperty("_id");
    expect(res.body.hello).toBe("myHello");
    expect(res.body.world).toBe("myWorld");
    expect(res.body._id).not.toBe("");
  });
});
