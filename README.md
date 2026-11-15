# EasyTeamManager

Aplikacja do zarządzania projektami i zadaniami zespołu: projekty, zadania (filtrowanie, stronicowanie, akcje zbiorcze), członkowie zespołu i komentarze do zadań oraz projektów.

Główny nacisk położono na **organizację frontendu**, który ma przetrwać wielokrotny wzrost. Backend jest celowo prosty i służy wyłącznie do dostarczania danych przez Inertię.

**Stack:** Laravel 13 · Inertia 3 · React 19 · TypeScript (`strict`) · Tailwind CSS 4 · CVA · Storybook 10 · Vitest + Testing Library · ESLint.

---

## Spis treści

1. [Wymagania i uruchomienie](#1-wymagania-środowiskowe-i-uruchomienie)
2. [Testy, lint, typy i Storybook](#2-testy-lint-typy-i-storybook)
3. [Struktura i jej zasady](#3-struktura-i-jej-zasady)
4. [Reguły między obszarami](#4-reguły-między-obszarami)
5. [Podejście do organizacji kodu i powód wyboru](#5-podejście-do-organizacji-kodu-i-powód-wyboru)
6. [Strategia testów](#6-strategia-testów)
7. [Jak dodać nowy element (checklista)](#7-jak-dodać-nowy-element-checklista)
8. [Znane ograniczenia](#8-znane-ograniczenia)

---

## 1. Wymagania środowiskowe i uruchomienie

### Wymagania

| Narzędzie | Wersja |
|---|---|
| PHP | ^8.3 (zgodnie z `composer.json`) |
| Composer | 2.x |
| Node.js | 22 LTS (minimum 20.19) |
| npm | dołączony do Node.js |
| Baza danych | SQLite (domyślnie), opcjonalnie MySQL / PostgreSQL |

### Uruchomienie krok po kroku

```bash
git clone https://github.com/borkrit/easyTeamManager.git
cd easyTeamManager            # uwaga na wielkość liter: na Linuksie to ma znaczenie

composer install
npm install

cp .env.example .env
php artisan key:generate

touch database/database.sqlite          # DB_CONNECTION=sqlite jest domyślne
php artisan migrate --seed

# w dwóch terminalach:
php artisan serve                        # http://127.0.0.1:8000
npm run dev
```

Skrót: `composer setup` wykonuje instalację zależności, kopiuje `.env`, generuje klucz, uruchamia migracje i buduje frontend.

**Logowanie:** seeder tworzy użytkownika `test@example.com` z hasłem `password123` (z `UserFactory`).

### Typy generowane z backendu

Typy frontendu pochodzą z klas `spatie/laravel-data` (`app/Data/*Data.php`) i są zapisywane do `resources/js/generated/generated.d.ts` jako globalny namespace `App.Data.*`. Po zmianie klasy Data wygeneruj je ponownie:

```bash
php artisan typescript:transform
```

Plik `generated.d.ts` jest źródłem prawdy dla kształtu danych z backendu, więc nie definiujemy ręcznie typów `User`, `Task` itp. Używamy `App.Data.UserData`, `App.Data.TaskData` itd.

---

## 2. Testy, lint, typy i Storybook

### Jedna komenda: testy frontendu + typy + lint

```bash
npm run check
```

Uruchamia po kolei (przerywa przy pierwszym błędzie):

1. `vitest run`: wszystkie testy frontendu (wynik zapisywany też do `test-results.json`),
2. `tsc --noEmit`: sprawdzenie typów (tryb `strict`),
3. `eslint .`: lint wraz z regułami granic między warstwami.

### Pojedyncze polecenia

| Cel | Polecenie |
|---|---|
| Testy frontendu (tryb watch) | `npm run test` |
| Testy frontendu (jednorazowo) | `npm run test:run` |
| Typy | `npx tsc --noEmit` |
| Lint | `npm run lint` (lub `npx eslint .`) |
| Testy backendu | `composer test` (lub `php artisan test`) |
| Storybook | `npm run storybook` → http://localhost:6006 |
| Build Storybooka | `npm run build-storybook` |
| Build aplikacji | `npm run build` |

---

## 3. Struktura i jej zasady

Katalog `resources/js/` jest podzielony na **warstwy**. Wewnątrz warstw `pages` i `widgets` każdy obszar funkcjonalny ma własny katalog (tzw. *slice*).

```
resources/js/
├── app.tsx                 # punkt startowy: createInertiaApp, resolver stron
├── app/
│   └── layouts/            # AppLayout (nakładany automatycznie na strony)
├── pages/                  # strony Inertia, po jednym katalogu na obszar
│   ├── Tasks/  Projects/  Team/  Profile/  Dashboard/  Login/
├── widgets/                # samodzielne bloki UI związane z domeną
│   ├── Tasks/  Projects/  Team/  Comments/  TaskFilters/
│   ├── Header/  Sidebar/  PageHeader/
│   └── index.ts            # publiczny punkt wejścia warstwy widgets
├── shared/                 # kod niezależny od domeny
│   ├── ui/                 # komponenty wspólne (button, input, table, ...)
│   ├── hooks/              # hooki ogólnego użytku (useApiMutation, useSelection, ...)
│   ├── config/             # stałe i konfiguracja (trasy nawigacji, enumy zadań)
│   ├── lib/                # utils (cn)
│   └── types/              # typy ogólne (HttpMethod, MutationOptions)
├── generated/              # typy generowane z backendu (nie edytować ręcznie)
└── test/                   # setup testów (jest-dom)
```

### 3.1 Rodzaje elementów i ich części

Każdy rodzaj elementu ma stały zestaw części, a każda część stałe miejsce i nazwę. Znając nazwę elementu i jego rodzaj, ścieżkę każdej części można wskazać bez szukania.

#### Komponent wspólny: `shared/ui/<nazwa>/`

| Część | Plik |
|---|---|
| Implementacja + typy propsów + warianty CVA | `<Nazwa>.tsx` |
| Publiczne API (eksporty) | `index.ts` |
| Story (API i wygląd) | `<Nazwa>.stories.tsx` |
| Testy jednostkowe | `__tests__/<Nazwa>.test.tsx` |

Przykład (`Button`):

```
shared/ui/button/
├── Button.tsx              # buttonVariants (cva) + ButtonProps + komponent
├── Button.stories.tsx
├── index.ts
└── __tests__/Button.test.tsx
```

Warianty (rozmiar, kolor, stan) definiowane są **deklaratywnie w jednym miejscu**, przez `cva` z `class-variance-authority`. Klasy łączy `cn()` (`shared/lib/utils.ts`, oparte o `tailwind-merge`), dzięki czemu `className` przekazany z zewnątrz nadpisuje wariant bez dopisywania warunków w komponencie.

#### Obszar funkcjonalny (np. zadania)

Obszar składa się z kilku miejsc, zawsze o tej samej nazwie obszaru:

| Część obszaru | Lokalizacja |
|---|---|
| Strony | `pages/<Obszar>/` |
| Formularze i komponenty obszaru | `widgets/<Obszar>/` |
| Hooki obszaru | `widgets/<Obszar>/hooks/`, `pages/<Obszar>/hooks/` |
| Typy obszaru | `widgets/<Obszar>/types/types.ts`, `pages/<Obszar>/types/types.ts` |
| Typy danych z backendu | `generated/generated.d.ts` (`App.Data.*`) |

Inne obszary korzystają z obszaru wyłącznie przez jego publiczny punkt wejścia (`@/widgets`), a nie sięgają do jego wnętrza (zob. rozdział 4).

#### Strona: `pages/<Obszar>/`

| Część | Plik |
|---|---|
| Widok (tylko składa gotowe elementy) | `Index.tsx`, `Show.tsx` (nazwa = widok Inertii) |
| Hook z logiką strony | `hooks/use<Strona>.ts` (np. `useTasksIndex.ts`) |
| Komponenty używane tylko na tej stronie | `ui/<Komponent>.tsx` |
| Typy propsów strony | `types/types.ts` |
| Testy (widok, komponenty, hook) | `__tests__/*.test.ts(x)` |

Nazwa strony Inertii odpowiada ścieżce pliku: `Inertia::render('Tasks/Index')` → `pages/Tasks/Index.tsx`. Strona nie zawiera logiki: stan i akcje (wybór wierszy, akcja zbiorcza, otwieranie modala) żyją w hooku (`useTasksIndex`), a widok tylko przekazuje je do komponentów.

#### Formularz

Formularz to zestaw trzech części, wspólny dla wszystkich obszarów:

| Część | Plik | Rola |
|---|---|---|
| Opis pól | `widgets/<Obszar>/hooks/use<Obszar>FormFields.ts` | konfiguracja pól (`FormFieldConfig[]`) |
| Logika formularza | `widgets/<Obszar>/hooks/useCreate<Obszar>Modal.ts` | dane (`useForm` z Inertii), wysyłka przez `useApiMutation`, błędy walidacji z backendu |
| Widok | `widgets/<Obszar>/Create<Obszar>Modal.tsx` | składa `ModalFormWrapper` + `FormRenderer` |
| Typy | `widgets/<Obszar>/types/types.ts` | |
| Testy | `widgets/<Obszar>/__tests__/` | komponent, hook logiki, hook pól |

Wszystkie formularze używają tych samych prymitywów z `shared/ui`: `ModalFormWrapper` (ramka, tytuł, przyciski), `FormRenderer` (renderuje pola z konfiguracji: `Label`, `Input` / `Textarea` / `Select`, `InputError`). Dzięki temu **wszystkie formularze wyglądają i działają tak samo**, a błędy walidacji z backendu (422) trafiają do pól przez `errors`.

### 3.2 Konwencje nazewnictwa

| Co | Konwencja | Przykład |
|---|---|---|
| Katalog komponentu wspólnego | `camelCase` | `shared/ui/modalFormWrapper/` |
| Katalog obszaru (pages/widgets) | `PascalCase` | `pages/Tasks/`, `widgets/Tasks/` |
| Plik komponentu | `PascalCase.tsx` | `TaskTable.tsx` |
| Hook | `useXxx.ts(x)` w `hooks/` | `useTasksIndex.ts` |
| Test | `<Nazwa>.test.ts(x)` w `__tests__/` | `__tests__/TaskTable.test.tsx` |
| Story | `<Nazwa>.stories.tsx` obok komponentu | `TaskTable.stories.tsx` |
| Typy | `types/types.ts` (lub `types.ts` w shared) | `widgets/Tasks/types/types.ts` |
| Aliasy importów | `@/` → `resources/js/` | `@/shared/ui/button` |

---

## 4. Reguły między obszarami

### 4.1 Kierunek zależności

```
app   →   pages   →   widgets   →   shared
```

* Warstwa może importować wyłącznie z warstw **poniżej**: `pages` używa `widgets` i `shared`, `widgets` używa `shared`, `shared` nie importuje niczego z aplikacji.
* **`shared` jest niezależny od domeny**: nie zna słów „zadanie” ani „projekt”. Komponenty są parametryzowane propsami.
* Obszary tej samej warstwy **nie importują się wzajemnie** (np. `widgets/Comments` nie może importować z `widgets/Tasks`). Wspólne dane przekazuje strona przez propsy.

### 4.2 Punkt wejścia

* Warstwa `widgets` udostępnia na zewnątrz wyłącznie to, co eksportuje `widgets/index.ts`. Strony importują z `@/widgets`, a nie z `@/widgets/Tasks/hooks/...`.
* Komponenty wspólne udostępniają API przez `index.ts` w swoim katalogu (`@/shared/ui/button`).

### 4.3 Jak rozwiązano przenikanie się obszarów (komentarze)

Komentarze dotyczą zarówno zadań, jak i projektów. Widżet `Comments` nie zna żadnego z tych obszarów. Dostaje listę komentarzy oraz cel (`commentableType: 'task' | 'project'`, `commentableId`) przez propsy, a strony `Tasks/Show` i `Projects/Show` go osadzają.

Zależność idzie tylko w jedną stronę: strony → `Comments`. Usunięcie `Comments` psuje tylko te dwie strony, które go jawnie importują. Żaden inny obszar nie jest dotknięty. Analogicznie lista zadań w profilu osoby korzysta z tego samego widżetu `TaskTable` co strona zadań.

### 4.4 Co trafia do `shared`

Element trafia do części wspólnej świadomie, gdy spełnia wszystkie warunki:

1. nie zawiera wiedzy domenowej,
2. ma opisane API (story) i zabezpieczone zachowanie (testy),
3. jest podstawowym klockiem (przycisk, pole, tabela, paginacja) albo jest naprawdę używany przez wiele obszarów.

To, że coś przydało się w drugim miejscu, nie wystarcza. Rozszerzenie elementu wspólnego pod potrzeby jednego obszaru robi się przez kompozycję (`children`, `className` przez `cn`, konfiguracja kolumn i pól), a nie przez warunki w komponencie.

### 4.5 Reguły wymuszane narzędziami

Reguły nie są tylko opisane, są sprawdzane przez `npm run lint` (i `npm run check`):

| Reguła | Narzędzie | Efekt |
|---|---|---|
| Kierunek warstw (`shared` ↛ `widgets`/`pages`, `widgets` ↛ `pages`) | `eslint-plugin-import-fsd` (`import-fsd/no-denied-layers`) | błąd lintu, np. „Access to layer 'widgets' from 'shared' is denied” |
| Izolacja obszarów w jednej warstwie | j.w. | błąd lintu, np. „Access to slice 'Tasks' from 'Comments' is denied” |
| Mutacje danych jednym sposobem | `no-restricted-syntax` | zakaz bezpośrednich `router.post/put/patch/delete`. Używamy `useApiMutation` i pokrewnych hooków |
| Brak `any` | `@typescript-eslint/no-explicit-any` | ostrzeżenie |
| Tryb `strict` | `tsc --noEmit` | błąd typów |

Reguły sprawdzono praktycznie: celowo dodane importy łamiące zasady kończyły się błędami lintu.

### 4.6 Spójność powtarzalnych rzeczy

| Rzecz | Jeden sposób |
|---|---|
| Pobieranie danych | wyłącznie propsy Inertii z kontrolerów (bez `fetch`/`axios`) |
| Mutacje (POST/PUT/DELETE) | `useApiMutation` (oraz `useDeleteResource` do usuwania) |
| Formularze | `ModalFormWrapper` + `FormRenderer` + hook pól + hook logiki |
| Listy | `DataTable` + hook kolumn (`use*Columns`) + `Pagination` |
| Zaznaczanie wielu wierszy | `useSelection` / `DataTable` (`selectable`) |
| Filtrowanie | widżet `TaskFilters` + hook `useTaskFilters` (`widgets/TaskFilters/hooks`) |
| Typy danych backendu | `App.Data.*` z `generated.d.ts` |

---

## 5. Podejście do organizacji kodu i powód wyboru

Strukturę oparto o **Feature-Sliced Design (FSD)**: podział na warstwy z jednokierunkowymi zależnościami i na izolowane obszary (slice'y) wewnątrz warstw.

**Dlaczego nie podział wyłącznie według rodzaju komponentu (atomy / molekuły / organizmy)?**
Taki podział odpowiada na pytanie „jak duży jest komponent”, a nie „do czego należy”. Przy kilkudziesięciu obszarach prowadzi do katalogów z setkami plików różnych domen i do kopiowania podobnych komponentów (trzy tabele zamiast jednej).

**Dlaczego FSD?**

* **Granice wynikają z problemu.** Typowe awarie rosnących frontów: duplikaty tabel, import z wnętrza cudzego modułu, dwa podobne formularze, kilka sposobów pobierania danych. FSD odpowiada na nie kolejno: wspólny `shared/ui` (jedna tabela), reguły izolacji obszarów (brak sięgania do środka), stały zestaw części elementu (jeden formularz) i wymuszane lintem reguły (jeden sposób robienia rzeczy).
* **Kierunek zależności jest jawny i sprawdzany maszynowo**, więc nowa osoba nie musi znać historii projektu, żeby go nie złamać.
* **Obszar da się usunąć lub dodać lokalnie.** Zmiana dotyka tylko katalogów obszaru i miejsc, które go jawnie importują.
* **FSD jest znanym, udokumentowanym podejściem**, a wsparcie narzędziowe (`eslint-plugin-import-fsd`) pozwala zamienić konwencję w regułę.

**Kompromis:** pełny FSD ma także warstwy `entities` i `features`. Przy tej wielkości aplikacji (4 obszary) zostały pominięte. Logika obszaru mieszka w `widgets/<Obszar>` i `pages/<Obszar>`. Jeśli liczba obszarów urośnie, kolejnym krokiem jest wydzielenie `entities`/`features` zgodnie z regułą „popraw strukturę w całym projekcie, nie tylko w nowym miejscu”.

**Pozostałe decyzje**

* **Inertia + `spatie/laravel-data` + `typescript-transformer`**: jedno źródło prawdy dla kształtu danych, zmiana pola w backendzie od razu psuje kompilację frontu tam, gdzie trzeba.
* **CVA + `tailwind-merge`**: warianty komponentu w jednym miejscu, zmiana wyglądu przycisku w całej aplikacji to zmiana w jednym pliku.
* **Logika w hookach, widoki cienkie**: hooki testuje się jednostkowo i niezależnie od JSX, a widok tylko je składa.

---

## 6. Strategia testów

Poziom testów dobrano do rodzaju elementu.

| Element | Poziom | Co sprawdzamy | Gdzie |
|---|---|---|---|
| Komponent wspólny (`shared/ui`) | jednostkowy | renderowanie, warianty (rozmiar, kolor, stan), zdarzenia, dostępność ról | `shared/ui/*/__tests__/` |
| Hook z logiką (`use*`) | jednostkowy (`renderHook`) | stan, przejścia, wywołania mutacji, wartości wyjściowe | `*/hooks` → `__tests__/use*.test.ts` |
| Formularz | komponentowy / integracyjny | pola z konfiguracji, wysyłka, **wyświetlanie błędów walidacji** zwróconych przez backend | `widgets/*/__tests__/Create*Modal.test.tsx`, `use*FormFields.test.ts` |
| Strona | komponentowy / integracyjny | złożenie widoku z danych (propsów Inertii), filtrowanie, akcja zbiorcza, stany puste | `pages/*/__tests__/` |
| Konfiguracja (`shared/config`) | jednostkowy | mapowanie tras i tytułów | `shared/config/routes.test.ts` |
| Backend | `php artisan test` | kontrolery, relacje, odpowiedzi Inertii | `tests/Feature`, `tests/Unit` |
| Wygląd i API komponentów | Storybook | warianty i stany w izolacji, dokumentacja (`autodocs`), a11y | `*.stories.tsx` |

**Zasady**

* Każdy element ma testy. `npm run check` uruchamia je razem z typami i lintem jedną komendą.
* Granice zależności testujemy lintem (to zwykła reguła, nie test), więc naruszenie wykryje ten sam `npm run check`.
* Mock w testach wskazujemy ścieżką **względem pliku testu**. Testy leżą w `__tests__/`, więc moduł z katalogu nadrzędnego mockujemy jako `vi.mock('../hooks/useXxx', ...)`. Ścieżka `./hooks/...` wskazywałaby nieistniejący plik, mock by nie zadziałał i test uruchomiłby prawdziwy hook.
* Preferujemy asercje na zachowaniu widocznym dla użytkownika (role, teksty) niż na szczegółach implementacji.

---

## 7. Jak dodać nowy element (checklista)

**Nowy komponent wspólny** (np. `Modal`)

1. Utwórz `shared/ui/modal/` z plikami `Modal.tsx` (warianty w `cva`), `index.ts`, `Modal.stories.tsx`, `__tests__/Modal.test.tsx`.
2. Nie dodawaj do niego wiedzy domenowej. Rozszerzenia robi się propsami i `className`.
3. Uruchom `npm run check`.

**Nowy obszar** (np. `Milestones`)

1. Dodaj `pages/Milestones/` (`Index.tsx`, `hooks/`, `ui/`, `types/`, `__tests__/`).
2. Dodaj `widgets/Milestones/` (tabela, formularz, `hooks/`, `types/`, `__tests__/`, story) i wyeksportuj publiczne elementy w `widgets/index.ts`.
3. Dodaj klasę `app/Data/MilestoneData.php` i wygeneruj typy: `php artisan typescript:transform`.
4. Dodaj trasę w `shared/config/routes.ts`, jeśli obszar ma być w nawigacji.
5. Nie importuj innych obszarów tej samej warstwy. Dane przekaż propsami ze strony.

**Nowy formularz**

1. `use<Obszar>FormFields.ts` (konfiguracja pól) + `useCreate<Obszar>Modal.ts` (logika, `useApiMutation`).
2. Widok = `ModalFormWrapper` + `FormRenderer`.
3. Testy: renderowanie pól i błędy walidacji z backendu.

---

## 8. Znane ograniczenia

Dla transparentności: miejsca, które świadomie lub z braku czasu nie są jeszcze domknięte.

* **Jeden barrel dla warstwy `widgets`** (`widgets/index.ts`) zamiast osobnego `index.ts` w każdym obszarze. Granica jest wymuszana lintem między obszarami, ale publiczne API pojedynczego obszaru nie jest jeszcze wydzielone.
* **Brak warstw `entities`/`features`** (patrz rozdział 5).
* **Testy backendu** to na razie szkielet Laravela (`ExampleTest`). Główny nacisk testów jest na frontendzie.
* **Testy stron i formularzy** wykonują się w jsdom z zamockowanym Inertią i hookami. Nie są to testy end-to-end z prawdziwymi odpowiedziami serwera.
* **Hooki filtrów w `shared/hooks`** (`useTaskFilters`, `useTableFilters`) są częściowo zdublowane z `widgets/TaskFilters/hooks/useTaskFilters` i zawierają wiedzę o zadaniach. Do uporządkowania: przenieść do obszaru zadań albo uogólnić.
* **Hook `useFormModal`** w `shared/hooks` nie jest obecnie używany przez żaden formularz (formularze korzystają z `useApiMutation`).
* **Ostrzeżenia `no-explicit-any`** w lincie (poziom „warn”) do stopniowego usuwania.
