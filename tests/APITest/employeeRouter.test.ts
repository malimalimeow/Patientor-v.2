import { test, expect} from '@playwright/test';
test.describe('reset',()=>{

  test.beforeEach(async({request})=>{
    await request.post('/api/testing')
  })

test.describe('login',()=>{
  let token:string

  test.beforeAll(async({request})=>{
    const response=await request.post('/api/login',{
      data:{
        username:"M1a2b3c",
        password:"Password123!"
      }})
      expect(response.ok()).toBeTruthy();
    const body = await response.json();
    token = body.token
    })

    test.describe("employee API",()=>{
        
    })
})})

