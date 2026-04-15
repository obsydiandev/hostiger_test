# Moja Strona Next.js – Hostinger

Dynamyczna aplikacja Next.js z renderowaniem po stronie serwera (SSR/ISR), gotowa do wdrożenia na [Hostinger](https://hostinger.com).

## Funkcje

- **Strona główna** – lista postów pobierana server-side z zewnętrznego API (ISR, rewalidacja co 60 s)
- **Strona postu** (`/posts/[id]`) – dynamiczny routing, treść posta + komentarze
- **Tailwind CSS** – responsywny, ciemny/jasny motyw
- **Custom server** (`server.js`) – odczytuje `PORT` z env, wymagany przez Hostinger Node.js

## Uruchomienie lokalnie

```bash
npm install
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000).

## Wdrożenie na Hostinger (Node.js hosting)

1. **Zbuduj aplikację:**
   ```bash
   npm run build
   ```

2. **Prześlij pliki** na serwer (przez Git lub menedżer plików Hostinger):
   - `server.js`
   - `package.json` / `package-lock.json`
   - katalog `.next/`
   - `public/`
   - `next.config.ts`

3. **Zainstaluj zależności** na serwerze:
   ```bash
   npm install --omit=dev
   ```

4. **Ustaw punkt wejścia** w panelu Hostinger na `server.js`.

5. **Uruchom:**
   ```bash
   npm start
   # lub bezpośrednio:
   node server.js
   ```

   Hostinger automatycznie ustawia zmienną środowiskową `PORT`. Aplikacja uruchomi się na właściwym porcie.

## Zmienne środowiskowe

| Zmienna | Opis | Domyślnie |
|---------|------|-----------|
| `PORT` | Port serwera HTTP | `3000` |
| `NODE_ENV` | Środowisko (`production` / `development`) | `development` |

## Struktura projektu

```
├── server.js            # Własny serwer HTTP dla Hostinger
├── src/app/
│   ├── page.tsx         # Strona główna (lista postów – SSR/ISR)
│   └── posts/[id]/
│       └── page.tsx     # Dynamiczna strona posta
└── next.config.ts
```
