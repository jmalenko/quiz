# Governance — Implementation

## Directory Organization

Source code lives under `/containers` at the project root. Each C4 container (from process 04 Architecture Definition) maps to a subdirectory.

The `generated/` folder in this process contains a **README reference** (not a symlink) pointing to these directories.

## Code Generation Approach

The API layer (controller interfaces + DTOs) is generated from the **OpenAPI spec** produced in process 05 Design Definition.

AI generates:
- Controller interfaces + DTOs (from OpenAPI spec)
- Service and repository layers (business logic + data access)
- UI components (from detailed design docs)
- Build configuration
- Dockerfiles (per container, for packaging)

docker-compose belongs in process 08 Integration (first process that needs it). Production deployment configuration belongs in process 10 Transition.

## Build Tools and Coding Standards

Build tools and coding standards are defined per container in the High Level document, based on ADRs from process 04 Architecture Definition.

## Unit Tests

Unit tests are **created** in this process, alongside the code they test.

They are **executed** continuously during this process (on every build) as part of the implementation quality gate, and re-executed formally in process 09 Verification as evidence.

## High Level Format

Human provides:
- Container list with directories
- Per container:
  - Build tool
  - Framework and libraries (major versions)
  - Coding standards
  - Dockerfile strategy

## Detailed Format

AI expands the High Level into:
- Minor versions for frameworks and libraries (when needed for compatibility)
- File-by-file implementation plan
- Class/component specifications with dependencies (C4 Level 3 components within each container)
- Build configuration details
- Dockerfile specifications

## Generated Artifacts

The generated layer produces the actual source code, build files, and unit test code.
