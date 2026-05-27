package com.quiz.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.quiz.model.Question;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.core.io.ClassPathResource;
import org.springframework.test.util.ReflectionTestUtils;

class QuestionRepositoryTest {

  private QuestionRepository repository;

  @BeforeEach
  void setUp() throws Exception {
    repository = new QuestionRepository();
    ReflectionTestUtils.setField(repository, "questionsResource", new ClassPathResource("questions.yml"));
    repository.loadQuestions();
  }

  @Test
  void findAll_returnsAllQuestionsFromFile() {
    assertThat(repository.findAll()).hasSize(3);
  }

  @Test
  void findById_returnsCorrectQuestion_whenIdExists() {
    Optional<Question> result = repository.findById(1L);

    assertThat(result).isPresent();
    assertThat(result.get().getText()).isEqualTo("What is the capital of France?");
  }

  @Test
  void findById_returnsEmpty_whenIdDoesNotExist() {
    Optional<Question> result = repository.findById(999L);

    assertThat(result).isEmpty();
  }
}
