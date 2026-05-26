# Governance — Verification

## Methodology

This process follows **IEEE/IEC/IEEE 29119:2013–2021 — Software and systems engineering — Software Testing**, specifically:

- **Part 1** (Concepts and definitions) — testing vocabulary and concepts
- **Part 2** (Test processes) — organizational, test management, and dynamic test processes
- **Part 3** (Test documentation) — test plan, test design specification, test case specification, test execution log, test results report

It is also governed by **IEEE 1012:2016 — Standard for System, Software, and Hardware Verification and Validation**, which defines the Verification process within the IEEE/IEC 12207:2017 lifecycle and mandates:
- Traceability between requirements and verification evidence
- Independence of verification activities from implementation
- A Verification Report as the process exit artifact

## High Level Format

Human provides:
- Scope of verification (what is in / out of scope)
- Test approach (manual, automated, or both)
- Any constraints on tooling or environments

## Detailed Format

AI expands into a **Test Plan** covering:

- Test levels, their origin, and execution scope (see Test Execution section)
- Test types per level (functional, non-functional)
- Test cases (TC-nn) with full traceability to system requirements (SR-nn)
- Pass/fail criteria for each test case
- Test environment specification

Each test case follows the IEEE 29119-3 structure:

```
TC-{AC ref}: [Test case title]
Source: SR-{nn} / AC-{xx.y}
Precondition: [system state before test]
Steps:
  1. [action]
  2. [action]
Expected result: [observable, measurable outcome]
Pass criterion: [exact condition that constitutes a pass]
```

## Artifacts Format

AI generates from the Detailed test plan:

- Executable test scripts (where automated)
- A **Verification Matrix** mapping every SR-nn to one or more TC-nn, showing coverage
- A **Verification Report** summarising execution results and overall pass/fail verdict

## End-to-End Tests

End-to-end tests are **created** in this process, derived from system requirements (SR-nn) and their traceability to acceptance criteria (AC-nn).

They are **executed** in this process as part of the verification quality gate.

## Test Execution

This process executes all test levels. Tests originate from different upstream processes but are all run here as the authoritative verification act:

| Test Level | Origin | Test Cases |
|---|---|---|
| Unit | 07 Implementation | Co-authored with code; cover individual classes and functions |
| Integration | 08 Integration | Defined with integration scenarios; cover inter-container communication |
| End-to-End | 09 Verification (this process) | Derived from SR-nn / AC-nn; cover full user-facing behaviour |

All three levels must pass for the quality gate to be cleared.

## Quality Gate

The quality gate is passed when:
1. Every SR-nn is covered by at least one TC-nn in the Verification Matrix
2. All test cases have been executed
3. All test cases pass (zero open failures)
4. The Verification Report is produced and approved by the human
