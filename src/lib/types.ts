export type HSLColor = {
  h: number;
  s: number;
  l: number;
};

export type ColorStop = {
  id: number;
  color: HSLColor;
  position: number;
  tailwindName?: string;
};

export type PrimaryGradient = {
  angle: number;
  colorStops: ColorStop[];
};

export type OverlayGradient = {
  angle: number;
  blendMode: string;
  opacity: number;
  colorStops: ColorStop[];
};
