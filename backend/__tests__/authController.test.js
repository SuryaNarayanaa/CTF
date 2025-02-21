const {app} = require('../app.js')
const supertest = require('supertest')
const {MongoMemoryServer} = require('mongodb-memory-server')
const mongoose = require('mongoose')


const userPayload = {
    team_name: 'TestTeam',
    email: 'test@example.com',
    password: 'text123',
}

describe("Testing The authController" , () =>{
    beforeAll(async()=>{
        const mongoServer = await MongoMemoryServer.create()
        await mongoose.connect(mongoServer.getUri())
    })

    afterAll(async()=>{
        await mongoose.disconnect();
        await mongoose.connection.close();
    })

    beforeEach(async()=>{
        const collections = mongoose.connection.collections;
  
        for (const key in collections) {
          await collections[key].deleteMany();
        }
    })

    describe("Testing the /signup Route",()=>{
        it('should register a user when crentials are given',async()=>{
            const res = await supertest(app).post('/api/auth/signup').send(userPayload)
            expect(res.status).toBe(201) 
            expect(res.body).toHaveProperty('message',"Registration successful")
            expect(res.body).toHaveProperty('data._id')
        })

        it('team_name should be unique',async()=>{
            await supertest(app).post('/api/auth/signup').send(userPayload)
            const res = await supertest(app).post('/api/auth/signup').send(userPayload)
            expect(res.status).toBe(401)
            expect(res.body.success).toBe(false)
            expect(res.body.data).toBe(null)
            expect(res.body).toHaveProperty('message','Team_name already exists')
        })

        it('admin login should not be allowed',async()=>{
            const res = await supertest(app).post('/api/auth/signup').send({...userPayload,role:"admin"})
            expect(res.status).toBe(401)
            expect(res.body.success).toBe(false)
            expect(res.body.data).toBe(null)
            expect(res.body).toHaveProperty('message',"You don't have access for admin-login")
        })

        it("should not sign-in for invalid email",async()=>{
            const res = await supertest(app).post('/api/auth/signup').send({...userPayload,email:"non-validemail"})
            expect(res.status).toBe(401)
            expect(res.body.success).toBe(false)
            expect(res.body.data).toBe(null)
            expect(res.body).toHaveProperty('message',"Provide a valid email")
        })
    
    })

    describe("Testing with  /login route",()=>{
        beforeEach(async()=>{
            const res = await supertest(app).post('/api/auth/signup').send(userPayload)
        })
        it("should login when the crentials are correct",async()=>{
            const res = await supertest(app).post('/api/auth/login').send({...userPayload,team_name:null})
            const sessionResponse = await supertest(app).get('/api/auth/session')
            console.log(sessionResponse.body)
            expect(res.status).toBe(200)
            expect(res.headers["set-cookie"][0]).toMatch(/connect.sid/); 
            expect(res.body.data).toHaveProperty('_id')
            
            expect(res.body).toHaveProperty('message',"User logged in")
        },15000)

        it("should not allow if their isn't email",async()=>{
            const res = await supertest(app).post('/api/auth/login').send({...userPayload,email:"non-test@gmail.com"})
            expect(res.status).toBe(404)
            expect(res.body.success).toBe(false)
            expect(res.body.data).toBe(null)
            expect(res.body).toHaveProperty('message',"User not found")

        })

        it("should allow  if their wrong password",async()=>{
            const res = await supertest(app).post('/api/auth/login').send({...userPayload,password:"12345"})
            expect(res.status).toBe(404)
            expect(res.body.success).toBe(false)
            expect(res.body.data).toBe(null)
            expect(res.body).toHaveProperty('message',"Invalid credentials")
        })

        it("Should not allow to login user two times",async()=>{
            await supertest(app).post('/api/auth/login').send({...userPayload})
            const res = await supertest(app).post('/api/auth/login').send({...userPayload})
            expect(res.status).toBe(401)
            expect(res.body.success).toBe(false)
            expect(res.body.data).toBe(null)
            expect(res.body).toHaveProperty('message',"team_member is already logged in")
        })
    })

    describe("testing the logout route",()=>{
        beforeEach(async()=>{
            const res = await supertest(app).post('/api/auth/signup').send(userPayload)
            await supertest(app).post('/api/auth/login').send(userPayload)
        })

        it("should logout when the user crentials are correct",async()=>{
            const res = await supertest(app).post('/api/auth/logout').send()
            
        })
    })


})