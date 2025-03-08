import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import questionReducer from './slices/questionSlice';
import  adminReducer from './slices/adminQuestionSlice'
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session'; 


const persistConfig = {
  key: 'root',
  storage:storageSession,
  whitelist: ['auth']
};

const rootReducer = combineReducers({
  auth: authReducer,
  question: questionReducer,
  adminQuestions : adminReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
});

export const persistor = persistStore(store);
export default store;
