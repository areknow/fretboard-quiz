import cx from "classnames";
import { useCallback, useEffect, useState } from "react";
import "./board.scss";
import { BUTTONS } from "./constants";
import { Note } from "./types";
import { generateBoardWithActiveNote, resetBoard } from "./utils";

const Board = () => {
  const [board, setBoard] = useState(resetBoard());
  const [activeNote, setActiveNote] = useState<Note>({ string: "", note: "" });
  const [score, setScore] = useState(0);
  const [showGood, setShowGood] = useState(false);
  const [showBad, setShowBad] = useState(false);

  const randomize = useCallback(() => {
    const boardWithNote = generateBoardWithActiveNote();
    console.log(boardWithNote.activeNote);
    setBoard(boardWithNote.board);
    setActiveNote(boardWithNote.activeNote);
  }, []);

  const checkNote = useCallback(
    (note: string) => {
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
    },
    [activeNote.note, randomize, score]
  );

  const skip = useCallback(() => {
    randomize();
    setShowBad(false);
    setShowGood(false);
    setScore(0);
  }, [randomize]);

  useEffect(() => {
    randomize();
  }, [randomize]);

  return (
    <>
      <div className="portrait">
        <div className="rotation-message">
          <div>
            <p>
              Rotate <br />
              the phone
            </p>
            <i className="material-icons">screen_rotation</i>
          </div>
        </div>
      </div>
      <div className="landscape">
        <div className="board">
          <table>
            <tbody>
              {board.map((string, key) => (
                <tr key={key} className={cx([string.hidden && "hidden"])}>
                  {string.notes.map((note, key) => (
                    <td key={key}>
                      {note.active && <div className="active" />}
                      {note.marker && <div className="marker" />}
                      <div className="string" />
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
            {BUTTONS.map((button, key) => (
              <button key={key} onClick={() => checkNote(button)}>
                {button}
              </button>
            ))}
            <button className="skip" onClick={() => skip()}>
              Skip
            </button>
          </div>
          <div className="score">
            <div>
              <span>{score}</span>
              <div>SCORE:</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Board;
