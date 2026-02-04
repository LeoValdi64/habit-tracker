# CLAUDE.md — Instrucciones para Claude Code

## Stack
- Next.js 15 con App Router
- TypeScript
- Tailwind CSS v4
- shadcn/ui (si instalado)

## Comandos
- `npm run dev -- --turbopack` — Desarrollo (IMPORTANTE: usar --turbopack para Tailwind v4)
- `npm run build` — Build de producción
- `npm run lint` — Linting

## Convenciones
- Componentes en `src/components/`
- Páginas en `src/app/`
- Utilidades en `src/lib/`
- Tipos en `src/types/`

## Tailwind v4
- El CSS usa `@import "tailwindcss"` — NO `@tailwind` directives
- Requiere `--turbopack` flag en desarrollo

## Notas
- Este proyecto fue scaffoldeado por Gaspi 🦝
- Ver `~/.openclaw/workspace/projects_src/<nombre>/` para assets y notas
