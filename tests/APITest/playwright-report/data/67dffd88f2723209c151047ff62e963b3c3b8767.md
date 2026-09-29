# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: employeeRouter.test.ts >> reset >> DELETE /api/employee/:id >> should return 404 for invalid id, cant find anyone
- Location: employeeRouter.test.ts:312:11

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 404
Received: 400
```

# Test source

```ts
  217 |         headers: {
  218 |           Authorization: `Bearer ${normalToken}`,
  219 |         }
  220 |       });
  221 | 
  222 |       expect(response.status()).toBe(403)})
  223 | 
  224 |       test("should return 404 for invalidId",async({request})=>{
  225 |         
  226 |         const response = await request.patch("/api/employees/invalidId/password", {
  227 |         data: updatePassword,
  228 |         headers: {
  229 |           Authorization: `Bearer ${normalToken}`,
  230 |         }
  231 |       });
  232 | 
  233 |       expect(response.status()).toBe(404)})
  234 | 
  235 | 
  236 |     
  237 | 
  238 |     test("should update some employee details",async({request})=>{
  239 |       
  240 |       const response = await request.patch(`/api/employees/${id}/details`,{
  241 |         data:updateDetails,
  242 |         headers:{
  243 |           Authorization:`Bearer ${masterToken}`,
  244 |         }
  245 |       })
  246 | 
  247 |       expect(response.status()).toBe(200)
  248 | 
  249 |       const checkTarget= await request.get(`/api/employees/${id}`,{headers:{
  250 |           Authorization:`Bearer ${masterToken}`,
  251 |         }})
  252 |       
  253 |       const target= await checkTarget.json()
  254 | 
  255 |       expect(target).toHaveProperty("name",updateDetails.name)
  256 | 
  257 |     })
  258 | 
  259 |     test("should return 404 for invalid ID, no update details",async({request})=>{
  260 | 
  261 |       const response = await request.patch("/api/employees/invalidId/details",{
  262 |         data:updateDetails,
  263 |         headers:{
  264 |           Authorization:`Bearer ${masterToken}`,
  265 |         }
  266 |       })
  267 | 
  268 |       expect(response.status()).toBe(404)
  269 | 
  270 |     })
  271 | 
  272 |     test("should return 403 forbidden, no update details",async({request})=>{
  273 | 
  274 |       const response = await request.patch(`/api/employees/${id}/details`,{
  275 |         data:updateDetails,
  276 |         headers:{
  277 |           Authorization:`Bearer ${normalToken}`,
  278 |         }
  279 |       })
  280 | 
  281 |       expect(response.status()).toBe(403)
  282 | 
  283 |     })
  284 | 
  285 |     })
  286 | 
  287 |     test.describe("DELETE /api/employee/:id",()=>{
  288 |       test("should delete a patient",async({request})=>{
  289 |         const response = await request.delete(`/api/employees/${toDeleteID}`,{headers:{
  290 |           Authorization:`Bearer ${masterToken}`,
  291 |         }})
  292 | 
  293 |         expect(response.status()).toBe(200)
  294 | 
  295 |         const checkTarget = await request.get(`/api/employees/${toDeleteID}`,{headers:{
  296 |           Authorization:`Bearer ${masterToken}`,
  297 |         }})
  298 | 
  299 |         expect(checkTarget.status()).toBe(404)
  300 |       })
  301 | 
  302 |       test("should return 403 forbidden, not delete employee",async({request})=>{
  303 | 
  304 |         const response = await request.delete(`/api/employees/${id}`,{headers:{
  305 |           Authorization:`Bearer ${normalToken}`,
  306 |         }})
  307 | 
  308 | 
  309 |         expect(response.status()).toBe(403)
  310 |       })
  311 | 
  312 |       test("should return 404 for invalid id, cant find anyone",async({request})=>{
  313 |         const response = await request.delete("/api/employees/invalidID",{headers:{
  314 |           Authorization:`Bearer ${masterToken}`,
  315 |         }})
  316 | 
> 317 |         expect(response.status()).toBe(404)
      |                                   ^ Error: expect(received).toBe(expected) // Object.is equality
  318 |       })
  319 | 
  320 |     })
  321 | 
  322 |    
  323 | 
  324 | })
  325 | 
  326 | 
```