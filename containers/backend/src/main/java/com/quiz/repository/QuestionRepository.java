package com.quiz.repository;

import com.quiz.model.Question;
import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Repository;
import org.yaml.snakeyaml.Yaml;

@Repository
public class QuestionRepository {

  @Value("${questions.file:classpath:questions.yml}")
  private Resource questionsResource;

  private List<Question> questions;

  @PostConstruct
  public void loadQuestions() throws IOException {
    Yaml yaml = new Yaml();
    try (InputStream inputStream = questionsResource.getInputStream()) {
      Map<String, List<Map<String, Object>>> data = yaml.load(inputStream);
      questions = data.get("questions").stream()
          .map(this::mapToQuestion)
          .toList();
    }
  }

  public List<Question> findAll() {
    return questions;
  }

  public Optional<Question> findById(Long id) {
    return questions.stream()
        .filter(q -> q.getId().equals(id))
        .findFirst();
  }

  private Question mapToQuestion(Map<String, Object> map) {
    Question question = new Question();
    question.setId(((Number) map.get("id")).longValue());
    question.setText((String) map.get("text"));
    @SuppressWarnings("unchecked")
    List<String> options = (List<String>) map.get("options");
    question.setOptions(options);
    question.setCorrectOption((int) map.get("correctOption"));
    return question;
  }
}
