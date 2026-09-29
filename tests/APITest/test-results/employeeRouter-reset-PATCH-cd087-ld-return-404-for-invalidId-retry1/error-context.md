# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: employeeRouter.test.ts >> reset >> PATCH /api/employees >> should return 404 for invalidId
- Location: employeeRouter.test.ts:224:11

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 404
Received: 403
```

# Test source

```ts
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
  215 |         const response = await request.patch(`/api/employees/${id}/password`, {
  216 |         data: updatePassword,
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
> 233 |       expect(response.status()).toBe(404)})
      |                                 ^ Error: expect(received).toBe(expected) // Object.is equality
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
  317 |         expect(response.status()).toBe(404)
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