# Phase 60 — Test Implementation

## Purpose
Generate comprehensive test suites that verify the implementation against requirements and functional specifications.

## Inputs
- `USER_INPUT.md` — Critical test scenarios from human
- `../10-requirement/REQUIREMENTS.md` — Requirements with acceptance criteria
- `../20-functional_specification/FUNCTIONAL_SPEC.md` — Functional specifications
- `../20-functional_specification/USE_CASES.md` — Use cases
- `../50-implementation/src/` — Source code under test

## Outputs (AI Generates)
- `TEST_PLAN.md` — Overall test strategy and plan
- `TEST_CASES.md` — Detailed test case specifications
- `tests/` — Automated test code
  - `tests/unit/` — Unit tests
  - `tests/integration/` — Integration tests
  - `tests/e2e/` — End-to-end tests
  - `tests/performance/` — Performance tests (if required)
  - `tests/security/` — Security tests (if required)
- `TRACEABILITY.md` — Test-to-Requirement traceability

## AI Generation Rules

1. **Read** requirements, specs, and human-defined critical scenarios
2. **Generate test plan** covering:
   - Test strategy (levels, types, tools)
   - Entry/exit criteria for each level
   - Test environment requirements
   - Risk-based test prioritization
3. **Generate test cases** for each requirement:
   - Happy path (primary flow)
   - Boundary values
   - Error conditions
   - Edge cases from USER_INPUT.md
4. **Generate test code**:
   - Unit tests: isolate each function/method
   - Integration tests: verify component interactions
   - E2E tests: validate complete user journeys
5. **Apply test patterns**:
   - Arrange-Act-Assert (AAA)
   - Given-When-Then (BDD style)
   - Test data builders
   - Mocking for external dependencies
6. **Ensure traceability**:
   - Every test case traces to at least one requirement
   - Every requirement has at least one test case
7. **Generate test data**:
   - Valid data sets
   - Invalid data sets (boundary, null, overflow)
   - Representative production-like data

## Quality Gate: QG6

Before proceeding to Deployment (Phase 80), verify:
- [ ] Test plan covers all requirement priorities
- [ ] Critical scenarios from USER_INPUT.md are covered
- [ ] Unit test coverage ≥ threshold (default: 80%)
- [ ] All acceptance criteria have corresponding tests
- [ ] Test code compiles and can execute
- [ ] Traceability is complete (no untested requirements)
- [ ] Human has approved test plan

## Test Case Template

```markdown
# TC-XXX: [Test Case Name]

**Objective**: [What is being verified]
**Level**: Unit / Integration / E2E / Performance / Security
**Priority**: CRITICAL / HIGH / MEDIUM / LOW
**Traces To**: REQ-FUNC-XXX, SPEC-XXX

**Pre-conditions**:
- [State/setup required before test]

**Test Steps**:
1. [Action 1]
2. [Action 2]
3. [Action 3]

**Expected Result**: [What should happen]
**Test Data**: [Specific data used]

**Post-conditions**:
- [Expected state after test]
```

## Test Naming Convention

```
test_<component>_<scenario>_<expected_behavior>

Examples:
- test_auth_validCredentials_returnsToken
- test_auth_expiredToken_returns401
- test_payment_insufficientFunds_declinesTransaction
```
