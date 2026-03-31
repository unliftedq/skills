# Agent Skills

A collection of skills for AI coding agents. Skills are packaged instructions, references, scripts, and templates that extend agent capabilities.

This repository is designed to host multiple skills. At the moment it includes one published skill, with room for additional skills over time.

Skills follow the [Agent Skills](https://agentskills.io/) format.

## Available Skills

### logo-creator

Creates production-ready logo systems and export-ready brand assets from briefs, references, or existing SVG sources.

See `skills/logo-creator/SKILL.md` for the full workflow and usage details.

## Installation

```bash
npx skills add nodew/skills
```

## Usage

Skills are automatically available once installed. The agent should activate the matching skill when a task falls within that skill's scope.

**Examples:**
```text
Create a logo system for a developer tool called QuillStack.
```

## Repository Structure

Each skill may contain:
- `SKILL.md` - the primary skill definition
- `references/` - supporting documentation loaded on demand
- `scripts/` - helper scripts for automation
- `templates/` - starter files and presets when needed

The repository can also include:
- `examples/` - example prompts and example outputs for individual skills

Current structure:

## License

MIT
