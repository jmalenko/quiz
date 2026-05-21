package com.quiz.repository;

import com.quiz.model.Question;
import jakarta.annotation.PostConstruct;
import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.stereotype.Repository;
import org.yaml.snakeyaml.Yaml;

@Repository
public class QuestionRepository {

  private List<Question> questions;

  @PostConstruct
  public void loadQuestions() {
    Yaml yaml = new Yaml();
    InputStream inputStream = getClass().getClassLoader()
        .getResourceAsStream("questions.yml");
    Map<String, List<Map<String, Object>>> data = yaml.load(inputStream);
    questions = data.get("questions").stream()
        .map(this::mapToQuestion)
        .toList();
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
