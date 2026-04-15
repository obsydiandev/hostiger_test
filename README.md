# Moja Strona Next.js – Hostinger

Dynamyczna aplikacja Next.js z renderowaniem po stronie serwera (SSR), gotowa do wdrożenia na [Hostinger](https://hostinger.com).

## Funkcje

- **Strona główna** – lista postów pobierana server-side z zewnętrznego API
- **Strona postu** (`/posts/[id]`) – dynamiczny routing, treść posta + komentarze
- **Tailwind CSS** – responsywny, ciemny/jasny motyw

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
   - `package.json` / `package-lock.json`
   - katalog `.next/`
   - `public/`
   - `next.config.ts`

3. **Zainstaluj zależności** na serwerze:
   ```bash
   npm install --omit=dev
   ```

4. **Uruchom** – Hostinger automatycznie ustawi `PORT` i uruchomi:
   ```bash
   npm start
   # co odpowiada: next start -p $PORT
   ```

## Zmienne środowiskowe

| Zmienna | Opis | Domyślnie |
|---------|------|-----------|
| `PORT` | Port serwera HTTP | `3000` |
| `NODE_ENV` | Środowisko (`production` / `development`) | `development` |

## Struktura projektu

```
├── src/app/
│   ├── page.tsx         # Strona główna (lista postów – SSR)
│   └── posts/[id]/
│       └── page.tsx     # Dynamiczna strona posta
└── next.config.ts
```
