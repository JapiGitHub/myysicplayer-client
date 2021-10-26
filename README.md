MYYsic Player:

ongelma:
koska soittolistani oli hajautunut ajansaatossa soudncloudiin sekä youtubeen, niin mulla ei ollut mitään paikkaa mistä hallita noita yhdessä. shuffle/random play varsinkin mahdotonta noista kaikista. olen usein vastuussa taustamusiikista illan viettohommissa joten:

ratkaisu:
Latasin pythonilla youtuben ja soundcloudin soittolistat aluksi local diskille. Tein aluksi vain rectilla, mutta koska se on front, niin sillä ei voi hakea koko kansion kaikkia tiedostoja näppärästi. Joten Node:sta backend jonne siirsin biisit jotta tiedostojen hallinta ja jako onnistuu hyvin. react frontend koska react on huikee. JWT suojaus koska copyrhights. Sivu tarkoitettu vain yksityiseen käyttöön.

    Pystyn lataamaan myös koneelta tai youtube/soundcloud URLista biisejä tonne ADD napilla.

tekeillä:
AWS EC2 serveri/deploy + NGINX
DONE: soundcloud lataus URLista myös, mulla on jossain tähän runko jo valmiina.
DONE: new users signuppia en luonnollisestikkaan ole tekemässä koska private use xD
omaan käyttöön ois ehkä näppärämpi tehdä jostain vanhasta läppäristä vaan serveri hmm? eli URLi ois vaa joku ip, mut omassa käytössä ei väliä
