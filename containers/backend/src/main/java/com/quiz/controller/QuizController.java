package com.quiz.controller;

import com.quiz.model.dto.AnswerRequest;
import com.quiz.model.dto.AnswerResponse;
import com.quiz.model.dto.QuestionDto;
import com.quiz.service.QuestionService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class QuizController {

  private final QuestionService questionService;

  public QuizController(QuestionService questionService) {
    this.questionService = questionService;
  }

  @GetMapping("/questions")
  public List<QuestionDto> getQuestions() {
    return questionService.getAllQuestions();
  }

  @PostMapping("/answers")
  public AnswerResponse checkAnswer(@RequestBody AnswerRequest request) {
    return questionService.checkAnswer(request);
  }
}
