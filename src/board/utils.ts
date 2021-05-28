import { resetBoard } from "./constants";

export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const generateBoardWithActiveNote = () => {
  const board = resetBoard();
  const string = board[getRandomInt(board.length)];
  const notes = string.notes.filter((note) => note.value);
  const note = notes[getRandomInt(notes.length)];
  note.active = true;

  return {
    board,
    activeNote: {
      string: string.label,
      note: note.value,
    },
  };
};
