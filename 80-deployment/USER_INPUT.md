# 🚀 Deployment — USER INPUT

> **Instructions**: Provide target environment details.
> The AI will generate deployment scripts, configurations, and runbooks.

---

## Target Environment

### Production
```
Platform: (e.g., AWS, Azure, GCP, On-Prem, Docker)
Region/Location: 
OS: 
Runtime: (e.g., Node 20, Python 3.11, JDK 21)
```

### Staging (if different from production)
```
Platform: 
Differences from production: 
```

### Development
```
Platform: 
Local setup requirements: 
```

## Infrastructure Requirements

| Resource | Specification | Quantity |
|----------|--------------|----------|
| Compute (CPU/RAM) | | |
| Storage | | |
| Database instance | | |
| Load balancer | | |
| CDN | | |
| Message queue | | |

## Networking

```
Domain name: 
SSL/TLS certificate: 
Firewall rules: 
VPN required: YES / NO
```

## Configuration Management

```
Config method: (env vars / config files / secrets manager)
Secrets storage: 
Feature flags: YES / NO
```

## CI/CD Pipeline

```
CI/CD tool: (e.g., GitHub Actions, GitLab CI, Jenkins)
Build triggers: 
Deployment strategy: (Blue/Green, Rolling, Canary)
Rollback strategy: 
```

## Monitoring & Observability

```
Logging platform: 
Metrics platform: 
Alerting: 
Health check endpoint: 
```

## Access & Permissions

| Role | Access Level | Purpose |
|------|-------------|---------|
| | | |
| | | |

---

## ✅ Checklist Before Proceeding

- [ ] Target environment is specified
- [ ] Infrastructure requirements are clear
- [ ] CI/CD approach is defined
- [ ] Monitoring needs are documented

> **Next Step**: The AI will generate deployment artifacts in `80-deployment/`
