C2C Marketplace – Readme

 Svrha aplikacije je da omogući korisnicima kupovinu i prodaju proizvoda, kao i funkcionalnosti za recenzije proizvoda, upravljanje porudžbinama, te administraciju korisnika i oglasa.


-------------------------------------------------------------------------------
# 1. UVOD
Ova aplikacija predstavlja platformu za trgovinu između korisnika, pri čemu svako može da postavi oglas (proizvod) ili da kupi proizvod drugog korisnika. Aplikacija poseduje sledeće osnovne funkcionalnosti:
- Registracija i prijava korisnika (uključujući administratorske naloge).
- Kreiranje, izmena, brisanje i pregled oglasa.
- Pretraga proizvoda po nazivu.
- Kreiranje porudžbina i generisanje PDF potvrda.
- Kreiranje recenzija i pregled ocena proizvoda.
- Administratorska kontrola nad korisnicima i oglasima.

Ovaj projekat je razvijen kroz faze Uprošćene Larmanove metode, uključujući:
1) Prikupljanje korisničkih zahteva.
2) Analizu i dijagram sekvenci.
3) Projektovanje i definisanje arhitekture.
4) Implementaciju i testiranje.

-------------------------------------------------------------------------------
# 2. STRUKTURA PROJEKTA
Projekat se sastoji iz dva glavna dela:
1. Klijentski deo (frontend) – implementiran u React-u.
2. Serverski deo (backend) – implementiran u Laravel PHP frejmvoru.

Preporučena struktura foldera:

C2C/
 ├─ backend/           # Laravel projekat
 └─ frontend/          # React projekat

-------------------------------------------------------------------------------
# 3. TEHNOLOGIJE

## FRONTEND:
- JavaScript/React: Komponentno-orijentisan pristup, virtuelni DOM, JSX i React Hooks za upravljanje stanjem i životnim ciklusom komponenata.
- HTML/CSS: Za osnovni prikaz i stilizaciju.
- Biblioteke:
  • react-router-dom za rutiranje.
  • axios za HTTP komunikaciju.
  • jsPDF za generisanje PDF fajlova potvrda narudžbine.

## BACKEND:
- PHP (verzija 7+ ili novija)
- Laravel (verzija 8+):
  • Arhitektura MVC (Model-View-Controller).
  • Eloquent ORM za rad sa bazom podataka.
  • Artisan CLI za generisanje modela, kontrolera i migracija.
  • Middleware za autentifikaciju, logovanje i zaštitu rute.
- MySQL ili bilo koji drugi DBMS kompatibilan sa Laravel-ovim Eloquent ORM-om.

-------------------------------------------------------------------------------
# 4. INSTALACIJA I POKRETANJE

## KLIJENTSKI DEO (REACT):
1) Preuzmite frontend folder (npr. git clone <repo-url> ili kopiranjem iz arhive).
2) Otvorite terminal i uđite u folder "frontend".
3) Pokrenite komandu za instalaciju dependencija:
   npm install
4) Pokrenite React razvojni server:
   npm start
5) Aplikacija bi trebalo da se izvršava na adresi:
   http://localhost:3000

## SERVERSKI DEO (LARAVEL):
1) Preuzmite backend folder (npr. git clone <repo-url> ili kopiranjem iz arhive).
2) Uđite u folder "backend".
3) Instalirajte potrebne PHP pakete:
   composer install
4) Kreirajte .env datoteku tako što ćete duplirati .env.example:
   cp .env.example .env
5) U .env datoteci podesite parametre baze podataka, npr.:
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=c2cdb
   DB_USERNAME=root
   DB_PASSWORD=password
6) Generišite Laravel ključ aplikacije:
   php artisan key:generate
7) Pokrenite lokalni razvojni server:
   php artisan serve
8) Aplikacija (API) će se izvršavati na adresi:
   http://127.0.0.1:8000

## KONFIGURACIJA BAZE PODATAKA:
- Potrebno je kreirati bazu podataka (npr. aplikacijaiteh) unutar MySQL servera.
- Podesiti .env parametre (korisničko ime, lozinka, naziv baze itd.).

## MIGRACIJE I SEEDING:
1) Izvršite migracije:
   php artisan migrate
2) (Opcionalno) Popunite bazu početnim podacima:
   php artisan db:seed
3) Nakon toga, baza podataka će imati sve potrebne tabele i, po potrebi, inicijalne zapise.

-------------------------------------------------------------------------------
# 5. FUNKCIONALNOSTI

## KORISNIČKI ZAHTEVI:
- Registracija i prijava korisnika: Kreiranje korisničkog naloga (ime, email, lozinka, adresa, broj telefona), čuvanje tokena za sesiju u localStorage ili sessionStorage.
- Upravljanje oglasima: Dodavanje, izmena, brisanje, pregled i pretraga proizvoda (oglasa).
- Proces poručivanja: Kreiranje narudžbine, prikaz detalja narudžbine, potvrda i PDF generisanje.
- Recenzije: Kreiranje i prikaz recenzija, računanje prosečne ocene.
- Administracija: Pregled svih korisnika i proizvoda, promena uloga korisnika (administrator, običan korisnik), brisanje korisnika.

## SLUČAJEVI KORIŠĆENJA:
Seminarski rad definiše više slučajeva korišćenja, među kojima su:
- SK1: Kreiranje korisnika
- SK2: Prijava korisnika
- SK3: Odjava korisnika
- SK4: Pretraga proizvoda
- SK6: Kreiranje oglasa (proizvoda)
- ...
- SK13: Generisanje i preuzimanje potvrde u PDF formatu
- SK14: Kreiranje recenzije proizvoda
- SK19: Upravljanje korisnicima od strane administratora

Detalji o svakom slučaju korišćenja (uključujući alternativne tokove) opisani su u dokumentaciji.

-------------------------------------------------------------------------------
# 6. STRUKTURA BAZE PODATAKA
Korišćena je relaciona baza podataka gde su najvažnije tabele:
- users – informacije o korisnicima (uključujući rolu: user/admin).
- products – oglasi koje postavljaju korisnici.
- orders – narudžbine za proizvode.
- reviews – recenzije sa ocenom, komentarom i referencom na proizvod i korisnika.

Međusobni odnosi (relationship) između modela:
- 1:N između korisnika i proizvoda.
- 1:N između korisnika i narudžbina.
- 1:N između proizvoda i recenzija (svaka recenzija pripada određenom proizvodu).
- 1:1 (ili N:1) relacije specifične za status, kategorije i slično mogu se definisati po potrebi.



Napomena: Za detaljnije informacije o dijagramima sekvenci, dodatnim slučajevima korišćenja, kao i kompletnu dokumentaciju, pogledati originalni seminarski rad.
