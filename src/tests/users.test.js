const request = require("supertest");
const httpStatus = require("http-status");
const db = require("../config/jest-mongodb.config");
const app = require("../app");
const test = require("./config/user.config");
const { insertUserInDB, goodJohnDoe } = require("./config/user.config");

beforeAll(async () => {
    await db.connect();
    //jest.setTimeout(15000)
  });
  
  afterEach(async () => {
    await db.clearDatabase();
  });
  
  afterAll(async () => {
    await db.closeDatabase();
    //await new Promise(resolve => setTimeout(() => resolve(), 10000)); // avoid jest open handle error
  });

  
  describe("User register", () => {

//   it('should not register all fields arent correctly set', async () => {
//       const res = await request(app)
//           .post('/v0/user/register')
//           .send(test.badJohnDoe)
//
//       expect(res.statusCode).toEqual(httpStatus.BAD_REQUEST)
//       expect(res.body).toEqual(test.badRegisterResponse)
//   })

    it('should register a user if all fields are correctly set ', async () => {
        const res = await request(app)
            .post('/v0/user/register')
            .send(test.goodJohnDoe)

        expect(res.statusCode).toEqual(httpStatus.CREATED)
    })

    it('should return that user already exsit', async () => {
        const temp = await request(app)
            .post('/v0/user/register')
            .send(test.goodJohnDoe)

        const res = await request(app)
            .post('/v0/user/register')
            .send(test.goodJohnDoe)

        expect(res.statusCode).toEqual(httpStatus.CONFLICT)
        expect(res.body.error).toEqual('User Already Exist. Please Login')
    })
  });
  

  describe("User login", () => {

    it('should not login if password not match', async () => {
        
        await insertUserInDB(test.goodJohnDoe);

        const res = await request(app)
            .post('/v0/user/login')
            .send({
                email:    test.badJohnDoe.email,
                password: test.badJohnDoe.password
            })

        expect(res.statusCode).toEqual(httpStatus.BAD_REQUEST)
        expect(res.body.error).toEqual('Invalid Credentials')
    })

    it('should get a token once logged in ', async () => {

        await insertUserInDB(test.goodJohnDoe)

        const res = await request(app)
            .post('/v0/user/login')
            .send({
                email:    test.goodJohnDoe.email,
                password: test.goodJohnDoe.password
            })


        expect(res.statusCode).toEqual(httpStatus.OK)
        expect(res.body.token).toBeDefined()
    })
  });

  describe("User Preferences", () => {

    it('should have default preferences', async () => {
        
        await insertUserInDB(test.goodJohnDoe)

        const res1 = await request(app)
            .post('/v0/user/login')
            .send({
                email:    test.goodJohnDoe.email,
                password: test.goodJohnDoe.password
            })

         const res = await request(app)
            .get('/v0/user/getPreferences')
            .set('Authorization', 'bearer ' + res1.body.token)
            .send()
        
        

        expect(res.statusCode).toEqual(httpStatus.OK)
        expect(res.body.preferences).toHaveProperty('allergens')
        expect(res.body.preferences).toHaveProperty('particularities')
        expect(res.body.preferences).toHaveProperty('cookTypes')
        expect(res.body.preferences).toHaveProperty('healthy')
        expect(res.body.preferences).toHaveProperty('duration')
        
    })

  });