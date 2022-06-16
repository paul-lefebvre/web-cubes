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

	  test('is leftnav loaded', async ({ page }) => {
		await page.goto("http://localhost:3006")
	
		const leftnav = await page.$$("div div.home div.left-nav-container")
		expect(leftnav).toBeTruthy();
	  });

	  test('are the trends visible', async ({ page }) => {
		await page.goto("http://localhost:3006")
	
		const trends = await page.$$("div.home div.left-nav-container div.main div.right-side div.wrapper div.trending-container")
		expect(trends).toBeTruthy();
	  });

	  test('are the suggestions visible', async ({ page }) => {
		await page.goto("http://localhost:3006")
	
		const trends = await page.$$("div.home div.right-side div.right-side-container div.wrapper div.trending-container div.get-friends-container")
		expect(trends).toBeTruthy();
	  });
	  
  
});