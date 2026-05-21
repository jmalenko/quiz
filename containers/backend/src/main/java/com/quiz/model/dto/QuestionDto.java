package com.quiz.model.dto;

import java.util.List;

public class QuestionDto {

  private Long id;
  private String text;
  private List<String> options;

  public QuestionDto(Long id, String text, List<String> options) {
    this.id = id;
    this.text = text;
    this.options = options;
  }

  public Long getId() {
    return id;
  }

  public String getText() {
    return text;
  }

  public List<String> getOptions() {
    return options;
  }
}
