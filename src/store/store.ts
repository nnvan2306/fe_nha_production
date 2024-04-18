import { combineReducers, configureStore } from '@reduxjs/toolkit'
import counterReducer from './feauture/slice'
import authReducer from './feauture/authSlice'
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const authPersistConfig = {
  key: "auth",
  storage,

};

// const persistedReducerAuth = persistReducer(authPersistConfig, authReducer);

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch