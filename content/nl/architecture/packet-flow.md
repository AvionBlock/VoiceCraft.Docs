# Pakket- en gebeurtenisstroom

Op deze pagina wordt de conceptuele stroom uitgelegd in plaats van elk pakkettype op te sommen.

## Stroom op hoog niveau

1. een transportconsument authenticeert met VoiceCraft
2. entiteiten worden gecreëerd of ontdekt
3. updates van metadata vloeien voort in het VoiceCraft-wereldmodel
4. audiogerelateerde status is gesynchroniseerd
5. cliënten geven resulterend stemgedrag weer

## Typische evenementencategorieën

- inloggen / uitloggen
-ping/info
- entiteit creëren / vernietigen
- metadata-updates
- moderatie-updates
- effectupdates
- gebeurtenissen voor audio-overdracht

## Waarom dit ertoe doet

Bij het debuggen helpt het om te weten of uw probleem:

- auth-laag
- entiteitslaag
- Metagegevenssynchronisatie
- audiopijplijn

De meeste echte mislukkingen gebeuren omdat een van die lagen kapot is terwijl de andere er nog steeds gezond uitzien.
