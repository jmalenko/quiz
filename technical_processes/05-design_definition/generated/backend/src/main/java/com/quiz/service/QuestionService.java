package com.quiz.service;

import com.quiz.model.Question;
import com.quiz.model.dto.AnswerRequest;
import com.quiz.model.dto.AnswerResponse;
import com.quiz.model.dto.QuestionDto;
import com.quiz.repository.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public List<QuestionDto> getAllQuestions() {
        return questionRepository.loadQuestions().stream()
                .map(q -> new QuestionDto(q.getId(), q.getText(), q.getOptions()))
                .toList();
    }

    public AnswerResponse checkAnswer(AnswerRequest request) {
        Question question = questionRepository.loadQuestions().stream()
                .filter(q -> q.getId().equals(request.getQuestionId()))
                .findFirst()
                .orElseThrow(() -> new QuestionNotFoundException(request.getQuestionId()));

        boolean correct = question.getCorrectOption() == request.getSelectedOption();
        return new AnswerResponse(correct, question.getCorrectOption());
    }
}
