import { useState } from "react";
import {
  MousePointer2,
  Square,
  Circle,
  Type,
  Hand,
  Trash2,
} from "lucide-react";
import type { Tool } from "../../../entities/block/model/types";
import { type StickyColorId } from "../../../entities/Shape";
import { ColorPicker } from "../../../features/color-picker/ui/ColorPicker";

const SHAPE_COLORS: { fill: string; stroke: string; label: string }[] = [
  { fill: "#DBEAFE", stroke: "#3B82F6", label: "Blue" },
  { fill: "#DCFCE7", stroke: "#22C55E", label: "Green" },
  { fill: "#FCE7F3", stroke: "#EC4899", label: "Pink" },
  { fill: "#F3E8FF", stroke: "#A855F7", label: "Purple" },
  { fill: "#FFE4C7", stroke: "#FB923C", label: "Orange" },
  { fill: "#FEF9C3", stroke: "#FACC15", label: "Yellow" },
  { fill: "#CCFBF1", stroke: "#14B8A6", label: "Teal" },
  { fill: "#F1F5F9", stroke: "#64748B", label: "Gray" },
  { fill: "#292929", stroke: "#111111", label: "Black" },
];

const STICKY_TOOLS: Tool[] = ["rectangle"]; // tools that use sticky presets
const SHAPE_TOOLS: Tool[] = ["ellipse"]; // tools that use shape colors

interface ToolbarProps {
  activeTool: Tool;
  setActiveTool: (tool: Tool) => void;
  activeStickyColorId: StickyColorId;
  setActiveStickyColorId: (id: StickyColorId) => void;
  onShapeColorChange?: (fill: string, stroke: string) => void;
}

export function Toolbar({
  activeTool,
  setActiveTool,
  activeStickyColorId,
  setActiveStickyColorId,
  onShapeColorChange,
}: ToolbarProps) {
  const [showStickyColorPicker, setShowStickyColorPicker] = useState(false);
  const [showShapeColorPicker, setShowShapeColorPicker] = useState(false);
  const [activeShapeColor, setActiveShapeColor] = useState(SHAPE_COLORS[0]);

  const tools: { id: Tool; icon: React.ReactNode; label: string }[] = [
    {
      id: "pointer",
      icon: <MousePointer2 className="w-5 h-5" />,
      label: "Pointer",
    },
    {
      id: "rectangle",
      icon: <Square className="w-5 h-5" />,
      label: "Sticky note",
    },
    {
      id: "ellipse",
      icon: <Circle className="w-5 h-5" />,
      label: "Ellipse",
    },
    { id: "text", icon: <Type className="w-5 h-5" />, label: "Text" },
    { id: "hand", icon: <Hand className="w-5 h-5" />, label: "Hand" },
    { id: "delete", icon: <Trash2 className="w-5 h-5" />, label: "Delete" },
  ];

  const handleToolClick = (toolId: Tool) => {
    setActiveTool(toolId);
    setShowStickyColorPicker(STICKY_TOOLS.includes(toolId));
    setShowShapeColorPicker(SHAPE_TOOLS.includes(toolId));
  };

  const handleStickyColorChange = (id: StickyColorId) => {
    setActiveStickyColorId(id);
    setShowStickyColorPicker(false);
  };

  const handleShapeColorChange = (color: (typeof SHAPE_COLORS)[0]) => {
    setActiveShapeColor(color);
    onShapeColorChange?.(color.fill, color.stroke);
    setShowShapeColorPicker(false);
  };

  return (
    <div className="absolute left-4 top-4 z-10 flex gap-3">
      <div className="bg-white rounded-xl shadow-lg p-2 flex flex-col gap-1">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => handleToolClick(tool.id)}
            className={`w-11 h-11 rounded-lg flex items-center justify-center transition-all ${
              activeTool === tool.id
                ? "bg-[#3B82F6] text-white shadow-md"
                : "bg-transparent text-[#666666] hover:bg-[#F5F5F5]"
            }`}
            title={tool.label}
          >
            {tool.icon}
          </button>
        ))}
      </div>

      {showStickyColorPicker && (
        <ColorPicker
          activeStickyColorId={activeStickyColorId}
          setActiveStickyColorId={handleStickyColorChange}
          onClose={() => setShowStickyColorPicker(false)}
        />
      )}

      {showShapeColorPicker && (
        <div className="bg-white rounded-xl shadow-lg p-3 flex flex-col gap-2">
          <span className="text-xs text-gray-500 font-medium">Fill color</span>
          <div className="grid grid-cols-3 gap-2">
            {SHAPE_COLORS.map((color) => (
              <button
                key={color.label}
                onClick={() => handleShapeColorChange(color)}
                className={`w-8 h-8 rounded-lg border transition-all ${
                  activeShapeColor.label === color.label
                    ? "scale-110"
                    : "hover:scale-105"
                }`}
                style={{
                  backgroundColor: color.fill,
                  borderColor: color.stroke,
                }}
                title={color.label}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
