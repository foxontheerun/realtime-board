import { test, expect } from "@playwright/test";

test("drawing a rectangle persists it via the updateShape mutation", async ({
  page,
}) => {
  await page.goto("/test");
  await expect(page.getByText("Realtime Board")).toBeVisible();

  await page.getByTitle("Rectangle").click();
  await expect(page.getByText("Fill color")).toBeVisible();

  // Start waiting before the gesture that triggers the request.
  const persisted = page.waitForRequest(
    (req) =>
      req.method() === "POST" &&
      req.url().includes("/query") &&
      (req.postData() ?? "").includes("UpdateShape"),
  );

  await page.mouse.move(520, 300);
  await page.mouse.down();
  await page.mouse.move(660, 420, { steps: 8 });
  await page.mouse.up();

  await persisted;
});
