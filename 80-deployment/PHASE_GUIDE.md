# Phase 80 — Deployment

## Purpose
Generate all deployment artifacts needed to reliably deploy, configure, and operate the system in target environments.

## Inputs
- `USER_INPUT.md` — Target environment details
- `../40-design/DEPLOYMENT_DESIGN.md` — Deployment topology
- `../50-implementation/src/` — Source code to deploy
- `../50-implementation/BUILD.md` — Build instructions

## Outputs (AI Generates)
- `DEPLOYMENT_GUIDE.md` — Step-by-step deployment instructions
- `RUNBOOK.md` — Operational runbook (start, stop, troubleshoot)
- `infrastructure/` — Infrastructure-as-Code (Terraform, CloudFormation, etc.)
- `docker/` — Containerization files (Dockerfile, docker-compose)
- `ci-cd/` — Pipeline configuration files
- `config/` — Environment configuration templates
- `monitoring/` — Monitoring and alerting configuration
- `ROLLBACK.md` — Rollback procedures

## AI Generation Rules

1. **Read** deployment design and user environment preferences
2. **Generate infrastructure code**:
   - Idempotent (safe to re-run)
   - Parameterized (environment-specific values are variables)
   - Follows provider best practices
3. **Generate container configuration**:
   - Multi-stage builds for minimal image size
   - Non-root user
   - Health checks included
   - Security scanning configuration
4. **Generate CI/CD pipeline**:
   - Build → Test → Security Scan → Deploy staging → Deploy production
   - Approval gates between staging and production
   - Artifact versioning
5. **Generate configuration management**:
   - Environment-specific configs (dev, staging, prod)
   - Secrets are referenced, NEVER embedded
   - Feature flag configuration
6. **Generate monitoring setup**:
   - Application metrics
   - Infrastructure metrics
   - Log aggregation
   - Alerting rules for critical conditions
7. **Generate operational documentation**:
   - Startup/shutdown procedures
   - Common troubleshooting scenarios
   - Scaling procedures
   - Backup/restore procedures

## Quality Gate: QG7

Before proceeding to Test Execution (Phase 90), verify:
- [ ] Deployment scripts execute successfully in staging
- [ ] All environment configurations are complete
- [ ] Secrets are properly managed (no plaintext secrets)
- [ ] Monitoring is configured and receiving data
- [ ] Rollback procedure is documented and tested
- [ ] CI/CD pipeline runs end-to-end
- [ ] Human has approved

## Directory Structure

```
80-deployment/
├── PHASE_GUIDE.md
├── USER_INPUT.md
├── DEPLOYMENT_GUIDE.md
├── RUNBOOK.md
├── ROLLBACK.md
├── infrastructure/
│   ├── main.tf (or equivalent)
│   ├── variables.tf
│   └── outputs.tf
├── docker/
│   ├── Dockerfile
│   └── docker-compose.yml
├── ci-cd/
│   └── pipeline.yml
├── config/
│   ├── dev.env
│   ├── staging.env
│   └── prod.env
└── monitoring/
    ├── alerts.yml
    └── dashboards.json
```

## Deployment Checklist Template

```markdown
# Deployment Checklist — [Version] — [Date]

## Pre-Deployment
- [ ] All tests pass in CI
- [ ] Security scan clear
- [ ] Database migration tested
- [ ] Rollback plan reviewed
- [ ] Stakeholders notified

## Deployment Steps
- [ ] Deploy infrastructure changes
- [ ] Run database migrations
- [ ] Deploy application
- [ ] Verify health checks
- [ ] Run smoke tests

## Post-Deployment
- [ ] Monitor error rates (15 min)
- [ ] Verify key user flows
- [ ] Check performance metrics
- [ ] Update status page
- [ ] Notify stakeholders of completion
```
