# Booking E2E — Playwright + TypeScript

Szkielet frameworka UI/API dla przykładowego procesu rezerwacji wizyty. Projekt jest ilustracją architektury — **nie jest skonfigurowany pod konkretną aplikację, adres, konto ani API**. Adresy, selektory, endpointy i dane są przykładowe i wymagają dopasowania do aplikacji, którą framework będzie testował.

## 1. Zakres

- UI: logowanie klienta.
- UI: wyszukanie specjalisty, wybór terminu i przejście do podsumowania.
- API: opcjonalny przykład utworzenia rezerwacji.
- Page Object Model, Fixtures, dane testowe i warstwa API.

## 2. Struktura i jej odpowiedzialności

```text
booking-e2e/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── src/
│   ├── api/
│   │   └── BookingApi.ts
│   ├── fixtures/
│   │   └── base.ts
│   ├── pages/
│   │   ├── LoginPage.ts
│   │   ├── HomePage.ts
│   │   ├── SpecialistSearchPage.ts
│   │   ├── SpecialistDetailsPage.ts
│   │   ├── BookingSummaryPage.ts
│   │   └── BookingsPage.ts
│   └── test-data/
│       ├── users.ts
│       └── search.ts
├── tests/
│   ├── ui/
│   │   ├── login.spec.ts
│   │   └── booking.spec.ts
│   └── api/
│       └── booking.api.spec.ts
├── .env.example
├── .gitignore
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

### Tests (`tests/`)

Opisują scenariusze i zawierają asercje. Sekwencja działań w krótkim scenariuszu jest zapisana bezpośrednio w teście, dzięki czemu jego przebieg jest czytelny bez przeskakiwania do dodatkowej warstwy orkiestrującej.

### Fixtures (`src/fixtures/base.ts`)

Fixture `pages` tworzy Page Objecty na podstawie tego samego obiektu `page`. Fixture `authenticatedUser` przygotowuje zalogowaną sesję dla testów, które jej wymagają: wykonuje logowanie przez `LoginPage` i sprawdza nagłówek strony startowej. Fixture `bookingApi` udostępnia testom klienta API.

Fixtures Playwrighta są leniwe: uruchamiane są tylko te, których dany test potrzebuje, wraz z ich zależnościami. Każdy test otrzymuje własny kontekst przeglądarki i własny `page`.

### Pages / POM (`src/pages/`)

Każda klasa odpowiada stronie lub ekranowi. Przechowuje locatory i metody bezpośredniej interakcji z UI. Page Object nie powinien zawierać asercji dotyczących wyniku całego scenariusza.

### Test Data (`src/test-data/`)

`users.ts` zawiera obiekt `user`, którego login i hasło są pobierane ze zmiennych środowiskowych. `search.ts` przechowuje przykładowe kryteria wyszukiwania. Wartości są demonstracyjne i należy je zmienić zgodnie z testowaną aplikacją.

### API (`src/api/`)

`BookingApi` opakowuje przykładowe żądanie HTTP i nagłówek autoryzacji. Klient nie zawiera asercji — test sprawdza status i treść odpowiedzi.

## 3. Instalacja i konfiguracja lokalna

Wymagania: Node.js 20 lub nowszy.

```bash
npm install
npx playwright install
cp .env.example .env
```

Plik `.env` jest lokalną konfiguracją użytkownika. Wpisz w nim adres i dane **własnego środowiska testowego**:

```env
BASE_URL=https://your-test-environment.example
TEST_USER_EMAIL=your-test-user-email
TEST_USER_PASSWORD=your-test-user-password

# Opcjonalne dane do przykładowego testu API
API_TOKEN=your-api-token
API_SPECIALIST_ID=your-specialist-id
API_SLOT_ID=your-slot-id
```

Wartości w `.env.example` i domyślny adres w konfiguracji są wyłącznie placeholderami, a nie działającym adresem czy prawdziwymi danymi.

## 4. Uruchamianie testów

```bash
npm test                 # wszystkie testy
npm run test:headed      # testy z widoczną przeglądarką
npm run test:ui          # Playwright UI Mode
npm run test:smoke       # testy oznaczone @smoke
npm run test:api         # tylko testy API
npm run typecheck        # kontrola typów TypeScript
npm run report           # otwarcie raportu HTML
```

## 5. CI/CD — GitHub Actions

Konfiguracja pipeline'u znajduje się w `.github/workflows/playwright.yml`. GitHub Actions odczytuje ten plik z repozytorium i uruchamia zdefiniowane w nim kroki. W tym przykładzie pipeline:

1. pobiera kod repozytorium,
2. instaluje Node.js i zależności,
3. instaluje przeglądarkę Chromium,
4. wykonuje kontrolę typów TypeScript,
5. uruchamia testy Playwright,
6. zapisuje raport HTML jako artefakt, również gdy testy zakończą się błędem.

## 6. Przepływ testów

### LOG-01 — logowanie

Test otwiera umowną ścieżkę logowania, wprowadza dane testowego użytkownika i sprawdza widoczność nagłówka strony startowej.

### BK-UI-01 — wybór terminu

Fixture `authenticatedUser` loguje klienta przed testem. Następnie test przechodzi do wyszukiwarki, wpisuje przykładową specjalizację i miasto, otwiera pierwszy wynik, wybiera pierwszy dostępny termin i przechodzi do podsumowania. Test sprawdza widoczność danych podsumowania. Nie finalizuje płatności.

### API-BOOK-01 — utworzenie rezerwacji

Test korzysta z `bookingApi`, wysyła `POST /api/bookings` i sprawdza status `201` oraz podstawowe pola odpowiedzi. Endpoint, autoryzacja i payload są fikcyjnym przykładem do dopasowania do rzeczywistego API.
