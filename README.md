# Myysic:

**AWS URL : https://myysic.xyz/**

![Alt Text](http://13.48.136.183/markdown.anim.gif)

## Ongelma:

koska soittolistani oli hajautunut ajansaatossa soudncloudiin sekä youtubeen, niin mulla ei ollut mitään paikkaa mistä hallita noita yhdessä. shuffle/random play varsinkin mahdotonta noista kaikista. olen usein vastuussa taustamusiikista illanviettohommissa joten:

## Ratkaisu:

Latasin pythonilla youtuben ja soundcloudin soittolistat aluksi local diskille. Tein soittimen aluksi vain rectilla, mutta koska se on front, niin sillä ei voi hakea koko kansion kaikkia tiedostoja näppärästi. Joten Node:sta backend jonne siirsin biisit jotta tiedostojen hallinta ja jako onnistuu hyvin. react frontend koska react on huikee. JWT suojaus koska copyrhights. Sivu tarkoitettu vain yksityiseen käyttöön.

![Alt Text](http://13.48.136.183/network.jpg)

---

> Minimalistinen: vain ne ominaisuudet mitä käytän eli _nextRandom, pause, search, addSong, queue, progressbar ja nopea login_
> (tokenit on pitkäikäisiä, eli jos localStoragesta löytyy, ni ei tarvi näpytellä).
>
> normal, portrait/mobile ja 4K modes supported.
>
> Pystyn lataamaan myös koneelta tai youtube/soundcloud URLista biisejä tonne ADD napilla.

---

_(clientti ja serveri jaettu omiin repoihin. git log on lyhyt koska mulla oli vahingossa livahtanut jossain kohtaa .mp4 tiedostoja gitignoren ohi gigoja joten alotin vaa uudestaan ton gitin.)_
https://github.com/JapiGitHub/myysicplayer-server

_Tää on lähinnä oppimisen takia AWS:ssä, koska oikeaan omaan käyttöön mulla on vaan ylimääräinen läppäri joka hostaa sen ilmaiseksi tehokkaalla koneella (versus AWS free-tier microlla)._

---

Tekeillä:

- ainiin ja checkaa se react render nykiminen. todnäk johtuu Sound komponentin playFromPosition propista?
- laita noden use cors({}) hyväksymään vain tarpeelliset paikat
- http kokonaan pois käytöstä kun development on valmis. 301 reroute nginx
- **DONE** muuta vielä routet /api taakse nodeen
- **DONE** ytdl ja koneelta lataaminen toimimaan myös taas deployn jälkeen.
- **DONE** HTTPS, route 53, certificate manger, loadbalancer, EC2, namecheap domain, nginx reverse proxy works
- **DONE** myysic.xyz ostettu 1$:lla xD joten pitää vielä se domainnimi ja SSL hoitaa tohon, ni sit alkais olee valmista?
- **DONE**: searchissa varsinkin toi tausta jatkuu liian pitkäksi. eli tee komponenttiin height={{laske se näytettävien biisien määrän mukaan}}, mutta älä tee ton laskun mappia JSX:ssä jotta ei renderöi turhaan..
- **DONE**: AWS EC2 serveri/deploy + NGINX
- **DONE**: soundcloud lataus URLista myös, mulla on jossain tähän runko jo valmiina.
- **DONE**: new users signuppia en luonnollisestikkaan ole tekemässä koska private use xD
