export const workflowStages = [
  { number: "01", title: "The Mess", description: "Unstructured inputs from everywhere." },
  { number: "02", title: "Make It Usable", description: "Turn it into clean, structured Markdown that maximizes context." },
] as const;

export const papers = [
  { id: "pdf", tint: "#faf8f0", x: 241, y: 74, angle: -16, mark: "M15 30H67 M15 43H55 M15 56H70", target: "M0 0H206 M0 1H165 M0 2H122", row: 140 },
  { id: "spreadsheet", tint: "#c0d5df", x: 461, y: 47, angle: 12, mark: "M15 28H72V63H15Z M15 41H72 M15 52H72 M35 28V63 M54 28V63", target: "M0 0H215 M0 14H167 M0 28H191", row: 186 },
  { id: "photo", tint: "#f2bdb4", x: 573, y: 173, angle: -13, mark: "M14 27H72V65H14Z M15 58L33 39L44 51L55 43L71 60 M60 34h1", target: "M0 0H197 M0 14H133", row: 259 },
  { id: "notes", tint: "#ffd34c", x: 401, y: 257, angle: 16, mark: "M18 29l6 5 9-10 M40 31H69 M18 47l6 5 9-10 M40 49H64", target: "M0 0H208 M0 14H155 M0 28H178", row: 319 },
  { id: "transcript", tint: "#faf8f0", x: 307, y: 182, angle: -9, mark: "M18 44v-8m10 15V29m10 29V23m10 28V30m10 15v-9m10 12V32", target: "M0 0H160", row: 355 },
] as const;

export const scatteredDots = Array.from({ length: 80 }, (_, i) => ({
  x: 217 + ((i * 157) % 474),
  y: 30 + ((i * 89) % 335),
  organizedX: 327 + (i % 16) * 21,
  organizedY: 54 + Math.floor(i / 16) * 78,
  radius: 1 + (i % 3) * 0.42,
}));

export const armShapes = {
  initial: "M167 214C191 200 204 177 205 151L205 128Q205 118 214 118Q222 118 222 129L221 151Q223 198 188 230Z",
  resolved: "M167 214C204 213 230 189 255 170L273 156Q281 150 287 157Q292 164 283 171L266 184Q229 226 188 238Z",
} as const;
