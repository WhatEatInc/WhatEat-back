const request = require("supertest");
const app = require("../../app");


const goodJohnDoe = {

    firstname: "John",
    lastname: "Doe",
    email: "john@doe.com",
    password: "Re4allyCompl3x*Pass"

    }

const badJohnDoe = {

        firstname: "",
        lastname: "",
        email: "johndoe.com",
        password: "*Pass1"
    
        }

const badRegisterResponse = {
    "errors": [
        {
            "value": "",
            "msg": "Invalid value",
            "param": "firstname",
            "location": "body"
        },
        {
            "value": "",
            "msg": "Invalid value",
            "param": "lastname",
            "location": "body"
        },
        {
            "value": "johndoe.com",
            "msg": "Invalid value",
            "param": "email",
            "location": "body"
        },
        {
            "value": "*Pass1",
            "msg": "Invalid value",
            "param": "password",
            "location": "body"
        }
    ]
}



async function insertUserInDB(user){
    const res = await request(app)
    .post('/v0/user/register')
    .send(user)
}

module.exports = {
    goodJohnDoe: goodJohnDoe,
    badJohnDoe: badJohnDoe,
    badRegisterResponse: badRegisterResponse,
    insertUserInDB
};