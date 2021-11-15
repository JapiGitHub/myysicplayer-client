# Myysic React TypeScript clientti:

**AWS URL : https://myysic.xyz/**

nodejs backend:
https://github.com/JapiGitHub/myysicplayer-server

![Alt Text](https://myysic.xyz/myysic.new.login.gif)

## Ongelma:

Koska soittolistani oli hajautunut ajan saatossa soundcloudiin sekä youtubeen, niin minulla ei ollut mitään paikkaa mistä hallita noita yhdessä. shuffle/random play varsinkin mahdotonta noista kaikista. Välillä varsinkin youtubesta jotain biisejä saatetaan poistaa jne. mainokset ja youtubessa on joku maximi listan pituuskin.

## Ratkaisu:

Latasin pythonilla youtuben ja soundcloudin soittolistat aluksi local diskille. Tein soittimen aluksi vain reactilla (TypeScript), mutta koska se on frontend, niin sillä ei oikein voi hakea koko kansion kaikkia biisejä näppärästi. Joten Node:sta backend jonne siirsin biisit jotta tiedostojen hallinta ja tarjoilu onnistuu hyvin. React frontend koska react on huikee. JWT suojaus koska copyrhights jne + AWS ( Budgets, Certificate manager, Loadbalancer, EC2, Route 53 ) + https reverse proxy NGINX + PM2 aina ajamaan nodea. Testit on tehty Cypress:llä. Namecheapilta domaini dollarilla xD Sivu tarkoitettu vain yksityiseen omaan käyttööni ja jos joku haluaa käyttää pohjana omiin projekteihin, olen koittanut lisäillä .env tyhjiä pohjia sinne sitä varten.

![Alt Text](https://myysic.xyz/network.jpg)

---

> React + nginx + Node + AWS + JWT + httpS cert + Cypress for testing
>
> Minimalistinen: vain ne ominaisuudet mitä käytän eli _nextRandom, pause, search, addSong, queue, progressbar ja nopea login_
> (tokenit on pitkäikäisiä, eli jos localStoragesta löytyy, ni ei tarvi joka kerta näpytellä).
>
> normal, portrait/mobile ja 4K modes supported.
>
> Pystyn lataamaan myös koneelta tai youtube/soundcloud URLista biisejä tonne ADD napilla.

---

Tekeillä:

- Tee tota TypeScriptiä paremmaksi. liikaa anyjä xD
- **DONE** ~~Jest~~ ~~ReactTestingLibrary~~ Cypress testauksia yleisimmille reiteille.
- **DONE** fixaa mobile ja 4k scaalaukset
- **DONE** checkaa se react render nykiminen. todnäk johtuu Sound komponentin playFromPosition propista?
- laita noden use cors({}) hyväksymään vain tarpeelliset paikat
- http kokonaan pois käytöstä kun development on valmis. 301 reroute nginx
- **DONE** muuta vielä routet /api taakse nodeen
- **DONE** ytdl ja koneelta lataaminen toimimaan myös taas deployn jälkeen.
- **DONE** HTTPS, route 53, certificate manger, loadbalancer, EC2, namecheap domain, nginx reverse proxy works
- **DONE** myysic.xyz ostettu 1$:lla xD pitää vielä se SSL hoitaa tohon
- **DONE**: searchissa varsinkin toi tausta jatkuu liian pitkäksi. eli tee komponenttiin height={{laske se näytettävien biisien määrän mukaan}}, mutta älä tee ton laskun mappia JSX:ssä jotta ei renderöi turhaan..
- **DONE**: AWS EC2 serveri/deploy + NGINX
- **DONE**: apply AWS budgets, ettei yhtäkkiä tuu lasku ylläreitä. firebasessa emulatoria oon käytelly aiemmin vastaavaan laskujen torjuntaan.
- **DONE**: soundcloud lataus URLista myös, mulla on jossain tähän runko jo valmiina.
- **NOPE**: new users signuppia en luonnollisestikkaan ole tekemässä koska private use xD
