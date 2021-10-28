# Myysic:

**AWS URL : http://13.48.136.183/**

![Alt Text](http://13.48.136.183/markdown.anim.gif)

## Ongelma:

koska soittolistani oli hajautunut ajansaatossa soudncloudiin sekä youtubeen, niin mulla ei ollut mitään paikkaa mistä hallita noita yhdessä. shuffle/random play varsinkin mahdotonta noista kaikista. olen usein vastuussa taustamusiikista illanviettohommissa joten:

## Ratkaisu:

Latasin pythonilla youtuben ja soundcloudin soittolistat aluksi local diskille. Tein soittimen aluksi vain rectilla, mutta koska se on front, niin sillä ei voi hakea koko kansion kaikkia tiedostoja näppärästi. Joten Node:sta backend jonne siirsin biisit jotta tiedostojen hallinta ja jako onnistuu hyvin. react frontend koska react on huikee. JWT suojaus koska copyrhights. Sivu tarkoitettu vain yksityiseen käyttöön.

---

> Minimalistinen: vain ne ominaisuudet mitä käytän eli _nextRandom, pause, search, addSong, queue, progressbar ja nopea login_
> (tokenit on pitkäikäisiä, eli jos localStoragesta löytyy, ni ei tarvi näpytellä).
>
> normal, portrait/mobile ja 4K modes supported.
>
> Pystyn lataamaan myös koneelta tai youtube/soundcloud URLista biisejä tonne ADD napilla.

---

_(clientti ja serveri jaettu omiin repoihin. git log on lyhyt koska mulla oli vahingossa livahtanut jossain kohtaa .mp4 tiedostoja gitignoren ohi gigoja joten alotin vaa uudestaan ton gitin.)_

_Tää on lähinnä oppimisen takia AWS:ssä, koska oikeaan omaan käyttöön mulla on vaan ylimääräinen läppäri joka hostaa sen ilmaiseksi tehokkaalla koneella (versus AWS free-tier microlla)._

---

Tekeillä:

- **DONE**: searchissa varsinkin toi tausta jatkuu liian pitkäksi. eli tee komponenttiin height={{laske se näytettävien biisien määrän mukaan}}, mutta älä tee ton laskun mappia JSX:ssä jotta ei renderöi turhaan..
- **DONE**: AWS EC2 serveri/deploy + NGINX
- **DONE**: soundcloud lataus URLista myös, mulla on jossain tähän runko jo valmiina.
- **DONE**: new users signuppia en luonnollisestikkaan ole tekemässä koska private use xD
