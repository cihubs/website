# OPSX Propose

Create a new OpenSpec change by proposing the initial idea and context.

## Usage

Invoke this skill when you want to start a new OpenSpec change. It will:
1. Create a new change directory in `.openspec/changes/`
2. Generate a proposal document
3. Set up the change metadata

## Input

Provide a brief description of the change you want to propose.

## Output

- Creates `.openspec/changes/YYYY-MM-DD-[slug]/` directory
- Generates `proposal.md` with change context
- Sets up `.openspec.yaml` metadata file
