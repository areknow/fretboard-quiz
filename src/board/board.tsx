import cx from "classnames";
import { useCallback, useEffect, useState } from "react";
import "./board.scss";
import { BOARD, BUTTONS } from "./constants";
import { ActiveNote, FretBoard } from "./types";
import { setActiveNoteOnBoard } from "./utils";

const Board = () => {
  const [board, setBoard] = useState<FretBoard>(BOARD);
  const [activeNote, setActiveNote] = useState<ActiveNote>({
    string: "",
    note: "",
  });
  const [score, setScore] = useState(0);
  const [showGood, setShowGood] = useState(false);
  const [showBad, setShowBad] = useState(false);
  const [init, setInit] = useState(true);

  const randomize = useCallback(() => {
    const boardWithActiveNote = setActiveNoteOnBoard(board, activeNote);
    setActiveNote(boardWithActiveNote.activeNote);
    setBoard(boardWithActiveNote.board);
  }, [activeNote, board]);

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

  const toggleString = useCallback(
    (toggledString: { label: string }) => {
      const updatedBoard = [...board];
      const string = updatedBoard.find(
        (string) => string.label === toggledString.label
      );
      string!.active = !string?.active;
      setBoard(updatedBoard);
      skip();
    },
    [board, skip]
  );

  useEffect(() => {
    if (init) {
      randomize();
      setInit(false);
    }
  }, [init, randomize]);

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
                        <div
                          className={cx([
                            "fret-label",
                            string.active && "string-active",
                          ])}
                          onClick={() => toggleString(string)}
                        >
                          {string.label}
                        </div>
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
