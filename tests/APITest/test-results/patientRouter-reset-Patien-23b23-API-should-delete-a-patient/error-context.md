# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: patientRouter.test.ts >> reset >> Patientor API >> Add entry, update patient,delete patient API >> should delete a patient
- Location: patientRouter.test.ts:177:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 404
Received: 500
```

# Test source

```ts
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
  118 |         headers: {
  119 |           Authorization: `Bearer ${token}`,
  120 |         }
  121 |         },
  122 |       );
  123 | 
  124 |       expect(response.status()).toBe(400);
  125 |     });
  126 | 
  127 |     test('should return 400 for invalid gender', async ({ request }) => {
  128 |       const response = await request.post('/api/patients', {
  129 |         data: {
  130 |           name: 'Test Patient',
  131 |           dateOfBirth: '1990-01-01',
  132 |           gender: 'invalid_gender',
  133 |           occupation: 'Developer',
  134 |         },headers: {
  135 |           Authorization: `Bearer ${token}`,
  136 |         }
  137 |       });
  138 | 
  139 |       expect(response.status()).toBe(400);
  140 |     });
  141 |   });
  142 | 
  143 |   test.describe("Add entry, update patient,delete patient API",()=>{
  144 |   
  145 | 
  146 |   test("should create new entry to a patient",async({request})=>{
  147 |     
  148 |     const newEntry={
  149 |         date: '2015-01-02',
  150 |         type: 'Hospital',
  151 |         specialist: 'MD House',
  152 |         diagnosisCodes: ['S62.5'],
  153 |         description:
  154 |           "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
  155 |         discharge: {
  156 |           date: '2015-01-16',
  157 |           criteria: 'Thumb has healed.',
  158 |         }}
  159 |     
  160 | 
  161 |     const response = await request.post(`/api/patients/${id}/entries`,{data:newEntry,headers: {
  162 |           Authorization: `Bearer ${token}`,
  163 |         }})
  164 |       
  165 |       expect(response.status()).toBe(200);
  166 | 
  167 |       const body = await response.json();
  168 |       expect(body).toHaveProperty('_id');
  169 |       expect(body).toHaveProperty('type', newEntry.type);
  170 |       expect(body).toHaveProperty('specialist', newEntry.specialist);
  171 |       expect(body).toHaveProperty('diagnosisCodes', newEntry.diagnosisCodes);
  172 |       expect(body).toHaveProperty('description', newEntry.description);
  173 |       expect(body).toHaveProperty('discharge',newEntry.discharge);
  174 | 
  175 |   })
  176 | 
  177 |   test("should delete a patient",async({request})=>{
  178 | 
  179 |     const response= await request.delete(`api/patients/${id}`,{headers: {
  180 |           Authorization: `Bearer ${token}`,
  181 |         }})
  182 |     
  183 | 
  184 |     expect(response.status()).toBe(200);
  185 |     const getPatient = await request.get(`api/patients/${id}`,{headers: {
  186 |           Authorization: `Bearer ${token}`,
  187 |         }})
  188 |     
> 189 |     expect(getPatient.status()).toBe(404);
      |                                 ^ Error: expect(received).toBe(expected) // Object.is equality
  190 | 
  191 |   })
  192 |   })
  193 | });
  194 | 
  195 | })
```