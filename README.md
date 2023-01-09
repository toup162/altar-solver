




# altar-solver

**altar-solver** is a web tool for planning Relic Altar configurations in Path of Exile. It provides a simple interface, modeled as closely as possible to the in-game experience.

![local_dem](https://user-images.githubusercontent.com/11641649/211340617-fd204058-5166-4da6-ab4b-76238f7ac4dd.gif)

## Problem Statement
### Relics and the Relic Altar
In Path of Exile, *Relics* benefit player power. Players are provided an *Altar* (similar to a Backpack) which affords  a limited space to choose Relics from which they want to benefit. Only Relics which are slotted into the Altar provide a benefit to the player.

Relics are randomly dropped items in-game, and appear in seven different forms with varying dimensions (depicted in the demo). Players have to plan their own unique configuration for several reasons, including
 

 - Relics are randomly acquired. Players' access to Relics will vary.
 - Players have different goals. A player's goals for their character will dramatically change which Relics they want to utilize in their Altar.

### The Relic Altar minigame, a Bin-packing problem
The Relic Altar is ostensibly an [Inventory Management Puzzle](https://tvtropes.org/pmwiki/pmwiki.php/Main/InventoryManagementPuzzle) -- or sometimes referred to as "Inventory Tetris".

Players are incentivized to fill the Altar with as many Relics as possible to maximize their benefits. They will have a particular set of Relics they want to use, but it is not immediately clear if it is possible to fit those Relics in the Altar.

The Relic Altar minigame strongly relates to the [Bin-packing problem](https://en.wikipedia.org/wiki/Bin_packing_problem) -- a widely studied NP-hard problem in Computer Science. This project somewhat arbitrarily addresses this problem using a simplified, loose implementation of the [Bansal Packing heuristic](https://www.win.tue.nl/~nikhil/pubs/Bansal-packing.pdf).
