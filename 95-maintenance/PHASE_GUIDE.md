# Phase 95 — Maintenance

> **IEEE/IEC 12207 Process**: 6.4.12 Maintenance Process

## Purpose
Modify the system after delivery to correct faults, improve performance, or adapt to changed requirements. Feeds back into the lifecycle.

## IEEE 12207 Alignment
- **Process**: Maintenance Process
- **Objective**: Sustain capability of system to provide a service
- **Key activities**:
  - Analyze modification requests (defects, enhancements, adaptations)
  - Implement modifications following the same lifecycle
  - Verify and validate modifications
  - Migrate system (if platform changes)
  - Retire system (disposal)

## Inputs
- `../90-operation/FEEDBACK_LOG.md` — Operational feedback and change requests
- Defect reports from production
- Change requests from stakeholders

## Outputs (AI Generates)
- `MAINTENANCE_PLAN.md` — Approach to maintenance (corrective, adaptive, perfective)
- `CHANGE_REQUEST_LOG.md` — Tracked change requests with status
- `IMPACT_ANALYSIS.md` — Impact assessment template for changes
- `RELEASE_NOTES.md` — Template for maintenance releases

## Maintenance Types (IEEE Classification)

| Type | Purpose | Example |
|------|---------|---------|
| **Corrective** | Fix defects | Bug reported in production |
| **Adaptive** | Adapt to environment changes | New OS version, API deprecation |
| **Perfective** | Improve quality/performance | Optimize slow query, improve UX |
| **Preventive** | Prevent future problems | Refactor tech debt, update dependencies |

## Process for Each Change

```
1. Receive change request
2. Classify (corrective/adaptive/perfective/preventive)
3. Assess impact (which phases are affected?)
4. Apply governance:
   - Small fix → Phase 40 (implement) → Phase 50 (integrate) → Phase 60 (verify)
   - New feature → Phase 10 (requirements) → full lifecycle
   - Architecture change → Phase 20 (architecture) → full lifecycle from there
5. Verify and validate the change
6. Deploy via Phase 80 (transition)
7. Update traceability matrix
```

## Quality Gate: QG-M (Maintenance Release)

| # | Criterion | Check |
|---|-----------|-------|
| 1 | Change request documented and classified | ☐ |
| 2 | Impact analysis completed | ☐ |
| 3 | Appropriate lifecycle phases re-executed | ☐ |
| 4 | Regression tests pass | ☐ |
| 5 | Traceability updated | ☐ |
| 6 | Release notes prepared | ☐ |
| 7 | **Human Decision**: Approve maintenance release | ☐ |

## Note
Maintenance is **cyclic** — it feeds back into earlier phases as needed. The governance framework applies to each change proportional to its impact.
