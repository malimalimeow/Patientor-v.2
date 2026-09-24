import { test, expect} from '@playwright/test';
test.describe('reset',()=>{
  let token:string
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
    token = body.token

    const getResponse = await request.get('/api/employees',{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    expect(getResponse.status()).toBe(200);

    const employees=await getResponse.json()
    expect(Array.isArray(employees)).toBeTruthy();
    expect(employees.length).toBeGreaterThan(0);
    
    id=employees[0].id||employees[0]._id
    expect(id).toBeDefined();
    })

    test.describe("GET /api/employees",()=>{
      //getall
      test('should return an array of employee', async ({ request }) => {
      const response = await request.get('/api/employees',{
        headers: {
          Authorization: `Bearer ${token}`,
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
          Authorization: `Bearer ${token}`,
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


        
    })
})

