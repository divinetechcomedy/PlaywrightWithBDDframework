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
