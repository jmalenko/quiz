package com.quiz.model.dto;

public class AnswerResponse {

  private boolean correct;
  private int correctOption;

  public AnswerResponse(boolean correct, int correctOption) {
    this.correct = correct;
    this.correctOption = correctOption;
  }

  public boolean isCorrect() {
    return correct;
  }

  public int getCorrectOption() {
    return correctOption;
  }
}
