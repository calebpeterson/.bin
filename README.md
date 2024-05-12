# .bin

A collection of CLI scripts for my daily workflows.

## Prerequisites

`zx` and `choose-gui` must be installed globally

```
brew install zx ; brew install choose-gui
```

## Setup

Include in `PATH` (in `~/.zshrc` etc...)

```
export PATH="${PATH}:${HOME}/.bin"
```

## Scripts

- `co` - checkout/create `git` branches
- `note` - open/create note in `~/Workspace/notes`
- `get-branch-title` - copy the latest commit message to the clipboard
