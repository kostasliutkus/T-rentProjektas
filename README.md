# T-rentProjektas
## Sprendžiamo uždavinio aprašymas

## 1. Sistemos paskirtis

### 1.1. Sistemos tikslas

Projekto tikslas – suteikti galimybę išsinuomoti laikiną būstą lengviau ir paprasčiau negu anksčiau.

### 1.2. Veikimo principas

Veikimo principas – pačią kuriamą platformą sudaro dvi dalys: internetinė aplikacija, kuria naudosis nuomininkai, administratorius bei aplikacijų programavimo sąsaja (API).

Nuomininkas, norėdamas naudotis šia platforma, prisiregistruos prie internetinės aplikacijos ir galės kurti užsakymus, kad užsirezervuotų būstą, taip pat galės tuos užsakymus peržiūrėti ir atšaukti (naikinti).

Administratorius galės valdyti visą sistemą t. y. pridėti naujus nuomotojus ir jų nuomojamus būstus, bei valdyti su jais susijusius užsakymus (peržiūrėti, naikinti, redaguoti). Taip pat turės patvirtinti užsakymus.

## 2. Funkciniai reikalavimai

### Neregistruotas sistemos naudotojas galės:

1. Peržiūrėti platformos reprezentacinį puslapį;
2. Prisijungti prie internetinės aplikacijos.

### Registruotas sistemos naudotojas galės:

1. Atsijungti nuo internetinės aplikacijos;
2. Prisijungti (užsiregistruoti) prie platformos;
3. Redaguoti savo profilį;
   3.1 Keisti savo duomenis.
   3.2 Naikinti profilį.
4. Susikurti užsakymą:
   4.1. Užpildyti jį savo duomenimis;
   4.2. Pasirinkti laiką iš galimų laikų;
   4.3. Registruoti savo užsakymą.
5. Peržiūrėti kitų registruotų naudotojų užimtus laikus;
6. Peržiūrėti visus skelbimus (galimus būstus nuomai);

### Administratorius galės:

1. Patvirtinti naudotojo registraciją.
2. Patvirtinti norimus skelbti viešus užsakymus.
3. Šalinti naudotojus.
4. Šalinti netinkamus užsakymus.

## 3. Sistemos Architektūra

### Sistemos sudedamosios dalys:

- Kliento pusė (ang. Front-End) – naudojant Angular, node.js;
- Serverio pusė (angl. Back-End) – naudojant C# .NET Framework;
- Duomenų bazė – PostgreSQL.
