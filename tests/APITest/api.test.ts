import { test, expect} from '@playwright/test';

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

  

test.describe('Patientor API', () => {
  test.describe('GET /api/ping', () => {
    test('should return pong', async ({ request }) => {
      const response = await request.get('/api/ping');

      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);

      const text = await response.text();
      expect(text).toBe('pong');
    });
  });

  test.describe('GET /api/diagnoses', () => {
    test('should return an array of diagnoses', async ({ request }) => {
      const response = await request.get('/api/diagnoses');

      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(Array.isArray(body)).toBeTruthy();
      expect(body.length).toBeGreaterThan(0);
    });

    test('each diagnosis should have code and name fields', async ({ request }) => {
      const response = await request.get('/api/diagnoses');
      const body = await response.json();

      for (const diagnosis of body) {
        expect(diagnosis).toHaveProperty('code');
        expect(diagnosis).toHaveProperty('name');
        expect(typeof diagnosis.code).toBe('string');
        expect(typeof diagnosis.name).toBe('string');
      }
    });
  });

  
  test.describe('GET /api/patients', () => {
    
    test('should return an array of patients', async ({ request }) => {
      const response = await request.get('/api/patients',{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(Array.isArray(body)).toBeTruthy();
      expect(body.length).toBeGreaterThan(0);
    });

    test('patients should not include password field', async ({ request }) => {
      const response = await request.get('/api/patients',{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const body = await response.json();

      for (const patient of body) {
        expect(patient).not.toHaveProperty('password')
        expect(patient).toHaveProperty('id');
        expect(patient).toHaveProperty('name');
        expect(patient).toHaveProperty('dateOfBirth');
        expect(patient).toHaveProperty('gender');
        expect(patient).toHaveProperty('occupation');
      }
    });

    test('should return error without login',async({request})=>{
      const response=await request.get('/api/patients')
      expect(response.status()).toBe(401)
    })
   
  });

  test.describe('POST /api/patients', () => {
    test('should create a new patient', async ({ request }) => {
      const newPatient = {
        name: 'Test Patient',
        dateOfBirth: '1990-01-01',
        gender: 'male',
        occupation: 'Developer',
      };

      const response = await request.post('/api/patients', {
        data: newPatient,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body).toHaveProperty('id');
      expect(body).toHaveProperty('name', newPatient.name);
      expect(body).toHaveProperty('dateOfBirth', newPatient.dateOfBirth);
      expect(body).toHaveProperty('gender', newPatient.gender);
      expect(body).toHaveProperty('occupation', newPatient.occupation);
    });

    test('should return 400 for missing required fields', async ({ request }) => {
      const response = await request.post('/api/patients', {
        data: {
          name: 'Incomplete Patient',
        },
        headers: {
          Authorization: `Bearer ${token}`,
        }
        },
      );

      expect(response.status()).toBe(400);
    });

    test('should return 400 for invalid gender', async ({ request }) => {
      const response = await request.post('/api/patients', {
        data: {
          name: 'Test Patient',
          dateOfBirth: '1990-01-01',
          gender: 'invalid_gender',
          occupation: 'Developer',
        },headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      expect(response.status()).toBe(400);
    });
  });
});
})