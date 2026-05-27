package com.quiz.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

import com.quiz.model.Question;
import com.quiz.model.dto.AnswerRequest;
import com.quiz.model.dto.AnswerResponse;
import com.quiz.model.dto.QuestionDto;
import com.quiz.repository.QuestionRepository;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

@ExtendWith(MockitoExtension.class)
class QuestionServiceTest {

  @Mock
  private QuestionRepository questionRepository;

  private QuestionService questionService;

  @BeforeEach
  void setUp() {
    questionService = new QuestionService(questionRepository);
  }

  private Question buildQuestion(long id, String text, int correctOption) {
    Question q = new Question();
    q.setId(id);
    q.setText(text);
    q.setOptions(List.of("A", "B", "C", "D"));
    q.setCorrectOption(correctOption);
    return q;
  }

  @Test
  void getAllQuestions_returnsDtoListWithoutCorrectOption() {
    when(questionRepository.findAll()).thenReturn(List.of(
        buildQuestion(1L, "Question 1", 2),
        buildQuestion(2L, "Question 2", 0)
    ));

    List<QuestionDto> result = questionService.getAllQuestions();

    assertThat(result).hasSize(2);
    assertThat(result.get(0).getId()).isEqualTo(1L);
    assertThat(result.get(0).getText()).isEqualTo("Question 1");
    assertThat(result.get(0).getOptions()).containsExactly("A", "B", "C", "D");
  }

  @Test
  void checkAnswer_returnsCorrect_whenSelectedOptionMatches() {
    when(questionRepository.findById(1L)).thenReturn(Optional.of(buildQuestion(1L, "Q", 2)));

    AnswerRequest request = new AnswerRequest();
    request.setQuestionId(1L);
    request.setSelectedOption(2);

    AnswerResponse response = questionService.checkAnswer(request);

    assertThat(response.isCorrect()).isTrue();
    assertThat(response.getCorrectOption()).isEqualTo(2);
  }

  @Test
  void checkAnswer_returnsIncorrect_whenSelectedOptionDoesNotMatch() {
    when(questionRepository.findById(1L)).thenReturn(Optional.of(buildQuestion(1L, "Q", 2)));

    AnswerRequest request = new AnswerRequest();
    request.setQuestionId(1L);
    request.setSelectedOption(0);

    AnswerResponse response = questionService.checkAnswer(request);

    assertThat(response.isCorrect()).isFalse();
    assertThat(response.getCorrectOption()).isEqualTo(2);
  }

  @Test
  void checkAnswer_throwsNotFound_whenQuestionIdDoesNotExist() {
    when(questionRepository.findById(999L)).thenReturn(Optional.empty());

    AnswerRequest request = new AnswerRequest();
    request.setQuestionId(999L);
    request.setSelectedOption(1);

    assertThatThrownBy(() -> questionService.checkAnswer(request))
        .isInstanceOf(ResponseStatusException.class)
        .hasMessageContaining("Question not found");
  }
}
