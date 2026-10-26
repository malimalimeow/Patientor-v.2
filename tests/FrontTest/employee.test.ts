import { test, expect } from '@playwright/test';

test.describe("reset",()=>{
  test.beforeEach(async({request,page})=>{
    const resetResponse=await request.post('http://localhost:3003/api/testing/reset')
    expect(resetResponse.status()).toBe(204);
    await page.goto('http://localhost:5173/')
    await page.getByRole('textbox', { name: 'Username' }).click();
    await page.getByRole('textbox', { name: 'Username' }).fill('M1a2b3c');
    await page.getByRole('textbox', { name: 'password' }).click();
    await page.getByRole('textbox', { name: 'password' }).fill('Password123!');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('/patients')
    await page.getByRole('link', { name: 'Employee' }).click();

  })

test.describe('Listing employee', () => {
  test('should show column headers Name, Gender and Title', async ({ page }) => {  
  
    await expect(page.getByRole('columnheader', { name: 'Name' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Gender' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Title' })).toBeVisible();
  });

  test('should list seed employee', async ({ page }) => {  
    
    await expect(page.getByRole('link', { name: 'Master Admin' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sarah Jenkins' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Delete To' })).toBeVisible();
  });
});
test.describe('Adding a Employee', () => {
  test('should open modal and add a new employee that appears in the list', async ({ page }) => {
   
    const employeeName = `E2E Employee ${Date.now()}`;
    await page.getByRole('button', { name: 'Add New Employee' }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText('Add a new employee')).toBeVisible();
//16/10/2026 checking
    await dialog.getByLabel('Name').fill(employeeName);
    await dialog.getByLabel('Password').fill("Password123!")
    await dialog.getByLabel('Title').fill("test")
    await dialog.getByLabel('Date of birth').fill('1990-01-01');
    await dialog.getByLabel('NI').fill('CE123456B');
    await dialog.getByLabel('Address').fill("1,london road,liverpool")
    await dialog.getByLabel('Emergency Contact').fill("961234567")
    await page.getByLabel('Add a new employee').getByText('female').click();
    await page.getByRole('option', { name: 'female' }).click();

    await dialog.getByRole('button', { name: 'Add' }).click();

    await expect(page.getByRole('link', { name: employeeName })).toBeVisible();
  });
});

test.describe('Showing patient info', () => {
  test('should navigate to patient detail page and show patient information', async ({ page }) => {
   
    await page.getByRole('link', { name: 'Sarah Jenkins' }).click();

    await expect(page).toHaveURL(/\/employee\/.+/);
    await expect(page.getByRole('heading', { name: /Sarah Jenkins/ })).toBeVisible();
    await expect(page.getByText('Staff Nurse')).toBeVisible();
  });
});

test.describe('updating employee details', () => {
  test('should update employee details',async({page})=>{
   
    await page.getByRole('link', { name: 'Sarah Jenkins' }).click();
    await expect(page).toHaveURL(/\/employee\/.+/);
    await page.getByRole('button', { name: 'Update Employee Details' }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText('Update Details')).toBeVisible();
    await page.getByRole('textbox', { name: 'Date of Birth' }).fill('1994-06-30');
    await page.getByRole('button', { name: 'Update' }).click();
    await expect(page.getByLabel('Update Details').getByText('Update successful')).toBeVisible();

  })})

 test.describe('deleting employee',()=>{
    test("should delete employee",async({page})=>{
        
    
  await page.getByRole('link', { name: 'Delete To' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.getByRole('button', { name: 'Delete Employee record' }).click();
  await expect(page.getByText('Employee Removed')).toBeVisible()
  await expect(page.getByText('Delete To')).not.toBeVisible()
    })
 })

 test.describe('updating password',()=>{
    test("should update the password",async({page})=>{
        
        await page.getByRole('link', { name: 'Master Admin' }).click();
  await page.getByRole('button', { name: 'update Password' }).click();
  await page.getByRole('textbox', { name: 'oldPW' }).fill('Password123!');
  await page.getByRole('textbox', { name: 'newPW' }).fill('Password1234!');
  await page.getByRole('button', { name: 'Update' }).click();
  await expect(page.getByLabel('Update Password').getByText('Password updated')).toBeVisible()

  await page.getByRole('link', { name: 'Log Out' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('M1a2b3c');
  await page.getByRole('textbox', { name: 'password' }).fill('Password1234!');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('login successfully')).toBeVisible()

    })
 })
 
})