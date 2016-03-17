# Accesability

## Cookies

Bij het uitzetten van de cookies stopt de detail pagina met werken. Dit komt omdat er cookies nodig zijn om de ajax call te maken met de server.
Dit is te verhelpen als de app op een andere manier wordt opgezet, zodat deze geen json returned maar HTML

![cookies](/readme/nocookies.jpg)

## Kleuren

De website is te gebruiken zonder kleuren, Eerst was er spraken van slecht leesbare tekst in het zoekpaneel maar deze is nu verholpen door wat CSS

![cookies](/readme/color.jpg)

## CSS

De website is te gebruiken zonder CSS alleen is deze niet zo heel mooi omdat er een vrij grote loading gif standaard instaat en deze wordt doormiddel van CSS gehide.
Dit is op te lossen door de gif via javascript te injecteren in de html. Dit is express niet gedaan vanwege performance issues.

![cookies](/readme/css.jpg)

## Javascript

De website werkt niet zonder javascript. Alles is gebaseerd op deze taal en zonder JS is het onmogelijk om de data op te halen vanuit de server. Dit kan opgelost worden om de applicatie te schrijven
in een server side scripting language zoals: PHP of Node.js

## Screen Reader

De website werkt nu redelijk met screen readers, eerst was er geen onderscheid tussen foto's en de titels. Ook hadden de foto's een rare alt naam. Dit is via javascript opgelost.

## Custom Fonts

Deze website maakt hier geen gebruik van

## Local storage

De website werkt gedeeltelijk wel zonder Local storage alleen de Historie pagina werkt niet. Dit is op te lossen door de historie aan een gebruikers id te koppelen en op de server op te slaan.
Echter is dit een slecht idee.

## CDN

Mocht er een CDN uitvallen is deze website prima te gebruiken, Deze gebruikt geen CDN

## Adblockers 

Deze website werkt prima met adblockers enabled.

## TODO

Loading Gif fixen zodat deze niet geregeld wordt in de css.

Fixen zodat er geen cookies nodig zijn om de ajax call te returnen.