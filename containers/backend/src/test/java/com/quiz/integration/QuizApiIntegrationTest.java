package com.quiz.integration;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.everyItem;
import static org.hamcrest.Matchers.greaterThan;
import static org.hamcrest.Matchers.hasKey;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.not;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class QuizApiIntegrationTest {

  @LocalServerPort
  private int port;

  @BeforeEach
  void setUp() {
    RestAssured.port = port;
  }

  /**
   * IT-01: Questions endpoint returns data.
   * GET /api/questions → HTTP 200, JSON array with id/text/options, no correctOption.
   */
  @Test
  void it01_getQuestions_returnsDataWithoutCorrectOption() {
    given()
        .when()
        .get("/api/questions")
        .then()
        .statusCode(200)
        .contentType(ContentType.JSON)
        .body("$", hasSize(greaterThan(0)))
        .body("$", everyItem(hasKey("id")))
        .body("$", everyItem(hasKey("text")))
        .body("$", everyItem(hasKey("options")))
        .body("$", everyItem(not(hasKey("correctOption"))));
  }

  /**
   * IT-02: Correct answer is accepted.
   * POST /api/answers with correct option → HTTP 200, correct: true.
   */
  @Test
  void it02_postAnswer_correctOption_returnsCorrectTrue() {
    given()
        .contentType(ContentType.JSON)
        .body("{\"questionId\":1,\"selectedOption\":1}")
        .when()
        .post("/api/answers")
        .then()
        .statusCode(200)
        .body("correct", org.hamcrest.Matchers.is(true));
  }

  /**
   * IT-03: Wrong answer is rejected gracefully.
   * POST /api/answers with wrong option → HTTP 200, correct: false.
   */
  @Test
  void it03_postAnswer_wrongOption_returnsCorrectFalse() {
    given()
        .contentType(ContentType.JSON)
        .body("{\"questionId\":1,\"selectedOption\":0}")
        .when()
        .post("/api/answers")
        .then()
        .statusCode(200)
        .body("correct", org.hamcrest.Matchers.is(false));
  }

  /**
   * IT-04: Unknown question returns 404.
   * POST /api/answers with unknown questionId → HTTP 404.
   */
  @Test
  void it04_postAnswer_unknownQuestion_returns404() {
    given()
        .contentType(ContentType.JSON)
        .body("{\"questionId\":99999,\"selectedOption\":0}")
        .when()
        .post("/api/answers")
        .then()
        .statusCode(404);
  }
}
