import { useState } from "react";
import Box from "./components/Box/Box";
import { Choose } from "./enum/choose.enum";

export const players = new Map([
  [1, Choose.CROSS],
  [0, Choose.CIRCLE],
]);

const initialState = [
  {
    status: false,
    item: "",
  },
  {
    status: false,
    item: "",
  },
  {
    status: false,
    item: "",
  },
  {
    status: false,
    item: "",
  },
  {
    status: false,
    item: "",
  },
  {
    status: false,
    item: "",
  },
  {
    status: false,
    item: "",
  },
  {
    status: false,
    item: "",
  },
  {
    status: false,
    item: "",
  },
];

function App() {
  const [playerActive, setPlayerActive] = useState(Math.round(Math.random()));
  const [statusGame, setStatusGame] = useState(initialState);
  const [vincitore, setVincitore] = useState<string | null>(null);

  const checkVincitore = () => {
    // Array di tutte le possibili combinazioni di vincita
    const possibiliVincite = [
      // Righe
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Colonne
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonali
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Controlla tutte le possibili combinazioni di vincita
    for (const combinazione of possibiliVincite) {
      const [a, b, c] = combinazione;

      // Controlla se tutte le caselle nella combinazione sono occupate dallo stesso simbolo
      if (
        statusGame[a].item &&
        statusGame[a].item === statusGame[b].item &&
        statusGame[a].item === statusGame[c].item
      ) {
        // Restituisci il simbolo del vincitore
        return statusGame[a].item;
      }
    }

    // Se nessun vincitore è stato trovato, restituisci null
    return null;
  };

  const addChoose = (index: number) => {
    const newStatusGame = [...statusGame];
    const player = players.get(playerActive);
    if (player) newStatusGame[index].item = player;

    setStatusGame(newStatusGame);
    setPlayerActive(playerActive === 1 ? 0 : 1);

    const vincitore = checkVincitore();
    setVincitore(vincitore);
  };

  if (vincitore) {
    return <div> HA VINTO IL GIOCATORE --- {vincitore}</div>;
  }
  return (
    <>
      {playerActive === 1 ? (
        <div> Il giocatore attivo è il primo (CROSS) </div>
      ) : (
        <div> Il giocatore attivo è il secondo (CIRCLE) </div>
      )}

      <div className="game-arena">
        <div className="row">
          <Box player={statusGame[0].item} index={0} choose={addChoose} />
          <Box player={statusGame[1].item} index={1} choose={addChoose} />
          <Box player={statusGame[2].item} index={2} choose={addChoose} />
        </div>

        <div className="row">
          <Box player={statusGame[3].item} index={3} choose={addChoose} />
          <Box player={statusGame[4].item} index={4} choose={addChoose} />
          <Box player={statusGame[5].item} index={5} choose={addChoose} />
        </div>

        <div className="row">
          <Box player={statusGame[6].item} index={6} choose={addChoose} />
          <Box player={statusGame[7].item} index={7} choose={addChoose} />
          <Box player={statusGame[8].item} index={8} choose={addChoose} />
        </div>
      </div>
    </>
  );
}

export default App;
