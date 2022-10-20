# fresh project

## Usage

Start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.

## deno deploy

https://fresh-board.deno.dev

## install

```bash
deno install --import-map=./Documents/github/fresh-board/import_map.json \
    --allow-run --allow-env --allow-net --allow-read --allow-write -n fresh-board \
    ~/Documents/github/fresh-board/main.ts
```
