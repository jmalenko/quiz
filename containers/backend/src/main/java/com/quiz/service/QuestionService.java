package com.quiz.service;

import com.quiz.model.Question;
import com.quiz.model.dto.AnswerRequest;
import com.quiz.model.dto.AnswerResponse;
import com.quiz.model.dto.QuestionDto;
import com.quiz.repository.QuestionRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class QuestionService {

  private final QuestionRepository questionRepository;

  public QuestionService(QuestionRepository questionRepository) {
    this.questionRepository = questionRepository;
  }

  public List<QuestionDto> getAllQuestions() {
    return questionRepository.findAll().stream()
        .map(q -> new QuestionDto(q.getId(), q.getText(), q.getOptions()))
        .toList();
  }

  public AnswerResponse checkAnswer(AnswerRequest request) {
    Question question = questionRepository.findById(request.getQuestionId())
        .orElseThrow(() -> new ResponseStatusException(
            HttpStatus.NOT_FOUND, "Question not found"));
    boolean correct = request.getSelectedOption() == question.getCorrectOption();
    return new AnswerResponse(correct, question.getCorrectOption());
  }
}
