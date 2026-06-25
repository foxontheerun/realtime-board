import { test, expect } from "@playwright/test";

test("loads a board with toolbar and canvases", async ({ page }) => {
  await page.goto("/test");

  // TopBar shows once the canvas runtime has initialised the camera.
  await expect(page.getByText("Realtime Board")).toBeVisible();

  // The board renders its stacked canvas layers (grid, main, drag, overlay).
  await expect(page.locator("canvas")).toHaveCount(4);
});
