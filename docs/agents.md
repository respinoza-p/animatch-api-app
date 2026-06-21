# Agent Orchestration

The Croqueton workspace integrates an advanced **multi-agent assistant layout** to coordinate tasks across developers.

## Agent Team Directory
* **Coordinator (`coordinator`):** Orchestrates tasks, splits user goals into instructions, and schedules work items.
* **DevSecOps Specialist (`devsecops`):** Maintains docker, env parameters, and audits dependencies for vulnerabilities.
* **Frontend Specialist (`frontend`):** Focuses on styling aesthetics, layout responsiveness, and CSS structure.
* **Backend Specialist (`backend`):** Focuses on controllers, routing pipelines, and application logic.
* **Node Specialist (`node`):** Optimizes async runtime performance and coordinates package updates.
* **Angular Specialist (`angular`):** Implements modules, components, services, and spec tests.
* **GitHub Specialist (`github`):** Guides commits, branches, PR descriptions, and repository actions.
* **MongoDB Specialist (`mongodb`):** Optimizes indexes, designs schemas, and scripts database migrations.

---

## 🤝 Collaborative Protocols
1. **Persona Boundaries:** Each agent executes actions mapped solely to their domain expertise.
2. **On-Demand Skills:** Skills are loaded progressively from `.agents/skills/` to prevent token bloat.
