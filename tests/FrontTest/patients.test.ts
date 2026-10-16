import { test, expect } from '@playwright/test';

test.describe("reset",()=>{
  test.beforeEach(async({request,page})=>{
    const resetResponse=await request.post('/api/testing/reset')
    expect(resetResponse.status()).toBe(204);
    await page.getByRole('textbox', { name: 'Username' }).click();
    await page.getByRole('textbox', { name: 'Username' }).fill('M1a2b3c');
    await page.getByRole('textbox', { name: 'password' }).click();
    await page.getByRole('textbox', { name: 'password' }).fill('Password123!');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.goto('/patients');
  })

test.describe('Listing patients', () => {
  test('should show column headers Name, Gender and Occupation', async ({ page }) => {    
    await expect(page.getByRole('columnheader', { name: 'Name' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Gender' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Occupation' })).toBeVisible();
  });

  test('should list seed patients', async ({ page }) => {  
    await expect(page.getByRole('link', { name: 'Test Patient' })).toBeVisible();
  });
});
test.describe('Adding a patient', () => {
  test('should open modal and add a new patient that appears in the list', async ({ page }) => {
    const patientName = `E2E Patient ${Date.now()}`;
    await page.getByRole('button', { name: 'Add New Patient' }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText('Add a new patient')).toBeVisible();

    await dialog.getByLabel('Name').fill(patientName);
    await dialog.getByLabel('Date of birth').fill('1990-01-01');
    await dialog.getByLabel('Occupation').fill('Test Engineer');
    await page.getByLabel('Add a new patient').getByText('female').click();
    await page.getByRole('option', { name: 'female' }).click();

    await dialog.getByRole('button', { name: 'Add' }).click();

    await expect(page.getByRole('link', { name: patientName })).toBeVisible();
  });
});

test.describe('Showing patient info', () => {
  test('should navigate to patient detail page and show patient information', async ({ page }) => {
   
    await page.getByRole('link', { name: 'John McClane' }).click();

    await expect(page).toHaveURL(/\/patients\/.+/);
    await expect(page.getByRole('heading', { name: /John McClane/ })).toBeVisible();
    await expect(page.getByText('090786-122X')).toBeVisible();
    await expect(page.getByText('New york city cop')).toBeVisible();
  });

  test('should show existing entries for the patient', async ({ page }) => {
    await page.goto('/patients');
    await page.getByRole('link', { name: 'John McClane' }).click();

    // John McClane has a Hospital entry in the seed data
    await expect(page.getByText(/Thumb has healed/)).toBeVisible();
  });
});

test.describe('Adding an entry to a patient', () => {
  test('should add a HealthCheck entry to John McClane', async ({ page }) => {
    
    await page.getByRole('link', { name: 'John McClane' }).click();
    await expect(page).toHaveURL(/\/patients\/.+/);

    await page.getByRole('button', { name: 'Add New Entry' }).click();
    await page.getByLabel('Type').click();
    await page.getByRole("option",{name:"HealthCheck"}).click()
    
    await page.getByLabel('Date').pressSequentially('15/03/2024');
    await page.getByLabel('Description').fill('Annual checkup, all clear');
    await page.getByLabel('Specialist').fill('Dr. Test Specialist');
    await page.getByLabel('rating').click();
    await page.getByRole("option",{name:/0/}).click()

    await page.getByRole('button', { name: 'Add' }).click();

    await expect(page.getByText('Annual checkup, all clear')).toBeVisible();
  });
});
})

