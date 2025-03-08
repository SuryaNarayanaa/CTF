import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedQuestion: null,
  showDetails: false,
};

const adminQuestionsSlice = createSlice({
  name: 'adminQuestions',
  initialState,
  reducers: {
    setSelectedQuestion(state, action) {
      state.selectedQuestion = action.payload;
    },
    setShowDetails(state, action) {
      state.showDetails = action.payload;
    },
    resetSelectedQuestion(state) {
      state.selectedQuestion = null;
      state.showDetails = false;
    },
  },
});

export const { setSelectedQuestion, setShowDetails, resetSelectedQuestion } = adminQuestionsSlice.actions;
export default adminQuestionsSlice.reducer;
