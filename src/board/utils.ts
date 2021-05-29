export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const generateBoardWithActiveNote = () => {
  const board = resetBoard();
  const string = board[getRandomInt(board.length - 1) + 1];
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

export const resetBoard = () => {
  return [
    {
      hidden: true,
      label: "",
      notes: [
        { active: false, value: null },
        { active: false, value: null },
        { active: false, value: null },
        { active: false, value: null },
        { active: false, value: null },
        { active: false, value: null },
        { active: false, value: null },
        { active: false, value: null },
        { active: false, value: null },
        { active: false, value: null },
        { active: false, value: null },
        { active: false, value: null },
      ],
    },
    {
      label: "e",
      notes: [
        { active: false, value: "F" },
        { active: false, value: null },
        { active: false, value: "G" },
        { active: false, value: null },
        { active: false, value: "A" },
        { active: false, value: null },
        { active: false, value: "B" },
        { active: false, value: "C" },
        { active: false, value: null },
        { active: false, value: "D" },
        { active: false, value: null },
        { active: false, value: "E" },
      ],
    },
    {
      label: "B",
      notes: [
        { active: false, value: "C" },
        { active: false, value: null },
        { active: false, value: "D" },
        { active: false, value: null },
        { active: false, value: "E" },
        { active: false, value: "F" },
        { active: false, value: null },
        { active: false, value: "G" },
        { active: false, value: null },
        { active: false, value: "A" },
        { active: false, value: null },
        { active: false, value: "B" },
      ],
    },
    {
      label: "G",
      notes: [
        { active: false, value: null },
        { active: false, value: "E" },
        { active: false, value: "F" },
        { active: false, value: null },
        { active: false, value: "G" },
        { active: false, value: null },
        { active: false, value: "A" },
        { active: false, value: null },
        { active: false, value: "B" },
        { active: false, value: "C" },
        { active: false, value: null },
        { active: false, value: "D" },
      ],
    },
    {
      label: "D",
      notes: [
        { active: false, value: null },
        { active: false, value: "E" },
        { active: false, value: "F" },
        { active: false, value: null },
        { active: false, value: "G" },
        { active: false, value: null },
        { active: false, value: "A" },
        { active: false, value: null },
        { active: false, value: "B" },
        { active: false, value: "C" },
        { active: false, value: null },
        { active: false, value: "D" },
      ],
    },
    {
      label: "A",
      notes: [
        { active: false, value: null },
        { active: false, value: "B" },
        { active: false, value: "C" },
        { active: false, value: null },
        { active: false, value: "D" },
        { active: false, value: null },
        { active: false, value: "E" },
        { active: false, value: "F" },
        { active: false, value: null },
        { active: false, value: "G" },
        { active: false, value: null },
        { active: false, value: "A" },
      ],
    },
    {
      hidden: true,
      label: "E",
      notes: [
        { active: false, value: "F" },
        { active: false, value: null },
        { active: false, value: "G" },
        { active: false, value: null },
        { active: false, value: "A" },
        { active: false, value: null },
        { active: false, value: "B" },
        { active: false, value: "C" },
        { active: false, value: null },
        { active: false, value: "D" },
        { active: false, value: null },
        { active: false, value: "E" },
      ],
    },
  ];
};
