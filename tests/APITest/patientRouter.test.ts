import { test, expect} from '@playwright/test';

test.describe('GET /api/ping', () => {
    test('should return pong', async ({ request }) => {
      const response = await request.get('/api/ping');
      expect(response.status()).toBe(200);

      const text = await response.text();
      expect(text).toBe('pong');
    });
  });

test.describe('reset',()=>{
   let token:string
   let id:string

  test.beforeEach(async({request})=>{
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

    const getResponse = await request.get('/api/patients',{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    expect(getResponse.status()).toBe(200);

    const patients=await getResponse.json()
    expect(Array.isArray(patients)).toBeTruthy();
    expect(patients.length).toBeGreaterThan(0);
    
    id=patients[0].id||patients[0]._id
    expect(id).toBeDefined();
    })

test.describe('Patientor API', () => {
  
  
  test.describe('GET /api/patients', () => {
    test('should return an array of patients', async ({ request }) => {
      const response = await request.get('/api/patients',{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(Array.isArray(body)).toBeTruthy();
      expect(body.length).toBeGreaterThan(0);
    });

    test('patients should not include password field', async ({ request }) => {
      const response = await request.get(`/api/patients/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const patient = await response.json();

        expect(patient).toHaveProperty('id');
        expect(patient).toHaveProperty('name');
        expect(patient).toHaveProperty('dateOfBirth');
        expect(patient).toHaveProperty('gender');
        expect(patient).toHaveProperty('occupation');
      
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

  test.describe("Add entry, update patient,delete patient API",()=>{
  

  test("should create new entry to a patient",async({request})=>{
    
    const newEntry={
        date: '2015-01-02',
        type: 'Hospital',
        specialist: 'MD House',
        diagnosisCodes: ['S62.5'],
        description:
          "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
        discharge: {
          date: '2015-01-16',
          criteria: 'Thumb has healed.',
        }}
    

    const response = await request.post(`/api/patients/${id}/entries`,{data:newEntry,headers: {
          Authorization: `Bearer ${token}`,
        }})
      
      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body).toHaveProperty('_id');
      expect(body).toHaveProperty('type', newEntry.type);
      expect(body).toHaveProperty('specialist', newEntry.specialist);
      expect(body).toHaveProperty('diagnosisCodes', newEntry.diagnosisCodes);
      expect(body).toHaveProperty('description', newEntry.description);
      expect(body).toHaveProperty('discharge',newEntry.discharge);

  })

  test("should delete a patient",async({request})=>{

    const response= await request.delete(`/api/patients/${id}`,{headers: {
          Authorization: `Bearer ${token}`,
        }})
    

    expect(response.status()).toBe(200);
    const getPatient = await request.get(`/api/patients/${id}`,{headers: {
          Authorization: `Bearer ${token}`,
        }})
    
    expect(getPatient.status()).toBe(404);

  })
  })
});

})