export interface ElementPart {
  position: number;
  id: string;
}

export interface SelectedElement {
  id: string;
  position: number;
  status?: "repair" | "assembly" | null;
  checklistCount?: number;
  comments?: string;
}

export interface ElementStatus {
  [key: string]: {
    status: "repair" | "assembly" | null;
    checklistCount?: number;
    comments?: string;
  };
}
