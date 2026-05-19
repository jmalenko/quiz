# Maintenance

> **IEEE/IEC 12207:2017 — Technical Process 6.4.13**

## Purpose
Sustain the capability of the system to provide a service by modifying it to correct faults, improve performance, or adapt to changes.

## Key Activities
- Analyze modification/change requests
- Implement modifications (following the same lifecycle processes)
- Verify and validate modifications
- Migrate system if platform changes
- Manage maintenance releases

## Maintenance Types (IEEE Classification)
| Type | Purpose | Example |
|------|---------|---------|
| Corrective | Fix defects | Bug in production |
| Adaptive | Adapt to environment | New OS, API change |
| Perfective | Improve quality | Performance optimization |
| Preventive | Prevent problems | Refactor tech debt |

## Inputs
- `../12-operation/FEEDBACK_LOG.md`
- Defect reports, change requests

## Outputs (AI Generates)
- `MAINTENANCE_PLAN.md` — Approach and procedures
- `CHANGE_REQUEST_LOG.md` — Tracked changes with status
- `IMPACT_ANALYSIS.md` — Impact assessment for each change
- `RELEASE_NOTES.md` — Maintenance release documentation

## Process for Each Change
```
1. Receive change request → Classify
2. Impact analysis → Determine affected processes
3. Re-enter lifecycle at appropriate process (03→14 as needed)
4. Verify and validate the change
5. Transition via process 10
6. Update traceability
```
