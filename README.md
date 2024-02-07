# Jaka to melodia

## Opis gry

"Jaka to melodia" to aplikacja webowa umożliwiająca grę w zgadywanie melodii. Gracze biorą udział w zabawie, próbując odgadnąć tytuły i wykonawców utworów muzycznych, które są losowane z określonej playlisty na platformie Spotify. Aplikacja umożliwia interakcję poprzez API Spotify, co pozwala na dostęp do wybranej playlisty oraz odtwarzanie wylosowanych utworów.

## Założenia projektu

1. **Łączenie z API Spotify**: Aplikacja będzie komunikować się z API Spotify w celu uzyskania dostępu do wybranej playlisty muzycznej, z której będą losowane utwory do gry.

2. **Losowanie utworów**: Prowadzący gry będzie miał możliwość losowania utworów z wybranej playlisty. Po wylosowaniu utworu, będzie on odtwarzany dla uczestników.

3. **Odtwarzanie fragmentów utworów**: Prowadzący będzie mógł kontrolować odtwarzanie utworów poprzez wybór różnych fragmentów do odtworzenia, w tym:
    - Odtworzenie piosenki od początku.
    - Odtworzenie 3-sekundowego fragmentu piosenki.
    - Odtworzenie 6-sekundowego fragmentu piosenki.
    - Odtworzenie 9-sekundowego fragmentu piosenki.
    - Zatrzymanie piosenki.
    - Spauzowanie piosenki.

4. **Losowanie kolejnej piosenki**: Po zakończeniu odtwarzania utworu, prowadzący będzie mógł losować kolejny utwór z playlisty w celu kontynuacji gry.

5. **Interaktywny interfejs użytkownika**: Aplikacja będzie posiadała prosty i intuicyjny interfejs użytkownika, który umożliwi graczom udział w zabawie oraz prowadzącemu łatwe zarządzanie odtwarzaniem utworów.

6. **Wsparcie dla różnych platform**: Aplikacja będzie dostępna jako aplikacja webowa, co umożliwi jej użytkowanie na różnych urządzeniach, takich jak komputery stacjonarne, laptopy, tablety oraz smartfony.

## Instrukcja korzystania

1. **Rejestracja aplikacji na stronie dewelopera Spotify**:
   - Przejdź na stronę dewelopera Spotify: [https://developer.spotify.com/](https://developer.spotify.com/)
   - Zaloguj się lub załóż nowe konto.
   - Zarejestruj nową aplikację i uzyskaj dostęp do klucza klienta (clientId) oraz wedle swoich potrzeb ustaw Uri przekierowania (redirectUri).

2. **Konfiguracja pliku `code.js`**:
   - Znajdź plik `code.js` w projekcie.
   - Zgodnie z ustawieniami aplikacji dewelopera Spotify, ustaw zmienne `clientId` i `redirectUri` na odpowiednie wartości.
   - Ustaw zmienną `playlistId` na identyfikator playlisty ze Spotify, z której chcesz pobierać utwory do aplikacji.

3. **Uruchomienie aplikacji**:
   - Po wykonaniu konfiguracji, możesz uruchomić aplikację.
   - Do poprawnego działania aplikacji (Z powodu api spotify) należy ją zhostować!

**Po wykonaniu tych kroków, aplikacja powinna być gotowa do użytku.**

*Ikony używane w projekcie pochodzą z repozytorium [Feather](https://github.com/feathericons/feather).*

*Aplikacja korzysta z [Spotify Web API](https://developer.spotify.com/documentation/web-api/)*

*Do poprawnego działania aplikacji wymagane jest konto Spotify Premium.*

---

**Made with ❤️ by n.kodem**

[![Star History Chart](https://api.star-history.com/svg?repos=n-kodem/JakaToMelodia&type=Date&theme=dark)](https://star-history.com/#n-kodem/JakaToMelodia&Date)
