MYYsic Player:

ongelma:
koska soittolistani oli hajautunut ajansaatossa soudncloudiin sekä youtubeen, niin mulla ei ollut mitään paikkaa mistä hallita noita yhdessä. shuffle/random play varsinkin. olen usein vastuussa taustamusiikista illan viettohommissa joten:

ratkaisu:
Latasin pythonilla youtuben ja soundcloudin soittolistat aluksi local diskille.
sit Node:sta backend jonne siirsin ne jotta tiedostojen hallinta ja jako onnistuu hyvin. react frontend koska siitä mä tykkään. JWT suojaus koska copyrhights. Tämä on tietenkin tarkoitettu vain yksityiseen käyttöön.

    Pystyn lataamaan myös koneelta tai youtube URLista biisejä tonne ADD napilla.

tekeillä:
AWS EC2 serveri/deploy + NGINX
soundcloud lataus URLista myös, mulla on jossain tähän runko jo valmiina.
new users signuppia en luonnollisestikkaan ole tekemässä koska private use xD
omaan käyttöön ois ehkä näppärämpi tehdä jostain vanhasta läppäristä vaan serveri hmm ja URLi ois vaa joku ip?
