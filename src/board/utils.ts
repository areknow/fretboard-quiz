import cloneDeep from "lodash.clonedeep";
import { BOARD } from "./constants";
import { ActiveNote, FretBoard, Note } from "./types";

export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const resetBoard = () => {
  return cloneDeep(BOARD);
};

export const setActiveNoteOnBoard = (
  board: FretBoard,
  activeNote: ActiveNote
) => {
  // clear out any active notes
  for (const string of board) {
    for (const note of string.notes) {
      note.active = false;
    }
  }
  const boardWithActiveStrings = board.filter((string) => string.active);
  const string =
    boardWithActiveStrings[getRandomInt(boardWithActiveStrings.length)];
  const notes = string.notes.filter(
    (note: Note) => note.value && note.value !== activeNote.note
  );
  const note = notes[getRandomInt(notes.length)];
  note.active = true;

  console.log(note);

  return {
    board,
    activeNote: {
      string: string.label,
      note: note.value as string,
    },
  };
};
