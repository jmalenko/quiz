package com.quiz.model.dto;

public class AnswerRequest {

  private Long questionId;
  private int selectedOption;

  public Long getQuestionId() {
    return questionId;
  }

  public void setQuestionId(Long questionId) {
    this.questionId = questionId;
  }

  public int getSelectedOption() {
    return selectedOption;
  }

  public void setSelectedOption(int selectedOption) {
    this.selectedOption = selectedOption;
  }
}
