# Push This Project to GitHub

This guide covers the initial setup and the usual workflow for pushing this
project to GitHub.

## Initial setup

Open PowerShell and change to the project directory:

```powershell
Set-Location 'C:\Java with playwright\playwright-bdd-framework'
```

The project has a `.gitignore` that excludes dependencies and generated output:

```gitignore
node_modules/
target/
java/target/
reports/
java/reports/
screenshots/
```

Initialize Git and use `main` as the branch name:

```powershell
git init
git branch -M main
```

Connect the project to the GitHub repository:

```powershell
git remote add origin https://github.com/erashishnaik/PlaywrightFramework.git
```

If a remote named `origin` already exists, update it instead:

```powershell
git remote set-url origin https://github.com/erashishnaik/PlaywrightFramework.git
```

Check the remote:

```powershell
git remote -v
```

Stage the project files. If you need to replace an existing staging list, this
command removes files from Git's index only; it does not delete them from disk.
Then stage again, allowing `.gitignore` to exclude generated files:

```powershell
git rm -r --cached --ignore-unmatch .
git add .
```

Review the staged files before committing:

```powershell
git status --short
git diff --cached --stat
```

Make sure generated output, credentials, and other secrets are not staged.

If Git has no author identity configured, set one for this repository:

```powershell
git config user.name "Your Name"
git config user.email "your-email@example.com"
```

Create a commit:

```powershell
git commit -m "Add Java Playwright BDD framework"
```

Sign in to GitHub through VS Code or Git Credential Manager, then push:

```powershell
git push -u origin main
```

The `-u` option sets `origin/main` as the upstream branch. Future pushes can
usually use `git push`.

Verify the result:

```powershell
git status --short --branch
git log -1 --oneline
```

## Pushing later changes

After changing files, use this regular workflow:

```powershell
git status
git add .
git status
git commit -m "Describe your change"
git push
```

Review the second `git status` output before committing so you don't include
generated files or secrets.

## Working with branches

Check which branch is currently checked out:

```powershell
git branch --show-current
```

You can also see the current branch and working-tree state with:

```powershell
git status
```

Create a new branch from the latest `origin/main`:

```powershell
git status
git fetch origin
git switch -c feature/my-new-work origin/main
```

Replace `feature/my-new-work` with your chosen branch name. Check `git status`
first and commit or save any uncommitted changes before switching branches.

Rename the branch you are currently on:

```powershell
git branch -m feature/new-name
```

Push the current branch to GitHub and set its upstream:

```powershell
git push -u origin HEAD
```

`HEAD` means the currently checked-out branch. This publishes that branch under
the same name on GitHub; it does **not** merge it into `main`. For example,
pushing `feature/my-new-work` creates or updates the GitHub branch with that
name, while `main` remains a separate branch.

To merge the branch into `main`, open a pull request on GitHub from your
feature branch to `main`, review it, and merge it there. After a successful
first push, later updates to that branch can usually be pushed with:

```powershell
git push
```

If you renamed a branch that was already pushed, push the new branch first:

```powershell
git push -u origin feature/new-name
```

The old branch still exists on GitHub until you explicitly delete it. Only
after confirming the new branch is published and the old one is no longer
needed, delete the old remote branch with:

```powershell
git push origin --delete old-branch-name
```
