import cx from "classnames";
import { useCallback, useEffect, useState } from "react";
import "./board.scss";
import { Note } from "./types";
import { generateBoardWithActiveNote, resetBoard } from "./utils";

const Board = () => {
  const [board, setBoard] = useState(resetBoard());
  const [activeNote, setActiveNote] = useState<Note>({ string: "", note: "" });
  console.log(activeNote);
  const [score, setScore] = useState(0);
  const [showGood, setShowGood] = useState(false);
  const [showBad, setShowBad] = useState(false);

  const checkNote = (note: string) => {
    if (activeNote.note === note) {
      setShowGood(true);
      setShowBad(false);
      setScore(score + 1);
      randomize();
    } else {
      setShowBad(true);
      setShowGood(false);
      setScore(0);
    }
  };

  const skip = () => {
    randomize();
    setShowBad(false);
    setShowGood(false);
    setScore(0);
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
      <div className="info">
        <div className={cx(["icon", (showGood || showBad) && "visible"])}>
          <i className={cx(["material-icons", showGood ? "green" : "red"])}>
            {showGood ? "thumb_up" : "thumb_down"}
          </i>
        </div>

        <div className="buttons">
          <button onClick={() => checkNote("A")}>A</button>
          <button onClick={() => checkNote("B")}>B</button>
          <button onClick={() => checkNote("C")}>C</button>
          <button onClick={() => checkNote("D")}>D</button>
          <button onClick={() => checkNote("E")}>E</button>
          <button onClick={() => checkNote("F")}>F</button>
          <button onClick={() => checkNote("G")}>G</button>
          <button onClick={() => skip()}>Skip</button>
        </div>

        <div className="score">
          Score: <span>{score}</span>
        </div>
      </div>
    </>
  );
};

export default Board;
