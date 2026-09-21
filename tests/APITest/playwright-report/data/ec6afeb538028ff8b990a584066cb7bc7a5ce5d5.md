# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: patientRouter.test.ts >> reset >> Patientor API >> GET /api/ping >> should return pong
- Location: patientRouter.test.ts:37:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 400
```

# Test source

```ts
  1   | import { test, expect} from '@playwright/test';
  2   | 
  3   | test.describe('reset',()=>{
  4   |    let token:string
  5   |    let id:string
  6   | 
  7   |   test.beforeEach(async({request})=>{
  8   |     const resetResponse=await request.post('/api/testing/reset')
  9   |     expect(resetResponse.status()).toBe(204);
  10  | 
  11  |     const response=await request.post('/api/login',{
  12  |       data:{
  13  |         username:"M1a2b3c",
  14  |         password:"Password123!"
  15  |       }})
  16  |       
> 17  |       expect(response.status()).toBe(200)
      |                                 ^ Error: expect(received).toBe(expected) // Object.is equality
  18  |     const body = await response.json();
  19  |     token = body.token
  20  | 
  21  |     const getResponse = await request.get('/api/patients',{
  22  |         headers: {
  23  |           Authorization: `Bearer ${token}`,
  24  |         },
  25  |       });
  26  | 
  27  |     expect(getResponse.status()).toBe(200);
  28  | 
  29  |     const patients=await getResponse.json()
  30  |     expect(patients.length).toBeGreaterThan(0);
  31  |     
  32  |     id=patients[0].id
  33  |     })
  34  | 
  35  | test.describe('Patientor API', () => {
  36  |   test.describe('GET /api/ping', () => {
  37  |     test('should return pong', async ({ request }) => {
  38  |       const response = await request.get('/api/ping');
  39  |       expect(response.status()).toBe(200);
  40  | 
  41  |       const text = await response.text();
  42  |       expect(text).toBe('pong');
  43  |     });
  44  |   });
  45  | 
  46  |   
  47  |   test.describe('GET /api/patients', () => {
  48  |     test('should return an array of patients', async ({ request }) => {
  49  |       const response = await request.get('/api/patients',{
  50  |         headers: {
  51  |           Authorization: `Bearer ${token}`,
  52  |         },
  53  |       });
  54  | 
  55  |       expect(response.status()).toBe(200);
  56  | 
  57  |       const body = await response.json();
  58  |       expect(Array.isArray(body)).toBeTruthy();
  59  |       expect(body.length).toBeGreaterThan(0);
  60  |     });
  61  | 
  62  |     test('patients should not include password field', async ({ request }) => {
  63  |       const response = await request.get('/api/patients',{
  64  |         headers: {
  65  |           Authorization: `Bearer ${token}`,
  66  |         },
  67  |       });
  68  |       const body = await response.json();
  69  | 
  70  |       for (const patient of body) {
  71  |         expect(patient).not.toHaveProperty('password')
  72  |         expect(patient).toHaveProperty('id');
  73  |         expect(patient).toHaveProperty('name');
  74  |         expect(patient).toHaveProperty('dateOfBirth');
  75  |         expect(patient).toHaveProperty('gender');
  76  |         expect(patient).toHaveProperty('occupation');
  77  |       }
  78  |     });
  79  | 
  80  |     test('should return error without login',async({request})=>{
  81  |       const response=await request.get('/api/patients')
  82  |       expect(response.status()).toBe(401)
  83  |     })
  84  |    
  85  |   });
  86  | 
  87  |   test.describe('POST /api/patients', () => {
  88  |     test('should create a new patient', async ({ request }) => {
  89  |       const newPatient = {
  90  |         name: 'Test Patient',
  91  |         dateOfBirth: '1990-01-01',
  92  |         gender: 'male',
  93  |         occupation: 'Developer',
  94  |       };
  95  | 
  96  |       const response = await request.post('/api/patients', {
  97  |         data: newPatient,
  98  |         headers: {
  99  |           Authorization: `Bearer ${token}`,
  100 |         }
  101 |       });
  102 | 
  103 |       expect(response.status()).toBe(200);
  104 | 
  105 |       const body = await response.json();
  106 |       expect(body).toHaveProperty('id');
  107 |       expect(body).toHaveProperty('name', newPatient.name);
  108 |       expect(body).toHaveProperty('dateOfBirth', newPatient.dateOfBirth);
  109 |       expect(body).toHaveProperty('gender', newPatient.gender);
  110 |       expect(body).toHaveProperty('occupation', newPatient.occupation);
  111 |     });
  112 | 
  113 |     test('should return 400 for missing required fields', async ({ request }) => {
  114 |       const response = await request.post('/api/patients', {
  115 |         data: {
  116 |           name: 'Incomplete Patient',
  117 |         },
```