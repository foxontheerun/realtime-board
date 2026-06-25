import { expect, type Page } from "@playwright/test";

export async function openBoard(page: Page, boardId: string) {
  await page.goto(`/${boardId}`);
  await expect(page.getByText("Realtime Board")).toBeVisible();
}

export async function drawRectangle(
  page: Page,
  from: [number, number],
  to: [number, number],
) {
  await page.getByTitle("Rectangle").click();
  await expect(page.getByText("Fill color")).toBeVisible();
  await page.mouse.move(from[0], from[1]);
  await page.mouse.down();
  await page.mouse.move(to[0], to[1], { steps: 8 });
  await page.mouse.up();
  // Creation resets the tool to pointer, which hides the colour picker.
  await expect(page.getByText("Fill color")).toBeHidden();
}
