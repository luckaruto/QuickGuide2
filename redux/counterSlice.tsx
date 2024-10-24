import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk(
  "counter/fetchData",
  async (_, thunkApi) => {
    try {
      const res = await fetch(
        "https://65ee9def08706c584d9bc036.mockapi.io/dummy"
      );

      const data = await res.json(); // Await the json promise
      console.log(data); // Log the parsed data
      return data; // Return the parsed data
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

interface State {
  value: number[];
  entities: any[];
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  value: [],
  entities: [],
  loading: false,
  error: null,
};

export const counterSlice = createSlice({
  name: "counters",
  initialState,
  reducers: {
    handlePress: (state, action) => {
      const index = state.value.indexOf(action.payload);
      if (index === -1) {
        state.value.push(action.payload);
      } else {
        state.value.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.entities = action.payload;

      state.loading = false;
      state.error = null;
    });

    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { handlePress } = counterSlice.actions;
export default counterSlice.reducer;
