# Git Workflow

## Branching Strategy
- `main`: Production-ready code.
- `dev`: Active integration branch.
- Feature branches: Created from `dev`, named by contributor/feature (e.g., `feat/auth`, `feat/swipe-cart`, `fix/cart-stock`).

## Issue Assignment
- Use GitHub Issues to track the tasks from `TEAM_TASKS.md`.
- No code is written without an assigned issue.

## Pull Request Process
1. Push feature branch to GitHub.
2. Open a Pull Request against the `dev` branch.
3. Link the PR to the relevant issue.
4. Require at least one review from another teammate.
5. Merge into `dev` using "Squash and Merge" for a clean history.

## Integration Order & Conflict Avoidance
- Contributor 1 (Auth) merges first, as it blocks protected routes.
- Contributor 2 (Backend Core) merges API endpoints.
- Contributors 3 & 4 (Frontend) mock API responses locally until backend PRs are merged to avoid blocking.
- Avoid conflicts by strictly adhering to the file ownership rules in `TEAM_TASKS.md`. Shared files should be updated carefully with communication.
