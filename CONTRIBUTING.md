# Contributing Guidelines - Git Flow Workflow

This project uses **Git Flow** branching model for organized development and releases.

## Branch Structure

### Main Branches

- **`main`** - Production-ready code. Only accepts merges from `release` and `hotfix` branches.
  - Each commit on `main` should be tagged with a version number (e.g., `v1.0.0`)
  - Always stable and deployable

- **`develop`** - Integration branch for features. Base branch for feature development.
  - Contains the latest development changes
  - Should be reasonably stable

### Supporting Branches

#### Feature Branches (`feature/*`)
Create feature branches from `develop` when working on new features.

```bash
git checkout develop
git pull origin develop
git checkout -b feature/feature-name

# After completing the feature:
git push origin feature/feature-name
# Create a Pull Request from feature/feature-name to develop
```

**Naming conventions:**
- `feature/user-authentication`
- `feature/product-listing`
- `feature/dashboard-redesign`

#### Release Branches (`release/*`)
Create release branches from `develop` when preparing for production release.

```bash
git checkout develop
git pull origin develop
git checkout -b release/1.0.0

# Only bug fixes, documentation updates, and version bumps allowed
# After release is ready:
git push origin release/1.0.0
# Create Pull Request to main for final review
# After merging to main, merge back to develop
```

**Naming conventions:**
- `release/1.0.0`
- `release/2.1.0`

#### Hotfix Branches (`hotfix/*`)
Create hotfix branches from `main` for critical production fixes.

```bash
git checkout main
git pull origin main
git checkout -b hotfix/critical-bug-fix

# After fixing:
git push origin hotfix/critical-bug-fix
# Create Pull Request to main for review
# After merging to main, merge back to develop
```

**Naming conventions:**
- `hotfix/security-patch`
- `hotfix/critical-bug`

## Workflow Example

### Starting a Feature
```bash
# Switch to develop and get latest
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/new-feature

# Make your changes and commits
git add .
git commit -m "Add new feature"

# Push to remote
git push origin feature/new-feature
```

### Creating a Pull Request
1. Push your branch to GitHub
2. Go to the repository on GitHub
3. Click "New Pull Request"
4. Select your feature branch as the source and `develop` as the target
5. Add a descriptive title and description
6. Request review from team members
7. Once approved, merge and delete the branch

### Completing Development and Releasing
```bash
# Create release branch
git checkout -b release/1.0.0 develop
# Update version numbers in code
git commit -am "Bump version to 1.0.0"
git push origin release/1.0.0

# Create PR to main, get approval
# Merge to main and tag
git checkout main
git pull origin main
git merge --no-ff release/1.0.0
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin main
git push origin v1.0.0

# Merge back to develop
git checkout develop
git pull origin develop
git merge --no-ff release/1.0.0
git push origin develop

# Delete release branch
git push origin :release/1.0.0
git branch -d release/1.0.0
```

### Emergency Hotfix
```bash
# Create hotfix from main
git checkout -b hotfix/critical-issue main

# Fix the issue and test
git commit -am "Fix critical issue"
git push origin hotfix/critical-issue

# Merge to main with a tag
git checkout main
git merge --no-ff hotfix/critical-issue
git tag -a v1.0.1 -m "Hotfix release 1.0.1"
git push origin main
git push origin v1.0.1

# Merge back to develop
git checkout develop
git merge --no-ff hotfix/critical-issue
git push origin develop

# Delete hotfix branch
git push origin :hotfix/critical-issue
git branch -d hotfix/critical-issue
```

## Commit Message Guidelines

Use clear, descriptive commit messages:

```
<type>: <subject>

<body>

<footer>
```

### Types
- `feat:` - A new feature
- `fix:` - A bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, semicolons, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Build process, dependencies, tooling

### Examples
```
feat: Add user authentication with JWT
fix: Resolve product listing pagination bug
docs: Update API documentation
refactor: Simplify user service logic
```

## Branch Protection Rules

The following branch protection rules should be configured on GitHub:

### `main` Branch
- Require pull request reviews before merging (1 approval minimum)
- Require status checks to pass (tests, linting)
- Require branches to be up to date before merging
- Dismiss stale pull request approvals when new commits are pushed
- Require code owner reviews (if applicable)

### `develop` Branch
- Require pull request reviews before merging (1 approval minimum)
- Require status checks to pass
- Require branches to be up to date before merging

## Quick Reference

| Branch | Purpose | Created From | Merges To |
|--------|---------|--------------|-----------|
| `main` | Production | N/A | N/A |
| `develop` | Integration | N/A | N/A |
| `feature/*` | New features | `develop` | `develop` |
| `release/*` | Release prep | `develop` | `main` & `develop` |
| `hotfix/*` | Production fixes | `main` | `main` & `develop` |

## Help & Questions

If you have questions about the workflow, please:
1. Check the [Atlassian Git Flow Guide](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
2. Ask in the team communication channel
3. Reach out to the project maintainers

Happy coding! 🚀
