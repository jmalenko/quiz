# AI Interaction Guidelines — IEEE/IEC 12207

## 1. Context Loading

Before generating any artifact, the AI MUST:
1. Read the `PHASE_GUIDE.md` of the current phase
2. Read all input documents listed in the phase guide
3. Read `GOVERNANCE.md` for the applicable quality gate
4. Check `TRACEABILITY.md` for existing links
5. Review `DECISION_LOG.md` for relevant past decisions

## 2. Output Format

Every generated file includes a header:
```markdown
<!--
IEEE 12207 Process: [6.4.X - Process Name]
Phase: [XX - Phase Name]
Generated: [YYYY-MM-DD]
Inputs: [list of source documents]
Traces to: [upstream IDs]
-->
```

## 3. When to Ask the Human

**MUST ask**: ambiguous requirements, conflicting inputs, high-impact decisions, multiple valid options.

**Do NOT ask**: purely technical choices, derivable answers, equally valid implementation details.

## 4. Prompt Templates by Phase

### Phase 00 → 10 (After QG1)
```
INPUT: 00-stakeholder_needs/STAKEHOLDER_NEEDS.md
TASK: Decompose STK-XXX into SYS-FUNC/PERF/IF/SEC/DATA requirements
RULES: Atomic, testable, traceable, prioritized (MoSCoW)
OUTPUT: 10-requirements/SYSTEM_REQUIREMENTS.md + SOFTWARE_REQUIREMENTS.md
```

### Phase 10 → 20 (After QG2)
```
INPUT: 10-requirements/SYSTEM_REQUIREMENTS.md + 20-architecture/USER_INPUT.md
TASK: Architecture definition per IEEE 42010 (4 views)
RULES: Allocate all requirements, justify decisions (ADRs), define interfaces
OUTPUT: 20-architecture/ARCHITECTURE.md + COMPONENT_CATALOG.md + INTERFACE_DEFINITIONS.md
```

### Phase 20 → 30 (After QG3)
```
INPUT: 20-architecture/ARCHITECTURE.md + COMPONENT_CATALOG.md + INTERFACE_DEFINITIONS.md
TASK: Detailed design of each component
RULES: Classes/modules, API contracts, DB schema, error handling, security
OUTPUT: 30-design/DETAILED_DESIGN.md + API_SPECIFICATION.md + DATABASE_DESIGN.md
```

### Phase 30 → 40 (After QG4)
```
INPUT: 30-design/DETAILED_DESIGN.md + API_SPECIFICATION.md + DATABASE_DESIGN.md
TASK: Implement source code + unit tests
RULES: SOLID, documented, match design exactly, ≥80% coverage
OUTPUT: 40-implementation/src/ + tests/unit/
```

### Phase 40 → 50 (After QG5)
```
INPUT: 40-implementation/src/ + 20-architecture/INTERFACE_DEFINITIONS.md
TASK: Integrate components, test all interfaces
RULES: Real components (mock only external), test all IF-XXX
OUTPUT: 50-integration/tests/integration/ + INTEGRATION_REPORT.md
```

### Phase 50 → 60 (After QG6)
```
INPUT: 10-requirements/SYSTEM_REQUIREMENTS.md + integrated system
TASK: Verify system against all requirements (test/inspect/analyze/demonstrate)
RULES: ≥1 test per SYS-XXX, performance + security tests, classify defects
OUTPUT: 60-verification/tests/ + VERIFICATION_REPORT.md + DEFECT_LOG.md
```

### Phase 60 → 70 (After QG7)
```
INPUT: 00-stakeholder_needs/STAKEHOLDER_NEEDS.md + 70-validation/USER_INPUT.md
TASK: Validate system satisfies stakeholder needs (BDD acceptance tests)
RULES: Business language, real-world scenarios, release recommendation
OUTPUT: 70-validation/tests/acceptance/ + VALIDATION_REPORT.md + RELEASE_RECOMMENDATION.md
```

### Phase 70 → 80 (After QG8)
```
INPUT: 80-transition/USER_INPUT.md + 20-architecture/DEPLOYMENT_VIEW.md
TASK: Generate deployment artifacts
RULES: IaC, containers, CI/CD, monitoring, rollback plan
OUTPUT: 80-transition/infrastructure/ + docker/ + ci-cd/ + RUNBOOK.md
```

## 5. Self-Validation

Before presenting output, verify:
- [ ] Completeness: all required sections present
- [ ] Traceability: traces upstream AND downstream
- [ ] Consistency: no contradictions
- [ ] Naming: IDs follow GOVERNANCE.md §6 conventions
- [ ] IEEE alignment: correct process cited

## 6. Error Handling

1. STOP generation
2. Document the issue
3. Propose 2-3 solutions
4. Wait for human decision
5. Record in DECISION_LOG.md
6. Resume
