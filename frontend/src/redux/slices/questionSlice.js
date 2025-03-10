import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  questions: [],
  selectedCategory: null,
  selectedQuestion: null,
  answeredQuestions: {},
  userAnswer: "",
  answerStatus: "",
  isLoading: true,
  categoryLoading: false,
};

const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setAnsweredQuestions(state, action) {
      state.answeredQuestions = action.payload;
    },
    setQuestions(state, action) {
      state.questions = action.payload;
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    setSelectedQuestion(state, action) {
      state.selectedQuestion = action.payload;
    },
    setUserAnswer(state, action) {
      state.userAnswer = action.payload;
    },
    setAnswerStatus(state, action) {
      state.answerStatus = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setCategoryLoading(state, action) {
      state.categoryLoading = action.payload;
    },
    markQuestionAnswered(state, action) {
      // action.payload is the question id
      state.answeredQuestions[action.payload] = true;
    },
    resetAnswerState(state) {
      state.userAnswer = "";
      state.answerStatus = "";
    },
  },
});

export const {
  setCategories,
  setAnsweredQuestions,
  setQuestions,
  setSelectedCategory,
  setSelectedQuestion,
  setUserAnswer,
  setAnswerStatus,
  setIsLoading,
  setCategoryLoading,
  markQuestionAnswered,
  resetAnswerState,
} = questionSlice.actions;

export default questionSlice.reducer;
