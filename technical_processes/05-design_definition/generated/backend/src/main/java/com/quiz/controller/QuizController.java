package com.quiz.controller;

import com.quiz.model.dto.AnswerRequest;
import com.quiz.model.dto.AnswerResponse;
import com.quiz.model.dto.QuestionDto;
import com.quiz.service.QuestionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
