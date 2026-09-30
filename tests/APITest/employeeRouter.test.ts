import { test, expect} from '@playwright/test'
import type{ EmployeeType } from "../../backend/src/zodSchemas"

test.describe('reset',()=>{
  let masterToken:string
  let normalToken:string
  let id:string
  let toDeleteID:string
  const fakeID:string="60c72b2f9b1d8c2a4c8e4b1a"

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

     const toDelete=employees.find(e=>e.username==="T123456")
     toDeleteID=toDelete?.id as string
     expect(toDeleteID).toBeDefined();
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

     test("should return 404 for invalidId, employee not found",async({request})=>{
      const response = await request.get(`/api/employees/${fakeID}`,{
        headers: {
          Authorization: `Bearer ${masterToken}`,
        },
      });

      expect(response.status()).toBe(404)

    })    
    })

    test.describe("POST /api/employees",()=>{
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
      test("should add a new employee",async({request})=>{

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
      const updatePassword={
          oldPassword:"Password123!",
          newPassword:"NewPassword123!"
        }
      const updateDetails={name:"Change New Name"}

      test("should update new Password",async({request})=>{

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

      test("should return 403 forbidden, no update PW",async({request})=>{
        
        const response = await request.patch(`/api/employees/${id}/password`, {
        data: updatePassword,
        headers: {
          Authorization: `Bearer ${normalToken}`,
        }
      });

      expect(response.status()).toBe(403)})    

    test("should update some employee details",async({request})=>{
      
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

    test("wrong data,should return 400 and reject update",async({request})=>{
      
      const response = await request.patch(`/api/employees/${id}/details`,{
        data:{role:"superman",gender:"cat"},
        headers:{
          Authorization:`Bearer ${masterToken}`,
        }
      })

      expect(response.status()).toBe(400)})

    test("should return 404 for invalid ID, no update details",async({request})=>{

      const response = await request.patch(`/api/employees/${fakeID}/details`,{
        data:updateDetails,
        headers:{
          Authorization:`Bearer ${masterToken}`,
        }
      })

      expect(response.status()).toBe(404)

    })

    test("should return 403 forbidden, no update details",async({request})=>{

      const response = await request.patch(`/api/employees/${id}/details`,{
        data:updateDetails,
        headers:{
          Authorization:`Bearer ${normalToken}`,
        }
      })

      expect(response.status()).toBe(403)
    })

    test("should return 400 for random id, no update",async({request})=>{

      const response = await request.patch("/api/employees/invalidID/details",{
        data:updateDetails,
        headers:{
          Authorization:`Bearer ${masterToken}`,
        }
      })

      expect(response.status()).toBe(400)
    })

    })

    test.describe("DELETE /api/employee/:id",()=>{
      test("should delete a patient",async({request})=>{
        const response = await request.delete(`/api/employees/${toDeleteID}`,{headers:{
          Authorization:`Bearer ${masterToken}`,
        }})

        expect(response.status()).toBe(200)

        const checkTarget = await request.get(`/api/employees/${toDeleteID}`,{headers:{
          Authorization:`Bearer ${masterToken}`,
        }})

        expect(checkTarget.status()).toBe(404)
      })

      test("should return 403 forbidden, not delete employee",async({request})=>{

        const response = await request.delete(`/api/employees/${id}`,{headers:{
          Authorization:`Bearer ${normalToken}`,
        }})


        expect(response.status()).toBe(403)
      })

      test("should return 404 for id not existed, cant find anyone",async({request})=>{
        const response = await request.delete(`/api/employees/${fakeID}`,{headers:{
          Authorization:`Bearer ${masterToken}`,
        }})

        expect(response.status()).toBe(404)
      })

       test("should return 400 for random id",async({request})=>{
        const response = await request.delete("/api/employees/invalidID",{headers:{
          Authorization:`Bearer ${masterToken}`,
        }})

        expect(response.status()).toBe(400)
      })

    })

   

})

