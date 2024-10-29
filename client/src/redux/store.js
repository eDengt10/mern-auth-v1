import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import userReducer from './slices/userSlice';
import adminReducer from './slices/adminSlice';

const userPersistConfig = {
  key: 'user',
  storage,
};

const adminPersistConfig = {
  key: 'admin',
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedAdminReducer = persistReducer(adminPersistConfig, adminReducer);

const rootReducer = {
  user: persistedUserReducer,
  admin: persistedAdminReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };