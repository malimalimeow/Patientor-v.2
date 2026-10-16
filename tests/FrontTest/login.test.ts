import { test, expect } from '@playwright/test';
test.describe("reset",()=>{
  test.beforeEach(async({request,page})=>{
    const resetResponse=await request.post('/api/testing/reset')
    expect(resetResponse.status()).toBe(204);
    await page.goto('http://localhost:5173/');
  })

  test('Login success with success message', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('M1a2b3c');
  await page.getByRole('textbox', { name: 'password' }).click();
  await page.getByRole('textbox', { name: 'password' }).fill('Password123!');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('login successfully')).toBeVisible()
});

  test("login Fail with fail Message",async({page})=>{
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('wrongName');
  await page.getByRole('textbox', { name: 'password' }).click();
  await page.getByRole('textbox', { name: 'password' }).fill('Password123!');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Something went wrong. Error:')).toBeVisible()

  })


})