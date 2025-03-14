# .bin

A collection of CLI scripts for my daily workflows.

## Prerequisites

`zx` and `choose-gui` must be installed globally.

```
brew install zx ; brew install choose-gui
```

`bun` must be [installed globally](https://bun.sh/).

## Setup

Include in `PATH` (in `~/.zshrc` etc...)

```
export PATH="${PATH}:${HOME}/.bin"
```

## Scripts

- `ai` - chat with LLMs
- `co` - checkout/create `git` branches
- `note` - open/create note in `~/Workspace/notes`
- `get-branch-title` - copy the latest commit message to the clipboard
- `verify-env` - check if all tools are present where expected
