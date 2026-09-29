# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: employeeRouter.test.ts >> reset >> GET /api/employees >> should return 404 for invalidId
- Location: employeeRouter.test.ts:107:10

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 404
Received: 400
```

# Test source

```ts
  14  |     const response=await request.post('/api/login',{
  15  |       data:{
  16  |         username:"M1a2b3c",
  17  |         password:"Password123!"
  18  |       }})
  19  |       
  20  |       expect(response.status()).toBe(200)
  21  |     const body = await response.json();
  22  |     masterToken = body.token
  23  | 
  24  |     const normalResponse = await request.post('/api/login',{
  25  |       data:{
  26  |         username:"S1a2b3f",
  27  |         password:"Password123!"
  28  |       }
  29  |     })
  30  | 
  31  |     expect(normalResponse.status()).toBe(200)
  32  |     const normalBody = await normalResponse.json();
  33  |     normalToken = normalBody.token
  34  | 
  35  | 
  36  | 
  37  |     const getResponse = await request.get('/api/employees',{
  38  |         headers: {
  39  |           Authorization: `Bearer ${masterToken}`,
  40  |         },
  41  |       });
  42  | 
  43  |     expect(getResponse.status()).toBe(200);
  44  | 
  45  |     const employees:EmployeeType[]=await getResponse.json()
  46  |     expect(Array.isArray(employees)).toBeTruthy();
  47  |     expect(employees.length).toBeGreaterThan(0);
  48  |     
  49  |     const target= employees.find(e=>e.username==="M1a2b3c")
  50  |     id=target?.id as string
  51  |     expect(id).toBeDefined();
  52  | 
  53  |      const toDelete=employees.find(e=>e.username==="T123456")
  54  |      toDeleteID=toDelete?.id as string
  55  |      expect(toDeleteID).toBeDefined();
  56  |     })
  57  | 
  58  |     test.describe("GET /api/employees",()=>{
  59  |       //getall
  60  |       test('should return an array of employee', async ({ request }) => {
  61  |       const response = await request.get('/api/employees',{
  62  |         headers: {
  63  |           Authorization: `Bearer ${masterToken}`,
  64  |         },
  65  |       });
  66  | 
  67  |       expect(response.status()).toBe(200);
  68  | 
  69  |       const body = await response.json();
  70  |       expect(Array.isArray(body)).toBeTruthy();
  71  |       expect(body.length).toBeGreaterThan(0);
  72  |     });
  73  | 
  74  |       test('should return one employee',async({request})=>{
  75  |         const response = await request.get(`/api/employees/${id}`,{
  76  |         headers: {
  77  |           Authorization: `Bearer ${masterToken}`,
  78  |         },
  79  |       });
  80  | 
  81  |       const employee = await response.json();
  82  | 
  83  |         expect(employee).not.toHaveProperty('passwordHash')
  84  |         expect(employee).toHaveProperty('id');
  85  |         expect(employee).toHaveProperty('name');
  86  |         expect(employee).toHaveProperty('dateOfBirth');
  87  |         expect(employee).toHaveProperty('gender');
  88  |         expect(employee).toHaveProperty('title');
  89  |         expect(employee).toHaveProperty('role');
  90  |         expect(employee).toHaveProperty('NI');
  91  |         expect(employee).toHaveProperty('address');
  92  |         expect(employee).toHaveProperty('emergencyContact');
  93  |       
  94  |     })
  95  | 
  96  |     test("should return 403 forbidden",async({request})=>{
  97  |       const response = await request.get(`/api/employees/${id}`,{
  98  |         headers: {
  99  |           Authorization: `Bearer ${normalToken}`,
  100 |         },
  101 |       });
  102 | 
  103 |       expect(response.status()).toBe(403)
  104 | 
  105 |     })    
  106 | 
  107 |      test("should return 404 for invalidId",async({request})=>{
  108 |       const response = await request.get("/api/employees/invalidID",{
  109 |         headers: {
  110 |           Authorization: `Bearer ${masterToken}`,
  111 |         },
  112 |       });
  113 | 
> 114 |       expect(response.status()).toBe(404)
      |                                 ^ Error: expect(received).toBe(expected) // Object.is equality
  115 | 
  116 |     })    
  117 |     })
  118 | 
  119 |     test.describe("POST /api/employees",()=>{
  120 |       const newEmployee={
  121 |           name: "David Miller",
  122 |         username: "D9f8e7c",             
  123 |         password: "Password123!",        
  124 |         title: "Clinical Assistant",
  125 |         dateOfBirth: "1998-11-20",
  126 |         NI: "CE654321D",                
  127 |         address: "15 Baker Street, London",
  128 |         emergencyContact: "07700900456",
  129 |         gender: "male",
  130 |         role: "normal"
  131 |         }
  132 |       test("should add a new employee",async({request})=>{
  133 | 
  134 |         const response = await request.post('/api/employees', {
  135 |         data: newEmployee,
  136 |         headers: {
  137 |           Authorization: `Bearer ${masterToken}`,
  138 |         }
  139 |       });
  140 | 
  141 |       expect(response.status()).toBe(200);
  142 | 
  143 |       const body = await response.json();
  144 |       expect(body).toHaveProperty('id');
  145 |       expect(body).toHaveProperty('name', newEmployee.name);
  146 |       expect(body).toHaveProperty('dateOfBirth', newEmployee.dateOfBirth);
  147 |       expect(body).toHaveProperty('gender', newEmployee.gender);
  148 |       expect(body).toHaveProperty('title', newEmployee.title);
  149 |       expect(body).toHaveProperty('role', newEmployee.role);
  150 |       expect(body).toHaveProperty('emergencyContact', newEmployee.emergencyContact);
  151 |       expect(body).toHaveProperty('address', newEmployee.address);
  152 |       expect(body).toHaveProperty('NI',newEmployee.NI);
  153 |       expect(body).not.toHaveProperty('password')
  154 | 
  155 |       })  
  156 |       
  157 |       test("should return 403 forbidden",async({request})=>{
  158 |         
  159 |         const response = await request.post('/api/employees', {
  160 |         data: newEmployee,
  161 |         headers: {
  162 |           Authorization: `Bearer ${normalToken}`,
  163 |         }
  164 |       });
  165 | 
  166 |       expect(response.status()).toBe(403);
  167 |       })
  168 | 
  169 |       test("invalid Data should return 400",async({request})=>{
  170 |         const newEmployee={
  171 |           name:"wrong"
  172 |         }
  173 | 
  174 |         const response = await request.post('/api/employees', {
  175 |         data: newEmployee,
  176 |         headers: {
  177 |           Authorization: `Bearer ${masterToken}`,
  178 |         }
  179 |       });
  180 | 
  181 |       expect(response.status()).toBe(400);
  182 | 
  183 |       })
  184 |     })
  185 | 
  186 |     test.describe("PATCH /api/employees",()=>{
  187 |       const updatePassword={
  188 |           oldPassword:"Password123!",
  189 |           newPassword:"NewPassword123!"
  190 |         }
  191 |       const updateDetails={name:"Change New Name"}
  192 | 
  193 |       test("should update new Password",async({request})=>{
  194 | 
  195 |         const response = await request.patch(`/api/employees/${id}/password`, {
  196 |         data: updatePassword,
  197 |         headers: {
  198 |           Authorization: `Bearer ${masterToken}`,
  199 |         }
  200 |       });
  201 | 
  202 |       expect(response.status()).toBe(200)
  203 | 
  204 |       const loginTrial=await request.post('/api/login',{
  205 |       data:{
  206 |         username:"M1a2b3c",
  207 |         password:"NewPassword123!"
  208 |       }})
  209 |       
  210 |       expect(loginTrial.status()).toBe(200)
  211 |       })
  212 | 
  213 |       test("should return 403 forbidden, no update PW",async({request})=>{
  214 |         
```