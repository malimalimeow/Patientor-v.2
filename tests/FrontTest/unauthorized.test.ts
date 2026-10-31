import { test, expect } from '@playwright/test';


test.describe("reset",()=>{
  test.beforeEach(async({request,page})=>{
    const resetResponse=await request.post('/api/testing/reset')
    expect(resetResponse.status()).toBe(204);
    await page.goto('http://localhost:5173/')})
    

    //patient
    test.describe("patient",()=>{
        test('still show column headers Name, Gender and Occupation', async ({ page }) => {  
    await page.getByRole("link",{name:"Patient"}).click()  
    await expect(page.getByRole('columnheader', { name: 'Name' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Gender' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Occupation' })).toBeVisible();
  });

  test('should not list seed patients', async ({ page }) => { 
    await page.getByRole("link",{name:"Patient"}).click()   
    await expect(page.getByRole('link', { name: 'Test Patient' })).not.toBeVisible();
    })
  })

  test('should not able to add patient, and error message shown ',async({page})=>{
    await page.getByRole("link",{name:"Patient"}).click()
    await page.getByRole("button",{name:"Add New Patient"}).click()
    await page.getByRole('textbox', { name: 'Name' }).fill('test');
    await page.getByRole('textbox', { name: 'Date of birth' }).fill('2026-10-26');
    await page.getByRole('textbox', { name: 'Occupation' }).fill('test'); 
    await page.getByLabel('Add a new patient').getByText('female').click();
    await page.getByRole('option', { name: 'male', exact: true }).click();
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByLabel('Add a new patient').getByText('Something went wrong. Error:')).toBeVisible()

  })

  test('should not able to add Employee, and error message shown',async({page})=>{
    await page.getByRole("link",{name:"Employee"}).click()
    await expect(page.getByRole('button', { name: 'Add New Employee' })).not.toBeVisible();
  })
})