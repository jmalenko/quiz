package com.quiz.model.dto;

import java.util.List;

public record QuestionDto(Long id, String text, List<String> options) {}
