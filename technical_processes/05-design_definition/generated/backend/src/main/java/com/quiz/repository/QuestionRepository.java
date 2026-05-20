package com.quiz.repository;

import com.quiz.model.Question;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class QuestionRepository {

    private final List<Question> questions;

    public QuestionRepository() {
        this.questions = loadFromYaml();
    }

    public List<Question> loadQuestions() {
        return questions;
    }

    private List<Question> loadFromYaml() {
        // TODO: implement YAML loading from classpath resource
        throw new UnsupportedOperationException("YAML loading not yet implemented");
    }
}
