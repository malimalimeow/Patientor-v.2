import { test, expect} from '@playwright/test';

test.describe('reset',()=>{

  test.beforeEach(async({request})=>{
    await request.post('/api/testing')
  })

test.describe('POST /api/login',()=>{
    test.describe("with username and password",()=>{
        test("should able to login and return a token",async({request})=>{
    const response=await request.post('/api/login',{
      data:{
        username:"M1a2b3c",
        password:"Password123!"
      }})
      expect(response.ok()).toBeTruthy();

    const body = await response.json();
      expect(body).toHaveProperty('token')
   })})

   test.describe("wrong username",()=>{
    test("should return 400 and not allow to login",async({request})=>{
        const response=await request.post('/api/login',{
      data:{
        username:"wrongname",
        password:"Password123!"
      }})
       expect(response.status()).toBe(400);
    } )
   })

    test.describe("wrong password",()=>{
    test("should return 400 and not allow to login",async({request})=>{
        const response=await request.post('/api/login',{
      data:{
        username:"M1a2b3c",
        password:"wrongPassword"
      }})
       expect(response.status()).toBe(400);
    } )
   })
   
})
})