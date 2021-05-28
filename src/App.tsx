import "./App.scss";
import { board } from "./board";

const App = () => {
  return (
    <div className="board">
      <table>
        <tbody>
          {board.map((tr, key) => (
            <tr key={key} className={tr.invisible ? "invisible" : ""}>
              {tr.notes.map((note, key) => {
                if (key === 0) {
                  return (
                    <td key={key}>
                      <div className="fret-label">{tr.label}</div>
                    </td>
                  );
                } else {
                  return <td key={key}></td>;
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
