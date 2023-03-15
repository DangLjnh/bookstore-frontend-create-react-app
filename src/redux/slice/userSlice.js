const { createSlice, createAction } = require("@reduxjs/toolkit");
const initialState = {
  profile: "",
  carts: [],
  total: 0,
  quantity: 0,
};
export const setProfile = createAction("setProfile");
export const setCart = createAction("setCart");
export const setTotal = createAction("setTotal");
export const setQuantity = createAction("setQuantity");
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setProfile, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(setCart, (state, action) => {
        state.carts = action.payload;
      })
      .addCase(setTotal, (state, action) => {
        state.total = action.payload;
      })
      .addCase(setQuantity, (state, action) => {
        state.quantity = action.payload;
      });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
