import { test, expect } from "@playwright/test";
import { randomUUID } from "node:crypto";
import { openBoard, drawRectangle } from "./helpers";

test("a drawn rectangle matches its snapshot", async ({ page }) => {
  // Fresh random board so the in-memory server starts empty (deterministic pixels).
  await openBoard(page, `snapshot-${randomUUID()}`);
  await drawRectangle(page, [400, 250], [560, 380]);

  // The static layer (2nd canvas) holds committed shapes.
  await expect(page.locator("canvas").nth(1)).toHaveScreenshot("rectangle.png", {
    animations: "disabled",
  });
});
