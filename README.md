# Noctis Bank

A demo personal-banking dashboard built with **TanStack Start**, **React 19**, **Tailwind v4**, and **shadcn/ui**. Everything runs client-side against `localStorage` — no backend required.

## What it does

- **Customisable dashboard** — drag, reorder, resize (square / wide / tall / xl) and remove widgets. Save and switch between named layouts. Share layouts with friends via QR code or import via your camera.
- **17 widgets** — subscription manager, recurring payments, saving goals, FDs/RDs, expense sharing, cash-flow split, investment guide, money calendar, passive income, financial limit, currency exchange, spending manager, child expense tracker, insurance coverage, common contacts, **Star Points**, **CO₂ footprint**.
- **Star Points (SP)** rewards system — earn from steps (10 SP / 1k steps), monthly tiered sustainability quests, and charity donations (which also unlock equippable badges).
- **Theme system** with 5 tabs:
  - **Default** — 6 base palettes (Aurora, Midnight, Sunset, Forest, Mono, Ocean).
  - **Animations** — overlay holiday animations (snow, eggs, midsummer flowers).
  - **Holiday** — full holiday themes with matching colors + background art.
  - **Seasonal** — spring/summer/autumn/winter themes (free in-window, paid otherwise).
  - **Custom** — upload your own background (paid in SP).
- **Dione assistant** — scripted chatbot with intent parsing for free-text input (capped at 100 words). Handles theme switches, animations, edit mode, layout saving, appointment booking, and explanations.
- **Personalised offers** based on the active widget set.

## Project structure

```
src/
├── routes/                    # TanStack file-based routes
│   ├── __root.tsx             # Root layout + theme bootstrap
│   ├── index.tsx              # Dashboard entry (onboarding ↔ dashboard)
│   ├── lunar.tsx              # Star Points hub (balance, steps, quests, charities, badges)
│   ├── profile.tsx            # User info + saved layouts + QR share / scan
│   └── offers.tsx             # Personalised promotional offers
│
├── components/banking/
│   ├── Dashboard.tsx          # Main dashboard: header, widget grid, edit mode
│   ├── SortableWidget.tsx     # Drag-and-drop wrapper + per-widget shape controls
│   ├── WidgetCard.tsx         # Card chrome + mock content for each widget id
│   ├── AddWidgetDialog.tsx    # Add new widgets modal
│   ├── SaveLayoutDialog.tsx   # Name & save current layout
│   ├── ThemePicker.tsx        # 5-tab theme switcher (default/animations/holiday/seasonal/custom)
│   ├── ThemeBackground.tsx    # Full-screen image backdrop + animated overlays
│   ├── DioneAssistant.tsx     # Floating chatbot with scripted intent parser
│   ├── SeasonalPopup.tsx      # Toast-style "new season/holiday available" prompt
│   ├── QrScannerDialog.tsx    # Camera-based QR import (html5-qrcode)
│   └── Chatbot.tsx            # Legacy onboarding chat
│
└── lib/banking/
    ├── types.ts               # All shared TypeScript types
    ├── widgets.ts             # WIDGET_CATALOG + persona-based recommender
    ├── storage.ts             # localStorage CRUD: state, layouts, profile, encode/decode
    ├── themes.ts              # Theme metadata, holiday/seasonal mapping, costs
    ├── seasons.ts             # Date math for active holidays/seasons (incl. Easter algo)
    ├── lunar.ts               # Star Points: quests, charities, points, custom themes
    ├── co2.ts                 # CO₂ widget mock estimator (kg CO₂e per £)
    └── offers.ts              # Personalised offer catalog
```

## Key design decisions

- **No backend** — every piece of state lives in `localStorage` under `banking-state-v1` (with `banking-theme-v1` and `banking-holiday-v1` for theme prefs). `loadState()` merges in defaults so older saves keep working when new fields are added.
- **Themes** apply via `[data-theme="..."]` on `<html>`, which switches the OKLCH design tokens defined in `src/styles.css`. Holiday animation overlays are a separate, additive layer.
- **Layouts encode to URL-safe base64** so they can be shared as QR codes and imported with the device camera.
- **Star Points** are a pure-function reward layer — every helper in `lunar.ts` returns a new state object so React state and `localStorage` stay in sync.
- **CO₂ widget** uses transparent `kg CO₂e per £` factors per spend category — illustrative, not for compliance.

## Running

```bash
bun install
bun dev
```

To wipe local state, click the logout icon in the dashboard header (resets onboarding) or clear `localStorage` for the origin.
