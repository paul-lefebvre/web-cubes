const { test, expect } = require("@playwright/test");

test.describe("basic test", async () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(baseURL);

    await page.waitForSelector("#root");
  });

  test("is navbar loaded", async ({ page }) => {
    await page.goto("http://localhost:3006/profil");

    const navbar = await page.$$("nav div.nav-container");
    expect(navbar).toBeTruthy();
  });

  test("is leftnav loaded", async ({ page }) => {
    await page.goto("http://localhost:3006/profil");

    const leftnav = await page.$$("div div.home div.left-nav-container");
    expect(leftnav).toBeTruthy();
  });

  test("is the title visible", async ({ page }) => {
    await page.goto("http://localhost:3006/profil");

    const title = await page.$$("div.profil-page div.profil-container h1");
    expect(title).toBeTruthy();
  });

  test("if user not connected in is the form visible", async ({ page }) => {
    await page.goto("http://localhost:3006/profil");

    const form = await page.$$("div.profil-page div.log-container div.connection-form");
    expect(form).toBeTruthy();
  });

  test("is the left card visible", async ({ page }) => {
    await page.goto("http://localhost:3006/profil");

    const leftCard = await page.$$(
      "div.profil-page div.profil-container div.update-container div.left-part"
    );
    expect(leftCard).toBeTruthy();
  });

  test("is the right card visible", async ({ page }) => {
    await page.goto("http://localhost:3006/profil");

    const rightCard = await page.$$(
      "div.profil-page div.profil-container div.update-container div.right-part"
    );
    expect(rightCard).toBeTruthy();
  });
});
