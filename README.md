# Tjugoett

#### Fält

- `dealer`, privat fält som refererar till ett `Player`-objekt representerande given.
- `deck`, privat fält som refererar till det `Deck`-objekt som representerar kortleken (draghögen) kort dras från för att ge till spelare och giv.
- `discardPile`, privat fält för slänghögen, en samling med spelkort.
- `players`, privat fält för spelarna, en samling med referenser till `Player`-objekt.

#### Metoder

- `constructor`, konstruktorns uppgift är att initiera nödvändiga privata medlemmar.
- `compareHands`, privat metod som jämför två spelares händer och returnerar vinnaren.
- `deal`, privat metod som returnerar nästa spelkort från kortleken.
- `playOut`, en spelomgångs delomgång under vilken en spelare drar kort för att given därefter drar sina kort.
- `playRounds`, publik metod vars parameter bestämmer hur många spelrundor som ska spelas. Efter varje spelrundas delomgång ska aktuell delomgångs resultat presenteras.

#### Fält

- `playingCards`, privat fält med kortlekens kort, en samling med referenser till `PlayingCard`-objekt.

#### Egenskaper

- `count`, publik "readonly"-egenskap som returnerar antalet kort i kortleken.


### Player

#### Fält

- `hand`, privat fält refererande till en samling innehållande de kort som utgör spelarens hand.
- `nickname`, privat fält för spelarens smeknamn.
- `standValue`, privat fält för det värde på handen upp till och med vilket spelaren fortsätter att dra kort.

#### Egenskaper

- `canHit`, "readonly"-egenskap som returnerar `true` om en spelare vill dra ett kort; annars `false`.
- `isBusted`, "readonly"-egenskap som returnerar `true` om en spelare har spruckit, d.v.s. då handens värde är större än 21; annars `false`.
- `isNaturalWinner`, "readonly"-egenskap som returnerar `true` om en spelare är en naturlig vinnare; annars `false`.
- `nickname`, "readonly"-egenskap som kapslar det privata fältet `nickname`och returnerar en spelares smeknamn.

#### Metoder

- `constructor`, konstruktorns uppgift är att initiera nödvändiga privata medlemmar.
- `addToHand`, publik metod som lägger till ett kort till spelarens hand.
- `discardHand`, publik metod som tar bort samtliga kort från spelarens hand och returnerar dem.
- `toString`, publik metod som returnerar en sträng representerande aktuellt objekt (spelarens namn samt korten spelaren har på sin hand och dess värde, eller ett streck om handen är tom).
- `valueOf`, publik metod som returnerar ett tal  representerande aktuellt objekt (värdet av spelarens hand).

### PlayingCard

#### Fält

- `ranks`, publikt statiskt fält refererande till en frusen samling av möjliga värden kort kan ha.
- `suits`, publikt statiskt fält refererande till en frusen samling av möjliga färger kort kan ha.

#### Egenskaper

- `rank`, publik egenskap representerande ett korts värde.
- `suit`, publik egenskap representerande ett korts färg.

#### Metoder

- `toString`, publik metod som returnerar en sträng representerande aktuellt objekt (kortets värde följt av dess färg).
- `valueOf`, publik metod som returnerar ett tal  representerande aktuellt objekt (kortets värdet).

## Regler

### Kort

En vanlig kortlek om 52 kort används. Esset är värt 1 eller 14 poäng (vilket nu som är mest fördelaktigt för den aktuella handen), en kung är värd 13, en dam 12, en knekt 11 och övriga kort sin valör.

### Spelet idé

I Tjugoett gäller det att komma till, eller så nära som möjligt, summan 21 på två eller flera kort.

### Exempel

Given ger alla spelare ett kort var från draghögen (kortleken). Given tar inte själv något kort. Spelarna spelar nu mot given en i taget i turordning. När det är en spelares tur begär spelaren ett kort av given. Efter spelarens andra kort kan något av följande inträffa:

1. Spelaren har fått 21 och vinner direkt (naturlig vinst).
2. Spelaren har spruckit, d.v.s. fått en summa större än 21, och förlorar direkt.
3. Spelaren begär ytterligare kort tills summan är 21, har fem kort på handen, summan större än 21, eller förklara sig nöjd.
    - Har spelaren fem kort på handen och en summa mindre än 21 vinner spelaren direkt (naturlig vinst).

Om en spelare inte vunnit eller förlorat direkt utan istället förklarat sig nöjd är det givens tur att försöka straffa spelaren. Given drar kort från draghögen, ett efter ett, och något av följande kan inträffa:

1. Given får 21 och vinner.
2. Given har fem kort på handen, en summa mindre än 21 och vinner.
3. Given spricker och spelaren vinner.
4. Given förklarar sig nöjd. Spelaren och given jämför sina händers summor och den som har högst vinner. Om summorna är lika vinner given.

Given fortsätter sedan att spela mot näste spelare på samma sätt. Tar korten i draghögen slut, det understa kortet delas inte ut, tar given det återstående kortet i draghögen samt alla dittills avverka kort, blandar om dem och använder dem som en ny draghög.

Startpunkten för applikationen äe i `src\app.js`. Samtliga JavaScript-filer finns i katalogstruktur i katalogen `src`.

Antalet spelomgångar och spelare som ska delta skickas in som argument till applikationen. Anges inte antalet spelomgångar ska antalet vara en spelomgång som standard. Anges inte antalet spelare ska tre spelare delta som standard.

Anges `npm start` ska en spelomgång spelas där tre spelare utöver given deltar. Anges `npm start 2` ska två spelomgångar spelas där tre spelare utöver given deltar. Anges `npm start 4 7` ska fyra spelomgångar spelas där sju spelare deltar utöver given.

### Utfall

#### Exempel på utfall vid en spelomgång med en spelare vid bordet

Spelaren och given förklarar sig nöjda och given vinner då given har den högsta summan.

```
> npm start 1 1

> assignment-a3-twenty-one@2.0.0 start
> node src/app.js "1" "1"

--- Round #1 ---------------

Player #1: 6♣ 7♥ 2♣ (15)
Dealer   : 9♥ Kn♠ (20)
Dealer wins! ☹️
```

Spelaren får 21 och vinner direkt.

```
> npm start 1 1

> assignment-a3-twenty-one@2.0.0 start
> node src/app.js "1" "1"

--- Round #1 ---------------

Player #1: A♥ 10♠ A♣ 9♠ (21)
Dealer   : -
Player wins! 🎉
```

Spelaren och given är nöjda och har samma summa på handen varför given vinner.

```
> npm start 1 1

> assignment-a3-twenty-one@2.0.0 start
> node src/app.js "1" "1"

--- Round #1 ---------------

Player #1: 5♣ K♠ (18)
Dealer   : J♣ 7♥ (18)
Dealer wins! ☹️
```

Spelaren nöjd, given spricker varför spelaren vinner.

```
> npm start 1 1

> assignment-a3-twenty-one@2.0.0 start
> node src/app.js "1" "1"

--- Round #1 ---------------

Player #1: 3♦ 7♠ 5♠ (15)
Dealer   : 8♥ 6♥ J♦ (25) BUSTED!
Player wins! 🎉
```

Spelaren spricker varför given vinner direkt.

```
> npm start 1 1

> assignment-a3-twenty-one@2.0.0 start
> node src/app.js "1" "1"

--- Round #1 ---------------

Player #1: 4♣ 9♥ J♥ (24) BUSTED!
Dealer   : -
Dealer wins! ☹️
```

Spelaren drar fem kort och får en summa under 21 och vinner direkt.

```
> npm start 1 1

> assignment-a3-twenty-one@2.0.0 start
> node src/app.js "1" "1"

--- Round #1 ---------------

Player #1: 4♠ 6♦ 2♦ 2♠ 2♥ (16)
Dealer   : -
Player wins! 🎉
```

Spelaren nöjd, given drar fem kort och får en summa under 21 och vinner.

```
❯ npm start 1 1

> assignment-a3-twenty-one@2.0.0 start
> node src/app.js "1" "1"

--- Round #1 ---------------

Player #1: 2♥ 7♣ Kn♠ (20)
Dealer   : 2♠ 5♦ 7♦ A♠ 4♥ (19)
Dealer wins! ☹️
```

#### Exempel på utfall vid en spelomgång med tre spelare vid bordet

```
> npm start 1 3

> assignment-a3-twenty-one@2.0.0 start
> node src/app.js "1" "3"

--- Round #1 ---------------

Player #1: 2♣ 2♦ 6♥ 3♦ 6♦ (19)
Dealer: -
Player #1 wins! 🎉

Player #2: 3♣ A♣ (17)
Dealer: Q♣ 2♥ 5♠ (19)
Dealer wins! ☹️

Player #3: 4♣ A♠ (18)
Dealer: 10♦ Q♠ (22) BUSTED!
Player #3 wins! 🎉
```

#### Exempel på utfall vid en spelomgång med fem spelare vid bordet

```
> npm start 1 5

> assignment-a3-twenty-one@2.0.0 start C:\1dv025\assignment-a3-twenty-one
> node src/app.js "1" "5"

--- Round #1 ---------------

Player #1: 2♣ 9♣ K♥ (24) BUSTED!
Dealer: -
Dealer wins! ☹️

Player #2: 3♣ 7♣ 8♣ (18)
Dealer: 10♠ 8♦ (18)
Dealer wins! ☹️

Player #3: 4♣ 10♣ A♦ (15)
Dealer: 6♠ 9♥ (15)
Dealer wins! ☹️

Player #4: 5♣ 7♠ J♥ (23) BUSTED!
Dealer: -
Dealer wins! ☹️

Player #5: 6♣ 4♦ A♠ 8♠ (19)
Dealer: 7♦ J♠ (18)
Player #5 wins! 🎉
```

#### Exempel på utfall vid två spelomgångar med två spelare vid bordet

```
> npm start 2 2

> assignment-a3-twenty-one@2.0.0 start
> node src/app.js "2" "2"

--- Round #1 ---------------

Player #1: A♥ A♦ (15) 
Dealer: 6♥ 6♦ 7♠ (19)
Dealer wins! ☹️

Player #2: A♣ 4♣ (18)
Dealer: 3♣ 8♣ 4♠ K♥ (28) BUSTED!
Player #2 wins! 🎉

--- Round #2 ---------------

Player #1: J♣ 2♥ 5♥ (18)
Dealer: Q♦ Q♥ (24) BUSTED!
Player #1 wins! 🎉

Player #2: 8♥ 7♥ (15)
Dealer: 10♦ 10♠ (20)
Dealer wins! ☹️
```

#### Exempel på utfall vid felaktigt antal spelomgångar

```
> npm start 12 1

> assignment-a3-twenty-one@2.0.0 start C:\1dv025\assignment-a3-twenty-one
> node src/app.js "12" "1"

Error: Invalid number of rounds
    at ...
    at ModuleJob.run (node:internal/modules/esm/module_job:198:25)
    at async Promise.all (index 0)
    at async ESMLoader.import (node:internal/modules/esm/loader:409:24)
    at async loadESM (node:internal/process/esm_loader:85:5)
    at async handleMainPromise (node:internal/modules/run_main:61:12) {
  errorCode: 26
}
> echo $?
26
```

>👉 Beroende på terminal kan du ta reda på det senaste kommandots "exit code".
>
> - Bash: `echo $?`
> - PowerShell: `$LastExitCode`
> - Command Prompt: `@echo %errorlevel%`

#### Exempel på utfall vid en spelomgång med felaktigt antal spelare

```
> npm start 1 12

> assignment-a3-twenty-one@2.0.0 start C:\1dv025\assignment-a3-twenty-one
> node src/app.js "1" "12"

Error: Invalid number of players
    at ...
    at ModuleJob.run (node:internal/modules/esm/module_job:198:25)
    at async Promise.all (index 0)
    at async ESMLoader.import (node:internal/modules/esm/loader:409:24)
    at async loadESM (node:internal/process/esm_loader:85:5)
    at async handleMainPromise (node:internal/modules/run_main:61:12) {
  errorCode: 27
}
> echo $?
27
```

#### Exempel på utfall då det inte finns tillräckligt med kort i draghögen

```
> npm start 1 52

> assignment-a3-twenty-one@2.0.0 start
> node src/app.js "1" "52"

Error: Too few playing cards in the deck
    at ...
    at ModuleJob.run (node:internal/modules/esm/module_job:198:25)
    at async Promise.all (index 0)
    at async ESMLoader.import (node:internal/modules/esm/loader:409:24)
    at async loadESM (node:internal/process/esm_loader:85:5)
    at async handleMainPromise (node:internal/modules/run_main:61:12) {
  errorCode: 28
}
> echo $?
28
```
