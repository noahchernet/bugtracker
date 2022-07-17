import { combineReducers, configureStore } from "@reduxjs/toolkit";
import commentListReducer from "../features/commentListSlice/commentListSlice";
import ticketListReducer from "../features/ticketListSlice/ticketListSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["ticketList"],
};

const rootReducer = combineReducers({
  ticketList: ticketListReducer,
  commentList: commentListReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
