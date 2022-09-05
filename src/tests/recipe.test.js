const request = require("supertest");
const httpStatus = require("http-status");
const db = require("../config/jest-mongodb.config");
const app = require("../app");
const test = require("./config/recipe.config");
const { insertUserInDB, changeRecipeDate, goodJohnDoe } = require("./config/recipe.config");
const user = require("../controllers/user.controller")

beforeAll(async () => {
    await db.connect();
 
  });
  
  afterEach(async () => {
    await db.clearDatabase();
  });
  
  afterAll(async () => {
    await db.closeDatabase();

  });

  describe("Recipe Allergens", () => {

    it('should send a list of all allergens', async () => {
        await insertUserInDB(test.JohnDoe)

        const res1 = await request(app)
            .post('/v0/user/login')
            .send({
                email:    test.JohnDoe.email,
                password: test.JohnDoe.password
            })

         const res = await request(app)
            .get('/v0/recipe/getAllergens')
            .set('Authorization', 'bearer ' + res1.body.token)
            .send()

        expect(res.statusCode).toEqual(httpStatus.OK)
        expect(res.body).toEqual(test.allAllergens)
    })
  });


  describe("Recipe CookTypes", () => {

    it('should send a list of all cooking style', async () => {
        await insertUserInDB(test.JohnDoe)

        const res1 = await request(app)
            .post('/v0/user/login')
            .send({
                email:    test.JohnDoe.email,
                password: test.JohnDoe.password
            })

         const res = await request(app)
            .get('/v0/recipe/getCookTypes')
            .set('Authorization', 'bearer ' + res1.body.token)
            .send()

        expect(res.statusCode).toEqual(httpStatus.OK)
        expect(res.body).toEqual(test.allCookingType)
    })
  });


  describe("Recipe Particularities", () => {

    it('should send a list of all particularities', async () => {
        await insertUserInDB(test.JohnDoe)

        const res1 = await request(app)
            .post('/v0/user/login')
            .send({
                email:    test.JohnDoe.email,
                password: test.JohnDoe.password
            })

         const res = await request(app)
            .get('/v0/recipe/getParticularities')
            .set('Authorization', 'bearer ' + res1.body.token)
            .send()

        expect(res.statusCode).toEqual(httpStatus.OK)
        expect(res.body).toEqual(test.allParticularities)
    })
  });


  describe("Recipe Duration", () => {

    it('should send a list of all duration', async () => {
        await insertUserInDB(test.JohnDoe)

        const res1 = await request(app)
            .post('/v0/user/login')
            .send({
                email:    test.JohnDoe.email,
                password: test.JohnDoe.password
            })

         const res = await request(app)
            .get('/v0/recipe/getDuration')
            .set('Authorization', 'bearer ' + res1.body.token)
            .send()

        expect(res.statusCode).toEqual(httpStatus.OK)
        expect(res.body).toEqual(test.allDuration)
    })
  });

  describe("Recipe Get", () => {

    it('Should replace an empty recipe with a new recipe in the DB and send that recipe back', async () => {
        await insertUserInDB(test.JohnDoe)

        const res1 = await request(app)
            .post('/v0/user/login')
            .send({
                email:    test.JohnDoe.email,
                password: test.JohnDoe.password
            })

        let currentUser = await user.currentUserTest(res1)

        let recipe1 = currentUser.recipe

        const res = await request(app)
            .get('/v0/recipe/get')
            .set('Authorization', 'bearer ' + res1.body.token)
            .send()

        let currentUser2 = await user.currentUserTest(res1)
        let recipe2 = currentUser2.recipe

        expect(res.statusCode).toEqual(httpStatus.OK)
        expect(recipe1).toEqual("")
        expect(recipe2).not.toEqual("")
    })

    it('Should not replace a recipe if a valid recipe is already present', async () => {
        await insertUserInDB(test.JohnDoe)

        const res1 = await request(app)
            .post('/v0/user/login')
            .send({
                email:    test.JohnDoe.email,
                password: test.JohnDoe.password
            })

        const res = await request(app)
            .get('/v0/recipe/get')
            .set('Authorization', 'bearer ' + res1.body.token)
            .send()

        let currentUser = await user.currentUserTest(res1)
        let recipe1 = JSON.parse(currentUser.recipe)

        const res2 = await request(app)
            .get('/v0/recipe/get')
            .set('Authorization', 'bearer ' + res1.body.token)
            .send()

        let currentUser2 = await user.currentUserTest(res1)
        let recipe2 = JSON.parse(currentUser2.recipe)

        expect(res.statusCode).toEqual(httpStatus.OK)
        expect(recipe1.id).toEqual(recipe2.id)
    })

    it('should replace the recipe if the date is too old', async () => {
        await insertUserInDB(test.JohnDoe)

        const res1 = await request(app)
            .post('/v0/user/login')
            .send({
                email:    test.JohnDoe.email,
                password: test.JohnDoe.password
            })

        const res = await request(app)
            .get('/v0/recipe/get')
            .set('Authorization', 'bearer ' + res1.body.token)
            .send()

        
        let currentUser = await user.currentUserTest(res1)
        await changeRecipeDate(currentUser)

        const res2 = await request(app)
            .get('/v0/recipe/get')
            .set('Authorization', 'bearer ' + res1.body.token)
            .send()

        expect(res.statusCode).toEqual(httpStatus.OK)
        expect(res.body.id).not.toEqual(res2.body.id)
    })

    /*it('should send a recipe that match the user preferencies', async () => {
        await insertUserInDB(test.JohnDoe)

        const res1 = await request(app)
            .post('/v0/user/login')
            .send({
                email:    test.JohnDoe.email,
                password: test.JohnDoe.password
            })

    }
*/

  });