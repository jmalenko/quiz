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
| **Layer 1 — Intent** | Human | directory root |
| **Layer 2 — Detailed Specification** | AI (from Layer 1), Human reviews (iteration with AI), approves and is responsible | `detailed/` |
| **Layer 3 — Artifacts** | AI (from Layer 2) | `generated/` |

### Layer 1 — Human Intent (high-level)
The human writes key content: decisions, constraints, needs, preferences. Brief, natural language.

### Layer 2 — Detailed Specification (AI-generated, human-reviewed)
The AI expands Layer 1 into structured, detailed content. The human reviews, corrects, and approves. Once approved, the human is responsible for Layer 2.

### Layer 3 — Artifacts (AI-generated, human ignores)
The AI derives final artifacts from Layer 2. Source code, test scripts, deployment configs, traceability matrices. Safe to delete and regenerate at any time from Layer 2.

### Correction Flow

**Within a process (same directory):**

- Layer 3 wrong → fix Layer 2
- Layer 2 wrong → clarify Layer 1

**Across processes (backtracking):**

- Layer 1 wrong → the upstream process that produced this input is flawed → backtrack to that process
- Apply the same layer correction at the upstream process
- After fixing, re-propagate forward through all affected downstream processes

**Rule:** Always fix at the *earliest* affected process. Never patch a downstream artifact if the root cause is upstream.

## 4. Directory Convention

```
<directory>/
├── GOVERNANCE.md           ← rules (optional)
├── <files>                 ← Layer 1 (human intent)
├── detailed/               ← Layer 2 (AI-generated, human-approved)
└── generated/              ← Layer 3 (AI-generated, human ignores)
```

### Attribution and Staleness

Every file in `detailed/` MUST begin with an attribution line:

```markdown
> *AI-generated — implied from [<source>](<relative path>) #<section>*
```

This attribution IS the traceability mechanism:
- It links the file to its source (Layer 1 content or GOVERNANCE rule)
- When the referenced source changes, the file becomes **stale** and MUST be regenerated
- A file with no attribution has no known source and SHOULD be removed or attributed

## 5. AI Behavior

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
