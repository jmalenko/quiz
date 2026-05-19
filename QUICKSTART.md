# 🚀 Quick Start Guide

## How to Build a Software System with This Governance Framework

This guide walks you through the minimal steps to go from idea to deployed software.

---

## Step 1: Define Your Vision (5-10 minutes)

📄 **Edit**: `00-principles/USER_INPUT.md`

Fill in:
- ✍️ Project name
- ✍️ Vision statement (1-3 sentences)
- ✍️ Target users
- ✍️ Success criteria
- ✍️ Constraints
- ✍️ Scope (in/out)

**That's it!** The AI takes over from here.

---

## Step 2: AI Generates Principles → You Approve

🤖 **AI reads** your `USER_INPUT.md` and generates:
- `00-principles/PRINCIPLES.md`

👤 **You review** and pass Quality Gate 1 (QG1)

---

## Step 3: Define User Stories (10-20 minutes)

📄 **Edit**: `10-requirement/USER_INPUT.md`

Fill in:
- ✍️ User stories (As a... I want... So that...)
- ✍️ Acceptance criteria (Given/When/Then)
- ✍️ Business rules
- ✍️ Data entities

---

## Step 4: AI Generates Requirements → You Approve

🤖 **AI generates**: `10-requirement/REQUIREMENTS.md`
👤 **You review** and pass QG2

---

## Step 5: AI Generates Functional Spec → You Approve

🤖 **AI generates**: Functional specs, use cases, data model
👤 **You review** and pass QG3

---

## Step 6: Provide Technology Preferences (5 minutes)

📄 **Edit**: `40-design/USER_INPUT.md`

Fill in:
- ✍️ Language preference
- ✍️ Framework preference
- ✍️ Database preference
- ✍️ Architecture style preference

---

## Step 7: AI Generates Design → You Approve

🤖 **AI generates**: Architecture, API design, data design, ADRs
👤 **You review** and pass QG4

---

## Step 8: AI Generates Code → You Review

🤖 **AI generates**: Complete source code in `50-implementation/src/`
👤 **You review** and pass QG5

---

## Step 9: Define Critical Test Scenarios (5 minutes)

📄 **Edit**: `60-test_implementation/USER_INPUT.md`

Fill in:
- ✍️ Critical scenarios to test
- ✍️ Coverage expectations

---

## Step 10: AI Generates Tests → You Approve

🤖 **AI generates**: Test plan, test cases, test code
👤 **You review** and pass QG6

---

## Step 11: Provide Deployment Details (5 minutes)

📄 **Edit**: `80-deployment/USER_INPUT.md`

Fill in:
- ✍️ Target environment
- ✍️ CI/CD preferences

---

## Step 12: AI Generates Deployment → You Approve

🤖 **AI generates**: Dockerfiles, CI/CD pipelines, IaC, runbooks
👤 **You review** and pass QG7

---

## Step 13: AI Executes Tests → You Decide

🤖 **AI runs**: All tests, generates reports
👤 **You decide**: GO / NO-GO for release (QG8)

---

## Summary: Your Total Input

| Step | Time | What You Do |
|------|------|-------------|
| Vision | 5-10 min | Fill template |
| User Stories | 10-20 min | Write stories |
| Tech Preferences | 5 min | Fill template |
| Test Scenarios | 5 min | List critical cases |
| Deployment Info | 5 min | Fill template |
| **Quality Gates** | **5 min each** | **Review & approve** |

**Total human effort: ~1-2 hours** for a complete software system.

---

## Key Files to Remember

| File | When to Use |
|------|-------------|
| `00-principles/USER_INPUT.md` | START HERE |
| `GOVERNANCE.md` | Understand the rules |
| `AI_GUIDELINES.md` | How the AI behaves |
| `DECISION_LOG.md` | Record your decisions |
| `TRACEABILITY.md` | Verify nothing is missed |
