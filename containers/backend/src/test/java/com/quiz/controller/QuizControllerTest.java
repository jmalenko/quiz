package com.quiz.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.quiz.model.dto.AnswerRequest;
import com.quiz.model.dto.AnswerResponse;
import com.quiz.model.dto.QuestionDto;
import com.quiz.service.QuestionService;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(QuizController.class)
class QuizControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private QuestionService questionService;

  @Test
  void getQuestions_returnsListOfQuestions() throws Exception {
    when(questionService.getAllQuestions()).thenReturn(List.of(
        new QuestionDto(1L, "What is the capital of France?", List.of("Berlin", "Paris", "Rome")),
        new QuestionDto(2L, "What is 2 + 2?", List.of("3", "4", "5"))
    ));

    mockMvc.perform(get("/api/questions"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.length()").value(2))
        .andExpect(jsonPath("$[0].id").value(1))
        .andExpect(jsonPath("$[0].text").value("What is the capital of France?"))
        .andExpect(jsonPath("$[1].id").value(2));
  }

  @Test
  void checkAnswer_returnsCorrectAnswerResponse() throws Exception {
    when(questionService.checkAnswer(any(AnswerRequest.class)))
        .thenReturn(new AnswerResponse(true, 1));

    mockMvc.perform(post("/api/answers")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"questionId\":1,\"selectedOption\":1}"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.correct").value(true))
        .andExpect(jsonPath("$.correctOption").value(1));
  }

  @Test
  void checkAnswer_returnsIncorrectAnswerResponse() throws Exception {
    when(questionService.checkAnswer(any(AnswerRequest.class)))
        .thenReturn(new AnswerResponse(false, 2));

    mockMvc.perform(post("/api/answers")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"questionId\":1,\"selectedOption\":0}"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.correct").value(false))
        .andExpect(jsonPath("$.correctOption").value(2));
  }
}
