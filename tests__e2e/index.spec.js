const { test, expect } = require('@playwright/test');

test.describe('basic test', async () => {
	test.beforeEach(async ({ page, baseURL }) => {
		await page.goto(baseURL);
		
		await page.waitForSelector('#root');
	  });
	  test('is navbar loaded', async ({ page }) => {
		await page.goto("http://localhost:3006")
	
		const navbar = await page.$$("nav div.nav-container")
		expect(navbar).toBeTruthy();
	  });
	  
  
});