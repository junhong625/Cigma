import create from "zustand";

const GlobalStyles = create((set) => ({
  tool: "selector",
  color: "#ffffff",
  thickness: 1,
  fontSize: 12,

  setTool: (tool) => set({ tool }),
  setColor: (color) => set({ color }),
  setThickness: (thickness) => set({ thickness }),
  setFontSize: (fontSize) => set({ fontSize }),

  selectTool: (state) => state.tool,
  selectColor: (state) => state.color,
  selectThickness: (state) => state.thickness,
  selectFontSize: (state) => state.fontSize,
}));

export default GlobalStyles;
