export type BlockType = "rect" | "text";

export type IBlock = {
  id: string;
  type: BlockType;
  x: number;
  y: number;
  width: number;
  height: number;
  text?: string;
};
