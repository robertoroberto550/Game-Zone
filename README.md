# NEXUS GAMING

Site modern în limba română pentru comunitatea NEXUS GAMING. Include jocuri populare, servere online, interfețe de autentificare și înregistrare, profil de utilizator și design responsive.

## Autentificare PHP + MySQL

### Instalare pe InfinityFree

1. În **Control Panel → MySQL Databases**, creează o bază numită `nexus`.
2. Deschide phpMyAdmin pentru baza creată și importă `database.sql`.
3. În folderul `api`, copiază `config.local.php.example` cu numele `config.local.php`.
4. Completează în el exact **MySQL Host Name**, **MySQL DB Name**, **MySQL User Name** și parola contului afișate de InfinityFree.
5. Încarcă toate fișierele site-ului în folderul `htdocs`.

InfinityFree nu folosește `localhost` pentru baza de date. Folosește exact hostname-ul `sqlXXX.infinityfree.com` afișat în panou.

Pe alte servicii poți configura variabilele `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER` și `DB_PASS` folosind `.env.example` ca model.

Nu publica parola bazei de date în repository. GitHub Pages poate afișa partea statică, dar nu execută PHP.
