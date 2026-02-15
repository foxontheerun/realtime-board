export type InteractionMode =
  | { type: "idle"; selectedIds: string[] }
  | { type: "drag"; selectedIds: string[]; activeId: string }
  | { type: "resize"; selectedIds: string[]; activeId: string }
  | {
      type: "select";
      selectedIds: string[];
      startX: number;
      startY: number;
      currentX: number;
      currentY: number;
    }
  | { type: "pan"; selectedIds: string[]; startX: number; startY: number };

export interface Point {
  x: number;
  y: number;
}
