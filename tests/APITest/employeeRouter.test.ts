import { test, expect} from '@playwright/test'
import type{ EmployeeType } from "../../backend/src/zodSchemas"

test.describe('reset',()=>{
  let masterToken:string
  let normalToken:string
  let id:string

  test.beforeAll(async({request})=>{
    const resetResponse=await request.post('/api/testing/reset')
    expect(resetResponse.status()).toBe(204);

    const response=await request.post('/api/login',{
      data:{
        username:"M1a2b3c",
        password:"Password123!"
      }})
      
      expect(response.status()).toBe(200)
    const body = await response.json();
    masterToken = body.token

    const normalResponse = await request.post('/api/login',{
      data:{
        username:"S1a2b3f",
        password:"Password123!"
      }
    })

    expect(normalResponse.status()).toBe(200)
    const normalBody = await normalResponse.json();
    normalToken = normalBody.token



    const getResponse = await request.get('/api/employees',{
        headers: {
          Authorization: `Bearer ${masterToken}`,
        },
      });

    expect(getResponse.status()).toBe(200);

    const employees:EmployeeType[]=await getResponse.json()
    expect(Array.isArray(employees)).toBeTruthy();
    expect(employees.length).toBeGreaterThan(0);
    
    const target= employees.find(e=>e.username==="M1a2b3c")
    id=target?.id as string
    expect(id).toBeDefined();
    })

    test.describe("GET /api/employees",()=>{
      //getall
      test('should return an array of employee', async ({ request }) => {
      const response = await request.get('/api/employees',{
        headers: {
          Authorization: `Bearer ${masterToken}`,
        },
      });

      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(Array.isArray(body)).toBeTruthy();
      expect(body.length).toBeGreaterThan(0);
    });

      test('should return one employee',async({request})=>{
        const response = await request.get(`/api/employees/${id}`,{
        headers: {
          Authorization: `Bearer ${masterToken}`,
        },
      });

      const employee = await response.json();

        expect(employee).not.toHaveProperty('passwordHash')
        expect(employee).toHaveProperty('id');
        expect(employee).toHaveProperty('name');
        expect(employee).toHaveProperty('dateOfBirth');
        expect(employee).toHaveProperty('gender');
        expect(employee).toHaveProperty('title');
        expect(employee).toHaveProperty('role');
        expect(employee).toHaveProperty('NI');
        expect(employee).toHaveProperty('address');
        expect(employee).toHaveProperty('emergencyContact');
      
    })

    test("should return 403 forbidden",async({request})=>{
      const response = await request.get(`/api/employees/${id}`,{
        headers: {
          Authorization: `Bearer ${normalToken}`,
        },
      });

      expect(response.status()).toBe(403)

    })    
    })

    test.describe("POST /api/employees",()=>{
      test("should add a new employee",async({request})=>{
        const newEmployee={
          name: "David Miller",
        username: "D9f8e7c",             
        password: "Password123!",        
        title: "Clinical Assistant",
        dateOfBirth: "1998-11-20",
        NI: "CE654321D",                
        address: "15 Baker Street, London",
        emergencyContact: "07700900456",
        gender: "male",
        role: "normal"
        }

        const response = await request.post('/api/employees', {
        data: newEmployee,
        headers: {
          Authorization: `Bearer ${masterToken}`,
        }
      });

      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body).toHaveProperty('id');
      expect(body).toHaveProperty('name', newEmployee.name);
      expect(body).toHaveProperty('dateOfBirth', newEmployee.dateOfBirth);
      expect(body).toHaveProperty('gender', newEmployee.gender);
      expect(body).toHaveProperty('title', newEmployee.title);
      expect(body).toHaveProperty('role', newEmployee.role);
      expect(body).toHaveProperty('emergencyContact', newEmployee.emergencyContact);
      expect(body).toHaveProperty('address', newEmployee.address);
      expect(body).toHaveProperty('NI',newEmployee.NI);
      expect(body).not.toHaveProperty('password')

      })  
      
      test("should return 403 forbidden",async({request})=>{
        const newEmployee={
          name: "David Miller",
        username: "D9f8e7c",             
        password: "Password123!",        
        title: "Clinical Assistant",
        dateOfBirth: "1998-11-20",
        NI: "CE654321D",                
        address: "15 Baker Street, London",
        emergencyContact: "07700900456",
        gender: "male",
        role: "normal"
        }

        const response = await request.post('/api/employees', {
        data: newEmployee,
        headers: {
          Authorization: `Bearer ${normalToken}`,
        }
      });

      expect(response.status()).toBe(403);
      })

      test("invalid Data should return 400",async({request})=>{
        const newEmployee={
          name:"wrong"
        }

        const response = await request.post('/api/employees', {
        data: newEmployee,
        headers: {
          Authorization: `Bearer ${masterToken}`,
        }
      });

      expect(response.status()).toBe(400);

      })
    })

    test.describe("PATCH /api/employees",()=>{
      test("should update new Password",async({request})=>{
        const updatePassword={
          oldPassword:"Password123!",
          newPassword:"NewPassword123!"
        }

        const response = await request.patch(`/api/employees/${id}/password`, {
        data: updatePassword,
        headers: {
          Authorization: `Bearer ${masterToken}`,
        }
      });

      expect(response.status()).toBe(200)

      const loginTrial=await request.post('/api/login',{
      data:{
        username:"M1a2b3c",
        password:"NewPassword123!"
      }})
      
      expect(loginTrial.status()).toBe(200)


      })

      test("should return 403 forbidden",async({request})=>{
        const updatePassword={
          oldPassword:"Password123!",
          newPassword:"NewPassword123!"
        }

        const response = await request.patch(`/api/employees/${id}/password`, {
        data: updatePassword,
        headers: {
          Authorization: `Bearer ${normalToken}`,
        }
      });

      expect(response.status()).toBe(403)})
    })

    test("should update some employee details",async({request})=>{
      const updateDetails={name:"Change New Name"}

      const response = await request.patch(`/api/employees/${id}/details`,{
        data:updateDetails,
        headers:{
          Authorization:`Bearer ${masterToken}`,
        }
      })

      expect(response.status()).toBe(200)

      const checkTarget= await request.get(`/api/employees/${id}`,{headers:{
          Authorization:`Bearer ${masterToken}`,
        }})
      
      const target= await checkTarget.json()

      expect(target).toHaveProperty("name",updateDetails.name)

    })
})

