package com.quiz.model;

import java.util.List;

public class Question {

  private Long id;
  private String text;
  private List<String> options;
  private int correctOption;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

  public List<String> getOptions() {
    return options;
  }

  public void setOptions(List<String> options) {
    this.options = options;
  }

  public int getCorrectOption() {
    return correctOption;
  }

  public void setCorrectOption(int correctOption) {
    this.correctOption = correctOption;
  }
}
