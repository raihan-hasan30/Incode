#!/bin/bash

# Usage: ./update-commit-date.sh <commit-hash> <new-date>
# Example: ./update-commit-date.sh a1b2c3d4 "2023-06-01T10:00:00"

set -e

COMMIT_HASH=$1
NEW_DATE=$2

if [[ -z "$COMMIT_HASH" || -z "$NEW_DATE" ]]; then
  echo "Usage: $0 <commit-hash> <new-date>"
  echo "Example: $0 a1b2c3d4 \"2023-06-01T10:00:00\""
  exit 1
fi

# Confirm Git is available
if ! command -v git &> /dev/null; then
  echo "❌ Git is not installed or not in PATH"
  exit 1
fi

# Confirm the commit exists
if ! git cat-file -e "$COMMIT_HASH"^{commit} 2>/dev/null; then
  echo "❌ Commit $COMMIT_HASH does not exist"
  exit 1
fi

# Start rebase from root, filter target commit
git rebase -i --root

# At the editor, replace `pick` with `edit` for the commit hash you want to change
# After rebase pauses, run this:

echo "🔄 Updating commit date for $COMMIT_HASH to $NEW_DATE"

GIT_COMMITTER_DATE="$NEW_DATE" git commit --amend --no-edit --date "$NEW_DATE"

# Continue the rebase
git rebase --continue

echo "✅ Commit date updated!"
