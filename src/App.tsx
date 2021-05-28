import cx from "classnames";
import { useCallback, useEffect, useState } from "react";
import "./App.scss";
import { resetBoard } from "./board";

interface Note {
  string: string;
  note: string | null;
}

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

const generateBoardWithActiveNote = () => {
  const board = resetBoard();
  const string = board[getRandomInt(6)];
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

const App = () => {
  const [board, setBoard] = useState(resetBoard());
  const [activeNote, setActiveNote] = useState<Note>({ string: "", note: "" });

  const checkNote = (note: string) => {
    if (activeNote.note === note) {
      alert("good");
    } else {
      alert("bad");
    }
  };

  const randomize = useCallback(() => {
    const boardWithNote = generateBoardWithActiveNote();
    setBoard(boardWithNote.board);
    setActiveNote(boardWithNote.activeNote);
  }, []);

  useEffect(() => {
    randomize();
  }, [randomize]);

  return (
    <>
      <div className="board">
        <table>
          <tbody>
            {board.map((string, key) => (
              <tr key={key} className={cx([string.hidden && "hidden"])}>
                {string.notes.map((note, key) => (
                  <td key={key} className={cx([note.active && "active"])}>
                    {key === 0 && (
                      <div className="fret-label">{string.label}</div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      <br />
      <pre style={{ whiteSpace: "pre-wrap", textAlign: "center" }}>
        {JSON.stringify(activeNote)}
      </pre>

      <br />
      <div className="buttons">
        <button onClick={() => checkNote("A")}>A</button>
        <button onClick={() => checkNote("B")}>B</button>
        <button onClick={() => checkNote("C")}>C</button>
        <button onClick={() => checkNote("D")}>D</button>
        <button onClick={() => checkNote("E")}>E</button>
        <button onClick={() => checkNote("F")}>F</button>
        <button onClick={() => checkNote("G")}>G</button>
        <button onClick={() => randomize()}>Skip</button>
      </div>
    </>
  );
};

export default App;
