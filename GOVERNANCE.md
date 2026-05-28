# Governance

## 1. Standard

This project follows **IEEE/IEC 12207:2017 — Systems and software engineering — Software life cycle processes**.

## 2. Governance Files

Every directory MAY contain a `GOVERNANCE.md` file that defines rules specific to that directory.

The **effective governance** for any directory is the combination of all `GOVERNANCE.md` files from the root down to that directory. Rules are inherited: a child directory inherits all rules from its parents. A child may add rules but MUST NOT contradict a parent rule.

## 3. Three-Layer Content Model

Every directory follows a 3-layer model:

| Layer | Author | Location |
|-------|--------|----------|
| **High Level** | Human | directory root |
| **Detailed** | AI (from High Level), Human reviews (iteration with AI), approves and is responsible | `detailed/` |
| **Artifacts** | AI (from Detailed) | `generated/` |

### High Level (human)
The human writes key content: decisions, constraints, needs, preferences. Brief, natural language.

### Detailed (AI-generated, human-reviewed)
The AI expands High Level into structured, detailed content. The human reviews, corrects, and approves. Once approved, the human is responsible for it.

### Artifacts (AI-generated, human ignores)
The AI derives final artifacts from Detailed. Source code, test scripts, deployment configs, traceability matrices. Safe to delete and regenerate at any time from Detailed.

### Correction Flow

**Within a process (same directory):**

- Artifacts wrong → fix Detailed
- Detailed wrong → clarify High Level

**Across processes (backtracking):**

- High Level wrong → the upstream process that produced this input is flawed → backtrack to that process
- Apply the same layer correction at the upstream process
- After fixing, re-propagate forward through all affected downstream processes

**Rule:** Always fix at the *earliest* affected process. Never patch a downstream artifact if the root cause is upstream.

### Propagation Rule

**Within a process:**\
A change at High Level MUST be propagated to Detailed (and then to Artifacts) before the quality gate is passed. No process may pass its quality gate while layers are inconsistent.

**Across processes:**\
A change in any process MUST propagate to all affected downstream processes before their quality gates are passed. Each process declares its upstream dependency via attribution.

## 4. Change Management

When a change is needed — whether to fix a defect, respond to a new need, or adapt to an environment change — it is managed through a **Change Request (CR)**.

A Change Request is usually expressed as a standalone document, but in this project it is expressed by updating the relevant High Level document and propagating the change forward.

To apply a change, identify the earliest process in the lifecycle whose content is affected, update that High Level document, and let the change propagate forward through all downstream processes (Propagation Rule, § 3).

## 5. Directory Convention

```
<directory>/
├── GOVERNANCE.md           ← rules (optional)
├── <files>                 ← High Level (human intent)
├── detailed/               ← Detailed (AI-generated, human-approved)
└── generated/              ← Artifacts (AI-generated, human ignores)
```

### Attribution and Staleness

Every file in `detailed/` MUST begin with an attribution line:

```markdown
> *AI-generated — implied from [<source>](<relative path>) #<section>*
```

This attribution IS the traceability mechanism:
- It links the file to its source (High Level content or GOVERNANCE rule)
- When the referenced source changes, the file becomes **stale** and MUST be regenerated
- A file with no attribution has no known source and SHOULD be removed or attributed

## 6. AI Behavior

### Autonomy

**AI MUST ask the human** when encountering:
- Ambiguous or conflicting inputs
- High-impact decisions with multiple valid options
- Trade-offs that depend on business priorities

**AI MUST NOT ask** when:
- The answer is derivable from existing content
- Multiple options are equally valid (just pick one)
- It's a purely technical implementation choice

### Self-Validation

Before presenting any output, the AI verifies:
- Completeness — all required sections present
- Consistency — no contradictions with existing content or governance
- Traceability — traces upstream AND downstream

### Error Handling

When the AI encounters a problem it cannot resolve:
1. STOP generation
2. Document the issue
3. Propose 2–3 solutions
4. Wait for human decision
5. Resume after decision
