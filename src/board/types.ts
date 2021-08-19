export interface ActiveNote {
  string: string;
  note: string;
}

export interface Note {
  active: boolean;
  value: string | null;
  marker: boolean | null;
}

export interface String {
  hidden?: boolean | undefined;
  active?: boolean;
  label: string;
  notes: Array<Note>;
}

export type FretBoard = Array<String>;
