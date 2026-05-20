# Governance — Design Definition

## Methodology

This process follows **IEEE 1016:2009 — Software Design Descriptions** and uses the **C4 Model Levels 3–4** for notation.

## Design Pattern

**Layered architecture** (Controller → Service → Repository):
- Each layer only calls the one below
- Standard Spring Boot pattern

## High Level Format

Human provides:
- Component list per container (C4 Level 3)
- Layer assignment for each component
- API contract summary (endpoints, request/response)

## Detailed Format

AI expands into:
- Component responsibilities and interactions
- Class/interface definitions (C4 Level 4)
- API specification (endpoints, DTOs, status codes)
- Data model (YAML schema for questions file)
