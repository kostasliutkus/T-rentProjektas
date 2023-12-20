
# T-rentProjektas
## Sprendžiamo uždavinio aprašymas

## 1. Sistemos paskirtis

### 1.1. Sistemos tikslas

Projekto tikslas – suteikti galimybę išsinuomoti laikiną būstą lengviau ir paprasčiau negu anksčiau.

### 1.2. Veikimo principas

Veikimo principas – pačią kuriamą platformą sudaro dvi dalys: internetinė aplikacija, kuria naudosis nuomininkai, administratorius bei aplikacijų programavimo sąsaja (API).

Nuomininkas, norėdamas naudotis šia platforma, prisiregistruos prie internetinės aplikacijos ir galės kurti užsakymus, kad užsirezervuotų būstą, taip pat galės tuos užsakymus peržiūrėti ir atšaukti (naikinti).

Administratorius galės valdyti visą sistemą t. y. pridėti naujus nuomotojus ir jų nuomojamus būstus, bei valdyti su jais susijusius užsakymus (peržiūrėti, naikinti, redaguoti).

## 2. Funkciniai reikalavimai

### Neregistruotas sistemos naudotojas galės:

1. Peržiūrėti platformos reprezentacinį puslapį;
2. Prisijungti prie internetinės aplikacijos.
3. Peržiūrėti jau sukurtus būstus ir

### Registruotas sistemos naudotojas galės:

1. Atsijungti nuo internetinės aplikacijos;
2. Prisijungti (užsiregistruoti) prie platformos;
3. Susikurti užsakymą:
   3.1. Užpildyti jį savo duomenimis;
   3.2. Pasirinkti laiką nuo iki;
   3.3. Registruoti savo užsakymą.
4. Peržiūrėti savo sukurtus užsakymus
	4.1 Peržiūrėti užsakymų duomenis
	4.2 Redaguoti norimo užsakymo duomenis
	4.3 Naikinti norimą užsakymą
5. Peržiūrėti kitų registruotų sukurtus nuomininkus;
	5.1 Pridėti prie kito vartotojo sukurto nuomininko savo būstą
6. Peržiūrėti visus skelbimus (galimus būstus nuomai);
7. Sukurti savo nuomininką
8. Redaguoti tik savo sukurtą nuomininką
9. Naikinti savo sukurtą nuomininką

### Administratorius galės:
1. Matyti bei redaguoti visus vartotojo sukurtus įrašus

## 3. Sistemos Architektūra
![Deployment diagram](images/diagram.png)
### Sistemos sudedamosios dalys:

- Kliento pusė (ang. Front-End) – naudojant Angular;
- Serverio pusė (angl. Back-End) – naudojant C# .NET Framework;
- Duomenų bazė – PostgreSQL.

## 4. API metodai
Šiame skyriuje bus aprašomi API metodai, nurodoma url kuriuo juos galima pasiekti,
kokių formatu priema bei gražina duomenis, taip pat galimos klaidos. Jei metodas priema duomenis
jų struktūra irgi nurodyta.

Visi metodai priema duomenis ir gražina juos JSON formatu
### GET ALL Renters 
Gražina visų Renter objektų sąrašą
#### Resurso URL
`https://sea-turtle-app-64g26.ondigitalocean.app/api/Renters`
#### Resurso informacija
- Autorizacija nereikalinga
- HTTP request metodas - GET
- Duomenų įvedimas nereikalingas
#### Gražinami HTTP kodai
- 500 - Jei sąrašas tuščias
- 200 (OK) - sėkmingai gražinti duomenys

#### Gražinamo rezultato pavyzdys
```json
[
   {
      "firstName": "Dukey",
      "lastName": "Lacknor",
      "organization": "Talane",
      "age": 22,
      "id": 1,
      "email": "dlacknor0@yellowbook.com",
      "phone": "+62 752 674 0756",
      "userId": "f7f10684-c5c5-481d-99ba-bf3346ee1a00",
      "user": null
   },
   {
      "firstName": "testinis",
      "lastName": "Lacknor",
      "organization": "Talane",
      "age": 22,
      "id": 2,
      "email": "dlacknor0@yellowbook.com",
      "phone": "+62 752 674 0756",
      "userId": "f7f10684-c5c5-481d-99ba-bf3346ee1a00",
      "user": null
   }
   ]
```

### GET Renter 
Gražina Renter objektą pagal id
#### Resurso URL
`https://sea-turtle-app-64g26.ondigitalocean.app/api/Renters/{id}`
#### Resurso informacija
- Autorizacija nereikalinga
- HTTP request metodas - GET
- Duomenų įvedimas nereikalingas
#### Gražinami HTTP kodai
- 404 (Not Found) - Jei nėra objekto su nurodytu id
- 200 (OK) - sėkmingai gražinti duomenys
#### Gražinamo rezultato pavyzdys
```JSON
   {
   "firstName": "Dukey",
   "lastName": "Lacknor",
   "organization": "Talane",
   "age": 22,
   "id": 1,
   "email": "dlacknor0@yellowbook.com",
   "phone": "+62 752 674 0756",
   "userId": "f7f10684-c5c5-481d-99ba-bf3346ee1a00",
   "user": null
}
```

### Add Renter 
Prideda Renter objektą
#### Resurso URL
`https://sea-turtle-app-64g26.ondigitalocean.app/api/Renters/`
#### Resurso informacija
- Autorizacija reikalinga (privaloma būti prisijungus)
- Header - JWT Bearer token
- HTTP request metodas - POST
- Duomenų įvedimas reikalingas
#### Įvedamu duomenų pavyzdys
```JSON
{
"FirstName": "Kostas",
"LastName": "Liutkus",
"organization": "KTU",
"age": 21,
"email": "kostliutk2@hmail.com",
"phone": "+370 63837233"
}
```
#### Gražinami HTTP kodai
- 500 - nebuvo įvesti arba neteisingai įvesti norimo pridėti objekto duomenys
- 403 (Forbidden) - vartotojas nėra prisijungęs
- 201 (Created) - Sėkmingai pridėtas objektas ir gražinti jo duomenys 
#### Gražinamo rezultato pavyzdys
```JSON
{
   "id": 12,
   "firstName": "Kostas",
   "lastName": "Liutkus",
   "organization": "KTU",
   "age": 21,
   "email": "kostliutk2@hmail.com",
   "phone": "+370 63837233"
}
```

### Change Renter 
Pakeisti Renter objektą pagal id
#### Resurso URL
`https://sea-turtle-app-64g26.ondigitalocean.app/api/Renters/{id}`
#### Resurso informacija
- Autorizacija reikalinga (privaloma būti prisijungus)
- Header - JWT Bearer token
- Vartotojas privalo būti objekto kūrėjas arba administratorius
- HTTP request metodas - PUT
- Duomenų įvedimas reikalingas
#### Įvedamu duomenų pavyzdys
```JSON
{
"FirstName": "Kostas",
"LastName": "Liutkus",
"organization": "KTU",
"age": 21,
"email": "kostliutk2@hmail.com",
"phone": "+370 63837233"
}
```
#### Gražinami HTTP kodai
- 404 - Nerastas objektas su nurodytu id
- 403 (Forbidden) - vartotojas nėra autorizuotas keisti šį objektą
- 401 (Unauthorized) - vartotojas nėra prisijungęs
- 200 (OK) - Sėkmingai pakeistas objektas ir gražinti jo duomenys 
#### Gražinamo rezultato pavyzdys
```JSON
{
   "id": 12,
   "firstName": "test",
   "lastName": "test",
   "organization": "test",
   "age": 22,
   "email": "test@hmail.com",
   "phone": "+370 33333333"
}
```

### Delete Renter 
Pašalinti Renter objektą pagal id
#### Resurso URL
`https://sea-turtle-app-64g26.ondigitalocean.app/api/Renters/{id}`
#### Resurso informacija
- Autorizacija reikalinga (privaloma būti prisijungus)
- Header - JWT Bearer token
- Vartotojas privalo būti objekto kūrėjas arba administratorius
- HTTP request metodas - DELETE
- Duomenų įvedimas nereikalingas
#### Gražinami HTTP kodai
- 404 - Nerastas objektas su nurodytu id
- 403 (Forbidden) - vartotojas nėra autorizuotas keisti šį objektą
- 401 (Unauthorized) - vartotojas nėra prisijungęs
- 204 (No Content) - Sėkmingai pašalintas objektas

### Get Accommodations 
Gražina visų Accommodation objektų sąrašą, kurie priklauso Renter objektui pagal jo id (idR)
#### Resurso URL
`https://sea-turtle-app-64g26.ondigitalocean.app/api/Renters/{idR}/Accommodations`
#### Resurso informacija
- Autorizacija nereikalinga
- HTTP request metodas - GET
- Duomenų įvedimas nereikalingas
#### Gražinami HTTP kodai
- 500 - Sąrašas tuščias
- 200 (OK) - Sėkmingai surastas objektų sąrašas ir gražinti jo duomenys 
#### Gražinamo rezultato pavyzdys
```JSON
{
   [
   {
      "id": 11,
      "location": "naujas51",
      "instructions": "naujas",
      "renterID": 4,
      "userId": "1419ede0-fef9-481d-8af5-a735c6d4a5dd",
      "user": null
   },
   {
      "id": 13,
      "location": "edit55555",
      "instructions": "tst",
      "renterID": 4,
      "userId": "1419ede0-fef9-481d-8af5-a735c6d4a5dd",
      "user": null
   },
   {
      "id": 15,
      "location": "ghfghf",
      "instructions": "lnjknjk",
      "renterID": 4,
      "userId": "1419ede0-fef9-481d-8af5-a735c6d4a5dd",
      "user": null
   }
]
}
```

### GET Accommodation 
Gražina Accommodation objektą pagal Renter id (idR) ir Accommodation Id (idA)
#### Resurso URL
`https://sea-turtle-app-64g26.ondigitalocean.app/api/Renters/{idR}/Accommodations/{idA}`
#### Resurso informacija
- Autorizacija nereikalinga
- HTTP request metodas - GET
- Duomenų įvedimas nereikalingas
#### Gražinami HTTP kodai
- 404 (Not Found) - Jei nėrastas objektas su nurodytu Renter id ar Accommodation id
- 200 (OK) - sėkmingai gražinti duomenys
#### Gražinamo rezultato pavyzdys
```JSON
{
   "id": 15,
   "location": "ghfghf",
   "instructions": "lnjknjk",
   "renterID": 4,
   "userId": "1419ede0-fef9-481d-8af5-a735c6d4a5dd",
   "user": null
}
```
### Add Accommodation 
Prideda Accommodation objektą prie Renter pagal id
#### Resurso URL
`https://sea-turtle-app-64g26.ondigitalocean.app/api/Renters/{id}/Accommodations`
#### Resurso informacija
- Autorizacija reikalinga (privaloma būti prisijungus)
- Header - JWT Bearer token
- HTTP request metodas - POST
- Duomenų įvedimas reikalingas
#### Įvedamu duomenų pavyzdys
```JSON
{
"location": "Karaliaus g.",
"instructions": "paskambinkite dėl pin kodo"
}
```
#### Gražinami HTTP kodai
- 500 - nebuvo įvesti arba neteisingai įvesti norimo pridėti objekto duomenys
- 401 (Unauthorized) - vartotojo nėra prisijungęs
- 201 (Created) - Sėkmingai pridėtas objektas ir gražinti jo duomenys 
#### Gražinamo rezultato pavyzdys
```JSON
   {
      "id": 21,
      "location": "paskambinkite dėl pin kodo",
      "instructions": "Karaliaus g.",
      "renterID": 4
   }
```
### Change Accommodation 
Pakeisti Accommodation objektą pagal Renter id (idR) ir Accommodation Id (idA)
#### Resurso URL
`https://sea-turtle-app-64g26.ondigitalocean.app/api/Renters/{idR}/Accommodation/{idA}`
#### Resurso informacija
- Autorizacija reikalinga (privaloma būti prisijungus)
- Header - JWT Bearer token
- Vartotojas privalo būti objekto kūrėjas arba administratorius
- HTTP request metodas - PUT
- Duomenų įvedimas reikalingas
#### Įvedamu duomenų pavyzdys
```JSON
{
   "location": "Pakeistas",
   "instructions": "Pakeistas"
}
```
#### Gražinami HTTP kodai
- 404 - Nerastas objektas su nurodytu id
- 403 (Forbidden) - vartotojas nėra autorizuotas keisti šį objektą
- 401 (Unauthorized) - vartotojas nėra prisijungęs
- 200 (OK) - Sėkmingai pakeistas objektas ir gražinti jo duomenys 
#### Gražinamo rezultato pavyzdys
```JSON
{
   "id": 21,
   "location": "Pakeistas",
   "instructions": "Pakeistas",
   "renterID": 4
}  
```

### Delete Accommodation 
Pašalinti Accommodation objektą pagal Accommodation id (idA) ir Renter id (idR)
#### Resurso URL
`https://sea-turtle-app-64g26.ondigitalocean.app/api/Renters/{id}/Accommodation/{idA}`
#### Resurso informacija
- Autorizacija reikalinga (privaloma būti prisijungus)
- Header - JWT Bearer token
- Privalo būti objekto kūrėjas arba administratorius
- HTTP request metodas - DELETE
- Duomenų įvedimas nereikalingas
#### Gražinami HTTP kodai
- 404 - Nerastas objektas
- 403 (Forbidden) - vartotojas nėra autorizuotas šalinti šį objektą
- 401 (Unauthorized) - vartotojas nėra prisijungęs
- 204 (No Content) - Sėkmingai pašalintas objektas

### Get Orders 
Gražina visų Orders objektų sąrašą, kurie priklauso Accommodation objektui pagal jo id (idA) ir Renter objektui pagal jo id (idR)
#### Resurso URL
`https://sea-turtle-app-64g26.ondigitalocean.app/api/Renters/{idR}/Accommodations/{idA}/Orders`
#### Resurso informacija
- Autorizacija reikalinga
- Header - JWT Bearer token
- HTTP request metodas - GET
- Duomenų įvedimas nereikalingas
#### Gražinami HTTP kodai
- 500 - Sąrašas tuščias
- 200 (OK) - Sėkmingai surastas objektų sąrašas ir gražinti jo duomenys 
- 403 (Forbidden) - vartotojas nėra prisijungęs
- 401 (Unauthorized) - vartotojas nėra prisijungęs, jwt token yra klaidingas
#### Gražinamo rezultato pavyzdys
```JSON
[
   {
      "id": 9,
      "creationDate": "2023-12-15T21:58:08.301548Z",
      "leaseStartDate": "2024-01-28T00:00:00Z",
      "leaseEndDate": "2024-01-31T00:00:00Z",
      "price": 100.50,
      "accommodationID": 11,
      "renterID": 4,
      "userId": "1419ede0-fef9-481d-8af5-a735c6d4a5dd",
      "user": null
   },
   {
      "id": 14,
      "creationDate": "2023-12-16T16:44:25.302647Z",
      "leaseStartDate": "2024-01-28T00:00:00Z",
      "leaseEndDate": "2024-01-31T00:00:00Z",
      "price": 777,
      "accommodationID": 11,
      "renterID": 4,
      "userId": "f7f10684-c5c5-481d-99ba-bf3346ee1a00",
      "user": null
   },
   {
      "id": 10,
      "creationDate": "2023-12-15T21:58:17.965126Z",
      "leaseStartDate": "2016-09-20T21:00:00Z",
      "leaseEndDate": "2024-01-31T00:00:00Z",
      "price": 67890,
      "accommodationID": 11,
      "renterID": 4,
      "userId": "1419ede0-fef9-481d-8af5-a735c6d4a5dd",
      "user": null
   }
]
```

### GET Order 
Gražina Order objektą pagal Renter id (idR) ir Accommodation Id (idA) ir Order id
#### Resurso URL
`https://sea-turtle-app-64g26.ondigitalocean.app/api/Renters/{idR}/Accommodations/{idA}/Orders/{id}`
#### Resurso informacija
- Autorizacija reikalinga (privaloma būti prisijungus)
- Header - JWT Bearer token
- HTTP request metodas - GET
- Duomenų įvedimas nereikalingas
#### Gražinami HTTP kodai
- 404 - Nerastas toks Order įrašas
- 200 (OK) - Sėkmingai surastas objektų sąrašas ir gražinti jo duomenys 
- 403 (Forbidden) - vartotojas nėra prisijungęs
- 401 (Unauthorized) - vartotojas nėra prisijungęs, jwt token yra klaidingas

#### Gražinamo rezultato pavyzdys
```JSON
{
   "id": 9,
   "creationDate": "2023-12-15T21:58:08.301548Z",
   "leaseStartDate": "2024-01-28T00:00:00Z",
   "leaseEndDate": "2024-01-31T00:00:00Z",
   "price": 100.50,
   "accommodationID": 11,
   "renterID": 4,
   "userId": "1419ede0-fef9-481d-8af5-a735c6d4a5dd",
   "user": null
}
```
### Add Order 
Prideda Order objektą prie Renter pagal id (idR) ir Accommodation id (idA)
#### Resurso URL
`https://sea-turtle-app-64g26.ondigitalocean.app/api/Renters/{idR}/Accommodations/{idA}/Orders`
#### Resurso informacija
- Autorizacija reikalinga (privaloma būti prisijungus)
- Header - JWT Bearer token
- HTTP request metodas - POST
- Duomenų įvedimas reikalingas
#### Įvedamu duomenų pavyzdys
```JSON
{
"leaseStartDate": "2029-01-28T00:00:00Z",
"leaseEndDate": "2029-01-31T00:00:00Z",
"price": 1500.12
}
```
#### Gražinami HTTP kodai
- 500 - nebuvo įvesti arba neteisingai įvesti norimo pridėti objekto duomenys
- 403 (Forbidden) - vartotojo nėra prisijungęs
- 401 (Unauthorized) - vartotojas nėra prisijungęs, jwt token yra klaidingas
- 201 (Created) - Sėkmingai pridėtas objektas ir gražinti jo duomenys 
#### Gražinamo rezultato pavyzdys
```JSON
   {
   "id": 54,
   "creationDate": "2023-12-20T18:12:03.3115838Z",
   "leaseStartDate": "2024-01-28T00:00:00Z",
   "leaseEndDate": "2024-01-31T00:00:00Z",
   "price": 777,
   "accommodationID": 11,
   "renterID": 4
   }
```
### Change Order 
Pakeisti Order objektą pagal Renter id (idR) , Accommodation Id (idA) ir Order Id (id)
#### Resurso URL
`https://sea-turtle-app-64g26.ondigitalocean.app/api/Renters/{idR}/Accommodation/{idA}/Orders/{id}`
#### Resurso informacija
- Autorizacija reikalinga (privaloma būti prisijungus)
- Header - JWT Bearer token
- Vartotojas privalo būti objekto kūrėjas arba administratorius
- HTTP request metodas - PUT
- Duomenų įvedimas reikalingas
#### Įvedamu duomenų pavyzdys
```JSON
{
   "leaseStartDate": "2023-10-09T13:42:47.146Z",
   "leaseEndDate": "2023-10-09T13:42:47.146Z",
   "price": 6
}
```
#### Gražinami HTTP kodai
- 404 (Not Found)- Nerastas objektas su nurodytu id
- 403 (Forbidden) - vartotojas nėra autorizuotas keisti šį objektą
- 401 (Unauthorized) - vartotojas nėra prisijungęs, jwt token yra klaidingas
- 200 (OK) - Sėkmingai pakeistas objektas ir gražinti jo duomenys 
#### Gražinamo rezultato pavyzdys
```JSON
{
   "id": 54,
   "creationDate": "2023-12-20T18:12:03.311583Z",
   "leaseStartDate": "2023-10-09T13:42:47.146Z",
   "leaseEndDate": "2023-10-09T13:42:47.146Z",
   "price": 6,
   "accommodationID": 11,
   "renterID": 4
} 
```

### Delete Order 
Pašalinti Order objektą pagal Accommodation id (idA) , Renter id (idR) ir Order id (id)
#### Resurso URL
`https://sea-turtle-app-64g26.ondigitalocean.app/api/Renters/{idR}/Accommodation/{idA}/Orders/{id}`
#### Resurso informacija
- Autorizacija reikalinga (privaloma būti prisijungus)
- Header - JWT Bearer token
- Vartotojas privalo būti objekto kūrėjas arba administratorius
- HTTP request metodas - DELETE
- Duomenų įvedimas nereikalingas
#### Gražinami HTTP kodai
- 404 (Not Found)- Nerastas objektas
- 403 (Forbidden) - vartotojas nėra autorizuotas šalinti šį objektą
- 401 (Unauthorized) - vartotojas nėra prisijungęs
- 204 (No Content) - Sėkmingai pašalintas objektas

### Get Orders By User 
Gražina Order objektų sąraša, kurie priklauso tam tikram Vartotojui pagal user id
#### Resurso URL
`https://sea-turtle-app-64g26.ondigitalocean.app/api/Renters/{0}/Accommodations/{0}/Orders/api/GetOrdersByUser`
#### Resurso informacija
- Autorizacija reikalinga (privaloma būti prisijungus)
- Header - JWT Bearer token
- HTTP request metodas - GET
- Duomenų įvedimas nereikalingas
#### Gražinami HTTP kodai
- 404 (Not Found)- Nerastas objektas
- 401 (Unauthorized) - vartotojas nėra prisijungęs arba jwt token yra klaidingas
- 200 (OK) - Sėkmingai gražintas vartotojo sukurtų Order objektų sąrašas

### Register 
Vartotojo sukūrimas, registracija
#### Resurso URL
`https://sea-turtle-app-64g26.ondigitalocean.app/api/register`
#### Resurso informacija
- Autorizacija nereikalinga
- HTTP request metodas - POST
- Duomenų įvedimas reikalingas
#### Įvedamu duomenų pavyzdys

```JSON
{
"userName": "NaujasVartotojas",
"email": "user51@gmail.com",
"password": "VerySafePassword1!"
}
```
#### Gražinamo rezultato pavyzdys
```JSON
   {
   "id": "615eed3a-b978-47e4-a849-56a967e07107",
   "userName": "NaujasVartotojas",
   "email": "user51@gmail.com"
   }
```
#### Gražinami HTTP kodai
- 400 (Bad Request) - toks vartotojas jau egzistuoja arba nepavyko sukurti vartotojo
- 201 (Created) - Sėkmingai sukurtas vartotojas

### Login 
Vartotojo prisijungimas
#### Resurso URL
`https://sea-turtle-app-64g26.ondigitalocean.app/api/login`
#### Resurso informacija
- Autorizacija nereikalinga 
- HTTP request metodas - POST
- Duomenų įvedimas reikalingas
#### Įvedamu duomenų pavyzdys

```JSON
{
   "userName": "NaujasVartotojas",
   "password": "VerySafePassword1!"
}
```
#### Gražinamo rezultato pavyzdys
```JSON
   {
   "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiTmF1amFzVmFydG90b2phcyIsImp0aSI6ImY5MGYzMjkwLTczYmMtNDhiZC1hYTVhLTI5NGUyOWQyZDJhNyIsInN1YiI6IjYxNWVlZDNhLWI5NzgtNDdlNC1hODQ5LTU2YTk2N2UwNzEwNyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlRyZW50VXNlciIsImV4cCI6MTcwMzA5NzQwMywiaXNzIjoiS29zdGFzIiwiYXVkIjoiVHJ1c3RlZENsaWVudCJ9.YuusUBLOnxTvx9TI5ZKKufR2W5VSvhxwnbw2Sx2jhgo",
   "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0NjYxYzljZi0wOTUzLTQxZDYtOWU2Mi1lMTkwM2Y0NGVkNDEiLCJzdWIiOiI2MTVlZWQzYS1iOTc4LTQ3ZTQtYTg0OS01NmE5NjdlMDcxMDciLCJleHAiOjE3MDMxODMyMDMsImlzcyI6Iktvc3RhcyIsImF1ZCI6IlRydXN0ZWRDbGllbnQifQ.Weh4vcRM49OpZz5Nnueolvx_nviqywnynYJEurBL60Y"
}
```
#### Gražinami HTTP kodai
- 400 (Bad Request) - jei nėra tokio vartotojo arba neteisingas slaptažodis
- 200 (Ok) - Pavyko prisijungti

### AccessToken 
Access Token kurimas iš refresh token
#### Resurso URL
`https://sea-turtle-app-64g26.ondigitalocean.app/api/login`
#### Resurso informacija
- Autorizacija nereikalinga 
- HTTP request metodas - POST
- Duomenų įvedimas reikalingas
#### Įvedamu duomenų pavyzdys

```JSON
{
"refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5NDYyYjQ1YS0xYzEyLTRjMDgtYjVkYS00ODIxOGU0NTgzMmIiLCJzdWIiOiI5MzYxNzhiMy1iMzNhLTRkZTAtODQxNy1jMWM2OTkyNzFiMDIiLCJleHAiOjE3MDA0MTg2MDksImlzcyI6Iktvc3RhcyIsImF1ZCI6IlRydXN0ZWRDbGllbnQifQ.SxDt2xJYypIOvAq3QWIXUPdbkd5rbOeiVx-j6JO0CPg"
}
```
#### Gražinamo rezultato pavyzdys
```JSON
{
"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiTmF1amFzVmFydG90b2phcyIsImp0aSI6ImI2YjYzOWViLTI0NDgtNGU3YS05Mzg0LTY1MmFjOWVlYTNkYiIsInN1YiI6IjYxNWVlZDNhLWI5NzgtNDdlNC1hODQ5LTU2YTk2N2UwNzEwNyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlRyZW50VXNlciIsImV4cCI6MTcwMzA5NzU5OSwiaXNzIjoiS29zdGFzIiwiYXVkIjoiVHJ1c3RlZENsaWVudCJ9.RFzAR0RIqvxultOD9IgvVw7XO3pWTVoHdcTqYpJFwGk",
"refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyMTQzZjUwYS05MjJiLTRiMTUtOWVhYS05YmY2MDA0NDk2ZTAiLCJzdWIiOiI2MTVlZWQzYS1iOTc4LTQ3ZTQtYTg0OS01NmE5NjdlMDcxMDciLCJleHAiOjE3MDMxODMzOTksImlzcyI6Iktvc3RhcyIsImF1ZCI6IlRydXN0ZWRDbGllbnQifQ.7pqhfhoYymgxLWhj7J0Xjk7IbgUb9M4TMLDPNPz34Fg"
}  
```
#### Gražinami HTTP kodai
- 200 (Ok) - Pavyko prisijungti
- 422 (Unprocessable Entity) - klaidingas JWT Bearer token


## 6. Vartotojo sąsaja
Sistema sudaryti iš dviejų dalių ką tik apžvelgėme API galinę angl."backend" dalį (C# .net Framework).
Toliau pateikta vartotojo sąsajos angl. "frontend" (Angular) apžvalga.
### 6.1 Pradinis sistemos puslapis
Pradinis sistemos puslapis saugo pagrindinius mygtukus reikalingus navigacijai
![Main Page](images/main-page.png)
Pradiniame puslapyje matomi keli mygtukai:
- Home - atidaro pagrindinį langa (kuriame jau esame)
- Renters - atidaro visų sukurtų Renter objektų sąrašą
- Login - atidaro prisijungimo langą
- Register - atidaro registracijos langą
Naudojant mobilųjį įrenginį arba sumažinus naršyklės langą dėl patogumo yra prisitaikantis "hamburgerio" menių,
kuris laiko tuos pačius mygtukus
![Hamburger Meniu](images/hamburger.png)

### 6.2 Renters objektų sąrašo langas
Čia matomi visi visų vartotojų sukurti Renter tipo objektai nuomininkai.
Ant kiekvienos eilutės galima spustelti ir nukeliauti į detalesnę nuomininko kortelę

![Renter list](images/renters.png)

### 6.3 Nuomininko langas

![Renter](images/Renter.png)
Neregistruotas vartotojas mato tik View Accommodations mygtuką. Paspaudus šį mygtuką bus atidaromi
nuomininko būstai.

![Accommodations](images/accommodations.png)

### 6.4 Registracijos langas
Toliau viską žiūrėsime per registruotą vartotoją, tad reikia apžiūrėti registraciją.
Paspaudis mygtuką register matome šiuos laukus:
- Username - čia įvesti norimą prisijungimo vardą
- Email - čia įvesti savo el. paštą
- Password - čia įvesti norimą slaptažodį
- Confirm Passowrd - čia pakartotinai įvesti norimą slaptažodį
Taip pat matome mygtuką
- Register - užpildžius laukus galima prisiregistruoti paspaudus šį mygtuką, jei pavyko registraciją bus atidarytas prisijungimo langas
Ir nuorodą
- Already Registerd? - atidaro prisijungimo langą

![Register](images/register.png)
### 6.5 Prisijungimo langas
#### Atsidarius prisijungimo langą matome du laukus:
- Username - čia vedame registracijos metu išsaugotą prisijungimo vardą
- Password - čia vedame registracijos metu išsaugotą slaptažodį
   - slaptažodis taip pat turi akutę kurią paspaudus įjungiamas matomumas slaptažodžio
#### Matome mygtuką
- Login - užpildžius laukus galima prisijungti paspaudus šį mygtuką, jei pavyko prisijungti bus atidarytas pagrindinis langas
#### Matome nuorodą 
- Create an Account - atidaro registracijos langą
#### Taip pat prisijungus atsiranda trys papildomi bei dingsta du mygtukai (Taip pat šie pakitimai galioja ir paslėptam hamburgerio meniu)
##### Papildomi mygtukai:
- Profilis - atidaro profilį
- New Order - atidaro užsakymo sukūrimo langą
- Logout - atjungia vartotoją nuo sistemos, jis pakeičia Login ir Register mygtukus
##### Nematomi mygtukai
- Login mygtukas
- Register mygtukas


![Login](images/login.png)
### 6.6 Profilio langas
Profilio lange matoma:
- Prisijungimo vardas
- Rolė
- Užsakymų kiekis
- Užsakymų sąrašas
   - Užsakymo naikinimo mygtukas
   - Užsakymo redagavimo mygtukas

![Profile](images/profile.png)
#### Užsakymo naikinimo patvirtinimo langas
![Delete order](images/orderDelete.png)

### 6.7 Užsakymo redagavimo langas
Atsidarius užsakymo redagavimo langą galima koreguoti viską išskyrus sukūrimo datą
- Paspaudus Cancel mygtuką bus atšaukiami ir neišsaugoti pakeitimai
- Paspaudus Save mygtuką bus išsaugomi pakeitimai ir matomi iš profilio lango

![Edit Order](images/OrderEdit.png)

### 6.8 Užsakymo sukūrimo langas
Atsidarius užsakymo sukūrimo langą galima iš pagrindinės juostos mygutko New Order
Matomi įvesties laukai:
- Lease Start date
- Lease End date
- Renter
- Price

![New Order](images/OrderCreate.png)

Pasirinkus Renter iš jau sukurtų Renter objektų, tampa matomas papildomas laukas Accommodation "būstų". Norint sukurti užsakymą reikės užpildyti ir šį lauką iš pateiktų variantų
Užpildžius visus laukus ir paspaudus Create mygtuką sukuriamas įrašas ir jis tampa matomas iš profilio lango

![New Order2](images/OrderCreate2.png)

### 6.8 Renters langas prisijungus
Matomas papildomas mygtukas Create New
Paspaudus minėtą mygtuką bus atidarytas modalinis langas kurim bus galima sukurti naują nuomininką

![Renters when Authorized](images/RenterList.png)

Atidarytame lange matome šiuos laukus:
- First Name - vardas
- Last Name - pavardė
- Organization - organizacija
- Age - Amžius, mažiausia priimama reikšmė yra 18 metų
- Email - el. paštas
- Phone - Telefono numeris

![Create Renter](images/CreateRenter.png)

### 6.9 Renter langas prisijungus
Kai esame Renter lange ir esame autorizuotas vartotojas t.y. mes žiūrime savo sukurtą objektą, matome du papildomus laukus:

- Edit - Redaguoti
- Delete - Šalinti

![Renter when authorized](images/authorizedRenter.png)

#### Paspaudus šalinti yra atidaromas šalinimo patvirtinimo langas:

Šiame lange arba galima pasirinkti patvirtinti šalinimą arba jį atšaukti, atitinkamai paspaudus Delte arba Cancel mygtukus

![Delete Renter](images/deleteRenter.png)

#### Paspaudus Edit yra atidaromas redagavimo langas:
Šiame lange galima redaguoti visus nuomininko laukus ir atitinkamai paspaudus Save pakeitimai bus išsaugoti ir Cancel bus atšaukiami

![Edit Renter](images/EditRenter.png)

### 6.10 Accommodation list langas prisijungus
Kai esame prisijunge prie sistemos matome Create New mygtuką, bei Būstus, kurie yra priskirti nuomininkui per, kurį atėjome iki šio lauko

![Accommodations](images/accommodationsAuthorized.png)

#### Paspaudus Create New atsidaro pridėjimo langas
Čia galime sukurti naują būstą užpildydami Location ir Instructions laukus
Yra trečias laukas Renter Organization tačiau jis yra užpildomas automatiškai, pagal nuomininką, kuriame esame šiuo metu.
Paspaudus mygtuką Create bus sukuriamas naujas būstas ir atidaromas būstų sąrašo langas.

![Create Accommodation](images/AccommodationCreate.png)

#### Paspaudus ant norimo būsto eilutės atsidaro valdymo langas

###### Čia yra du mygtukai kurie leidžia arba redaguoti arba šalinti būstą

![Manage Accommodations](images/ManageAccommodation.png)

Redagavimo lange galima pakeisti Location ir Instructions laukų vertes ir paspaudus Save mygtuką jas išsaugoti
Apsigalvojus galima grįšti į būsto valdymo langą paspaudus Cancel, jokie pakeitimai nebus išsaugoti

![Edit Accommodation](images/AccommodationEdit.png)

Šalinimo mygtukas atidaro šalinimo patvirtinmo langą, kuriame galima patvirtinti šalinimą spaudžiant mygtuką delete arba atšaukti jį paspaudus Cancel

![Delete Accommodation](images/AccommodationConfirmDelete.png)