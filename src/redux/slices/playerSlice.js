import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    players: ["Player1", "Player2"], // Initialize with Player1 and Player2
    nextPlayerIndex: 2, // Initialize the index for the next player name to be updated
    bowler: "bowler", // Initialize with a default bowler name
  },
  reducers: {
    updatePlayerName: (state, action) => {
      const { playerName } = action.payload;
      state.players.push(playerName);
      state.nextPlayerIndex++;
    },
    updateBowlerName: (state, action) => {
      state.bowler = action.payload;
    },
  },
});

export const { updatePlayerName, updateBowlerName } = playerSlice.actions;
export default playerSlice.reducer;
