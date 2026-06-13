# Infogare

**Ce projet est une reconsitution des écrans d'information voyageurs de la SNCF.**

## Fonctionnalités

- Écrans des départs et des arrivées
- Écran de flash information
- Écran de flash d'information manuel (*)

(*) Cet écran n'utilise pas la base de données, il suffit de cliquer sur la zone jaune pour afficher un message personnalisé.

## Fonctionnement

Le projet utilise une base de données SQLite qui stocke les informations des trains et des bandeaux flash circulation, dont le schéma est décrit ci-dessous.

Une base de données d'exemple est fournie dans `db/data.sqlite`, dans l'attente du développement de la modification via l'interface web.

### Schéma de la base de données

```sql
    trajets (
        id              INTEGER     PRIMARY KEY AUTOINCREMENT,
        idTrain         TEXT        NOT NULL,
        operateur       TEXT        NOT NULL DEFAULT 'SNCF',
        etat            TEXT,
        horaire         TIME        NOT NULL,
        quai            TEXT        NOT NULL,
        provenance      TEXT        NOT NULL,
        destination     TEXT        NOT NULL,
        arrets          TEXT,
        retard          INT         NOT NULL DEFAULT 0
    );

    flash (
        id              INTEGER     PRIMARY KEY AUTOINCREMENT,
        long            TEXT        NOT NULL,
        court           TEXT
    );
```

## Installation

```bash
git clone https://github.com/crtsch/infogare-sim
```

```bash
npm install express sqlite sqlite3
```

```bash
npm start
```