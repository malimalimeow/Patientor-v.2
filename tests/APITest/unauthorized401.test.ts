import{test,expect} from "@playwright/test"

const id:string="507f1f77bcf86cd799439011"

test.describe("employeeRouter",()=>{
    
    test("GET employee",async({request})=>{
        const response= await request.get("/api/employees")

        expect(response.status()).toBe(401)
    })

    test("GET one employee",async({request})=>{
        const response= await request.get(`/api/employees/${id}`)

        expect(response.status()).toBe(401)
    })

    test("POST employee",async({request})=>{
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
        const response= await request.post("/api/employees",{data:newEmployee})

        expect(response.status()).toBe(401)
    })

    test("PATCH employee PW",async({request})=>{
         const updatePassword={
          oldPassword:"Password123!",
          newPassword:"NewPassword123!"
        }
        const response= await request.patch(`/api/employees/${id}`,{data:updatePassword})

        expect(response.status()).toBe(401)
    })

    test("PATCH employee details",async({request})=>{
        const updateDetails={name:"Change New Name"}

        const response= await request.patch(`/api/employees/${id}`,{data:updateDetails})

        expect(response.status()).toBe(401)
    })

    test("DELETE employee ",async({request})=>{
        const response =await request.delete(`/api/employees/${id}`)
        
        expect(response.status()).toBe(401)
    })
})

test.describe("Patient Router",()=>{
    test("GET Patients",async({request})=>{
        const response= await request.get("/api/patients")

        expect(response.status()).toBe(401)
    })

    test("GET one Patients",async({request})=>{
        const response= await request.get(`/api/patients/${id}`)

        expect(response.status()).toBe(401)
    })

    test("POST patient",async({request})=>{
         const newPatient = {
        name: 'Test Patient',
        dateOfBirth: '1990-01-01',
        gender: 'male',
        occupation: 'Developer',
      };

      const response=await request.post(`/api/patients`,{data:newPatient})

      expect(response.status()).toBe(401)
    })

    test("POST patient entry",async({request})=>{
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

      const response=await request.post(`/api/patients/${id}/entries`,{data:newEntry})

      expect(response.status()).toBe(401)
    })

    test("PATCH patient",async({request})=>{
        const response=await request.patch(`/api/patients/${id}`,{data:{name:"Change newName"}})
        
        expect(response.status()).toBe(401)
    })

    test("DELETE patient",async({request})=>{
        const response= await request.delete(`/api/patients/${id}`)

        expect(response.status()).toBe(401)
    })

})