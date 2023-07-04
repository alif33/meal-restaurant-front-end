import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./auth/slice";
// import { cartSlice } from "./cart/slice";
// import { categorySlice } from "./catrgories/slice";
// import { customerSlice } from "./customers/slice";
// import { memberSlice } from "./members/slice";
import { menuSlice } from "./menu/slice";
import { restaurantSlice } from "./restaurant/slice";
// import { scheduleSlice } from "./schedule/slice";
// import { shopSlice } from "./shop/slice";
// import { scheduleSlice } from './shop/slice'
// import { singleMemberSlice } from "./singleMember/slice";
import { userSlice } from "./users/slice";

export const rootReducer = combineReducers({
  users: userSlice.reducer,
  auth: authSlice.reducer,
  // members: memberSlice.reducer,
  // singleMember: singleMemberSlice.reducer,
  // categories: categorySlice.reducer,
  // customers: customerSlice.reducer,
  // carts: cartSlice.reducer,
  //shop reducer
  // shop: shopSlice.reducer,
  // schedule: scheduleSlice.reducer,
  restaurant: restaurantSlice.reducer,
  menu: menuSlice.reducer
});
