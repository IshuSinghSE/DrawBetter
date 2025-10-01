export type Color = {
  r: number;
  g: number;
  b: number;
};

export type Camera = {
  x: number;
  y: number;
  zoom: number;
};

export enum LayerType {
  Rectangle,
  Ellipse,
  Path,
  Text,
  Note,
  Triangle,
  Diamond,
  Hexagon,
  Star,
  Arrow,
  Heart,
  Pentagon,
}

export type RectangleLayer = {
  type: LayerType.Rectangle;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
};
export type EllipseLayer = {
  type: LayerType.Ellipse;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
};
export type PathLayer = {
  type: LayerType.Path;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  points: number[][];
  value?: string;
};
export type TextLayer = {
  type: LayerType.Text;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
};

export type NoteLayer = {
  type: LayerType.Note;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
};

export type TriangleLayer = {
  type: LayerType.Triangle;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
};

export type DiamondLayer = {
  type: LayerType.Diamond;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
};

export type HexagonLayer = {
  type: LayerType.Hexagon;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
};

export type StarLayer = {
  type: LayerType.Star;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
};

export type ArrowLayer = {
  type: LayerType.Arrow;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
};

export type HeartLayer = {
  type: LayerType.Heart;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
};

export type PentagonLayer = {
  type: LayerType.Pentagon;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
};

export type Point = {
  x: number;
  y: number;
};

export type XYWH = {
  x: number;
  y: number;
  height: number;
  width: number;
};

export enum Side {
  Top = 1,
  Bottom = 2,
  Left = 4,
  Right = 8,
}

export type CanvasState =
  | {
      mode: CanvasMode.None;
    }
  | {
      mode: CanvasMode.Pressing;
      origin: Point;
    }
  | {
      mode: CanvasMode.SelectionNet;
      origin: Point;
      current?: Point;
    }
  | {
      mode: CanvasMode.Translating;
      current: Point;
    }
  | {
      mode: CanvasMode.Inserting;
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Note
        | LayerType.Text
        | LayerType.Triangle
        | LayerType.Diamond
        | LayerType.Hexagon
        | LayerType.Star
        | LayerType.Arrow
        | LayerType.Heart
        | LayerType.Pentagon;
    }
  | {
      mode: CanvasMode.Resizing;
      initialBounds: XYWH;
      corner: Side;
    }
  | {
      mode: CanvasMode.Pencil;
    }
  | {
      mode: CanvasMode.Panning;
      current?: Point;
    };

export enum CanvasMode {
  None,
  Pressing,
  SelectionNet,
  Translating,
  Inserting,
  Resizing,
  Pencil,
  Panning,
}

export type Layer =
  | RectangleLayer
  | EllipseLayer
  | PathLayer
  | TextLayer
  | NoteLayer
  | TriangleLayer
  | DiamondLayer
  | HexagonLayer
  | StarLayer
  | ArrowLayer
  | HeartLayer
  | PentagonLayer;
