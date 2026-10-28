# EasyTeamManager

Zaawansowana aplikacja do zarządzania projektami i zadaniami, zbudowana w architekturze **Feature-Sliced Design (FSD)** z wykorzystaniem **Laravel 11**, **Inertia.js**, **React**, **TypeScript**, **Tailwind CSS** oraz **Storybook**.

---

## 1. Wymagania środowiskowe i instrukcja uruchomienia

### Wymagania wstępne
* **PHP** >= 8.2
* **Composer**
* **Node.js** (rekomendowana wersja LTS) oraz **npm** (lub pnpm/yarn)
* **SQLite** (lub MySQL / PostgreSQL)

### Instrukcja uruchomienia krok po kroku
1. Sklonuj repozytorium i przejdź do katalogu projektu: `git clone https://github.com/borkrit/easyTeamManager.git` i `cd EasyTeamManager`
2. Zainstaluj zależności backendowe (PHP): `composer install`
3. Zainstaluj zależności frontendowe (Node.js): `npm install`
4. Skonfiguruj środowisko i klucz: `cp .env.example .env` oraz `php artisan key:generate`
5. Skonfiguruj bazę danych w `.env` (domyślnie `DB_CONNECTION=sqlite`) i utwórz plik bazy: `touch database/database.sqlite`
6. Uruchom migracje bazy danych (opcjonalnie z seedami): `php artisan migrate --seed`
7. Uruchom serwer deweloperski (w dwóch terminalach): `php artisan serve` oraz `npm run dev` (aplikacja dostępna pod `http://127.0.0.1:8000`).

---

## 2. Instrukcja uruchomienia testów i Storybooka

* **Storybook (Dokumentacja i izolowane komponenty UI):** Uruchom poleceniem `npm run storybook` (dostępny pod `http://localhost:6006`).
* **Testy automatyczne (Backend / Pest / PHPUnit):** `php artisan test`
* **Testy jednostkowe / komponentów (Vitest / Testing Library):** `npm run test`

---

## 3. Opis przyjętej struktury i jej zasad (Feature-Sliced Design)

Projekt zorganizowany jest w oparciu o architekturę **Feature-Sliced Design (FSD)**, która dzieli frontend na horyzontalne warstwy i wertykalne domeny biznesowe (`resources/js/`):

1. **`app/`** — Inicjalizacja aplikacji (globalne style, providerzy, konfiguracja Inertia).
2. **`pages/`** — Gotowe strony ekranowe powiązane z routigniem Laravel/Inertia (np. `Tasks/Show.tsx`, `Projects/Show.tsx`).
3. **`widgets/`** — Samodzielne, złożone bloki interfejsu łączące kilka funkcji (np. sekcja komentarzy `Comments`, modale edycji `CreateTaskModal`).
4. **`shared/`** — Komponenty wielorazowego użytku niezależne od biznesu (UI kit, przyciski, `Badge`, `BackButton`, utilsy).

### Reguły między warstwami
* **Zasada jednokierunkowego przepływu:** Warstwy mogą importować kod *tylko* z warstw znajdujących się niżej w hierarchii (`pages` -> `widgets`  -> `shared`).
* **Zakaz cyrkularnych zależności:** Elementy z warstwy niższej nie mogą importować niczego z warstw wyższych.
* **Isolacja:** Komponenty w `shared` nie wiedzą nic o domenie aplikacji — są uniwersalne i parametryzowane przez propsy.

---

## 4. Podejście do organizacji kodu i powód wyboru

* **Skalowalność i przewidywalność:** FSD precyzyjnie definiuje strukturę plików, eliminując problem "bałaganu" w miarę wzrostu aplikacji.
* **Inertia.js + Spatie Data:** Zapewnia silne typowanie DTO przekazywanych z backendu Laravel bezpośrednio do komponentów React.
* **CVA (Class Variance Authority):** Stylowanie komponentów w `shared/ui` oparte o CVA i Tailwind CSS zapewnia deklaratywne i bezpieczne typowo warianty stylów.

---

## 5. Strategia testów

1. **Testy jednostkowe (Unit Tests):** Testowanie logiki modeli Laravel oraz poprawne mapowanie danych w DTO (`TaskData`, `ProjectData`).
2. **Testy integracyjne / funkcyjne (Feature Tests):** Weryfikacja kontrolerów (`TaskController`, `ProjectController`), relacji bazodanowych (`morphMany`), autoryzacji i odpowiedzi endpointów Inertia.
3. **Weryfikacja UI (Storybook):** Izolowane testy komponentów interfejsu z warstwy `shared` oraz `widgets` w różnych stanach (warianty CVA, rozmiary, stany ładowania).