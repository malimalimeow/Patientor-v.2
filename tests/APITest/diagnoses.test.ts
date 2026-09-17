import { test, expect} from '@playwright/test';

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
