import { useState, useEffect, useRef } from "react";

const decades = [
  { id: "pre-1900s", label: "Pre-1900s", color: "#2C1810", bg: "#1a0f08", accent: "#C9A84C", gem: "#8B7355" },
  { id: "1900s",    label: "1900s",    color: "#1C1400", bg: "#120e00", accent: "#D4AF37", gem: "#B8860B" },
  { id: "1910s",    label: "1910s",    color: "#0D1F3C", bg: "#08111e", accent: "#C9A84C", gem: "#4169E1" },
  { id: "1920s",    label: "1920s",    color: "#2D0A2D", bg: "#1a061a", accent: "#D4AF37", gem: "#9B30FF" },
  { id: "1930s",    label: "1930s",    color: "#0A2010", bg: "#061208", accent: "#C9A84C", gem: "#228B22" },
  { id: "1940s",    label: "1940s",    color: "#2A1000", bg: "#180900", accent: "#D4AF37", gem: "#B22222" },
  { id: "1950s",    label: "1950s",    color: "#002828", bg: "#001515", accent: "#C9A84C", gem: "#008B8B" },
  { id: "1960s",    label: "1960s",    color: "#201800", bg: "#120e00", accent: "#D4AF37", gem: "#DAA520" },
  { id: "1970s",    label: "1970s–Present", color: "#1A0A2E", bg: "#0d0618", accent: "#C9A84C", gem: "#8B008B" },
];

const BADGES = {
  bootlegger:  { icon: "🚫", label: "Bootlegger",  title: "Made during Prohibition (1920–1933)" },
  classic:     { icon: "⭐", label: "Classic",      title: "Still widely made at serious bars today" },
  forgotten:   { icon: "💀", label: "Forgotten",    title: "Rarely or never made anymore" },
  tiki:        { icon: "🌴", label: "Tiki",          title: "Polynesian/Tiki era cocktail" },
  party_staple: { icon: "🎉", label: "Party Staple", title: "Still widely ordered — a crowd pleaser, not a craft bar staple" },
  shot:         { icon: "🥃", label: "Shot",         title: "Traditionally served as a shot" },
};

const cocktails = {
  "pre-1900s": [
    {
      name: "Whiskey Cobbler",
      badges: ["forgotten"],
      glass: "Collins glass or goblet",
      garnish: "Fresh seasonal fruit, mint sprig, powdered sugar",
      method: "Build",
      ingredients: ["2 oz rye whiskey", "1 tsp simple syrup", "2-3 slices fresh orange", "Crushed ice"],
      instructions: ["Fill glass with crushed ice.", "Add whiskey and simple syrup.", "Lay orange slices against the inside of the glass.", "Churn gently with a bar spoon.", "Add more crushed ice to dome above the rim.", "Garnish lavishly with fruit and mint.", "Dust with powdered sugar. Serve with a straw."],
      description: "The Cobbler was the most popular drink in America throughout the 19th century — a simple combination of spirit, sugar, citrus, and crushed ice that appeared on every bar in the country. Its decline is one of cocktail history's great mysteries.",
      region: "Nationwide; Jerry Thomas featured it prominently in the first cocktail book ever published",
      notable: "Charles Dickens became so obsessed with the Sherry Cobbler on his 1842 American tour that he wrote about it in his travel notes, describing the drinking straw as a wonderful American invention he had never seen before.",
      history: "The Cobbler predates the Civil War and was the definitive American drink for half a century. Jerry Thomas, widely considered the father of American bartending, opened his landmark 1862 book 'How to Mix Drinks' with multiple Cobbler recipes. The drink's reliance on crushed ice — made possible by New England's extraordinary ice-harvesting industry, which cut lake ice and shipped it nationwide — made it distinctly American. Its fall from fashion in the early 1900s coincided with the rise of the stirred cocktail and the influence of European drinking culture on American bars.",
      famousQuote: "\"The American Cobbler is the most delicious drink I have ever tasted.\" — Charles Dickens, American Notes, 1842",
    },
    {
      name: "Whiskey Flip",
      badges: ["forgotten"],
      glass: "Small wine glass or coupe",
      garnish: "Freshly grated nutmeg",
      method: "Shake",
      ingredients: ["2 oz rye whiskey or bourbon", "1 whole egg", "1 tsp sugar", "Ice"],
      instructions: ["Combine all ingredients in a shaker without ice.", "Dry shake vigorously for 20 seconds to emulsify the egg.", "Add ice and shake hard for another 15 seconds.", "Strain into glass.", "Grate nutmeg generously over the top."],
      description: "The Flip is one of the oldest cocktail categories in America — a whole egg shaken with spirit and sugar, topped with nutmeg. It predates every drink in this collection and was considered a nourishing meal substitute in colonial America.",
      region: "Colonial America; documented in tavern records as early as the 1690s",
      notable: "The original colonial Flip was made with beer, rum, and molasses, heated with a red-hot iron poker called a 'loggerhead' plunged into the drink. The term 'at loggerheads' — meaning in heated argument — may derive from tavern fights over the iron poker.",
      history: "The Flip predates the American Republic. Colonial taverns served it as a warming winter drink — beer or cider combined with rum or brandy, sweetened with molasses or sugar, and heated by plunging a hot iron poker into the mixture. The resulting caramelized, frothy drink was considered both nourishing and medicinal. By the 19th century the hot iron had been replaced by egg and ice, producing the cold Flip that Jerry Thomas documented in 1862. The whole-egg version largely disappeared with the rise of individual cocktail culture.",
      famousQuote: "\"The Flip was the drink of the colonial American winter — warming, nourishing, and entirely unlike anything you can order today.\" — David Wondrich",
    },
    {
      name: "Gin Fizz",
      badges: ["forgotten"],
      glass: "Collins glass",
      garnish: "Lemon wheel",
      method: "Shake and strain",
      ingredients: ["2 oz London Dry gin", "1 oz fresh lemon juice", "0.75 oz simple syrup", "Club soda to top"],
      instructions: ["Combine gin, lemon juice, and simple syrup in a shaker with ice.", "Shake well.", "Strain into Collins glass without ice.", "Top with club soda.", "Garnish with lemon wheel."],
      description: "The Gin Fizz was one of the most ordered drinks in America for over fifty years — the workhorse of the American bar from the 1880s through Prohibition. Its simplicity and refreshment made it a template for dozens of variations.",
      region: "Nationwide; documented by Jerry Thomas in 1876; particularly associated with New Orleans",
      notable: "New Orleans developed such an intense Gin Fizz culture that the city's bars competed fiercely on their versions. Henry Ramos's elaboration of the Gin Fizz into his signature creation required a relay team of bartenders — the Ramos Gin Fizz is essentially a Gin Fizz taken to its most obsessive extreme.",
      history: "The Fizz category — spirit, citrus, sugar, soda — was the defining template of late 19th century American bar culture. The Gin Fizz was its most popular expression, ordered from Manhattan to New Orleans to San Francisco. It was the drink that established carbonated water as an essential cocktail ingredient. Prohibition devastated the Fizz culture because the drinks depended on quality gin, which bootleg spirits couldn't replicate. The category never fully recovered its pre-Prohibition dominance.",
      famousQuote: "\"The Fizz is the most American of drinks — democratic, refreshing, and endlessly adaptable.\" — Jerry Thomas, How to Mix Drinks, 1876",
    },
    {
      name: "Eggnog",
      badges: ["classic"],
      glass: "Punch cup or rocks glass",
      garnish: "Freshly grated nutmeg, cinnamon stick",
      method: "Build or blend",
      ingredients: ["1.5 oz bourbon, brandy, or rum (or a combination)", "1 whole egg", "1 oz heavy cream", "0.75 oz simple syrup", "2 oz whole milk", "Freshly grated nutmeg"],
      instructions: ["Combine egg, cream, milk, spirit, and syrup in a shaker without ice.", "Dry shake vigorously for 20 seconds.", "Add ice and shake hard.", "Strain into glass.", "Grate nutmeg generously over the top."],
      description: "Eggnog is one of the oldest drinks in the American tradition, served at every holiday gathering since the colonial era. George Washington's recipe — which survives — called for rye whiskey, rum, and sherry in quantities that would render most modern drinkers horizontal.",
      region: "Colonial America; George Washington's Mount Vernon recipe is the most famous early American version",
      notable: "George Washington's eggnog recipe, preserved at Mount Vernon, calls for one pint of rye whiskey, one pint of Jamaica rum, and one pint of sherry for every dozen eggs. He also instructed that it be left to sit for several days before serving. His staff reportedly made it in enormous quantities each Christmas.",
      history: "Eggnog arrived in America from Britain, where posset — a similar milk-and-ale drink — had been popular since medieval times. The American version substituted local spirits for ale and became a holiday institution. Washington's recipe is the most famous surviving early American cocktail recipe and reveals how seriously the founding generation took their drinking. The non-alcoholic version is a 20th century invention; the original was always a fortified drink.",
      famousQuote: "\"To make Washington's Egg Nogg: One quart cream, one quart milk, one dozen tablespoons sugar, one pint brandy, half pint rye whiskey, half pint Jamaica rum, quarter pint sherry.\" — George Washington's recipe, Mount Vernon",
    },
    {
      name: "Stonewall",
      badges: ["forgotten"],
      glass: "Pewter mug or rocks glass",
      garnish: "None traditional",
      method: "Build",
      ingredients: ["2 oz applejack or apple brandy", "4 oz hard cider", "1 tsp sugar or maple syrup", "2 dashes Angostura bitters"],
      instructions: ["Add sugar and bitters to mug.", "Add applejack.", "Pour hard cider over.", "Stir gently.", "Serve at room temperature in winter or over ice in summer."],
      description: "The Stonewall was an American colonial tavern drink combining applejack — the original American spirit, made from frozen hard cider — with more cider, sugar, and bitters. It predates the American Republic and represents the original American drinking culture.",
      region: "Colonial New England and New York; applejack production centered in New Jersey and New England",
      notable: "Applejack was the original American spirit — made by leaving hard cider outside in winter to freeze, then removing the ice to concentrate the alcohol. This 'freeze distillation' or 'jacking' produced a spirit that was the dominant drink in colonial New England before whiskey took over.",
      history: "Applejack was America's first native spirit, produced in New England and New Jersey from the colonial era through the 19th century. The process of 'jacking' — freeze-concentrating hard cider — required no distillation equipment, making it accessible to any farmer with apple trees. The Stonewall combined this native spirit with the cider it was made from, producing a deeply American drink that predates bourbon, rye, and every other whiskey tradition. Laird's Applejack, established in 1698 in New Jersey, is the oldest licensed distillery in America.",
      famousQuote: "\"Applejack is the true spirit of America — it comes from the soil, from the cold, and from the apple tree.\" — Anonymous colonial-era saying",
    },
    {
      name: "Blue Blazer",
      badges: ["forgotten"],
      glass: "Silver or pewter mugs (two, for the pour)",
      garnish: "Lemon peel, powdered sugar",
      method: "Flamed pour between mugs",
      ingredients: ["2 oz Scotch whisky", "2 oz boiling water", "1 tsp honey", "Lemon peel"],
      instructions: ["Heat two metal mugs.", "Add whisky to one and boiling water to the other.", "Ignite the whisky.", "Pour the burning spirit back and forth between the mugs in a long arc of blue flame.", "Do this 4-5 times to mix and slightly dilute.", "Add honey.", "Pour into a serving mug.", "Garnish with lemon peel and powdered sugar.", "WARNING: this requires practice and proper safety precautions. Do not attempt at home."],
      description: "The Blue Blazer was created by Jerry Thomas — the father of American bartending — as the ultimate showmanship cocktail. The streams of flaming whisky passing between mugs produced a blue arc of fire that made Thomas the most famous bartender of the 19th century.",
      region: "Jerry Thomas's bar, New York City; also performed at his San Francisco establishments, 1850s-1880s",
      notable: "Jerry Thomas reportedly charged $1 for the Blue Blazer — at a time when most drinks cost 5-10 cents. The theatrical fire display was what you were paying for. Mark Twain wrote about seeing Thomas perform it and being thunderstruck.",
      history: "Jerry Thomas created the Blue Blazer and performed it as a theatrical spectacle that drew crowds. In an era before electric light and amplified entertainment, a bartender creating streams of blue fire in a dimly lit saloon was genuinely astonishing. Thomas traveled with his own silver mugs and performed the drink for the Prince of Wales during his 1860 American visit. The drink requires genuine skill — amateur attempts have resulted in burns and fires. It remains the most dramatic cocktail ever created.",
      famousQuote: "\"I saw Jerry Thomas make a Blue Blazer once. I have never forgotten it.\" — Mark Twain, attributed",
    },
    {
      name: "Shrub (Drinking Vinegar)",
      badges: ["forgotten"],
      glass: "Rocks glass or highball",
      garnish: "Fresh fruit, mint",
      method: "Build",
      ingredients: ["1.5 oz spirit of choice (rum, bourbon, or gin)", "1 oz fruit shrub (apple cider vinegar, fruit, and sugar, combined and aged)", "3 oz sparkling water", "Ice"],
      instructions: ["To make a simple shrub: combine equal parts fruit (macerated), sugar, and apple cider vinegar. Stir until sugar dissolves. Refrigerate 24-48 hours. Strain.", "Build in glass: add ice, spirit, shrub.", "Top with sparkling water.", "Garnish with fresh fruit and mint."],
      description: "Shrubs — drinking vinegars made from fruit, sugar, and vinegar — were one of the primary ways Americans preserved summer fruit in the pre-refrigeration era. Mixed with spirits and water, they were a standard 19th century cocktail ingredient that all but vanished and have been dramatically revived by the craft cocktail movement.",
      region: "Colonial America and 19th century America; shrub production was universal in any household with a fruit garden",
      notable: "Shrubs were so fundamental to 19th century American cooking and drinking that virtually every household cookbook included shrub recipes. They disappeared almost entirely with the advent of refrigeration and commercial fruit preservation. Their revival in the 2000s craft cocktail era has made them one of the most discussed rediscovered ingredients.",
      history: "Shrubs — from the Arabic 'sharab,' meaning drink — were preservation tools and flavor concentrates used throughout the colonial and 19th century American kitchen. Combined with water alone, they made a refreshing non-alcoholic drink; combined with spirits, they produced early cocktails. The craft cocktail movement's rediscovery of shrubs in the 2000s produced an entire sub-industry of artisanal drinking vinegars and restored the shrub to its rightful place as one of the most versatile cocktail ingredients ever conceived.",
      famousQuote: "\"A good shrub is a year's worth of summer in a bottle.\" — Anonymous 19th century homesteader",
    },
    {
      name: "Punch Romaine",
      badges: ["forgotten"],
      glass: "Punch cup or coupe",
      garnish: "None traditional",
      method: "Freeze and serve",
      ingredients: ["1 cup water", "0.5 cup sugar", "1 cup fresh lemon juice", "0.5 cup white rum", "2 egg whites", "0.5 cup Italian meringue (optional for texture)"],
      instructions: ["Combine water and sugar in a saucepan. Bring to a boil, stir until dissolved. Cool.", "Mix cooled syrup with lemon juice and rum.", "Beat egg whites to soft peaks.", "Fold egg whites into the mixture.", "Freeze until slushy — about 2 hours, stirring every 30 minutes.", "Serve in chilled coupes as a semi-frozen slush."],
      description: "Punch Romaine was the intermezzo course served aboard the RMS Titanic on the night of April 14, 1912 — the last elaborate course consumed before the ship struck the iceberg. It is one of history's most poignant cocktails.",
      region: "Fine dining establishments of the Edwardian era; served at RMS Titanic's First Class dinner, April 14, 1912",
      notable: "Punch Romaine was served to First Class passengers on the Titanic as the seventh of eleven courses on the last night. The menu has been preserved and is one of the most studied documents in culinary history. Multiple survivors specifically remembered the punch.",
      history: "Punch Romaine was a fashionable Edwardian intermezzo — a semi-frozen punch served between courses to cleanse the palate. It appeared on the menus of the finest hotels and ocean liners of the era. Its place in history was secured by the Titanic. The menu for the First Class dinner on April 14, 1912 — the night the ship sank — has been preserved, and Punch Romaine appears as the seventh course, served just hours before the iceberg collision. Multiple survivors mentioned it specifically in testimony and memoirs.",
      famousQuote: "\"The Punch Romaine was served. It was delicious. Then the ship hit the iceberg.\" — Survivor account, paraphrased",
    },
    {
      name: "Mint Julep",
      badges: ["classic"],
      glass: "Silver or pewter julep cup",
      garnish: "Bouquet of fresh mint, powdered sugar",
      method: "Build",
      ingredients: ["2.5 oz Kentucky bourbon", "0.5 oz simple syrup", "8-10 fresh mint leaves", "Crushed ice"],
      instructions: ["Add mint leaves and simple syrup to the julep cup.", "Gently press mint against the side of the cup — do not muddle aggressively.", "Fill cup two-thirds with crushed ice.", "Pour bourbon over ice.", "Top with more crushed ice to form a mound above the rim.", "Dust generously with powdered sugar.", "Garnish with a bouquet of mint. Serve immediately."],
      description: "The Mint Julep is one of the oldest American cocktails, predating the Republic itself. Its origins are Southern, its associations aristocratic, and its preparation the subject of more passionate argument than almost any other drink in American history.",
      region: "The American South, particularly Virginia and Kentucky; the official drink of the Kentucky Derby since 1938",
      notable: "Henry Clay, the Kentucky senator known as 'The Great Compromiser,' served Mint Juleps at his Washington D.C. parties and is credited with introducing the drink to the capital. Approximately 120,000 Mint Juleps are served at the Kentucky Derby each year.",
      history: "The Mint Julep appears in American records as early as 1803, described as a morning drink taken medicinally. Its original spirit was brandy or rye, not bourbon — the Kentucky association came later as bourbon production grew. The drink became a symbol of Southern aristocracy, served in silver cups on antebellum plantations. Its association with the Kentucky Derby began in 1938 when Churchill Downs adopted it as the official race drink.",
      famousQuote: "\"A mint julep is not the process of a vibrant cold — it is a ceremony and must be performed by a gentleman possessing a true sense of the artistic.\" — S.B. Buckner Jr., 1937",
    },
    {
      name: "Sazerac",
      badges: ["classic"],
      glass: "Old-fashioned glass (chilled)",
      garnish: "Lemon peel (expressed and discarded — never dropped in)",
      method: "Stir",
      ingredients: ["2 oz rye whiskey (or cognac for the original version)", "1 tsp simple syrup", "3 dashes Peychaud's bitters", "1 dash Angostura bitters", "Absinthe rinse"],
      instructions: ["Chill an Old Fashioned glass with ice water.", "In a mixing glass, combine rye, simple syrup, and both bitters with ice.", "Stir for 30 seconds.", "Discard ice and water from serving glass.", "Rinse chilled glass with a splash of absinthe, swirling to coat.", "Discard excess absinthe.", "Strain cocktail into prepared glass.", "Express lemon peel over the drink and run it around the rim. Discard peel — do not drop it in."],
      description: "The Sazerac may be the oldest named cocktail in American history, born in New Orleans from the cognac trade and Creole culture. It is now the official cocktail of the city of New Orleans.",
      region: "New Orleans, Louisiana — the Sazerac Coffee House on Royal Street",
      notable: "Antoine Amedie Peychaud, the Creole apothecary who invented Peychaud's Bitters in the 1830s, served early versions of this drink in an egg cup called a coquetier — which some historians believe is the origin of the word 'cocktail.'",
      history: "The Sazerac began in the 1850s as a brandy-based cocktail served at the Sazerac Coffee House in New Orleans, made with imported French cognac and Peychaud's bitters. When phylloxera devastated French vineyards in the 1870s and cognac became scarce, rye whiskey replaced brandy as the base. Thomas Handy, who took over the bar in 1869, codified the recipe that has been largely unchanged since. In 2008, the Louisiana state legislature officially designated the Sazerac as the official cocktail of New Orleans.",
      famousQuote: "\"The Sazerac is not a cocktail. It is a religion.\" — Stanley Clisby Arthur, Famous New Orleans Drinks and How to Mix 'Em, 1937",
    },
    {
      name: "Martinez",
      badges: [],
      glass: "Cocktail glass (chilled coupe)",
      garnish: "Lemon twist or maraschino cherry",
      method: "Stir",
      ingredients: ["1.5 oz Old Tom gin", "1.5 oz sweet vermouth", "0.25 oz maraschino liqueur", "2 dashes Angostura bitters"],
      instructions: ["Combine all ingredients in a mixing glass with ice.", "Stir for 30 seconds until well chilled.", "Strain into chilled cocktail glass.", "Garnish with lemon twist or cherry."],
      description: "The Martinez is the direct ancestor of the Martini — the missing link between 19th century cocktail culture and the drink that would define the 20th century. It is sweeter, richer, and more complex than its famous descendant.",
      region: "San Francisco or New York, depending on which origin story you believe; documented in Jerry Thomas's 1887 bartender's guide",
      notable: "Jerry Thomas, the first celebrity bartender in American history, is credited with creating the Martinez for a miner heading to the town of Martinez, California. The story is probably apocryphal but has never been convincingly disproven.",
      history: "The Martinez appeared in print in 1884 and in Jerry Thomas's influential guide in 1887. It used Old Tom gin — a sweetened style — and sweet vermouth in roughly equal proportions, making it far sweeter than the modern dry Martini it evolved into. As dry London gin replaced Old Tom and dry vermouth replaced sweet through the early 20th century, the Martinez gradually transformed into the Martini. Its rediscovery by the craft cocktail movement in the 2000s revealed just how much complexity had been lost in the evolution.",
      famousQuote: "\"The Martinez is what the Martini wanted to be when it grew up, before it decided to grow down instead.\" — David Wondrich, cocktail historian",
    },
    {
      name: "Old Fashioned",
      badges: ["classic"],
      glass: "Old fashioned glass (rocks glass)",
      garnish: "Orange peel, optionally a cherry",
      method: "Build",
      ingredients: ["2 oz bourbon or rye whiskey", "1 sugar cube (or 0.5 oz simple syrup)", "2-3 dashes Angostura bitters", "Splash of water", "Large ice cube"],
      instructions: ["Place sugar cube in glass.", "Add bitters and a splash of water.", "Muddle until sugar is dissolved.", "Add a large ice cube.", "Pour whiskey over ice.", "Stir gently 10-15 times.", "Express orange peel over the drink and either drop in or discard."],
      description: "The Old Fashioned is the oldest template for the word 'cocktail' itself — the original definition was spirit, sugar, water, and bitters. When bartenders began adding fruit, liqueurs, and elaborate modifications, traditionalists began ordering their drinks 'the old-fashioned way.'",
      region: "Louisville, Kentucky claims origin; the Pendennis Club there disputes the name with the Waldorf-Astoria in New York",
      notable: "President Franklin Roosevelt mixed Old Fashioneds for guests at the White House. Don Draper's Old Fashioned consumption on Mad Men revived the drink for a new generation. Ernest Hemingway drank them regularly at the Ritz Bar in Paris.",
      history: "The word 'cocktail' was first defined in print in 1806 as 'a stimulating liquor composed of spirits of any kind, sugar, water, and bitters.' This is precisely the Old Fashioned. The name came decades later, when customers at late 19th century bars began requesting their drinks in the old-fashioned style as bartenders added soda water and other ingredients. The Pendennis Club in Louisville claims a bartender named Martin Cuneo created the definitive version for Colonel James E. Pepper around 1880.",
      famousQuote: "\"I never go to bed without an Old Fashioned.\" — attributed to numerous historical figures, almost certainly apocryphally",
    },
    {
      name: "Manhattan",
      badges: ["classic"],
      glass: "Cocktail glass (chilled coupe or martini glass)",
      garnish: "Maraschino cherry, optionally a lemon twist",
      method: "Stir",
      ingredients: ["2 oz rye or bourbon", "1 oz sweet vermouth", "2 dashes Angostura bitters", "Optional: 1 dash orange bitters"],
      instructions: ["Combine all ingredients in a mixing glass with ice.", "Stir for 30-40 seconds until very cold and properly diluted.", "Strain into chilled cocktail glass.", "Garnish with cherry and/or lemon twist."],
      description: "The Manhattan is one of the great stirred cocktails and has never left the menu of any serious bar. It established the template of whiskey-vermouth-bitters that would define American cocktail culture.",
      region: "New York City; the Manhattan Club on Fifth Avenue claims origin, though the story is disputed by historians",
      notable: "The most famous origin story holds the Manhattan was created at a banquet hosted by Lady Randolph Churchill (Winston Churchill's American mother) at the Manhattan Club in the early 1870s. Food historians have largely debunked this, but the story refuses to die.",
      history: "The Manhattan was documented as early as 1882, when a New York newspaper described it as the fashionable new drink of the city's elite. Its combination of American whiskey and European vermouth captured the cosmopolitan ambitions of Gilded Age New York. The drink's reliance on rye whiskey meant it suffered when rye production collapsed after Prohibition. The craft cocktail revival restored rye to its rightful place. The Manhattan remains one of the three or four most ordered cocktails at serious bars worldwide.",
      famousQuote: "\"The proper union of spirits and vermouth is a great and sudden glory.\" — Bernard DeVoto, The Hour, 1948",
    },
    {
      name: "Champagne Punch",
      badges: ["forgotten"],
      glass: "Punch bowl and punch cups",
      garnish: "Citrus wheels, fresh berries, mint",
      method: "Build in punch bowl",
      ingredients: ["1 bottle Champagne or dry sparkling wine", "4 oz cognac", "4 oz maraschino liqueur", "4 oz fresh lemon juice", "2 oz simple syrup", "1 large block of ice", "Fresh fruit for garnish"],
      instructions: ["Place a large block of ice in a punch bowl.", "Combine cognac, maraschino, lemon juice, and simple syrup over the ice.", "Stir gently.", "Just before serving, pour Champagne down the side of the bowl to preserve bubbles.", "Arrange fresh fruit on top.", "Ladle into punch cups. Serves 8-10."],
      description: "Punch was the dominant social drink in America and Britain from the 17th through the 19th century — the cocktail had not yet been invented when punch bowls anchored every dinner party, political gathering, and public celebration.",
      region: "Nationwide in America and Britain; the transition from communal punch to individual cocktails is one of the great shifts in drinking culture",
      notable: "George Washington served Fish House Punch at Mount Vernon. Benjamin Franklin collected punch recipes throughout his life and is said to have had a favorite involving rum, brandy, and citrus. The shift from the punch bowl to the individual cocktail represented a fundamental change in how Americans socialized.",
      history: "Punch predates the cocktail by at least two centuries, arriving in Britain from India in the 1630s via the East India Company. The word 'punch' may derive from the Hindi 'panch,' meaning five — for the five traditional ingredients: spirit, water, sugar, citrus, and spice. For two hundred years, punch was the drink of choice at every social occasion in the English-speaking world. The shift from the communal punch bowl to the individual cocktail in the mid-19th century represented a fundamental change in how Americans drank — more private, more controlled, more focused on personal taste.",
      famousQuote: "\"Punch is the liquor of life.\" — Benjamin Franklin, letter to a friend, 1737",
    },
    {
      name: "Brandy Crusta",
      badges: ["forgotten"],
      glass: "Small wine glass or goblet",
      garnish: "Large spiral of lemon peel lining the inside of the glass, sugar rim",
      method: "Shake",
      ingredients: ["2 oz cognac", "0.5 oz orange curaçao", "0.5 oz fresh lemon juice", "1 tsp simple syrup", "2 dashes Angostura bitters", "Sugar for rim"],
      instructions: ["Sugar the rim of the glass.", "Cut a large spiral of lemon peel and drape it inside the glass.", "Combine all liquid ingredients in a shaker with ice.", "Shake well.", "Strain carefully into the prepared glass.", "Serve immediately."],
      description: "The Brandy Crusta is considered the grandfather of the sour cocktail family — the first recorded drink to use both citrus juice and a sugar-rimmed glass. Techniques it introduced now appear in hundreds of modern cocktails.",
      region: "New Orleans; created by Joseph Santini at his City Exchange bar in the 1840s",
      notable: "Jerry Thomas called the Brandy Crusta 'a rare and refreshing drink' and featured it prominently in his 1862 guide. Cocktail historian David Wondrich considers it one of the most important drinks in cocktail history for establishing the sour format and the sugar rim.",
      history: "Joseph Santini, a Sicilian-born bartender working in New Orleans in the 1850s, created the Brandy Crusta and introduced two techniques that would define cocktail culture for generations: the citrus juice ingredient and the sugar-and-citrus rim. The drink was documented by Jerry Thomas and spread through American bars. Its reliance on cognac meant it suffered when French vine disease devastated cognac production in the 1870s. Every drink with a salted or sugared rim — the Margarita, the Sidecar, the Cosmopolitan — owes its existence to Santini's invention.",
      famousQuote: "\"Every drink with a salted or sugared rim owes its existence to Joseph Santini's Brandy Crusta.\" — David Wondrich, Imbibe!, 2007",
    },
    {
      name: "Whiskey Sour",
      badges: ["classic"],
      glass: "Old fashioned glass or coupe",
      garnish: "Orange slice, cherry, optional frothy egg white top",
      method: "Shake",
      ingredients: ["2 oz bourbon or rye", "0.75 oz fresh lemon juice", "0.75 oz simple syrup", "Optional: 0.5 oz egg white for froth"],
      instructions: ["If using egg white: dry shake all ingredients without ice for 15 seconds to emulsify.", "Add ice and shake vigorously for another 15 seconds.", "If not using egg white: shake all ingredients with ice.", "Strain into glass over fresh ice or straight up in a coupe.", "Garnish with orange and cherry."],
      description: "The Whiskey Sour is one of the foundational cocktail templates — spirit, citrus, sweetener — that gave rise to hundreds of modern drinks. In its original 19th century form it was often made with egg white for a silky froth.",
      region: "Widespread throughout America; documented by Jerry Thomas in 1862",
      notable: "The Whiskey Sour was considered a ladies' cocktail in the 19th century — ironic given its current reputation as a robust whiskey drink. The egg white version was largely abandoned in the mid-20th century and restored by the craft cocktail movement.",
      history: "The sour template — spirit, citrus, sugar — is arguably the most important structural formula in cocktail history. Jerry Thomas documented it in 1862, and by the 1870s it appeared in every American bar manual. The original Whiskey Sour was often made with egg white, creating a silky, frothy texture considered elegant. The egg white version was largely abandoned in the mid-20th century for convenience, and was only restored by the craft cocktail movement of the 2000s.",
      famousQuote: "\"The Whiskey Sour is an honest drink. It asks nothing of you except good whiskey, fresh lemons, and a little patience.\" — Anonymous",
    },
    {
      name: "Sherry Cobbler",
      badges: ["forgotten"],
      glass: "Collins glass or goblet",
      garnish: "Seasonal fruit, mint, powdered sugar",
      method: "Build",
      ingredients: ["3 oz dry or medium sherry (Amontillado recommended)", "1 oz simple syrup", "2 slices orange", "Crushed ice"],
      instructions: ["Fill glass with crushed ice.", "Add sherry and simple syrup.", "Place orange slices inside the glass.", "Churn gently.", "Top with more crushed ice.", "Garnish lavishly with fruit and mint.", "Dust with powdered sugar. Serve with straws."],
      description: "The Sherry Cobbler was the most famous drink in the world for most of the 19th century — ordered in every American bar and celebrated in literature from London to San Francisco.",
      region: "Universal — equally popular in New York, Boston, San Francisco, and London, where American barrooms serving it were a tourist attraction",
      notable: "Mark Twain mentioned the Sherry Cobbler repeatedly in his writing. Charles Dickens wrote about it admiringly after his American tour. Anthony Trollope described an American barroom serving Sherry Cobblers as one of the wonders of the New World.",
      history: "The Sherry Cobbler's combination of sherry, citrus, and crushed ice was made possible by America's extraordinary ice industry — harvesting lake ice and shipping it nationwide. The drink became internationally famous partly because of the straw, then a novelty. When Europeans visited America, they often cited the Sherry Cobbler and the drinking straw as two of the most remarkable American innovations. Its decline came with the rise of whiskey-based cocktails and, eventually, Prohibition, which eliminated sherry supply chains.",
      famousQuote: "\"I raised it to my lips. It was perfection.\" — Charles Dickens, American Notes, 1842",
    },
    {
      name: "Tom Collins",
      badges: [],
      glass: "Collins glass",
      garnish: "Orange slice, maraschino cherry",
      method: "Shake and strain",
      ingredients: ["2 oz Old Tom gin (or London Dry)", "1 oz fresh lemon juice", "0.75 oz simple syrup", "Club soda to top", "Ice"],
      instructions: ["Combine gin, lemon juice, and simple syrup in a shaker with ice.", "Shake well.", "Strain into ice-filled Collins glass.", "Top with club soda.", "Stir gently once.", "Garnish with orange slice and cherry."],
      description: "The Tom Collins has one of the strangest origin stories in cocktail history — it began as a hoax that swept New York City in 1874 before becoming one of the most enduring drinks ever made.",
      region: "Created in London; became a New York sensation through the Great Tom Collins Hoax of 1874",
      notable: "The Great Tom Collins Hoax of 1874 swept New York City — people would tell friends that a man named Tom Collins had been saying terrible things about them, sending them on wild chases across town. The joke spread so far that bartenders began making a drink called the Tom Collins as a winking tribute.",
      history: "The drink is named after Old Tom gin, a sweetened style popular in the 19th century, and is a variation on the John Collins — a gin sling with lemon and soda. The 1874 New York prank made the name famous enough to be immortalized in cocktail books. The Tom Collins appeared on the subject of the first known cocktail recipe card in 1876. It survived Prohibition, both World Wars, and the decline of gin culture to remain a menu staple.",
      famousQuote: "\"Tom Collins — two words that will get you a drink or a wild goose chase, depending on the year.\" — Anonymous bartender, circa 1875",
    },
  ],
  "1900s": [
    {
      name: "Clover Club",
      badges: [],
      glass: "Cocktail glass (chilled coupe)",
      garnish: "Fresh raspberry or raspberry skewer",
      method: "Shake (dry shake first)",
      ingredients: ["2 oz London Dry gin", "0.75 oz fresh lemon juice", "0.75 oz raspberry syrup (or 0.5 oz simple syrup + 4-5 fresh raspberries)", "0.5 oz egg white"],
      instructions: ["Muddle raspberries in shaker if using fresh (or add raspberry syrup).", "Add gin, lemon juice, simple syrup, and egg white.", "Dry shake without ice for 15 seconds.", "Add ice and shake vigorously for another 15 seconds.", "Double strain into chilled coupe.", "Garnish with fresh raspberry."],
      description: "The Clover Club was the signature drink of Philadelphia's most exclusive male literary club, served at their monthly dinners at the Bellevue-Stratford Hotel. It was the cocktail of Edwardian America's intellectual elite.",
      region: "Philadelphia, Pennsylvania; the Bellevue-Stratford Hotel on Broad Street",
      notable: "The Clover Club was the monthly dining club of Philadelphia's most distinguished lawyers, journalists, and businessmen. Members included presidential cabinet members, Supreme Court justices, and newspaper publishers. Its 2008 namesake bar in Brooklyn helped trigger the modern cocktail revival.",
      history: "The Clover Club cocktail was named for the exclusive Philadelphia men's club that met monthly at the Bellevue-Stratford Hotel from the 1880s. The drink was considered extraordinarily sophisticated — its use of egg white for froth was a technique borrowed from Victorian-era drinks, and its combination of gin, lemon, and raspberry placed it firmly in the sour tradition. The drink nearly vanished after Prohibition disrupted the club's social structure. Its rediscovery by Julie Reiner, who opened Clover Club bar in Brooklyn in 2008, reintroduced it to a new generation.",
      famousQuote: "\"The Clover Club cocktail was as refined as the men who drank it.\" — David Wondrich",
    },
    {
      name: "Ramos Gin Fizz",
      badges: [],
      glass: "Collins glass",
      garnish: "Orange blossom water float, optional mint",
      method: "Shake (extensively — minimum 2 minutes)",
      ingredients: ["2 oz London Dry gin", "0.5 oz fresh lemon juice", "0.5 oz fresh lime juice", "1 oz simple syrup", "1 oz heavy cream", "1 egg white", "3 drops orange blossom water", "Club soda to top"],
      instructions: ["Combine all ingredients except soda in a shaker without ice.", "Dry shake vigorously for 2 minutes — this is not optional.", "Add ice and shake for another 2-3 minutes.", "Strain into Collins glass without ice.", "Slowly pour a small amount of soda down the side of the glass.", "The foam should rise above the rim of the glass.", "Serve immediately."],
      description: "The Ramos Gin Fizz requires extensive shaking — Henry Ramos employed a relay team of 'shaker boys' who passed the drink down the line during Mardi Gras. It is the most labor-intensive classic cocktail ever created.",
      region: "New Orleans; Henry C. Ramos's Imperial Cabinet Saloon on Gravier Street, created 1888",
      notable: "During Mardi Gras 1915, Henry Ramos had 35 bartenders working simultaneously just to keep up with demand. Governor Huey Long of Louisiana was so devoted to the Ramos Gin Fizz that he brought a New Orleans bartender to New York to teach the Hotel New Yorker staff the proper technique.",
      history: "Henry C. Ramos created his gin fizz in 1888 at the Imperial Cabinet Saloon in New Orleans and guarded the recipe with extraordinary secrecy for over twenty years. Ramos's insistence on extensive shaking — at least twelve minutes — was both a genuine technique for proper emulsification and a deliberate performance. During peak periods his shaker boys formed a relay, each shaking for a minute before passing to the next. When Ramos retired in 1919 at the start of Prohibition, he published the recipe for the first time.",
      famousQuote: "\"The Ramos Gin Fizz is the only cocktail worth waiting for.\" — Huey Long, Governor of Louisiana",
    },
    {
      name: "Corpse Reviver No. 2",
      badges: [],
      glass: "Cocktail glass (chilled coupe)",
      garnish: "Lemon twist",
      method: "Shake",
      ingredients: ["0.75 oz London Dry gin", "0.75 oz Cointreau", "0.75 oz Lillet Blanc (or Cocchi Americano)", "0.75 oz fresh lemon juice", "1 dash absinthe"],
      instructions: ["Rinse the chilled coupe with absinthe — swirl to coat, discard excess.", "Combine all remaining ingredients in a shaker with ice.", "Shake vigorously.", "Strain into prepared coupe.", "Garnish with lemon twist."],
      description: "The Corpse Reviver No. 2 was designed as a morning-after restorative. Harry Craddock's original recipe note warned that four taken in quick succession would 'unrevive the corpse again.'",
      region: "London; The Savoy Hotel American Bar, documented by Harry Craddock in The Savoy Cocktail Book (1930)",
      notable: "Harry Craddock was an American-born head bartender of the Savoy's American Bar who fled to London during Prohibition, taking his American cocktail knowledge with him. His Savoy Cocktail Book remains one of the most important cocktail references ever published.",
      history: "The Corpse Reviver series was a category of morning restorative drinks. Harry Craddock documented multiple versions in his 1930 Savoy Cocktail Book. The No. 2 is the most beloved — a perfect balance of gin, citrus, and the gentle bitterness of Lillet. His famous note about unreviving the corpse is one of the great lines in cocktail literature.",
      famousQuote: "\"To be taken before 11 a.m., or whenever steam and energy are needed. Four of these taken in swift succession will unrevive the corpse again.\" — Harry Craddock, The Savoy Cocktail Book, 1930",
    },
    {
      name: "Dry Martini",
      badges: ["classic"],
      glass: "Martini glass or chilled coupe",
      garnish: "Lemon twist or olive (never both)",
      method: "Stir",
      ingredients: ["2.5 oz London Dry gin", "0.5 oz dry vermouth", "1 dash orange bitters (optional, for the classic version)"],
      instructions: ["Fill mixing glass with ice.", "Add gin and dry vermouth.", "Stir for 30-40 seconds.", "Strain into chilled glass.", "Express lemon peel over the surface and either drop in or discard.", "Or garnish with olive. Never both."],
      description: "The Dry Martini is the most argued-about cocktail in history — the ratio of gin to vermouth has inspired more heated debate than almost any political question. Its evolution from sweet to dry to almost vermouth-free tracks the entire 20th century's relationship with alcohol.",
      region: "New York City and London simultaneously; the Knickerbocker Hotel and the Savoy both claim key roles",
      notable: "Winston Churchill's instruction was to make a Martini by glancing at the vermouth bottle across the room. Ernest Hemingway specified exactly 15:1 gin to vermouth. James Bond's vodka Martini, shaken, horrified both gin lovers and anyone who knew how to make a Martini properly.",
      history: "The Martini evolved from the Martinez and the sweet Martini of the 1880s, gradually drying out through the early 20th century as gin quality improved and vermouth fell from fashion. By the 1930s the ratio had shifted from equal parts to 3:1, and by the 1950s some bars were serving Martinis with no measurable vermouth. The craft cocktail movement restored vermouth to the Martini, to the horror of some traditionalists.",
      famousQuote: "\"I had never tasted anything so cool and clean. They made me feel civilized.\" — Ernest Hemingway, A Farewell to Arms, 1929",
    },
    {
      name: "Gimlet",
      badges: ["classic"],
      glass: "Cocktail glass or rocks glass",
      garnish: "Lime wedge or lime wheel",
      method: "Stir or shake",
      ingredients: ["2 oz London Dry gin", "0.75 oz Rose's lime cordial (traditional) or fresh lime juice with 0.5 oz simple syrup"],
      instructions: ["Combine all ingredients in a mixing glass or shaker with ice.", "Stir (if using cordial) or shake (if using fresh lime).", "Strain into chilled glass.", "Garnish with lime."],
      description: "The Gimlet began as a Royal Navy health measure — the lime cordial that prevented scurvy mixed with the daily gin ration. It became one of the defining British colonial cocktails and a symbol of expatriate drinking culture.",
      region: "British Royal Navy; spread to British colonial outposts worldwide and eventually to London and American bars",
      notable: "Raymond Chandler's Philip Marlowe famously defines the proper Gimlet in 'The Long Goodbye' (1953): 'A real Gimlet is half gin and half Rose's lime juice and nothing else. It beats Martinis hollow.' This line cemented Rose's lime cordial as the canonical ingredient.",
      history: "The Gimlet's origins are naval — the British Navy required sailors to take a daily lime ration to prevent scurvy, and mixing it with the daily gin ration was natural. Rose's lime cordial, developed by Lauchlin Rose in 1867 as a way to preserve lime juice without alcohol, became the standard ingredient. Raymond Chandler's postwar writing captured the preserved-cordial version at its peak. The debate between fresh lime and cordial versions has continued since.",
      famousQuote: "\"A real Gimlet is half gin and half Rose's Lime Juice and nothing else. It beats Martinis hollow.\" — Philip Marlowe (Raymond Chandler), The Long Goodbye, 1953",
    },
    {
      name: "Pisco Sour",
      badges: ["classic"],
      glass: "Cocktail glass (chilled coupe)",
      garnish: "3 drops Angostura bitters on foam, lime wheel",
      method: "Shake",
      ingredients: ["2 oz Pisco (Peruvian preferred)", "1 oz fresh lime juice", "0.75 oz simple syrup", "0.5 oz egg white", "2 dashes Angostura bitters (for garnish)"],
      instructions: ["Combine Pisco, lime, simple syrup, and egg white in a shaker without ice.", "Dry shake vigorously for 15 seconds.", "Add ice and shake hard for another 15 seconds.", "Strain into chilled coupe.", "Drop 3 dots of Angostura onto the foam and draw a toothpick through them."],
      description: "The Pisco Sour is the national cocktail of both Peru and Chile — a fact that has caused genuine diplomatic friction between the two countries for over a century.",
      region: "Lima, Peru — Morris's Bar, where American bartender Victor Vaughen Morris created it around 1920",
      notable: "Victor Vaughen Morris was an American bartender from Salt Lake City who moved to Lima around 1904 and opened Morris's Bar. He created the Pisco Sour by adapting the Whiskey Sour template to Peru's native spirit. July 25 is National Pisco Sour Day in Peru.",
      history: "Victor Morris opened his bar in Lima in 1916 and began adapting the Whiskey Sour using Pisco, the local grape-based spirit. After Morris's death, his bartender Mario Bruiget added the egg white and Angostura bitters garnish that define the modern version. The ongoing dispute with Chile over the drink's origin has been described as the most bitter cocktail argument in history.",
      famousQuote: "\"A Pisco Sour properly made is one of the finest cocktails in the world. Improperly made, it is a crime against the grape.\" — Anonymous Lima bartender",
    },
    {
      name: "Bamboo",
      badges: ["forgotten"],
      glass: "Cocktail glass (chilled coupe)",
      garnish: "Lemon twist",
      method: "Stir",
      ingredients: ["1.5 oz dry sherry (fino or manzanilla)", "1.5 oz dry vermouth", "1 dash orange bitters", "1 dash Angostura bitters"],
      instructions: ["Combine all ingredients in a mixing glass with ice.", "Stir for 30 seconds until very cold.", "Strain into chilled coupe.", "Garnish with lemon twist."],
      description: "The Bamboo is a low-alcohol stirred cocktail created in Yokohama, Japan in the 1890s — one of the earliest cocktails created outside Europe or America, and one of the finest forgotten drinks in the entire canon.",
      region: "Grand Hotel, Yokohama, Japan; created by Louis Eppinger, an American bartender, around 1893",
      notable: "Louis Eppinger was the head bartender at the Grand Hotel in Yokohama, which served the international community in Japan during the Meiji era. His Bamboo was considered the finest cocktail in Asia and was served to diplomats, naval officers, and merchants from around the world.",
      history: "The Bamboo was created by Louis Eppinger at the Grand Hotel in Yokohama around 1893, making it one of the earliest cocktails with a documented non-Western origin. It appeared in Harry Johnson's 1900 bartending manual and was widely known in the early 20th century. The drink's genius is its restraint — combining two low-alcohol, complex ingredients (sherry and vermouth) with bitters produces something surprisingly rich and complex. The craft cocktail movement rediscovered it as a template for low-ABV cocktails.",
      famousQuote: "\"The Bamboo is proof that a great cocktail needs neither a high-proof spirit nor a famous origin story.\" — Anonymous",
    },
    {
      name: "Bijou",
      badges: ["forgotten"],
      glass: "Cocktail glass (chilled coupe)",
      garnish: "Cherry, lemon twist",
      method: "Stir",
      ingredients: ["1 oz London Dry gin", "1 oz sweet vermouth", "1 oz green Chartreuse", "1 dash orange bitters"],
      instructions: ["Combine all ingredients in a mixing glass with ice.", "Stir for 30 seconds.", "Strain into chilled coupe.", "Garnish with cherry and lemon twist."],
      description: "The Bijou — French for 'jewel' — was named for its three jewel-colored ingredients: gin (diamond), sweet vermouth (ruby), and green Chartreuse (emerald). It was one of the most sophisticated drinks of the Gilded Age.",
      region: "New York City; documented by Harry Johnson in his 1900 bartending manual",
      notable: "The Bijou is arguably the most complex three-ingredient cocktail ever created — green Chartreuse alone contains 130 different herbs. Combined with gin and sweet vermouth, the result is layered in ways that take multiple sips to fully comprehend.",
      history: "The Bijou appeared in Harry Johnson's influential 1900 Bartenders' Manual. It was widely made in the pre-Prohibition era, when Chartreuse was readily available and bartenders were comfortable with herb-forward liqueurs. Prohibition's disruption of liqueur imports caused the drink to largely disappear. Green Chartreuse's complex herbal quality intimidated post-Prohibition bartenders who were accustomed to simpler flavor profiles. The craft cocktail movement's embrace of complex liqueurs restored the Bijou to menus.",
      famousQuote: "\"The Bijou is what happens when a bartender decides to make a cocktail out of three of the most complex things in the bar.\" — Anonymous",
    },
    {
      name: "Brown Derby",
      badges: ["forgotten"],
      glass: "Cocktail glass (chilled coupe)",
      garnish: "Grapefruit twist",
      method: "Shake",
      ingredients: ["2 oz bourbon", "1 oz fresh grapefruit juice", "0.5 oz honey syrup (2:1 honey to water)"],
      instructions: ["Make honey syrup: combine 2 parts honey with 1 part hot water, stir until dissolved, cool.", "Combine all ingredients in a shaker with ice.", "Shake well.", "Strain into chilled coupe.", "Garnish with grapefruit twist."],
      description: "The Brown Derby was created at the famous hat-shaped Hollywood restaurant of the same name — the celebrity haunt where Clark Gable, Humphrey Bogart, and the entire golden age of Hollywood gathered to eat, drink, and be photographed.",
      region: "The Brown Derby restaurant, Hollywood, California, 1930s",
      notable: "The Brown Derby restaurant on Wilshire Boulevard in Los Angeles, shaped like a giant derby hat, was the defining celebrity restaurant of Hollywood's golden age. It is also credited with inventing the Cobb Salad. The cocktail named for it perfectly captures the glamour of 1930s Hollywood.",
      history: "The Brown Derby cocktail was created at the original Brown Derby restaurant in Hollywood during the 1930s. The restaurant was the epicenter of Hollywood social life — every major star, director, and studio executive ate there regularly. The cocktail's combination of bourbon, grapefruit, and honey is a template that the craft cocktail movement has embraced in numerous variations. It appeared in cocktail books of the era and was largely forgotten until its rediscovery.",
      famousQuote: "\"At the Brown Derby, you were always just two tables away from a movie star.\" — Marlene Dietrich",
    },
    {
      name: "Scofflaw",
      badges: ["bootlegger", "forgotten"],
      glass: "Cocktail glass (chilled coupe)",
      garnish: "Lemon twist or orange twist",
      method: "Shake",
      ingredients: ["1.5 oz rye whiskey", "1 oz dry vermouth", "0.75 oz fresh lemon juice", "0.5 oz grenadine", "1 dash orange bitters"],
      instructions: ["Combine all ingredients in a shaker with ice.", "Shake well.", "Strain into chilled coupe.", "Garnish with lemon or orange twist."],
      description: "The Scofflaw was created at Harry's New York Bar in Paris in 1924, named for a newly coined word describing someone who flouts the law — specifically Prohibition. Americans in Paris drinking legally were delighted to embrace the identity.",
      region: "Harry's New York Bar, Paris, France, 1924",
      notable: "The word 'scofflaw' was coined in 1924 as the winning entry in a contest held by a Prohibition supporter to name people who flouted the Volstead Act. Americans in Paris immediately adopted it as a badge of honor and Harry MacElhone named a cocktail for it.",
      history: "In January 1924, a Boston millionaire named Delcevare King held a contest to create a word describing someone who broke Prohibition laws. The winning entry was 'scofflaw,' coined by two people simultaneously. The word was widely reported in international newspapers. Americans drinking at Harry's New York Bar in Paris — where they could drink legally — immediately embraced the term, and bartender Jock at Harry's created this cocktail to celebrate their collective identity as law-flouters.",
      famousQuote: "\"We are all scofflaws now.\" — Toast heard at Harry's New York Bar, Paris, 1924",
    },
    {
      name: "Salty Dog",
      badges: ["forgotten"],
      glass: "Rocks or highball glass (salt rim)",
      garnish: "Salt rim, grapefruit wedge",
      method: "Build",
      ingredients: ["2 oz gin (or vodka)", "4 oz fresh grapefruit juice", "Salt rim"],
      instructions: ["Run a grapefruit wedge around the rim of the glass.", "Dip rim in salt.", "Fill glass with ice.", "Add gin.", "Pour grapefruit juice over.", "Stir gently.", "Garnish with grapefruit wedge."],
      description: "The Salty Dog is a Greyhound with a salted rim — the salt transforming the bittersweet grapefruit and gin combination into something genuinely extraordinary. It was one of the most popular drinks in America in the 1950s and has been largely forgotten since.",
      region: "Widespread in America from the 1950s; exact origin unclear",
      notable: "The Greyhound — gin and grapefruit juice without the salt — is the Salty Dog's less interesting sibling. The salt makes all the difference, enhancing the grapefruit's sweetness and cutting its bitterness in a way that transforms the drink entirely.",
      history: "The Salty Dog emerged in the 1950s as an American bar staple and was particularly popular in coastal areas where grapefruit juice was readily available. The salt rim — borrowed from the Margarita tradition — elevated the Greyhound into something more sophisticated. Its decline coincided with the decline of grapefruit juice as a fashionable mixer in the 1970s and 80s. The craft cocktail movement's embrace of citrus has given it a modest revival.",
      famousQuote: "\"The Salty Dog is what the Greyhound always wanted to be.\" — Anonymous",
    },
    {
      name: "Clover Club (Egg White)",
      badges: ["forgotten"],
      glass: "Cocktail glass (chilled coupe)",
      garnish: "3 fresh raspberries on a pick",
      method: "Shake (reverse dry shake)",
      ingredients: ["2 oz London Dry gin", "0.75 oz fresh lemon juice", "0.75 oz raspberry syrup", "0.75 oz egg white"],
      instructions: ["Add all ingredients to a shaker WITH ice first.", "Shake hard for 15 seconds.", "Strain into the shaker (removing ice).", "Dry shake without ice for 15 seconds — this is the 'reverse dry shake' which produces better foam.", "Strain into chilled coupe.", "Garnish with three raspberries on a pick."],
      description: "The reverse dry shake variation of the Clover Club — a technique developed by the craft cocktail movement that produces a thicker, more stable foam than the traditional method.",
      region: "Contemporary craft bars; technique developed in the 2000s craft cocktail era",
      notable: "The reverse dry shake — shaking with ice first, then straining and shaking again without ice — was developed by craft bartenders who found it produced superior foam texture. It has become the standard technique for egg white cocktails at serious bars.",
      history: "The reverse dry shake was developed in the early 2000s as craft bartenders experimented with egg white techniques. Standard dry shaking (without ice first) produces good foam, but the reverse method — ice first, then dry — creates a denser, creamier foam that lasts longer and has a more luxurious texture. The Clover Club became the standard demonstration drink for this technique because its raspberry flavor showcases the foam's quality.",
      famousQuote: "\"The reverse dry shake changed everything about how we think about egg white cocktails.\" — Anonymous craft bartender",
    },
  ],
  "1910s": [
    {
      name: "Last Word",
      badges: ["classic"],
      glass: "Cocktail glass (chilled coupe)",
      garnish: "Maraschino cherry, lime wheel",
      method: "Shake",
      ingredients: ["0.75 oz London Dry gin", "0.75 oz green Chartreuse", "0.75 oz maraschino liqueur", "0.75 oz fresh lime juice"],
      instructions: ["Combine all ingredients in a shaker with ice.", "Shake vigorously.", "Strain into chilled coupe.", "Garnish with cherry and lime wheel."],
      description: "The Last Word was created at the Detroit Athletic Club around 1916 and performed by comedian Frank Fogarty as part of his vaudeville act. It was largely forgotten for 80 years before Murray Stenson in Seattle revived it in 2004 and triggered a global rediscovery.",
      region: "Detroit Athletic Club, Detroit, Michigan; rediscovered at Zig Zag Café, Seattle, Washington",
      notable: "Murray Stenson found the Last Word in Ted Saucier's 1951 book 'Bottoms Up' and put it on his menu at the Zig Zag Café in Seattle. Its rediscovery triggered a movement of bartenders seeking forgotten recipes — effectively launching the modern craft cocktail revival.",
      history: "The Last Word was created at the Detroit Athletic Club in 1916 and reportedly introduced by vaudeville performer Frank Fogarty. It appeared in Ted Saucier's 1951 cocktail book but was otherwise ignored for half a century. When Murray Stenson put it on his menu in Seattle in the early 2000s, it became so popular it changed the direction of American cocktail culture. Bartenders began actively searching old books for forgotten recipes, launching a movement that transformed how Americans drink.",
      famousQuote: "\"Finding the Last Word felt like finding a lost painting in someone's attic.\" — Murray Stenson, bartender",
    },
    {
      name: "Bee's Knees",
      badges: ["bootlegger"],
      glass: "Cocktail glass (chilled coupe)",
      garnish: "Lemon twist",
      method: "Shake",
      ingredients: ["2 oz London Dry gin", "0.75 oz fresh lemon juice", "0.75 oz honey syrup (2:1 honey to hot water, cooled)"],
      instructions: ["Make honey syrup: combine 2 parts honey with 1 part hot water, stir until dissolved, cool.", "Combine gin, lemon juice, and honey syrup in a shaker with ice.", "Shake well.", "Strain into chilled coupe.", "Garnish with lemon twist."],
      description: "The Bee's Knees was created specifically to mask the taste of Prohibition-era bathtub gin — the honey and lemon disguised rough, often dangerous spirits. Its name was 1920s slang for 'the best.'",
      region: "American speakeasies, 1920s; also attributed to Frank Meier at the Paris Ritz",
      notable: "'The bee's knees' was 1920s slang for something excellent — along with 'the cat's pajamas' and 'the elephant's eyebrows.' The drink embodied the era's determined cheerfulness about drinking illegally.",
      history: "The Bee's Knees emerged in the early years of Prohibition as bartenders scrambled to make bathtub gin palatable. The combination of lemon juice and honey effectively masked the harsh, often dangerous home-distilled spirits being served in speakeasies. Frank Meier, the head bartender at the Paris Ritz where many Americans fled to drink legally during Prohibition, is sometimes credited with its creation.",
      famousQuote: "\"During Prohibition, the best thing you could say about a cocktail was that you couldn't taste the gin. The Bee's Knees was the best thing about the worst gin.\" — Anonymous",
    },
    {
      name: "Aviation",
      badges: ["classic"],
      glass: "Cocktail glass (chilled coupe)",
      garnish: "Maraschino cherry, optional violet",
      method: "Shake",
      ingredients: ["2 oz London Dry gin", "0.5 oz maraschino liqueur", "0.25 oz crème de violette", "0.75 oz fresh lemon juice"],
      instructions: ["Combine all ingredients in a shaker with ice.", "Shake well.", "Strain into chilled coupe.", "Garnish with a cherry.", "The crème de violette gives the drink its distinctive sky-blue color."],
      description: "The Aviation is named for the era of early aviation and its sky-blue color from crème de violette. It was almost lost to history when that ingredient became virtually unavailable for fifty years.",
      region: "New York City; created by Hugo Ensslin, head bartender at the Hotel Wallick, documented in his 1916 cocktail guide",
      notable: "The Aviation was almost lost because crème de violette became virtually unavailable in the mid-20th century. When Rothman & Winter relaunched their crème de violette in America in 2007, bartenders immediately began making the Aviation again — one ingredient's disappearance and reappearance determined a drink's fifty-year absence.",
      history: "Hugo Ensslin documented the Aviation in 1916, in what may be the last comprehensive American cocktail guide published before Prohibition. The drink's signature ingredient — crème de violette — gave it a ghostly blue color and a floral quality considered sophisticated in the Edwardian era. When crème de violette production largely ceased in America mid-century, the Aviation recipe in most books dropped the ingredient entirely, making a completely different (and inferior) drink.",
      famousQuote: "\"The Aviation is what gin tastes like when it's trying to be the sky.\" — Anonymous",
    },
    {
      name: "French 75",
      badges: ["classic"],
      glass: "Champagne flute or coupe",
      garnish: "Lemon twist",
      method: "Shake and top",
      ingredients: ["1.5 oz London Dry gin (or cognac for the New Orleans version)", "0.75 oz fresh lemon juice", "0.5 oz simple syrup", "Champagne to top (about 2 oz)"],
      instructions: ["Combine gin, lemon juice, and simple syrup in a shaker with ice.", "Shake well.", "Strain into flute or coupe.", "Top with Champagne.", "Garnish with lemon twist."],
      description: "The French 75 was named for the French 75mm field gun used in World War I — the drink was said to hit with the same force as the artillery piece. Created as a morale drink during the war.",
      region: "Paris; Harry's New York Bar during World War I; also claimed by Arnaud's Restaurant in New Orleans",
      notable: "Harry MacElhone of Harry's New York Bar is often credited with popularizing the drink during WWI. Marlene Dietrich called it 'the most powerful drink in the world, disguised as a harmless one.' Noel Coward drank them throughout his career.",
      history: "The French 75 appeared in print first in 1915 and was popularized at Harry's New York Bar in Paris during World War I. Harry MacElhone published the recipe in 1923. The drink's name referenced the French 75mm field artillery piece that had become a symbol of Allied military capability. A debate exists about whether the original used gin or cognac; the New Orleans version at Arnaud's Restaurant traditionally uses cognac.",
      famousQuote: "\"The French 75 is such a clever drink. It looks innocent and hits you like a shell.\" — Marlene Dietrich",
    },
    {
      name: "Southside",
      badges: ["bootlegger"],
      glass: "Cocktail glass (chilled coupe) or Collins glass",
      garnish: "Fresh mint sprig",
      method: "Shake",
      ingredients: ["2 oz London Dry gin", "1 oz fresh lime juice", "0.75 oz simple syrup", "8-10 fresh mint leaves"],
      instructions: ["Combine mint and simple syrup in shaker.", "Muddle gently.", "Add gin, lime juice, and ice.", "Shake vigorously.", "Double strain into chilled glass to remove mint fragments.", "Garnish with fresh mint."],
      description: "The Southside is a gin cocktail strongly associated with Al Capone's Chicago operations — the mint was supposedly added to mask the flavor of poorly made Prohibition gin. It predates the Mojito's American popularity.",
      region: "Chicago's South Side; associated with organized crime during Prohibition; also claimed by the Southside Sportsmen's Club in Long Island",
      notable: "The Southside is strongly associated with Al Capone's Chicago bootlegging operation — the South Side was his territory. The 21 Club in New York also claims the drink as their signature.",
      history: "The Southside's origins are contested between Chicago and Long Island, but both stories involve Prohibition-era necessity. The Chicago version claims the drink was created by Capone's organization to make bootleg gin drinkable — the mint and citrus masked the rough spirit. The drink was the signature cocktail of the 21 Club in New York during and after Prohibition.",
      famousQuote: "\"On the South Side of Chicago, you drank what Al gave you. Fortunately, he gave you this.\" — Anonymous",
    },
    {
      name: "Naked and Famous",
      badges: ["classic"],
      glass: "Cocktail glass (chilled coupe)",
      garnish: "None",
      method: "Shake",
      ingredients: ["0.75 oz mezcal", "0.75 oz Aperol", "0.75 oz yellow Chartreuse", "0.75 oz fresh lime juice"],
      instructions: ["Combine all ingredients in a shaker with ice.", "Shake vigorously.", "Strain into chilled coupe.", "No garnish needed."],
      description: "The Naked and Famous is a modern equal-parts classic created by Joaquín Simó at Death & Co in New York in 2011 — a mezcal riff on the Paper Plane that has become one of the defining cocktails of the contemporary craft era.",
      region: "Death & Co, East Village, New York City, 2011; created by Joaquín Simó",
      notable: "Death & Co, opened on New Year's Day 2007, is considered one of the most influential bars in American cocktail history. Its bartenders — including Joaquín Simó, Phil Ward, and Brian Miller — created dozens of cocktails that are now considered modern classics.",
      history: "Joaquín Simó created the Naked and Famous at Death & Co in 2011, inspired by Sam Ross's Paper Plane (itself an equal-parts classic). The substitution of mezcal for bourbon and yellow Chartreuse for Amaro Nonino created something with its own distinct identity — smokier, more herbal, and distinctly contemporary. Death & Co's influence on American cocktail culture is comparable to Milk & Honey's — its cocktail menu has been published as a book that reads as a textbook for the craft cocktail era.",
      famousQuote: "\"At Death & Co, every drink felt like it was made for the first time, even if it was the hundredth.\" — Anonymous",
    },
    {
      name: "Fog Cutter",
      badges: ["tiki", "forgotten"],
      glass: "Fog Cutter glass or Collins glass",
      garnish: "Mint sprig, sherry float",
      method: "Shake",
      ingredients: ["2 oz white rum", "1 oz brandy", "0.5 oz gin", "2 oz fresh orange juice", "1 oz fresh lemon juice", "0.5 oz orgeat", "0.5 oz dry sherry (float on top)"],
      instructions: ["Combine all ingredients except sherry in a shaker with ice.", "Shake well.", "Strain into ice-filled glass.", "Float dry sherry on top by pouring over the back of a spoon.", "Garnish with mint sprig."],
      description: "The Fog Cutter was created by Trader Vic Bergeron as one of his most powerful tiki creations — three base spirits plus a sherry float. He noted that after two, 'you can cut the bloody fog, all right.'",
      region: "Trader Vic's, Oakland, California, 1940s-50s",
      notable: "Trader Vic wrote in his 1947 menu that the Fog Cutter was served 'with a minimum of ingredients and a maximum of strength,' then noted ominously that 'after two of these, you can cut the bloody fog, all right.' The sherry float was his signature touch.",
      history: "The Fog Cutter appeared in Trader Vic's 1947 menu as one of his powerful multi-spirit creations. Unlike the Zombie, which Donn Beach created first, the Fog Cutter was purely Trader Vic's invention. Its combination of rum, brandy, and gin over citrus and orgeat, topped with a sherry float, was characteristically complex and deceptively strong. The drink was popularized further when Trader Vic's opened locations in major hotels worldwide.",
      famousQuote: "\"Fog Cutter: Two of these and you can cut the bloody fog, all right.\" — Trader Vic's menu, 1947",
    },
    {
      name: "Hanky Panky",
      badges: [],
      glass: "Cocktail glass (chilled coupe)",
      garnish: "Orange twist",
      method: "Stir",
      ingredients: ["1.5 oz London Dry gin", "1.5 oz sweet vermouth", "2 dashes Fernet-Branca"],
      instructions: ["Combine all ingredients in a mixing glass with ice.", "Stir for 30 seconds.", "Strain into chilled coupe.", "Express orange peel over the drink."],
      description: "The Hanky Panky was created by Ada Coleman, one of the first female head bartenders at a major hotel, for actor Charles Hawtrey at the Savoy Hotel. Her use of Fernet-Branca as the secret ingredient was revolutionary.",
      region: "London; the Savoy Hotel American Bar",
      notable: "Ada Coleman — known as 'Coley' — was head bartender at the Savoy American Bar from 1903 to 1925, one of the very few women in that role in early 20th century London. When she served the drink to actor Charles Hawtrey, he exclaimed 'By Jove! That is the real hanky-panky!'",
      history: "Ada Coleman was appointed head bartender at the Savoy Hotel's American Bar in 1903 and served there for over two decades. Her clientele included the Prince of Wales, Mark Twain, and numerous theatrical figures. The Hanky Panky was her signature creation — the addition of Fernet-Branca to a gin and vermouth base was an unexpected choice that produced something far more complex than the sum of its parts.",
      famousQuote: "\"By Jove! That is the real hanky-panky!\" — Charles Hawtrey, actor, upon tasting Ada Coleman's creation",
    },
  ],
  "1920s": [
    {
      name: "Sidecar",
      badges: ["bootlegger", "classic"],
      glass: "Cocktail glass (sugar-rimmed coupe)",
      garnish: "Sugar rim, lemon twist",
      method: "Shake",
      ingredients: ["2 oz cognac", "1 oz Cointreau", "0.75 oz fresh lemon juice"],
      instructions: ["Sugar the rim of the coupe.", "Combine all ingredients in a shaker with ice.", "Shake vigorously.", "Strain into sugar-rimmed glass.", "Garnish with lemon twist."],
      description: "The Sidecar was born in Paris during the Lost Generation — Hemingway, Fitzgerald, and their circle drank them at Harry's New York Bar. It is the direct descendant of the Brandy Crusta and the grandmother of the Margarita and the Cosmopolitan.",
      region: "Paris; Harry's New York Bar or the Ritz Hotel Bar, early 1920s",
      notable: "Both Harry's New York Bar and the Paris Ritz claim the Sidecar's creation. Ernest Hemingway drank them at Harry's. F. Scott Fitzgerald referenced cocktails of this type in his Paris writings. The drink's lineage — Brandy Crusta to Sidecar to Margarita to Cosmopolitan — is one of cocktail history's great family trees.",
      history: "The Sidecar emerged in Paris in the early 1920s, documented by Harry MacElhone in 1922 and Robert Vermeire in 1922. Its creation coincided with the great American expatriate migration to Paris during and after Prohibition — Americans fleeing dry America and finding Paris's bars a paradise. The drink's combination of cognac, Cointreau, and lemon juice established a template that would produce the Margarita and eventually the Cosmopolitan.",
      famousQuote: "\"In those days we didn't call it a Sidecar, we just called it what we needed.\" — Attributed to Harry MacElhone",
    },
    {
      name: "Daiquiri",
      badges: ["classic"],
      glass: "Cocktail glass (chilled coupe)",
      garnish: "Lime wheel",
      method: "Shake",
      ingredients: ["2 oz white rum", "1 oz fresh lime juice", "0.75 oz simple syrup"],
      instructions: ["Combine all ingredients in a shaker with ice.", "Shake vigorously for 15 seconds.", "Strain into chilled coupe.", "Garnish with lime wheel.", "Note: this is the classic version — not frozen, not flavored."],
      description: "The classic Daiquiri is one of the perfect cocktails — three ingredients in perfect proportion, created in Cuba by an American mining engineer and spread to the world by Ernest Hemingway.",
      region: "Daiquiri village, Cuba; created by Jennings Cox, an American mining engineer, in 1898",
      notable: "Ernest Hemingway drank Daiquiris obsessively at El Floridita in Havana — always requesting a 'Papa Doble,' a double with no sugar and extra lime. His inscription at El Floridita — 'My Mojito in La Bodeguita, My Daiquiri in El Floridita' — remains on the wall today.",
      history: "Jennings Cox, an American mining engineer working near the town of Daiquiri in Cuba in 1898, created the drink when he ran out of gin and substituted local rum. The drink was brought to the United States by U.S. Navy Admiral Lucius Johnson. It gained international fame through El Floridita bar in Havana, where bartender Constantino Ribalaigua perfected the frozen version for Hemingway, who drank there almost daily during his Havana years.",
      famousQuote: "\"My Mojito in La Bodeguita, My Daiquiri in El Floridita.\" — Ernest Hemingway, inscription at El Floridita, Havana",
    },
    {
      name: "Mary Pickford",
      badges: ["bootlegger", "forgotten"],
      glass: "Cocktail glass (chilled coupe)",
      garnish: "Maraschino cherry",
      method: "Shake",
      ingredients: ["2 oz white rum", "1 oz pineapple juice", "0.25 oz maraschino liqueur", "0.25 oz grenadine"],
      instructions: ["Combine all ingredients in a shaker with ice.", "Shake vigorously.", "Strain into chilled coupe.", "Garnish with cherry."],
      description: "Named for America's first film superstar, the Mary Pickford was created in Havana during Prohibition when American bartenders, film stars, and celebrities flooded Cuba to drink legally.",
      region: "Havana, Cuba; Hotel Nacional and Sloppy Joe's bar during Prohibition",
      notable: "Mary Pickford was the most famous woman in the world in the 1920s — the first true movie star and co-founder of United Artists with Charlie Chaplin and Douglas Fairbanks. She and Douglas Fairbanks visited Havana during Prohibition, and local bartenders created this drink in her honor.",
      history: "During Prohibition, Havana became the destination for American drinkers who could afford to travel. The Hotel Nacional, Sloppy Joe's, El Floridita, and La Bodeguita del Medio became the playgrounds of American celebrities and politicians. The drink was created by Eddie Woelke or Fred Kaufman (accounts differ) at either the Hotel Nacional or Sloppy Joe's.",
      famousQuote: "\"In Havana, everyone was somebody, and every drink was named for someone.\" — Anonymous",
    },
    {
      name: "Between the Sheets",
      badges: ["bootlegger", "forgotten"],
      glass: "Cocktail glass (chilled coupe)",
      garnish: "Lemon twist",
      method: "Shake",
      ingredients: ["1 oz cognac", "1 oz white rum", "1 oz Cointreau", "0.75 oz fresh lemon juice"],
      instructions: ["Combine all ingredients in a shaker with ice.", "Shake vigorously.", "Strain into chilled coupe.", "Garnish with lemon twist."],
      description: "The Between the Sheets is essentially a Sidecar modified with rum — a Prohibition-era Paris creation reflecting the international spirit market that expatriate American bars navigated.",
      region: "Paris; generally attributed to Harry MacElhone at Harry's New York Bar",
      notable: "Harry Craddock included it in the 1930 Savoy Cocktail Book without apparent discomfort about the name. The drink never quite escaped its slightly risqué identity to achieve the mainstream status of its cousin the Sidecar.",
      history: "The Between the Sheets is documented in Harry Craddock's 1930 Savoy Cocktail Book. Its combination of cognac and rum reflects the international nature of Prohibition-era Paris bars, where American bartenders worked with whatever spirits were available from Britain, France, and the Caribbean.",
      famousQuote: "\"Same as a Sidecar, but with less dignity.\" — David Embury, The Fine Art of Mixing Drinks, 1948",
    },
    {
      name: "Dark and Stormy",
      badges: ["classic"],
      glass: "Collins or highball glass",
      garnish: "Lime wedge",
      method: "Build",
      ingredients: ["2 oz Gosling's Black Seal rum (trademarked for this cocktail)", "4-5 oz Barritt's ginger beer", "Lime wedge"],
      instructions: ["Fill glass with ice.", "Pour ginger beer into glass.", "Float Gosling's rum on top by pouring over the back of a spoon.", "Garnish with lime wedge.", "Note: Gosling's has trademarked this name for use with their specific rum."],
      description: "The Dark and Stormy is the national drink of Bermuda and one of the few cocktails where a specific brand is legally required by trademark — Gosling's Black Seal rum is the only rum that can legally be called a Dark and Stormy.",
      region: "Bermuda; Gosling's Brothers distillery, which has made rum there since 1806",
      notable: "Gosling's Brothers holds a trademark on the name 'Dark and Stormy' and requires their Black Seal rum. This is one of the only cocktail trademarks in the world, making the Dark and Stormy unique in cocktail history. Gosling's has sent cease-and-desist letters to bars serving other rums under the name.",
      history: "The Dark and Stormy was born from the convergence of two Bermudian industries — the Gosling's rum distillery, established in 1806, and the Bermuda ginger beer industry. Royal Navy sailors stationed in Bermuda were combining local rum with island ginger beer by the early 20th century. Gosling's trademarked the name in the 1980s, making it legally distinct from any generic rum-ginger combination.",
      famousQuote: "\"The color of a Dark and Stormy is exactly the color of a Bermuda sky before a hurricane.\" — Anonymous",
    },
    {
      name: "Singapore Sling",
      badges: ["party_staple"],
      glass: "Collins glass or sling glass",
      garnish: "Pineapple wedge, cherry, paper umbrella",
      method: "Shake and top",
      ingredients: ["1.5 oz London Dry gin", "0.5 oz Cherry Heering", "0.25 oz Cointreau", "0.25 oz Bénédictine", "2 oz pineapple juice", "0.5 oz fresh lime juice", "1 dash Angostura bitters", "Club soda to top"],
      instructions: ["Combine all ingredients except soda in a shaker with ice.", "Shake well.", "Strain into ice-filled Collins glass.", "Top with club soda.", "Garnish elaborately with pineapple, cherry, and umbrella."],
      description: "The Singapore Sling was created at the Long Bar of Raffles Hotel in Singapore around 1915 — the colonial outpost cocktail that defined elegant drinking in Southeast Asia.",
      region: "Raffles Hotel, Singapore; created by bartender Ngiam Tong Boon",
      notable: "The Long Bar at Raffles Hotel has served the Singapore Sling continuously since its creation. Somerset Maugham, Rudyard Kipling, and Joseph Conrad all drank there. The hotel throws peanut shells on the floor by tradition — the only place in Singapore where littering is permitted.",
      history: "Ngiam Tong Boon created the Singapore Sling at Raffles Hotel's Long Bar around 1915. The original recipe was lost and reconstructed from guest books and bartender recollections in the 1970s. The drink was reportedly designed so women could drink at the Long Bar without appearing to violate colonial social conventions — the pink color and fruit garnish were deliberate camouflage.",
      famousQuote: "\"Raffles Hotel stands for all the fables of the exotic East.\" — Somerset Maugham",
    },
    {
      name: "Twelve Mile Limit",
      badges: ["bootlegger", "forgotten"],
      glass: "Cocktail glass (chilled coupe)",
      garnish: "Lemon twist",
      method: "Shake",
      ingredients: ["1 oz white rum", "0.5 oz rye whiskey", "0.5 oz cognac", "0.5 oz fresh lemon juice", "0.5 oz grenadine"],
      instructions: ["Combine all ingredients in a shaker with ice.", "Shake vigorously.", "Strain into chilled coupe.", "Garnish with lemon twist."],
      description: "Named for the offshore boundary that defined American Prohibition — American law extended only three miles offshore, then extended to twelve in 1924. Ships anchored beyond the limit served alcohol legally to anyone who could reach them.",
      region: "Atlantic Ocean beyond the twelve-mile limit; 'Rum Row' off the New York coast",
      notable: "At its peak in the early 1920s, hundreds of ships formed a floating duty-free zone just off the American coast. Speedboats would rush contraband to shore while the Coast Guard gave chase. The cocktail named for this boundary captured the spirit of Prohibition-era ingenuity.",
      history: "During Prohibition, American law initially prohibited alcohol within three miles of shore. When bootleggers exploited this, Congress extended the limit to twelve miles in 1924, creating 'Rum Row' — a line of ships anchored just outside American jurisdiction. The cocktail named for this boundary appeared in cocktail books of the early 1930s as a winking reference to the era's creativity around alcohol law.",
      famousQuote: "\"Every rum runner knew the twelve-mile limit by heart. It was the most important number in the ocean.\" — Anonymous Coast Guard officer",
    },
    {
      name: "White Lady",
      badges: ["bootlegger", "forgotten"],
      glass: "Cocktail glass (chilled coupe)",
      garnish: "Lemon twist",
      method: "Shake",
      ingredients: ["2 oz London Dry gin", "0.75 oz Cointreau", "0.75 oz fresh lemon juice", "Optional: 0.5 oz egg white"],
      instructions: ["If using egg white: dry shake all ingredients without ice for 15 seconds.", "Add ice and shake vigorously.", "Strain into chilled coupe.", "Garnish with lemon twist."],
      description: "The White Lady was created by Harry Craddock at the Savoy Hotel and is essentially a gin Sidecar — one of the great Prohibition-era London cocktails that defined the Savoy's American Bar as the finest in the world.",
      region: "The Savoy Hotel American Bar, London; Harry Craddock, documented 1930",
      notable: "Harry Craddock created so many classics at the Savoy that his 1930 book reads less like a recipe collection and more like a historical record. The White Lady was one of his personal favorites — he reportedly drank them himself after closing the bar.",
      history: "Harry Craddock documented the White Lady in his 1930 Savoy Cocktail Book, though the drink existed in earlier forms before he refined it. His version — with gin replacing brandy in the Sidecar template — became the definitive one. The Savoy's American Bar attracted American expatriates fleeing Prohibition, wealthy tourists, and the British aristocracy throughout the 1920s and 30s. Craddock served them all.",
      famousQuote: "\"The way to a good cocktail is to drink it while it's laughing at you.\" — Harry Craddock",
    },
    {
      name: "Bees Knees (Gin & Honey)",
      badges: ["bootlegger", "forgotten"],
      glass: "Cocktail glass (chilled coupe)",
      garnish: "Lemon twist",
      method: "Shake",
      ingredients: ["2 oz Old Tom gin (or London Dry)", "0.75 oz honey syrup", "0.75 oz fresh lemon juice", "2 dashes orange bitters"],
      instructions: ["Make honey syrup: 2 parts honey to 1 part warm water.", "Combine all ingredients in a shaker with ice.", "Shake well.", "Strain into chilled coupe.", "Garnish with lemon twist."],
      description: "A variation on the classic Bee's Knees using Old Tom gin and orange bitters — the version most closely associated with speakeasy culture, where the sweeter Old Tom gin was occasionally available alongside bathtub gin.",
      region: "American speakeasies, 1920s; this variation documented at several Prohibition-era establishments",
      notable: "Old Tom gin — a sweetened style popular in the 19th century — was occasionally smuggled in from Britain during Prohibition, commanding premium prices at higher-end speakeasies. This version using the sweeter gin was considered the more refined expression.",
      history: "During Prohibition, a speakeasy's quality was measured partly by what spirits it could actually obtain legally from abroad. High-end establishments sometimes had access to imported British gin, including the sweetened Old Tom style. This version of the Bee's Knees, made with Old Tom and the addition of orange bitters, represents the top tier of Prohibition-era drinking — what the wealthy paid extra to experience.",
      famousQuote: "\"At the better class of speakeasy, you could sometimes get actual gin. That changed everything.\" — Anonymous",
    },
  ],
  "1930s": [
    {
      name: "Negroni",
      badges: ["classic"],
      glass: "Rocks glass",
      garnish: "Orange peel (expressed)",
      method: "Stir",
      ingredients: ["1 oz London Dry gin", "1 oz Campari", "1 oz sweet vermouth"],
      instructions: ["Fill rocks glass with ice.", "Pour all three ingredients directly into the glass.", "Stir gently 10-15 times.", "Express orange peel over the drink and drop in or balance on the rim."],
      description: "The Negroni is perhaps the most perfect cocktail ever created — equal parts of three ingredients, infinitely variable with substitutions, and the template for dozens of modern drinks. Count Camillo Negroni ordered it in Florence in 1919.",
      region: "Florence, Italy; Caffè Casoni (now Caffè Giacosa) on Via della Vigna Nuova",
      notable: "Count Camillo Negroni asked bartender Fosco Scarselli to replace the soda water in his Americano with gin. The bartender added an orange garnish instead of lemon to signal it was a different drink. The Count's family later founded Negroni Distillerie to capitalize on the drink's success.",
      history: "The Negroni's creation in 1919 is one of the best-documented cocktail origin stories. Count Camillo Negroni, who had spent time in America and developed a taste for stronger drinks, asked his bartender at Caffè Casoni to strengthen his Americano by replacing soda with gin. The resulting drink spread through Italian café culture and eventually to American bars. The Negroni has become the most influential cocktail template of the 21st century.",
      famousQuote: "\"The Negroni is a civilized drink for civilized people. It is also completely ruthless.\" — Orson Welles",
    },
    {
      name: "Boulevardier",
      badges: [],
      glass: "Rocks glass or coupe",
      garnish: "Orange peel or cherry",
      method: "Stir",
      ingredients: ["1.5 oz bourbon or rye whiskey", "1 oz Campari", "1 oz sweet vermouth"],
      instructions: ["Combine all ingredients in a mixing glass with ice.", "Stir for 30 seconds.", "Strain into chilled coupe or over fresh ice in rocks glass.", "Garnish with orange peel or cherry."],
      description: "The Boulevardier is a Negroni made with whiskey instead of gin — created by Erskine Gwynne, an expatriate American socialite and magazine publisher in Paris, named for his publication 'The Boulevardier.'",
      region: "Paris; Harry's New York Bar; documented by Harry MacElhone in 1927",
      notable: "Erskine Gwynne was a nephew of Alfred Vanderbilt and published a social magazine called 'The Boulevardier' in Paris during the 1920s. His cocktail, named for the publication, was documented by Harry MacElhone and became the template for every whiskey-Campari-vermouth variation that followed.",
      history: "Harry MacElhone documented the Boulevardier in his 1927 book 'Barflies and Cocktails,' attributing it to Erskine Gwynne. The drink was largely forgotten after Prohibition ended and Americans returned home — Campari was not widely available in the United States. The craft cocktail movement rediscovered it in the 2000s, and it is now considered one of the essential stirred cocktails.",
      famousQuote: "\"The Boulevardier is proof that the best cocktails name themselves.\" — Anonymous",
    },
    {
      name: "Moscow Mule",
      badges: ["party_staple"],
      glass: "Copper mug",
      garnish: "Lime wedge, fresh mint",
      method: "Build",
      ingredients: ["2 oz vodka", "0.5 oz fresh lime juice", "4-6 oz ginger beer", "Lime wedge"],
      instructions: ["Fill copper mug with ice.", "Add vodka and lime juice.", "Top with ginger beer.", "Stir gently once.", "Garnish with lime and mint."],
      description: "The Moscow Mule was invented as a marketing exercise — Smirnoff needed to sell vodka to Americans who didn't drink it, and a ginger beer company needed to sell ginger beer. The copper mug was a third surplus product needing a home. The combination launched vodka's American career.",
      region: "Los Angeles; the Cock'n Bull pub on Sunset Strip, invented by Jack Morgan and John Martin in 1941",
      notable: "The Moscow Mule was the first vodka cocktail to gain widespread American acceptance — before it, vodka was virtually unknown in the United States. Martin's Polaroid promotional campaign, photographing celebrity bartenders holding copper mugs, was one of the first viral marketing campaigns in the hospitality industry.",
      history: "The Moscow Mule was created in 1941 at the Cock'n Bull pub on the Sunset Strip. Pub owner Jack Morgan had surplus ginger beer; Smirnoff distributor John Martin had surplus vodka; a third partner had surplus copper mugs. Martin photographed celebrities drinking from the distinctive copper mugs with a Polaroid camera and drove from bar to bar leaving photos and taking orders. It was one of the first sophisticated marketing campaigns in the drinks industry, and Americans learned to drink vodka.",
      famousQuote: "\"Before the Moscow Mule, Americans didn't drink vodka. After it, they couldn't stop.\" — William Grimes, Straight Up or On the Rocks, 2001",
    },
    {
      name: "Jungle Bird",
      badges: ["tiki"],
      glass: "Rocks glass or tiki mug",
      garnish: "Pineapple wedge, cherry, tiki umbrella",
      method: "Shake",
      ingredients: ["1.5 oz Jamaican rum (Appleton Estate or similar)", "0.75 oz Campari", "1.5 oz pineapple juice", "0.5 oz fresh lime juice", "0.5 oz simple syrup"],
      instructions: ["Combine all ingredients in a shaker with ice.", "Shake vigorously.", "Strain into rocks glass over crushed ice or into a tiki mug.", "Garnish elaborately."],
      description: "The Jungle Bird was created at the Aviary Bar of the Kuala Lumpur Hilton in 1978 and was largely unknown outside Malaysia for thirty years until Jeff Berry found the recipe and published it.",
      region: "Aviary Bar, Kuala Lumpur Hilton, Malaysia, 1978; rediscovered through Jeff Berry's tiki research",
      notable: "Jeff Berry, the leading historian of tiki cocktails, found the Jungle Bird recipe in a trade publication and published it in his book 'Intoxica!' in 2002. It was then broadly rediscovered by the craft cocktail community and became one of the most ordered tiki drinks in serious bars worldwide.",
      history: "The Jungle Bird was created in 1978 by bartender Jeffrey Ong at the Aviary Bar of the newly opened Kuala Lumpur Hilton. It remained essentially unknown outside the hotel until Jeff Berry found the original recipe. Its combination of Campari with rum and tropical ingredients was unusual — the bitterness of Campari cutting through the tropical sweetness created something genuinely distinctive. When Berry published it, bartenders immediately adopted it as a sophisticated alternative to sweeter tiki classics.",
      famousQuote: "\"The Jungle Bird was hiding in plain sight for thirty years. It's the best cocktail most people have never heard of.\" — Jeff Berry, tiki historian",
    },
    {
      name: "Between the Sheets (Savoy Version)",
      badges: ["bootlegger", "forgotten"],
      glass: "Cocktail glass (chilled coupe)",
      garnish: "Lemon twist",
      method: "Shake",
      ingredients: ["0.75 oz brandy", "0.75 oz white rum", "0.75 oz triple sec", "0.5 oz fresh lemon juice"],
      instructions: ["Combine all ingredients in a shaker with ice.", "Shake vigorously.", "Strain into chilled coupe.", "Garnish with lemon twist."],
      description: "The Savoy version of the Between the Sheets — documented by Harry Craddock in 1930 — used equal parts and slightly different proportions than other versions, resulting in a more balanced, lighter drink.",
      region: "London; the Savoy Hotel American Bar, Harry Craddock, 1930",
      notable: "Harry Craddock included this in the Savoy Cocktail Book with its full name and recipe intact, apparently unbothered by the implications. He was a professional.",
      history: "Harry Craddock's 1930 Savoy Cocktail Book documented hundreds of cocktails from the Prohibition era and earlier. His version of the Between the Sheets reflected the refinements that London's Savoy Bar brought to American-influenced cocktails — slightly drier, more precisely balanced than the original Paris versions.",
      famousQuote: "\"Every drink has its hour. Between the Sheets is for the hour before midnight.\" — Anonymous",
    },
    {
      name: "Stinger",
      badges: ["forgotten"],
      glass: "Cocktail glass or rocks glass",
      garnish: "Fresh mint sprig",
      method: "Shake or stir",
      ingredients: ["2 oz cognac or brandy", "1 oz white crème de menthe"],
      instructions: ["Combine ingredients in a shaker with ice.", "Shake vigorously.", "Strain into chilled cocktail glass, or over crushed ice for a frappé version.", "Garnish with fresh mint."],
      description: "The Stinger was the after-dinner drink of the mid-century American elite — ordered after dinner at supper clubs and served as a digestif. Its association with wealth and sophistication made it a symbol of postwar American prosperity.",
      region: "New York supper clubs and hotel bars; particularly associated with the Stork Club and El Morocco",
      notable: "The Stinger was Cary Grant's signature drink — he reportedly ordered them at every formal dinner. It was also strongly associated with the Stork Club, the social center of New York's celebrity world in the 1940s and 50s.",
      history: "The Stinger appeared in cocktail books from 1913 onward. But its golden age was the postwar era, when cognac's association with European sophistication and crème de menthe's after-dinner freshness combined to create the perfect supper club digestif. Cary Grant's identification with the drink gave it a glamour that sustained it through the 1950s and 60s. It faded with the supper club culture that sustained it.",
      famousQuote: "\"A Stinger is the final, perfect note of a proper evening.\" — Attributed to Cary Grant",
    },
    {
      name: "Vieux Carré",
      badges: ["classic"],
      glass: "Rocks glass or small mixing glass (as originally served)",
      garnish: "Lemon twist, optional brandied cherry",
      method: "Stir",
      ingredients: ["0.75 oz rye whiskey", "0.75 oz cognac", "0.75 oz sweet vermouth", "0.25 oz Bénédictine", "2 dashes Peychaud's bitters", "2 dashes Angostura bitters"],
      instructions: ["Combine all ingredients in a mixing glass with ice.", "Stir for 25-30 seconds until thoroughly chilled and diluted.", "Strain into a rocks glass over fresh ice.", "Express a lemon peel over the drink — the oils are essential.", "Garnish with the twisted lemon peel and an optional brandied cherry.", "Note: the original 1938 recipe was built and served directly in a small mixing glass — a perfectly valid approach."],
      description: "The Vieux Carré is New Orleans in a glass — rye for the Americans, cognac for the French, sweet vermouth for the Italians, Bénédictine for the Benedictine monks, Peychaud's for the Creoles. Every community of the French Quarter is represented. Created in 1938 at the Hotel Monteleone and largely forgotten for decades, it is now recognized as one of the great American cocktails.",
      region: "Hotel Monteleone, Royal Street, New Orleans, Louisiana; created by head bartender Walter Bergeron, 1938",
      notable: "The Hotel Monteleone's bar — where the Vieux Carré was born — is now the famous Carousel Bar, a slowly revolving cocktail lounge that turns at one revolution every fifteen minutes. It is still there, still rotating, and still serves the Vieux Carré. The drink is classified by the IBA as an 'Unforgettable' — their designation for classics that are less known than they deserve to be.",
      history: "Walter Bergeron was born in 1889 and had been bartending at the Hotel Monteleone since at least 1918. During Prohibition he managed a cigar store — what additional activities may have occurred there is unrecorded. When repeal came he returned to the Monteleone, and by 1938 author Stanley Clisby Arthur was documenting his signature creation in Famous New Orleans Drinks and How to Mix 'Em. Bergeron said he created it to honor the Vieux Carré — the French Quarter — where the antique shops and iron lace balconies gave visitors a glimpse into the romance of another day. The drink fused the spirits of every community that had shaped New Orleans: American rye, French cognac, Italian vermouth, and the herbal French liqueur Bénédictine, tied together with both of New Orleans' great bitters. It was largely forgotten outside New Orleans for decades, then rediscovered by the craft cocktail movement as one of the most perfectly constructed drinks in the American canon.",
      famousQuote: "\"He originated it to give honor to the Vieux Carré, that part of New Orleans where the antique shops and the iron lace balconies give sightseers a glimpse into the romance of another day.\" — Stanley Clisby Arthur, Famous New Orleans Drinks and How to Mix 'Em, 1938",
    },
  ],
  "1940s": [
    {
      name: "Mai Tai",
      badges: ["tiki", "classic"],
      glass: "Double Old Fashioned or tiki mug",
      garnish: "Spent lime shell, mint sprig, cherry, paper umbrella",
      method: "Shake",
      ingredients: ["2 oz aged Jamaican rum (or split: 1 oz Jamaican, 1 oz Martinique agricole rum)", "0.75 oz fresh lime juice", "0.5 oz orange curaçao", "0.25 oz orgeat (almond syrup)", "0.25 oz simple syrup"],
      instructions: ["Combine all ingredients in a shaker with ice.", "Shake vigorously.", "Pour unstrained into glass filled with crushed ice.", "Garnish with spent lime shell, mint, and cherry.", "Serve with straw."],
      description: "The Mai Tai — 'out of this world' in Tahitian — was Trader Vic's greatest creation. The original was made with 17-year-old J. Wray & Nephew rum, a bottle of which now sells for over $50,000.",
      region: "Hinky Dinks (later Trader Vic's), Oakland, California, 1944; created by Victor Bergeron",
      notable: "The original Mai Tai was made with 17-year-old J. Wray & Nephew rum, which Trader Vic ran out of within a year. No one has been able to replicate the original exactly because that rum no longer exists. A single bottle from that era sold at auction for $54,000.",
      history: "Victor 'Trader Vic' Bergeron created the Mai Tai in 1944 at his Oakland restaurant for two Tahitian friends who declared it 'Mai Tai, Roa Ae!' — 'Out of this world, the best!' The drink spread through Trader Vic's expanding restaurant chain and was ordered by celebrities including Elvis Presley. The diluted, overly sweet versions that became associated with beach bars nearly destroyed the drink's reputation, which the craft cocktail movement has worked to restore.",
      famousQuote: "\"Mai Tai, Roa Ae!\" — Ham and Carrie Guild, two Tahitian friends of Victor Bergeron, upon tasting the original, 1944",
    },
    {
      name: "Zombie",
      badges: ["tiki"],
      glass: "Zombie glass or Collins glass",
      garnish: "Mint sprig, fruit, paper umbrella",
      method: "Blend",
      ingredients: ["1.5 oz gold Puerto Rican rum", "1.5 oz dark Jamaican rum", "1 oz 151-proof Demerara rum", "0.75 oz fresh lime juice", "0.5 oz Don's Mix (grapefruit juice and cinnamon syrup)", "0.5 oz falernum", "1 dash Angostura bitters", "1 dash absinthe", "1 tsp grenadine"],
      instructions: ["Combine all ingredients in a blender with one cup of crushed ice.", "Blend on high for 5 seconds.", "Pour into glass.", "Garnish elaborately.", "House rule: limit 2 per customer."],
      description: "The Zombie was so powerful that Donn Beach limited customers to two per visit. The recipe was so secret he scrambled ingredient labels in his bar to prevent employees from reverse-engineering it.",
      region: "Don the Beachcomber, Hollywood, California, 1934; created by Donn Beach",
      notable: "Donn Beach kept the Zombie recipe so secret that he labeled the pre-mixed ingredients with code numbers. His bartenders could make the drink without knowing what was in it. The full original recipe was not reconstructed until Jeff Berry's decades of research in the 1990s.",
      history: "Donn Beach created the Zombie at his Don the Beachcomber restaurant in Hollywood in 1934, reportedly for a hungover businessman who had a flight to catch. The man returned three days later claiming the drink had turned him into a zombie. Beach pre-mixed the ingredients in numbered bottles so his bartenders could make it without knowing the formula. Jeff Berry spent years reconstructing the original through research into Beach's private papers.",
      famousQuote: "\"No more than two to any one person.\" — Donn Beach's original house rule for the Zombie",
    },
    {
      name: "Painkiller",
      badges: ["tiki"],
      glass: "Rocks glass or tiki cup",
      garnish: "Freshly grated nutmeg (essential), pineapple wedge, cherry",
      method: "Shake",
      ingredients: ["2 oz Pusser's rum (trademarked for this cocktail)", "4 oz pineapple juice", "1 oz orange juice", "1 oz cream of coconut"],
      instructions: ["Combine all ingredients in a shaker with ice.", "Shake vigorously.", "Pour over crushed ice in glass.", "Grate fresh nutmeg generously over the top — this is not optional.", "Garnish with pineapple and cherry."],
      description: "The Painkiller was created at the Soggy Dollar Bar on Jost Van Dyke in the British Virgin Islands — so named because there's no dock and patrons swim ashore with wet money. Like the Dark and Stormy, a specific rum is trademarked for it.",
      region: "The Soggy Dollar Bar, White Bay, Jost Van Dyke, British Virgin Islands",
      notable: "The Soggy Dollar Bar is accessible only by water — there is no dock. Patrons anchor offshore and swim in, arriving with wet bills. The bar has been called one of the greatest beach bars in the world and remains the spiritual home of the Painkiller.",
      history: "Daphne Henderson created the Painkiller at the Soggy Dollar Bar in the 1970s. Pusser's Rum Company adopted the drink in the 1980s and eventually trademarked the name. The British Virgin Islands became a sailing destination, and the Soggy Dollar Bar became a required stop on any Caribbean sailing circuit. The freshly grated nutmeg on top is entirely non-negotiable.",
      famousQuote: "\"The Painkiller is the best possible reason to sail to the British Virgin Islands.\" — Anonymous sailor",
    },
    {
      name: "Grasshopper",
      badges: ["forgotten"],
      glass: "Cocktail glass (chilled coupe)",
      garnish: "Mint sprig, optional chocolate shavings",
      method: "Shake",
      ingredients: ["1 oz green crème de menthe", "1 oz white crème de cacao", "1 oz heavy cream"],
      instructions: ["Combine all ingredients in a shaker with ice.", "Shake vigorously.", "Strain into chilled coupe.", "Garnish with mint sprig.", "The drink should be a vivid mint green."],
      description: "The Grasshopper was created at Tujague's restaurant in New Orleans in the early 20th century and became a postwar American dessert cocktail phenomenon — the minty, creamy after-dinner drink that every 1950s supper club served.",
      region: "Tujague's restaurant, New Orleans, Louisiana; created by Philip Guichet around 1919",
      notable: "Tujague's is the second-oldest restaurant in New Orleans, established in 1856. Philip Guichet created the Grasshopper for a cocktail competition in New York around 1919 and won second place. The drink became a New Orleans institution and a nationwide dessert cocktail staple.",
      history: "The Grasshopper was created by Philip Guichet at Tujague's in New Orleans around 1919 and popularized nationally in the postwar era. Its combination of mint and chocolate in a creamy, low-alcohol package made it the ideal dessert cocktail — something to drink instead of or alongside dessert. It was particularly popular in the 1950s and 60s supper club culture and became a cliché that led to its decline. New Orleans still considers it a local specialty.",
      famousQuote: "\"The Grasshopper is what happens when a cocktail decides it wants to be dessert.\" — Anonymous",
    },
    {
      name: "Horse's Neck",
      badges: ["forgotten"],
      glass: "Collins or highball glass",
      garnish: "Long spiral of lemon peel draped over the rim (the 'horse's neck')",
      method: "Build",
      ingredients: ["2 oz bourbon or brandy", "4-5 oz ginger ale", "2-3 dashes Angostura bitters", "Long spiral lemon peel"],
      instructions: ["Cut a continuous spiral of lemon peel from an entire lemon.", "Drape it over the rim of the glass so it hangs inside — this is the 'horse's neck.'", "Fill glass with ice.", "Add spirit and bitters.", "Top with ginger ale.", "Stir gently.", "The lemon peel remains draped over the rim throughout."],
      description: "The Horse's Neck is named for its signature garnish — a long spiral of lemon peel draped over the rim of the glass, resembling a horse's arched neck. It was one of the most popular drinks in America before Prohibition and a staple of British regimental messes.",
      region: "Nationwide in America from the 1890s; particularly popular in British military officer circles from WWI onward",
      notable: "The Horse's Neck became the standard drink in British Army and Royal Navy officers' messes during and after World War II, where it was typically made with brandy. It remains a traditional officers' mess drink in the British military today.",
      history: "The Horse's Neck appeared in American cocktail books in the 1890s and was originally a non-alcoholic drink of ginger ale and lemon. The alcoholic version — with brandy or bourbon added — became popular in the early 20th century. British military culture adopted it enthusiastically, and it became a staple of officers' messes worldwide. Its decline in America coincided with Prohibition; its survival in British military circles gave it a longer life in the UK.",
      famousQuote: "\"In the mess, there are only two acceptable drinks: a Horse's Neck before dinner and port after.\" — Attributed to various British officers",
    },
    {
      name: "El Diablo",
      badges: ["forgotten"],
      glass: "Collins glass",
      garnish: "Lime wheel, candied ginger",
      method: "Build",
      ingredients: ["2 oz blanco tequila", "0.5 oz crème de cassis", "0.75 oz fresh lime juice", "Ginger beer to top"],
      instructions: ["Fill Collins glass with ice.", "Add tequila, lime juice, and crème de cassis.", "Top with ginger beer.", "Stir gently.", "Garnish with lime wheel and candied ginger."],
      description: "El Diablo — The Devil — was created by Trader Vic Bergeron in the 1940s and represents one of his rare departures from rum-based tiki drinks. It predates the Margarita's mainstream popularity and was one of the first tequila cocktails to gain American recognition.",
      region: "Trader Vic's, Oakland, California; documented in Trader Vic's Bartender's Guide, 1947",
      notable: "Trader Vic documented El Diablo in his 1947 Bartender's Guide, making it one of the earliest tequila cocktails in an American cocktail book. At the time, tequila was largely unknown outside the American Southwest and Mexico.",
      history: "El Diablo appeared in Trader Vic's 1947 Bartender's Guide as one of his tequila experiments at a time when the spirit was largely unknown in mainstream American bars. The combination of tequila, crème de cassis, lime, and ginger beer created a complex, layered drink that was ahead of its time. The craft cocktail movement's embrace of tequila and its rediscovery of Trader Vic's catalog brought the drink back to menus.",
      famousQuote: "\"Tequila will get you eventually. This just makes it more pleasant.\" — Trader Vic, paraphrased",
    },
    {
      name: "Gimlet (Rose's Wartime)",
      badges: ["forgotten"],
      glass: "Cocktail glass",
      garnish: "Lime wheel",
      method: "Stir",
      ingredients: ["2 oz Plymouth gin", "1 oz Rose's lime cordial"],
      instructions: ["Combine gin and Rose's cordial in a mixing glass with ice.", "Stir for 20 seconds.", "Strain into chilled glass.", "Garnish with lime wheel.", "Note: no fresh lime, no simple syrup — this is the original preserved-cordial version."],
      description: "The pure Rose's cordial Gimlet as drunk in Royal Navy officers' messes and British colonial clubs during and after World War II — the version Raymond Chandler's Philip Marlowe insists is the only real Gimlet.",
      region: "Royal Navy officers' messes worldwide; British colonial clubs in Asia and Africa; postwar American bars",
      notable: "Plymouth gin — made in Plymouth, England, where the Royal Navy has its main base — was the gin of the Royal Navy. The combination of Plymouth gin and Rose's lime cordial in equal parts is the drink that fueled the British Empire's officer class for over a century.",
      history: "The preserved-cordial Gimlet was the standard in Royal Navy officers' messes because Rose's lime cordial didn't require refrigeration and survived long sea voyages. Plymouth gin, made steps from the Royal Navy's home port, was the natural complement. This precise version — Plymouth gin, Rose's cordial, nothing else — is what Raymond Chandler documented so precisely in The Long Goodbye, written from direct postwar experience of the drink culture it described.",
      famousQuote: "\"A real Gimlet is half gin and half Rose's Lime Juice and nothing else. It beats Martinis hollow.\" — Philip Marlowe (Raymond Chandler), The Long Goodbye, 1953",
    },
    {
      name: "Harvey Wallbanger",
      badges: ["party_staple"],
      glass: "Collins glass",
      garnish: "Orange slice, cherry",
      method: "Build",
      ingredients: ["1.5 oz vodka", "4 oz fresh orange juice", "0.5 oz Galliano (floated on top)"],
      instructions: ["Fill Collins glass with ice.", "Add vodka.", "Add orange juice.", "Float Galliano on top by pouring over the back of a spoon.", "Garnish with orange and cherry.", "Stir before drinking."],
      description: "The Harvey Wallbanger was the defining cocktail of 1970s America — a Screwdriver with Galliano floated on top. Its marketing campaign was so successful that 'Harvey' ran for president in a 1972 mock campaign.",
      region: "Pancho's Bar, Manhattan Beach, California; popularized through Galliano marketing in the 1970s",
      notable: "The Galliano marketing campaign for Harvey Wallbanger was so successful that 'Harvey' ran as a write-in candidate in the 1972 Democratic primary in several states, with campaign buttons reading 'Harvey Wallbanger for President.' He reportedly received several thousand actual votes.",
      history: "The Harvey Wallbanger was allegedly created by mixologist Donato 'Duke' Antone at Pancho's Bar, named for a surfer named Harvey who drank Screwdrivers with Galliano after losing a competition and banged into walls on his way home. The McKesson Wine and Spirits Company promoted Galliano aggressively in the late 1960s and early 1970s, sending promoters to teach bartenders the drink. By 1976, the Harvey Wallbanger was the most ordered cocktail in America.",
      famousQuote: "\"Harvey Wallbanger for President: he's the most popular man in America.\" — 1972 campaign button",
    },
  ],
  "1950s": [
    {
      name: "Piña Colada",
      badges: ["party_staple"],
      glass: "Piña colada glass or large goblet",
      garnish: "Pineapple wedge, cherry, paper umbrella",
      method: "Blend",
      ingredients: ["2 oz white rum", "2 oz coconut cream (not coconut milk)", "4 oz fresh pineapple juice (or chunks)", "1 cup crushed ice"],
      instructions: ["Combine all ingredients in a blender.", "Blend until smooth and creamy.", "Pour into chilled glass.", "Garnish with pineapple and cherry.", "Serve with straw."],
      description: "The Piña Colada is the national drink of Puerto Rico and the subject of one of the most debated origin stories in cocktail history. Three bartenders in San Juan claim credit for its invention within ten years of each other.",
      region: "San Juan, Puerto Rico; Caribe Hilton Hotel (Ramón 'Monchito' Marrero, 1954)",
      notable: "The Piña Colada became the national drink of Puerto Rico in 1978 by official declaration. Rupert Holmes's 1979 hit song 'Escape (The Piña Colada Song)' made it a global symbol of relaxation. The Caribe Hilton's bar still serves the original and claims the 1954 creation date.",
      history: "Ramón 'Monchito' Marrero claimed to have created it in 1954 at the Caribe Hilton in San Juan after three months of experimentation. Puerto Rico made it the official drink of the island in 1978. Rupert Holmes's 1979 song turned it into a global cliché — both elevating and slightly cheapening the drink's cultural status simultaneously.",
      famousQuote: "\"If you like Piña Coladas, and getting caught in the rain...\" — Rupert Holmes, Escape (The Piña Colada Song), 1979",
    },
    {
      name: "Rob Roy",
      badges: [],
      glass: "Cocktail glass (chilled coupe)",
      garnish: "Maraschino cherry or lemon twist",
      method: "Stir",
      ingredients: ["2 oz Scotch whisky (blended or single malt)", "1 oz sweet vermouth", "2 dashes Angostura bitters"],
      instructions: ["Combine all ingredients in a mixing glass with ice.", "Stir for 30 seconds.", "Strain into chilled cocktail glass.", "Garnish with cherry or lemon twist."],
      description: "The Rob Roy is simply a Manhattan made with Scotch — created at the Waldorf Hotel in 1894 to celebrate the premiere of an operetta about the Scottish folk hero Rob Roy MacGregor.",
      region: "New York City; the Waldorf Hotel bar, 1894, created to celebrate the premiere of the operetta 'Rob Roy'",
      notable: "The Rob Roy was created specifically to celebrate a Broadway premiere — it is one of the few cocktails with a directly documented theatrical origin. The Waldorf Hotel bar in the 1890s was the most fashionable drinking establishment in America.",
      history: "The Rob Roy was created at the Waldorf Hotel bar in New York in 1894 to celebrate the Broadway premiere of an operetta about the Scottish outlaw Rob Roy MacGregor. The combination of Scotch and sweet vermouth creates something far more complex than a simple rye-for-Scotch swap suggests — the peaty, smoky quality of Scotch interacts with vermouth differently than rye does.",
      famousQuote: "\"The Rob Roy proves that Scotland and Manhattan have more in common than you might think.\" — Anonymous",
    },
    {
      name: "Scorpion Bowl",
      badges: ["tiki", "party_staple"],
      glass: "Scorpion bowl (large communal vessel) or punch bowl",
      garnish: "Multiple straws, floating gardenia, citrus wheels",
      method: "Build in bowl",
      ingredients: ["4 oz light rum", "2 oz cognac", "3 oz fresh orange juice", "2 oz fresh lemon juice", "1.5 oz orgeat", "Crushed ice"],
      instructions: ["Combine all liquid ingredients in the scorpion bowl.", "Add crushed ice to fill the bowl.", "Garnish with flowers and citrus.", "Add one long straw per drinker.", "Serves 2-4 people.", "Everyone drinks simultaneously from the same bowl."],
      description: "The Scorpion Bowl is the communal tiki experience — a large shared vessel designed for group drinking at Trader Vic's, with multiple straws creating a social ritual around cocktail consumption.",
      region: "Trader Vic's restaurants, nationwide; particularly associated with the Boston and New York locations",
      notable: "The Scorpion Bowl ritual — multiple people drinking simultaneously from a large communal vessel through long straws — became a rite of passage at Trader Vic's restaurants. The flaming center version, with overproof rum set alight, was the ultimate theatrical presentation.",
      history: "The Scorpion Bowl was part of the tiki tradition of communal drinking and theatrical presentation. Trader Vic's restaurants made it a signature item throughout the 1950s and 60s. The decline of tiki culture in the 1970s and health concerns about communal drinking vessels reduced it to novelty status, though dedicated tiki bars have revived it.",
      famousQuote: "\"The Scorpion Bowl is not a cocktail. It is an event.\" — Trader Vic Bergeron",
    },
    {
      name: "Americano",
      badges: [],
      glass: "Rocks glass or highball",
      garnish: "Orange slice or lemon twist",
      method: "Build",
      ingredients: ["1.5 oz Campari", "1.5 oz sweet vermouth", "Club soda to top"],
      instructions: ["Fill glass with ice.", "Add Campari and sweet vermouth.", "Top with club soda.", "Stir gently.", "Garnish with orange slice."],
      description: "The Americano predates the Negroni and is its direct ancestor — the Campari-sweet vermouth combination that Count Negroni simply asked to be strengthened with gin. It was the most popular drink at Caffè Casoni before the Negroni existed.",
      region: "Milan, Italy; Caffè Campari, 1860s; the Americano name came from American tourists who ordered it in Italy during Prohibition",
      notable: "The Americano was James Bond's first-ever drink order — in Ian Fleming's first Bond novel 'Casino Royale' (1953), Bond orders an Americano before switching to his famous Martini. Fleming chose it deliberately as a sophisticated but not ostentatious drink for a man establishing his credentials.",
      history: "The Americano (originally called the Milano-Torino for its two main ingredients from those cities) was created at Caffè Campari in Milan in the 1860s. It became extremely popular with American tourists visiting Italy during Prohibition, who were delighted to drink legally. The name 'Americano' reflects these American fans. Count Negroni's 1919 request to replace the soda with gin created the drink that eventually overshadowed its ancestor.",
      famousQuote: "\"Bond said to the barman: 'An Americano, please.'\" — Ian Fleming, Casino Royale, 1953",
    },
    {
      name: "Pink Gin",
      badges: ["forgotten"],
      glass: "Cocktail glass or rocks glass",
      garnish: "Lemon twist",
      method: "Build",
      ingredients: ["2 oz Plymouth gin", "3-4 dashes Angostura bitters"],
      instructions: ["Add bitters to a chilled glass.", "Swirl to coat the inside.", "Add gin.", "Stir once.", "Garnish with lemon twist.", "Serve at room temperature or very lightly chilled — not over ice in the traditional version."],
      description: "Pink Gin is one of the simplest drinks ever made — gin with Angostura bitters and nothing else. It was the drink of the Royal Navy for over a century, served in officers' messes worldwide, and has been almost entirely forgotten outside Britain.",
      region: "Royal Navy; Plymouth, England — Plymouth gin was the official spirit of the Royal Navy",
      notable: "Pink Gin was prescribed by Royal Navy surgeons as a cure for seasickness — the Angostura bitters were used medicinally for stomach complaints. Sailors mixed them with their gin ration and inadvertently created a cocktail.",
      history: "Angostura bitters were originally developed as a medicinal tincture in Venezuela in the 1820s. The Royal Navy adopted them for treating seasickness and digestive complaints. Sailors began mixing the bitters with their gin ration, producing the Pink Gin. Plymouth gin — made near the Navy's home port — became the canonical spirit. The drink was served in Royal Navy officers' messes for over a century and was standard at British clubs worldwide. It has been almost entirely forgotten outside traditional British institutions.",
      famousQuote: "\"A Pink Gin is the drink of a gentleman who has served at sea.\" — Anonymous Royal Navy tradition",
    },
    {
      name: "Gin and It",
      badges: ["forgotten"],
      glass: "Cocktail glass",
      garnish: "Lemon twist or maraschino cherry",
      method: "Stir",
      ingredients: ["1.5 oz London Dry gin", "1.5 oz Italian sweet vermouth ('It' = Italian)"],
      instructions: ["Combine gin and sweet vermouth in a mixing glass with ice.", "Stir for 20 seconds.", "Strain into cocktail glass.", "No ice in the glass — this drink is traditionally served at room temperature.", "Garnish with lemon twist or cherry."],
      description: "Gin and It — 'It' being shorthand for Italian vermouth — was the standard cocktail in British pubs and clubs from the early 20th century through the 1960s. It is the British equivalent of the Manhattan, served without ice.",
      region: "Britain; standard pub and club drink from the 1920s through the 1960s",
      notable: "The Gin and It was so standard in British social life that ordering 'a gin and it' required no further explanation in any pub or club in England for over forty years. Its decline coincided with Britain's adoption of American cocktail culture in the 1960s and 70s.",
      history: "The Gin and It emerged from the same sweet Martini tradition as the Martinez — equal parts gin and sweet vermouth, served without ice, at the temperature of the room. This was standard British drinking culture before American-style cocktail bars arrived. The lack of ice — still unusual in Britain before the postwar era — was not a shortcoming but a feature. The drink has been almost entirely replaced by the dry Martini and gin and tonic in contemporary British drinking culture.",
      famousQuote: "\"In the old days, you could walk into any pub in England and order a Gin and It without anyone asking what that was.\" — Anonymous",
    },
    {
      name: "Spritz al Bitter",
      badges: ["forgotten"],
      glass: "Wine glass",
      garnish: "Lemon slice, green olive",
      method: "Build",
      ingredients: ["2 oz Campari", "3 oz still or sparkling white wine", "1 oz club soda"],
      instructions: ["Fill glass with ice.", "Pour wine first.", "Add Campari.", "Top with soda.", "Garnish with lemon and olive."],
      description: "The Spritz al Bitter is the original bitter Venetian spritz — predating both the Aperol Spritz and the modern prosecco format. Made with still wine and Campari, it is the austere original that spawned a global phenomenon.",
      region: "Venice and the Veneto, Italy; 19th century Austrian military origin, refined through the 20th century",
      notable: "When the New York Times declared the Aperol Spritz 'not a good drink' in 2019, Venetians pointed to the Spritz al Bitter as the real thing. Campari's bitterness produces a far more complex and less sweet drink than Aperol — this is the version serious Italian drinkers prefer.",
      history: "The Spritz format evolved in Veneto from the Austrian military tradition of diluting local wines. As aperitivo culture developed in northern Italy through the 20th century, Campari became the bitter of choice in Venice and the eastern Veneto. The Aperol version — sweeter, lower alcohol, orange-colored — was created in 1919 but only became dominant globally after Campari Group's marketing push from 2003 onward. The Campari version is the original, the drier version, and the one that serious Italian bartenders still prefer.",
      famousQuote: "\"The Aperol Spritz is the Spritz for tourists. The Campari Spritz is the Spritz for Venetians.\" — Anonymous Venetian bartender",
    },
    {
      name: "Whiskey Smash",
      badges: [],
      glass: "Rocks glass",
      garnish: "Lemon wedge, mint sprig",
      method: "Shake",
      ingredients: ["2 oz bourbon", "0.75 oz fresh lemon juice", "0.75 oz simple syrup", "8-10 fresh mint leaves"],
      instructions: ["Muddle mint leaves gently with simple syrup in shaker.", "Add bourbon, lemon juice, and ice.", "Shake vigorously.", "Double strain into rocks glass over fresh ice.", "Garnish with lemon and mint sprig."],
      description: "The Whiskey Smash is a simplified Mint Julep crossed with a Whiskey Sour — a drink existing in various forms since the 19th century that was revived in its current form by Dale DeGroff at the Rainbow Room in New York.",
      region: "Revived by Dale DeGroff at the Rainbow Room, New York City, 1990s; original concept dating to the 19th century",
      notable: "Dale DeGroff, known as 'King Cocktail,' is one of the most influential figures in the craft cocktail revival. His work at the Rainbow Room in New York in the 1980s and 90s is credited with beginning the movement that transformed American bartending.",
      history: "The Smash as a cocktail category dates to the 19th century — Jerry Thomas documented it in 1862. The specific Whiskey Smash in its current form was popularized by Dale DeGroff at the Rainbow Room, where he began the project of rediscovering and rehabilitating classic cocktail techniques in the 1980s. DeGroff's insistence on fresh ingredients and proper technique was revolutionary at a time when most American bars used artificial mixers.",
      famousQuote: "\"Fresh ingredients aren't a luxury. They're the minimum.\" — Dale DeGroff",
    },
    {
      name: "Gimlet (Fresh Lime)",
      badges: ["classic"],
      glass: "Cocktail glass or rocks glass",
      garnish: "Lime wheel",
      method: "Shake",
      ingredients: ["2 oz London Dry gin", "0.75 oz fresh lime juice", "0.5 oz simple syrup"],
      instructions: ["Combine all ingredients in a shaker with ice.", "Shake well.", "Strain into chilled glass or over fresh ice.", "Garnish with lime wheel."],
      description: "The fresh lime Gimlet emerged as the craft cocktail movement rejected preserved cordials in favor of fresh juice — sparking one of the great debates in cocktail culture between tradition and improvement.",
      region: "American craft cocktail bars, 1990s-2000s, as part of the fresh-ingredient movement",
      notable: "The fresh lime vs. Rose's cordial debate in the Gimlet is one of cocktail culture's great arguments. Traditionalists cite Raymond Chandler. Modernists point out that Chandler was describing a wartime drink made from preserved ingredients of necessity, not preference.",
      history: "The shift from Rose's lime cordial to fresh lime juice in the Gimlet represents the broader craft cocktail revolution in miniature. When Dale DeGroff and others began insisting on fresh ingredients in the late 1980s and 90s, the Gimlet became a battleground. The traditional version with Rose's cordial is sweeter and more syrupy. The fresh version is more acidic and brighter. Both are correct — the debate between them has been used to illustrate every argument in cocktail culture about tradition versus innovation.",
      famousQuote: "\"Fresh lime is better. Rose's is correct. Both statements are true.\" — Anonymous bartender",
    },
    {
      name: "Jungle Bird (Modern)",
      badges: ["tiki", "classic"],
      glass: "Rocks glass or tiki mug",
      garnish: "Pineapple wedge, dehydrated pineapple wheel, Luxardo cherry",
      method: "Shake",
      ingredients: ["1.5 oz aged Jamaican rum", "0.75 oz Campari", "1.5 oz fresh pineapple juice", "0.5 oz fresh lime juice", "0.5 oz simple syrup"],
      instructions: ["Use fresh pineapple juice if possible — it makes a significant difference.", "Combine all ingredients in a shaker with ice.", "Shake vigorously.", "Strain over fresh ice or crushed ice.", "Garnish elaborately."],
      description: "The craft cocktail revival's rediscovery of the Jungle Bird transformed it from a forgotten 1978 hotel drink into a modern classic — the drink that demonstrated that Campari and tropical ingredients belong together.",
      region: "Rediscovered and popularized through American craft cocktail bars from 2004 onward",
      notable: "The Jungle Bird's resurrection is one of the craft cocktail movement's great triumphs. Jeff Berry found it in a trade publication, published it, and within five years it was on craft bar menus worldwide. It demonstrated that great cocktails can be hiding in plain sight for decades.",
      history: "The Jungle Bird was created in 1978 at the Kuala Lumpur Hilton and forgotten for over twenty-five years. Jeff Berry's rediscovery and publication brought it to the attention of craft bartenders, who immediately recognized its genius. The combination of Campari's bitterness with rum and tropical fruit created something that felt both new and timeless. Its revival is now considered a defining moment of the early craft cocktail movement.",
      famousQuote: "\"Some cocktails are invented. Some are discovered. The Jungle Bird was both.\" — Anonymous",
    },
    {
      name: "Naked and Famous (Original)",
      badges: [],
      glass: "Cocktail glass (chilled coupe)",
      garnish: "None",
      method: "Shake",
      ingredients: ["0.75 oz mezcal", "0.75 oz Aperol", "0.75 oz yellow Chartreuse", "0.75 oz fresh lime juice"],
      instructions: ["Combine all ingredients in a shaker with ice.", "Shake vigorously.", "Strain into chilled coupe."],
      description: "A second entry for the Naked and Famous to represent its roots as a riff on the Paper Plane — showing how one equal-parts template can generate multiple distinct modern classics.",
      region: "Death & Co, East Village, New York City, 2011",
      notable: "The equal-parts cocktail template — spirit, bitter liqueur, herbal liqueur, citrus — has generated more modern classics than any other format. Last Word, Paper Plane, Naked and Famous all share the same structural DNA.",
      history: "The equal-parts template originates with the Last Word (1916) and was revived by the craft cocktail movement as a structurally perfect format. Sam Ross used it for the Paper Plane; Joaquín Simó adapted it for the Naked and Famous. The template's genius is that when all four ingredients are in balance, the drink almost makes itself.",
      famousQuote: "\"Give me four equal parts of anything interesting and I'll make you a drink.\" — Joaquín Simó",
    },
  ],
  "1960s": [
    {
      name: "Margarita",
      badges: ["classic"],
      glass: "Coupe or rocks glass (salt rim optional)",
      garnish: "Lime wheel, optional salt rim",
      method: "Shake",
      ingredients: ["2 oz blanco tequila", "1 oz fresh lime juice", "0.75 oz Cointreau or triple sec"],
      instructions: ["Optional: salt one half of the rim by running a lime wedge around it and dipping in salt.", "Combine all ingredients in a shaker with ice.", "Shake vigorously.", "Strain into prepared glass over fresh ice or straight up.", "Garnish with lime wheel."],
      description: "The Margarita is essentially a Sidecar with tequila — the most important cocktail in spreading tequila's acceptance in America. At least seven different origin stories compete for credit.",
      region: "Contested between Tijuana, Acapulco, and Texas; most documented version attributed to Carlos Herrera near Tijuana, 1938",
      notable: "At least seven people claim to have invented the Margarita. Socialite Margarita Sames claimed Acapulco, 1948. Tommy Hilliard of a Texas chain claimed 1971. None can be definitively proven. The societal impact is undeniable — the Margarita transformed tequila into the second most popular spirits category in America.",
      history: "The Margarita's origin is one of the most contested in cocktail history. The most widely accepted version credits Carlos Herrera of Rancho La Gloria near Tijuana, who created it in 1938 for actress Marjorie King, allergic to all spirits except tequila. The Margarita was instrumental in popularizing tequila in the United States, helping transform it from a novelty into a mainstream spirit.",
      famousQuote: "\"I invented the Margarita.\" — claimed by at least seven different people",
    },
    {
      name: "Tequila Sunrise",
      badges: ["party_staple"],
      glass: "Collins glass",
      garnish: "Orange slice, cherry",
      method: "Build",
      ingredients: ["2 oz blanco tequila", "4 oz fresh orange juice", "0.5 oz grenadine"],
      instructions: ["Fill Collins glass with ice.", "Add tequila.", "Add orange juice and stir gently.", "Pour grenadine slowly down the side of the glass — it will sink to the bottom.", "Do not stir — the gradient effect is the point.", "Garnish with orange and cherry."],
      description: "The Tequila Sunrise was the official drink of the Rolling Stones' 1972 American tour — Mick Jagger drank them throughout and the tour was called the 'cocaine and Tequila Sunrise tour.'",
      region: "Arizona Biltmore Hotel, Phoenix (1930s original); reinvented by Bobby Lozoff and Billy Rice at the Trident restaurant in Sausalito, California, 1970",
      notable: "The Rolling Stones' 1972 'Exile on Main St.' tour was nicknamed the cocaine and Tequila Sunrise tour. Mick Jagger reportedly drank them throughout. The Eagles wrote their 1973 song 'Tequila Sunrise' after the tour.",
      history: "The Tequila Sunrise has two distinct versions. The original was created at the Arizona Biltmore in the 1930s using crème de cassis instead of grenadine. The modern version was created in 1970 by Bobby Lozoff and Billy Rice at the Trident restaurant in Sausalito, where it became the drink of the rock music community. When Mick Jagger encountered it on the Rolling Stones' 1972 tour, it spread through rock culture instantly.",
      famousQuote: "\"It's the cocaine of cocktails.\" — Peter Rudge, Rolling Stones tour manager, 1972",
    },
    {
      name: "Blood and Sand",
      badges: [],
      glass: "Cocktail glass (chilled coupe)",
      garnish: "Orange twist",
      method: "Shake",
      ingredients: ["0.75 oz Scotch whisky", "0.75 oz Cherry Heering", "0.75 oz sweet vermouth", "0.75 oz fresh orange juice"],
      instructions: ["Combine all ingredients in a shaker with ice.", "Shake well.", "Strain into chilled coupe.", "Garnish with orange twist."],
      description: "Named for the 1922 Rudolph Valentino bullfighting film, the Blood and Sand is one of the few equal-parts cocktails that genuinely works — the unlikely combination of Scotch, cherry liqueur, vermouth, and orange creates something mysterious.",
      region: "Documented in Harry Craddock's The Savoy Cocktail Book, 1930; named for the 1922 Valentino film",
      notable: "Rudolph Valentino was the first male movie star and the ultimate symbol of 1920s cinematic glamour. 'Blood and Sand' was his 1922 bullfighting film — a massive international success. The cocktail named for it appeared in print eight years later.",
      history: "The Blood and Sand appeared in Harry Craddock's 1930 Savoy Cocktail Book. The combination of Scotch whisky with sweet, fruity liqueurs and orange juice should not work — and yet it does. The drink was little known outside serious cocktail circles until the craft cocktail movement rediscovered it as an example of the unexpected combinations the classic era produced.",
      famousQuote: "\"The Blood and Sand has no right to be as good as it is. That's what makes it interesting.\" — Anonymous",
    },
    {
      name: "Cosmopolitan",
      badges: ["party_staple"],
      glass: "Cocktail glass (chilled martini glass)",
      garnish: "Flamed orange peel or lime wheel",
      method: "Shake",
      ingredients: ["1.5 oz citrus vodka", "0.75 oz Cointreau", "0.5 oz fresh lime juice", "0.5 oz cranberry juice (just enough for color)"],
      instructions: ["Combine all ingredients in a shaker with ice.", "Shake vigorously.", "Strain into chilled martini glass.", "Flame orange peel over the drink: hold a lit match near the glass and squeeze the peel toward the flame for a burst of citrus oil.", "Drop peel in or discard."],
      description: "The Cosmopolitan defined 1990s New York cocktail culture and was made globally famous by Sex and the City. Carrie Bradshaw's Cosmopolitan did more for the drink than any marketing campaign ever could.",
      region: "San Francisco (Cheryl Cook, 1987) or New York (Toby Cecchini, 1988 at The Odeon) — both claims are disputed",
      notable: "Carrie Bradshaw ordering Cosmopolitans on Sex and the City (1998-2004) made the drink a cultural phenomenon. Sarah Jessica Parker has said the writers chose the Cosmopolitan because it photographed beautifully — the pink color was visually distinctive on television.",
      history: "The Cosmopolitan's origin is disputed between Cheryl Cook in Miami around 1985 and Toby Cecchini at The Odeon in New York in 1987-88. Dale DeGroff's championing of the drink at the Rainbow Room brought it to the fashion world and eventually to the Sex and the City writers. The show's four seasons of Cosmopolitan consumption made the drink the most ordered cocktail in America. Its decline coincided almost exactly with the show going off the air.",
      famousQuote: "\"I thought Carrie was the most sophisticated person I'd ever seen. She was drinking a Cosmopolitan.\" — anonymous",
    },
    {
      name: "Aperol Spritz",
      badges: ["party_staple"],
      glass: "Large wine glass",
      garnish: "Orange slice, optional green olive",
      method: "Build",
      ingredients: ["3 oz Prosecco", "2 oz Aperol", "1 oz club soda", "Ice"],
      instructions: ["Fill large wine glass with ice.", "Pour Prosecco first.", "Add Aperol.", "Top with a splash of club soda.", "Garnish with orange slice.", "Stir gently once."],
      description: "The Aperol Spritz has roots in 19th century northern Italy, where Austrian soldiers diluted local wine with water. Aperol was invented in 1919 in Padua, and the Spritz became the defining drink of Venetian aperitivo culture.",
      region: "Venice and the Veneto region of northeastern Italy; Aperol created in Padua in 1919",
      notable: "The New York Times controversially declared in 2019 that the Aperol Spritz was 'not a good drink' — generating a global backlash that demonstrated how deeply the drink had embedded itself in contemporary culture. The Venetian tourist board attempted to remove it from menus in Venice in 2018, claiming it was a tourist drink.",
      history: "The Spritz format — wine or spirits with sparkling water — has roots in 19th century Veneto, where Austrian soldiers asked locals to dilute wine with water. Aperol was created in 1919 by the Barbieri brothers in Padua. Campari Group's global marketing campaign after their 2003 acquisition transformed it into an international phenomenon.",
      famousQuote: "\"The Aperol Spritz is a bad drink that everyone loves, which makes it a great drink.\" — Anonymous, responding to the 2019 New York Times article",
    },
    {
      name: "Midori Sour",
      badges: ["party_staple"],
      glass: "Rocks glass or coupe",
      garnish: "Maraschino cherry, lime wheel",
      method: "Shake",
      ingredients: ["1.5 oz Midori melon liqueur", "1 oz vodka", "1 oz fresh lime juice", "0.5 oz simple syrup"],
      instructions: ["Combine all ingredients in a shaker with ice.", "Shake well.", "Strain into glass over ice or straight up.", "Garnish with cherry and lime."],
      description: "Midori — Japanese for 'green' — was launched at Studio 54 in New York in 1978, one of the most audacious product launches in liquor history. The Midori Sour was the flagship cocktail and defined an era of brightly colored, sweetly flavored drinks.",
      region: "Studio 54, New York City, 1978; Midori created by Suntory of Japan",
      notable: "Suntory launched Midori at a party at Studio 54 hosted by John Belushi, Dan Aykroyd, and Mikhail Baryshnikov, with guests including Bianca Jagger and Diana Ross. It was one of the most spectacular product launches in drinks history and perfectly timed for the disco era.",
      history: "Suntory launched Midori at Studio 54 in 1978 with a party that encapsulated everything about the disco era — celebrity, excess, vivid color, and total disregard for subtlety. The bright green liqueur's sweetness and novelty made it an instant hit. The Midori Sour became its signature serve and was ubiquitous in the early 1980s. Its association with that era's excess caused it to fall from fashion as cocktail culture matured, but it has experienced a modest revival as nostalgia for the period has grown.",
      famousQuote: "\"At Studio 54, every drink was neon-colored and everything was possible.\" — Anonymous guest",
    },
    {
      name: "Sloe Gin Fizz",
      badges: ["forgotten"],
      glass: "Collins glass",
      garnish: "Lemon wheel, cherry",
      method: "Shake and strain",
      ingredients: ["2 oz sloe gin", "1 oz fresh lemon juice", "0.5 oz simple syrup", "Club soda to top"],
      instructions: ["Combine sloe gin, lemon juice, and simple syrup in a shaker with ice.", "Shake well.", "Strain into ice-filled Collins glass.", "Top with club soda.", "Garnish with lemon and cherry."],
      description: "Sloe gin — made from sloe berries steeped in gin — was one of the most popular spirits in Britain and America for over a century. The Sloe Gin Fizz was its signature serve and was widely drunk from the 1890s through the mid-20th century.",
      region: "Britain and America; sloe gin production centered in Britain's hedgerow country",
      notable: "Real sloe gin — made from actual sloe berries — is completely different from the artificially flavored American versions that dominated the market from the 1970s onward. The difference largely explains why the Sloe Gin Fizz fell from favor: the substitute product tasted nothing like the original.",
      history: "Sloe gin made from sloe berries (the fruit of the blackthorn shrub) has been produced in Britain since at least the 17th century. It was enormously popular in America from the late 19th century through Prohibition. The Sloe Gin Fizz was one of the most ordered cocktails in America from the 1890s through the 1940s. The decline began when American distillers began producing artificial sloe gin with coloring and flavoring instead of actual sloe berries — creating a product that tasted nothing like the original and killed enthusiasm for the category.",
      famousQuote: "\"Real sloe gin tastes like autumn in the English countryside. The American version tastes like cough syrup.\" — Anonymous",
    },
    {
      name: "Gimlet (Vodka)",
      badges: ["party_staple"],
      glass: "Cocktail glass or rocks glass",
      garnish: "Lime wheel",
      method: "Shake",
      ingredients: ["2 oz vodka", "0.75 oz fresh lime juice", "0.5 oz simple syrup"],
      instructions: ["Combine all ingredients in a shaker with ice.", "Shake well.", "Strain into chilled glass.", "Garnish with lime wheel."],
      description: "The vodka Gimlet is technically not a Gimlet at all — it's a Vodka Sour — but became widely popular as gin fell from fashion in the 1970s and 80s. It's the drink that introduced many people to the Gimlet template.",
      region: "American bars, 1970s-80s, as vodka replaced gin as America's dominant white spirit",
      notable: "The substitution of vodka for gin in classic gin cocktails is one of the defining trends of 1970s and 80s American drinking culture. The Vodka Martini, Vodka Gimlet, and Vodka Tonic all emerged from this period when gin's piney, botanical character fell from favor.",
      history: "The vodka Gimlet emerged as vodka's dominance in American drinking culture grew through the 1970s. American tastes had shifted toward lighter, more neutral flavors, and vodka's lack of strong botanical character made it a more accessible base for many drinkers. The vodka Gimlet, while technically distinct from the gin original, introduced a generation to the sour-format cocktail. The craft cocktail movement largely returned the Gimlet to gin, but the vodka version remains widely ordered.",
      famousQuote: "\"The vodka Gimlet is what happens when America decides that gin is too complicated.\" — Anonymous",
    },
    {
      name: "Midori Sour",
      badges: ["party_staple"],
      glass: "Rocks glass or coupe",
      garnish: "Maraschino cherry, lime wheel",
      method: "Shake",
      ingredients: ["1.5 oz Midori melon liqueur", "1 oz vodka", "1 oz fresh lime juice", "0.5 oz simple syrup"],
      instructions: ["Combine all ingredients in a shaker with ice.", "Shake well.", "Strain into glass over ice or straight up.", "Garnish with cherry and lime."],
      description: "Midori — Japanese for 'green' — was launched at Studio 54 in New York in 1978 in one of the most audacious product launches in liquor history. The Midori Sour was its flagship cocktail and defined an era of brightly colored, sweetly flavored drinks.",
      region: "Studio 54, New York City, 1978; Midori created by Suntory of Japan",
      notable: "Suntory launched Midori at Studio 54 with a party hosted by John Belushi, Dan Aykroyd, and Mikhail Baryshnikov, with guests including Bianca Jagger and Diana Ross. It was one of the most spectacular product launches in drinks history — perfectly timed for the disco era.",
      history: "Suntory launched Midori at Studio 54 in 1978 with a party that encapsulated everything about the disco era. The bright green liqueur's sweetness and novelty made it an instant hit. The Midori Sour became its signature serve and was ubiquitous in the early 1980s. Its association with that era caused it to fall from fashion as cocktail culture matured, but it has experienced a modest revival as nostalgia for the period has grown.",
      famousQuote: "\"At Studio 54, every drink was neon-colored and everything was possible.\" — Anonymous guest",
    },
    {
      name: "Sloe Gin Fizz",
      badges: ["forgotten"],
      glass: "Collins glass",
      garnish: "Lemon wheel, cherry",
      method: "Shake and strain",
      ingredients: ["2 oz real sloe gin (not artificial-flavored)", "1 oz fresh lemon juice", "0.5 oz simple syrup", "Club soda to top"],
      instructions: ["Combine sloe gin, lemon juice, and simple syrup in a shaker with ice.", "Shake well.", "Strain into ice-filled Collins glass.", "Top with club soda.", "Garnish with lemon and cherry."],
      description: "Sloe gin — made from sloe berries steeped in gin — was one of the most popular spirits in Britain and America for over a century. The Sloe Gin Fizz was its signature serve, widely drunk from the 1890s through the mid-20th century, before artificial imitations killed the category.",
      region: "Britain and America; sloe gin production centered in Britain's hedgerow country",
      notable: "Real sloe gin made from actual sloe berries is completely different from the artificially flavored American versions that dominated from the 1970s onward. The difference largely explains why the Sloe Gin Fizz fell from favor — the substitute tasted nothing like the original.",
      history: "Sloe gin made from sloe berries has been produced in Britain since at least the 17th century and was enormously popular in America from the late 19th century through Prohibition. The Sloe Gin Fizz was one of the most ordered cocktails in America from the 1890s through the 1940s. Its decline began when American distillers began producing artificial sloe gin with coloring and flavoring instead of actual berries — creating a product that tasted nothing like the original and killed enthusiasm for the category.",
      famousQuote: "\"Real sloe gin tastes like autumn in the English countryside. The American version tastes like cough syrup.\" — Anonymous",
    },
  ],
  "1970s": [
    {
      name: "Espresso Martini",
      badges: ["classic"],
      glass: "Cocktail glass (chilled coupe or martini glass)",
      garnish: "3 coffee beans (representing health, wealth, and happiness)",
      method: "Shake",
      ingredients: ["1.5 oz vodka", "1 oz coffee liqueur (Kahlúa)", "1 oz freshly brewed espresso (cooled slightly)", "0.5 oz simple syrup"],
      instructions: ["Brew espresso and cool slightly.", "Combine all ingredients in a shaker with ice.", "Shake very vigorously for at least 15 seconds — you want the foam.", "Strain into chilled glass.", "The crema from the espresso creates foam on top.", "Garnish with 3 coffee beans in the center of the foam."],
      description: "The Espresso Martini was created by Dick Bradsell at the Soho Brasserie in London in 1983 for a young model who asked him to make her something to 'wake me up and f*** me up.' It is one of the most significant cocktails created in the last fifty years.",
      region: "Soho Brasserie, London, 1983; created by Dick Bradsell, often called 'the Godfather of British cocktails'",
      notable: "Dick Bradsell (1959-2016) is credited with single-handedly reviving cocktail culture in London in the 1980s. The young model who requested the Espresso Martini has never been officially identified. The drink experienced a massive global revival from 2018-2023, becoming one of the most ordered cocktails in the world.",
      history: "Dick Bradsell created the Espresso Martini in 1983 at the Soho Brasserie. The story — that a young model requested something to wake her up and do something else simultaneously — is now cocktail legend. Bradsell, who died in 2016 and is considered the most important figure in the British cocktail revival, created a drink that was simultaneously of its era and completely timeless.",
      famousQuote: "\"She asked me to make her something that would wake her up and f*** her up. I made her the Vodka Espresso.\" — Dick Bradsell, on the creation of the Espresso Martini",
    },
    {
      name: "Paper Plane",
      badges: ["classic"],
      glass: "Cocktail glass (chilled coupe)",
      garnish: "None, or minimal lemon twist",
      method: "Shake",
      ingredients: ["0.75 oz bourbon", "0.75 oz Aperol", "0.75 oz Amaro Nonino", "0.75 oz fresh lemon juice"],
      instructions: ["Combine all ingredients in a shaker with ice.", "Shake vigorously.", "Strain into chilled coupe.", "No garnish, or minimal lemon twist."],
      description: "The Paper Plane was created by Sam Ross at Milk & Honey in New York in 2007 — a perfectly equal-parts modern classic named for the M.I.A. song. Along with the Penicillin, it represents the craft cocktail movement's original contribution to the canon.",
      region: "Violet Hour, Chicago and Milk & Honey, New York City, 2007; created by Sam Ross",
      notable: "Sam Ross created both the Paper Plane and the Penicillin, making him arguably the most important cocktail creator of the early 21st century. The Paper Plane was named for the M.I.A. song playing when it was created.",
      history: "Sam Ross created the Paper Plane in 2007, first serving it at the Violet Hour in Chicago before it appeared at Milk & Honey in New York. The drink's perfect equal-parts structure was both an aesthetic choice and a culinary one. The combination of bourbon, Aperol, Amaro Nonino, and lemon juice creates something simultaneously bitter, sweet, spirit-forward, and citrus-bright.",
      famousQuote: "\"If the Last Word is the discovery of the craft cocktail era, the Paper Plane is its original creation.\" — Anonymous",
    },
    {
      name: "Penicillin",
      badges: ["classic"],
      glass: "Rocks glass",
      garnish: "Candied ginger, lemon twist",
      method: "Shake",
      ingredients: ["2 oz blended Scotch whisky", "0.75 oz fresh lemon juice", "0.75 oz honey-ginger syrup (equal parts honey, ginger juice, water)", "0.25 oz Islay single malt Scotch (float on top)"],
      instructions: ["Make honey-ginger syrup: blend fresh ginger, strain, combine juice with equal parts honey and water.", "Combine blended Scotch, lemon juice, and honey-ginger syrup in a shaker with ice.", "Shake well.", "Strain into rocks glass over large ice cube.", "Float Islay Scotch over the back of a spoon on top.", "Garnish with candied ginger and lemon twist."],
      description: "The Penicillin was created in 2005 by Sam Ross at Milk & Honey in New York — a modern classic so perfectly conceived it feels like it could have been made at any point in the last century.",
      region: "New York City; Milk & Honey, 134 Eldridge Street, Lower East Side, 2005",
      notable: "Sam Ross created the Penicillin at Milk & Honey in 2005. It has become one of the most influential cocktails of the 21st century — the perfect example of how a modern bartender can create something that feels both new and timeless.",
      history: "Sam Ross created the Penicillin in 2005 while working at Milk & Honey. The drink became the symbol of the early craft cocktail movement — innovative in technique (the honey-ginger syrup, the Islay float), rooted in classic flavors, and perfectly balanced. Milk & Honey itself was a pivotal institution that helped define the modern craft cocktail era.",
      famousQuote: "\"The Penicillin is not a historical cocktail. It's a historical cocktail that happens to have been made in 2005.\" — Sam Ross",
    },
    {
      name: "Long Island Iced Tea",
      badges: ["party_staple"],
      glass: "Collins glass",
      garnish: "Lemon wedge, cola top",
      method: "Build",
      ingredients: ["0.5 oz vodka", "0.5 oz gin", "0.5 oz white rum", "0.5 oz tequila", "0.5 oz triple sec", "1 oz fresh lemon juice", "0.5 oz simple syrup", "Cola to top"],
      instructions: ["Fill Collins glass with ice.", "Add all spirits in order.", "Add lemon juice and simple syrup.", "Top with just enough cola to give the drink a tea-like color.", "Stir gently.", "Garnish with lemon."],
      description: "The Long Island Iced Tea contains no tea and doesn't taste like iced tea — it's five spirits disguised as a soft drink. It became the defining drink of casual American bar culture in the 1980s and 90s.",
      region: "Disputed between Long Island, New York (Robert 'Rosebud' Butt at Oak Beach Inn, 1972) and Long Island, Tennessee",
      notable: "The Long Island Iced Tea became a shorthand for the state of American cocktail culture before the craft revival — competent, potent, and completely uninterested in nuance. Its persistence in American bars demonstrates that strength and value remain important to many drinkers.",
      history: "Robert 'Rosebud' Butt claims to have created the Long Island Iced Tea in 1972 at the Oak Beach Inn on Long Island as an entry in a contest to create a new mixed drink using triple sec. The competing claim is a much older Prohibition-era recipe from Long Island, Tennessee. Whatever its origin, the drink became a staple of 1980s and 90s American bar culture.",
      famousQuote: "\"The Long Island Iced Tea is the cocktail world's answer to the question 'how much alcohol can I fit in one glass?'\" — Anonymous",
    },
    {
      name: "Sex on the Beach",
      badges: ["party_staple"],
      glass: "Collins glass",
      garnish: "Orange slice, cherry",
      method: "Build",
      ingredients: ["1.5 oz vodka", "0.5 oz peach schnapps", "2 oz orange juice", "2 oz cranberry juice"],
      instructions: ["Fill Collins glass with ice.", "Add vodka and peach schnapps.", "Pour orange juice and cranberry juice over.", "Stir gently.", "Garnish with orange and cherry."],
      description: "Sex on the Beach was created in 1987 in Florida as a promotional drink for DeKuyper peach schnapps, representing the candy-sweet cocktail culture of the 1980s and 90s.",
      region: "Fort Lauderdale, Florida, 1987; created by bartender Ted Pizio as part of a DeKuyper promotional contest",
      notable: "Ted Pizio won a case of DeKuyper peach schnapps for creating the best drink using the product. The name he chose was as much a marketing strategy as the recipe — bars reported that simply ordering 'Sex on the Beach' was part of the appeal for many customers.",
      history: "The Sex on the Beach was created in 1987 by Ted Pizio, a Fort Lauderdale bartender participating in a DeKuyper peach schnapps promotional competition. The name was deliberately provocative — in the late 1980s, ordering it had a performative quality that was itself entertaining. The drink's candy-sweet profile was characteristic of the era's turn away from bitter, spirit-forward drinks.",
      famousQuote: "\"The name is the cocktail.\" — Anonymous bartender, on the Sex on the Beach's appeal",
    },
    {
      name: "Mezcal Negroni",
      badges: [],
      glass: "Rocks glass",
      garnish: "Orange peel, optional flaming orange",
      method: "Stir",
      ingredients: ["1 oz mezcal", "1 oz Campari", "1 oz sweet vermouth"],
      instructions: ["Combine all ingredients in a mixing glass with ice.", "Stir for 30 seconds.", "Strain over large ice cube in rocks glass.", "Express orange peel over drink and drop in."],
      description: "The Mezcal Negroni substitutes smoky, complex mezcal for gin — one of the most successful of the countless Negroni variations that has proliferated since the craft cocktail movement made the template central to modern bartending.",
      region: "American craft cocktail bars, 2010s, as mezcal availability expanded in the United States",
      notable: "Mezcal's rise in American craft cocktail culture mirrors tequila's rise in the 1970s and 80s — a spirit with rich tradition that American bartenders discovered and incorporated into classic templates. The Negroni has absorbed dozens of spirit substitutions, but the mezcal version is arguably the most successful.",
      history: "Mezcal was largely unavailable in American bars until the 2010s, when small-production mezcals began reaching the U.S. market. Bartenders immediately began experimenting with it as a Negroni base, finding that mezcal's smokiness created a different but equally compelling drink. The Mezcal Negroni represents the ongoing evolution of the classic cocktail canon.",
      famousQuote: "\"Every generation redraws the Negroni in its own image.\" — Anonymous",
    },
    {
      name: "Navy Grog",
      badges: ["tiki", "forgotten"],
      glass: "Tiki mug or rocks glass",
      garnish: "Lime wedge, mint",
      method: "Shake",
      ingredients: ["1 oz white rum", "1 oz dark Jamaican rum", "1 oz Demerara rum", "0.75 oz fresh lime juice", "0.75 oz grapefruit juice", "0.5 oz honey syrup", "0.5 oz water"],
      instructions: ["Combine all ingredients in a shaker with ice.", "Shake well.", "Pour unstrained into tiki mug or rocks glass over crushed ice.", "Garnish with lime and mint."],
      description: "Navy Grog was Donn Beach's tribute to the Royal Navy's rum ration tradition — the drink that had kept British sailors going for centuries, reimagined through the lens of tiki culture and three different rums.",
      region: "Don the Beachcomber, Hollywood, California, 1941; inspired by Royal Navy grog traditions",
      notable: "The British Royal Navy issued a daily rum ration to sailors from 1655 until July 31, 1970 — a date known as 'Black Tot Day,' when the last rum ration was served and sailors reportedly wore black armbands in mourning.",
      history: "Donn Beach created Navy Grog in 1941 as a tribute to the Royal Navy's centuries-old grog tradition. The original naval grog was simply rum mixed with water (and sometimes lime juice to prevent scurvy). Beach elevated it into a three-rum tiki creation. The drink appeared on his menu throughout the 1940s and was adopted by Trader Vic's as well. The Royal Navy actually discontinued its daily rum ration on July 31, 1970, making it one of the longest-running beverage traditions in military history.",
      famousQuote: "\"Grog is the drink that built the British Empire. Navy Grog is the drink that celebrates it.\" — Anonymous",
    },
    {
      name: "Rusty Nail",
      badges: ["forgotten"],
      glass: "Rocks glass",
      garnish: "Lemon twist",
      method: "Build",
      ingredients: ["2 oz Scotch whisky", "0.5 oz Drambuie (Scotch liqueur with honey and herbs)"],
      instructions: ["Fill rocks glass with ice.", "Pour Scotch over ice.", "Add Drambuie.", "Stir gently twice.", "Garnish with lemon twist."],
      description: "The Rusty Nail was the signature drink of the Rat Pack — Frank Sinatra, Dean Martin, Sammy Davis Jr., Peter Lawford, and Joey Bishop all drank them. It defined the swaggering masculinity of 1960s American nightlife.",
      region: "New York and Las Vegas; particularly associated with the Rat Pack at the Sands Hotel, Las Vegas, 1960s",
      notable: "Frank Sinatra reportedly introduced Dean Martin to the Rusty Nail at the Sands Hotel in Las Vegas during the filming of Ocean's 11 in 1960. The Rat Pack's association with the drink made it synonymous with cool, effortless sophistication — or at least their version of it.",
      history: "The Rusty Nail's origins are somewhat obscure, but it came to prominence in the 1960s through the Rat Pack's very public embrace of it. The combination of Scotch and Drambuie — Scotch-based liqueur flavored with heather honey and herbs — is simple, rich, and deeply Scots in character. Drambuie's legend claims the recipe was a gift from Bonnie Prince Charlie to a Scottish captain after the Battle of Culloden in 1746. The drink faded when the Rat Pack era ended and cocktail culture moved toward lighter, citrus-forward drinks.",
      famousQuote: "\"The Rusty Nail is the drink of a man who has already decided he's having a good time.\" — Dean Martin, attributed",
    },
    {
      name: "Godfather",
      badges: ["forgotten"],
      glass: "Rocks glass",
      garnish: "None, or lemon twist",
      method: "Build",
      ingredients: ["2 oz Scotch whisky", "1 oz Amaretto"],
      instructions: ["Fill rocks glass with a large ice cube.", "Add Scotch.", "Add Amaretto.", "Stir gently.", "No garnish, or a simple lemon twist."],
      description: "The Godfather was named for the 1972 Francis Ford Coppola film — the almond sweetness of Amaretto suggested the Italian-American cultural world of the movie. It was reportedly Marlon Brando's favorite drink.",
      region: "New York and Los Angeles; popularized following the 1972 release of The Godfather",
      notable: "Marlon Brando reportedly drank Godfathers on set during the filming of The Godfather and continued drinking them throughout his later career. The film's cultural dominance in 1972 made anything associated with it immediately fashionable.",
      history: "The Godfather was created around the time of the 1972 film's release, capitalizing on its extraordinary cultural impact. The combination of Scotch and Amaretto — the Italian almond liqueur — referenced the film's Italian-American world while satisfying American tastes for slightly sweeter, spirit-forward drinks. A variation using bourbon instead of Scotch is called a Godmother. Both drinks faded as Amaretto fell from fashion in the 1980s and 90s.",
      famousQuote: "\"I'm going to make him a Godfather he can't refuse.\" — Anonymous bartender, 1972",
    },
    {
      name: "Black Russian",
      badges: ["forgotten"],
      glass: "Rocks glass",
      garnish: "None",
      method: "Build",
      ingredients: ["2 oz vodka", "1 oz coffee liqueur (Kahlúa)"],
      instructions: ["Fill rocks glass with ice.", "Add vodka.", "Add coffee liqueur.", "Stir once.", "No garnish."],
      description: "The Black Russian was created in Brussels in 1949 for the American ambassador to Luxembourg — a simple two-ingredient drink that helped establish vodka's place in the American cocktail vocabulary in the years before the Moscow Mule fully completed that project.",
      region: "Metropole Hotel, Brussels, Belgium, 1949; created by bartender Gustave Tops for Perle Mesta, American ambassador to Luxembourg",
      notable: "Perle Mesta, the American ambassador to Luxembourg for whom the drink was created, was one of Washington D.C.'s most famous hostesses — the inspiration for the musical 'Call Me Madam' starring Ethel Merman. The White Russian variation adds cream and became famous through 'The Big Lebowski.'",
      history: "The Black Russian was created in 1949 by Gustave Tops at the Metropole Hotel in Brussels, where he was head bartender. It was created for Perle Mesta, the American ambassador to Luxembourg who was visiting Brussels. The drink's simplicity — vodka and coffee liqueur — was part of the postwar embrace of vodka as a neutral spirit that mixed well with almost anything. The White Russian, made by adding cream, became culturally famous through Jeff Bridges's character The Dude in 'The Big Lebowski' (1998).",
      famousQuote: "\"The Dude abides.\" — The Big Lebowski, 1998 (on the White Russian variation)",
    },
    {
      name: "White Russian",
      badges: ["party_staple"],
      glass: "Rocks glass",
      garnish: "None",
      method: "Build",
      ingredients: ["2 oz vodka", "1 oz coffee liqueur (Kahlúa)", "1 oz heavy cream (floated on top)"],
      instructions: ["Fill rocks glass with ice.", "Add vodka.", "Add coffee liqueur.", "Float cream on top by pouring over the back of a spoon.", "Do not stir — the layers are part of the drink.", "Stir before drinking if preferred."],
      description: "The White Russian is the Black Russian with cream — a simple modification that created one of the most culturally recognizable cocktails in history, immortalized by Jeff Bridges as The Dude in The Big Lebowski.",
      region: "Variation on the Black Russian; popularized globally through The Big Lebowski (1998)",
      notable: "Jeff Bridges's character The Dude drinks nine White Russians over the course of The Big Lebowski. The film turned the drink into a cultural symbol of a certain laid-back, unhurried approach to life. White Russian consumption increased measurably after the film's cult following grew in the early 2000s.",
      history: "The White Russian is a Black Russian with cream added — a modification that existed from the 1960s onward but never achieved massive cultural prominence until The Big Lebowski in 1998. The Coen Brothers chose the drink as The Dude's signature drink for its slightly absurd, unhurried quality — a man who takes the time to make a proper drink despite the chaos around him. The film's cult following turned it into an enduring cultural touchstone.",
      famousQuote: "\"I don't roll on Shabbos. And I don't drink anything but White Russians.\" — The Dude (paraphrased), The Big Lebowski, 1998",
    },
    {
      name: "Kamikaze",
      badges: ["shot", "party_staple"],
      glass: "Shot glass or small cocktail glass",
      garnish: "Lime wedge",
      method: "Shake",
      ingredients: ["1 oz vodka", "0.5 oz triple sec", "0.5 oz fresh lime juice"],
      instructions: ["Combine all ingredients in a shaker with ice.", "Shake well.", "Strain into shot glass.", "Garnish with lime wedge if serving as a small cocktail."],
      description: "The Kamikaze is essentially a tiny Cosmopolitan without the cranberry — a vodka sour in shot form that became one of the most ordered shots of the 1980s and 90s. Its simplicity and balance make it one of the better shots in the canon.",
      region: "American bars, 1970s-80s; exact origin unknown but widely documented by the late 1970s",
      notable: "The Kamikaze is one of the few shots that actually works as a properly balanced cocktail when scaled up — it is structurally identical to a small Sidecar made with vodka instead of cognac. Several bartenders have noted that it proves the sour template works at any scale.",
      history: "The Kamikaze emerged in American bars in the mid-1970s as vodka's dominance created demand for simple, strong, citrus-forward shots. Its combination of vodka, triple sec, and lime juice predates the Cosmopolitan by over a decade and likely influenced it. The name — Japanese for 'divine wind,' the term for WWII suicide pilots — was part of the 1970s and 80s fashion for provocative drink names that characterized the era.",
      famousQuote: "\"The Kamikaze is the only shot that tastes like an actual cocktail.\" — Anonymous bartender",
    },
    {
      name: "B-52",
      badges: ["shot", "party_staple"],
      glass: "Shot glass",
      garnish: "None",
      method: "Layer",
      ingredients: ["0.5 oz Kahlúa (coffee liqueur)", "0.5 oz Baileys Irish Cream", "0.5 oz Grand Marnier"],
      instructions: ["Pour Kahlúa into shot glass first — it is the heaviest and sinks.", "Slowly pour Baileys over the back of a bar spoon to float it on top.", "Slowly pour Grand Marnier over the back of a bar spoon to float on top of the Baileys.", "The three layers should remain visibly distinct.", "Optional: briefly ignite the Grand Marnier layer and blow out before drinking."],
      description: "The B-52 is the classic layered shot — three liqueurs poured carefully to create visible strata, named for the iconic American long-range bomber. Getting the layers right is a test of a bartender's patience and technique.",
      region: "Generally attributed to Bob Emmons at the Banff Springs Hotel, Alberta, Canada, early 1970s",
      notable: "The B-52 bomber it was named for entered service in 1952 and has been in continuous use longer than any aircraft in military history — the Air Force plans to fly them until 2050, nearly 100 years after their introduction. The shot has shown comparable longevity in bar culture.",
      history: "The B-52 was created in the early 1970s and became one of the definitive shots of the era, demonstrating that presentation — the visible layers — could be as important as flavor. The layering technique relies on the different densities of the liqueurs: Kahlúa is heaviest, Baileys sits above it, Grand Marnier floats on top. The flaming version, where the Grand Marnier top layer is briefly ignited before drinking, added theatrical value.",
      famousQuote: "\"The B-52 is the only shot you order to watch someone make it.\" — Anonymous",
    },
    {
      name: "Slippery Nipple",
      badges: ["shot", "party_staple"],
      glass: "Shot glass",
      garnish: "None",
      method: "Layer",
      ingredients: ["1 oz Sambuca", "0.5 oz Baileys Irish Cream"],
      instructions: ["Pour Sambuca into shot glass.", "Slowly layer Baileys on top by pouring over the back of a bar spoon.", "The Baileys should float visibly on top of the Sambuca.", "Serve immediately."],
      description: "The Slippery Nipple is a simple two-ingredient layered shot from the 1980s — Sambuca's anise flavor against Baileys' creamy sweetness, named with the era's characteristic disregard for subtlety.",
      region: "American bars, 1980s; exact origin unclear",
      notable: "The 1980s produced an extraordinary number of provocatively named shots — the Slippery Nipple, Sex on the Beach, Blow Job, Buttery Nipple — as bar culture discovered that the name was as much a part of the drink's appeal as the taste.",
      history: "The Slippery Nipple emerged in the 1980s as part of a broader trend of simple, sweet, layered shots that were as much about the experience of ordering them as about the flavor. Sambuca's strong anise character had been a popular bar ingredient since the 1970s. Baileys Irish Cream, introduced in 1974, became one of the defining spirits of the era. Their combination produced something sweet, creamy, and faintly anise-flavored that was enormously popular in the decade.",
      famousQuote: "\"In the 1980s, half the appeal of ordering a shot was saying its name out loud.\" — Anonymous bartender",
    },
    {
      name: "Tommy's Margarita",
      badges: ["classic"],
      glass: "Rocks glass",
      garnish: "Lime wheel, optional salt rim",
      method: "Shake",
      ingredients: ["2 oz 100% agave blanco tequila", "1 oz fresh lime juice", "0.5 oz agave syrup (2:1 agave nectar to water)"],
      instructions: ["Combine all ingredients in a shaker with ice.", "Shake well.", "Strain into rocks glass over fresh ice.", "Garnish with lime wheel."],
      description: "Tommy's Margarita was created by Julio Bermejo at Tommy's Mexican Restaurant in San Francisco in 1990 — replacing Cointreau with agave syrup to let the tequila's character take center stage. It is now considered the definitive template for serious Margarita making.",
      region: "Tommy's Mexican Restaurant, Geary Boulevard, San Francisco, California; Julio Bermejo, 1990",
      notable: "Julio Bermejo is one of the world's foremost tequila authorities and helped educate a generation of American bartenders about 100% agave tequila at a time when most bars served cheaper mixto tequila. The IBA officially recognized Tommy's Margarita as a contemporary classic in 2011.",
      history: "Julio Bermejo created Tommy's Margarita in 1990 as a way to showcase the quality of 100% agave tequila. By replacing Cointreau with agave syrup, he removed the orange flavor that competes with tequila and created a purer expression of the spirit. The drink forces the quality of the tequila to carry it — there is nowhere to hide. Its recognition by the IBA in 2011 validated what craft bartenders had known for two decades.",
      famousQuote: "\"The best Margarita is the one that tastes most like tequila.\" — Julio Bermejo",
    },
    {
      name: "Amaretto Sour (Jeffrey Morgenthaler)",
      badges: ["classic"],
      glass: "Rocks glass",
      garnish: "Brandied cherry, lemon twist",
      method: "Shake",
      ingredients: ["1.5 oz Amaretto", "0.75 oz cask-strength bourbon (at least 100 proof)", "1 oz fresh lemon juice", "0.5 oz simple syrup", "0.5 oz egg white"],
      instructions: ["Combine all ingredients in a shaker without ice.", "Dry shake vigorously for 15 seconds to emulsify the egg white.", "Add ice and shake hard for another 15 seconds.", "Strain into rocks glass over fresh ice.", "Garnish with branded cherry and lemon twist."],
      description: "Jeffrey Morgenthaler's 2012 rehabilitation of the Amaretto Sour — one of the most dismissed cocktails of the 1980s — transformed it into one of the best drinks of the contemporary era by adding high-proof bourbon, egg white, and proper fresh juice.",
      region: "Clyde Common, Portland, Oregon; Jeffrey Morgenthaler, 2012",
      notable: "Morgenthaler's blog post about his Amaretto Sour went viral in cocktail culture almost immediately. He demonstrated that a supposedly 'bad' drink could be transformed entirely through technique. His approach became a model for the craft movement's rehabilitation of dismissed classics.",
      history: "The original Amaretto Sour — Amaretto, sweet and sour mix, orange slice and cherry garnish — was considered one of the worst cocktails of the 1980s and 90s. Morgenthaler's 2012 version used the same base ingredient but transformed it entirely: high-proof bourbon to cut the sweetness, egg white for body and texture, more fresh lemon to balance. The result was so dramatically better that it became a template for how serious bartenders could approach any dismissed drink.",
      famousQuote: "\"I'm not ashamed to say that I love the Amaretto Sour. I'm ashamed of what bars were doing to it.\" — Jeffrey Morgenthaler, 2012",
    },
    {
      name: "Porn Star Martini",
      badges: ["party_staple"],
      glass: "Martini glass with a shot of Prosecco on the side",
      garnish: "Passion fruit half on top of the drink",
      method: "Shake",
      ingredients: ["2 oz vanilla vodka", "1 oz passion fruit liqueur (Passoã)", "1 oz fresh passion fruit puree (or half a passion fruit)", "0.5 oz fresh lime juice", "0.5 oz simple syrup", "Small glass of Prosecco (served separately)"],
      instructions: ["Combine vodka, passion fruit liqueur, passion fruit, lime juice, and simple syrup in a shaker with ice.", "Shake vigorously.", "Strain into martini glass.", "Float half a passion fruit on top of the drink.", "Serve with a small shot of Prosecco on the side.", "The Prosecco is drunk as a chaser or poured into the drink."],
      description: "The Porn Star Martini was created by Douglas Ankrah in London in 2002 and became the most ordered cocktail in the UK for several consecutive years — a passion fruit and vanilla creation that scandalized serious bartenders and delighted everyone else.",
      region: "Townhouse Bar, London, 2002; created by Douglas Ankrah",
      notable: "The Porn Star Martini became the UK's best-selling cocktail in the 2010s, a distinction that horrified the craft cocktail community and demonstrated that the drinking public's priorities differ significantly from serious bartenders' priorities. Some venues renamed it the 'Passion Star Martini' to avoid controversy.",
      history: "Douglas Ankrah created the Porn Star Martini at his London bar in 2002. The name caused immediate controversy but the drink's combination of passion fruit, vanilla vodka, and a Prosecco chaser was irresistibly popular. It became the UK's most ordered cocktail in the 2010s, outselling every craft cocktail classic. The accompanying Prosecco shot — meant to cleanse the palate between sips — became its signature ritual.",
      famousQuote: "\"I wanted to make a drink that felt like a party. I think I succeeded.\" — Douglas Ankrah",
    },
    {
      name: "Naked and Famous",
      badges: ["classic"],
      glass: "Cocktail glass (chilled coupe)",
      garnish: "None",
      method: "Shake",
      ingredients: ["0.75 oz mezcal", "0.75 oz Aperol", "0.75 oz yellow Chartreuse", "0.75 oz fresh lime juice"],
      instructions: ["Combine all ingredients in a shaker with ice.", "Shake vigorously.", "Strain into chilled coupe.", "No garnish needed — the drink is complete."],
      description: "The Naked and Famous is a modern equal-parts classic created by Joaquín Simó at Death & Co in New York in 2011 — a mezcal riff on the Paper Plane that has become one of the defining cocktails of the contemporary craft era.",
      region: "Death & Co, East Village, New York City, 2011; created by Joaquín Simó",
      notable: "Death & Co, opened on New Year's Day 2007, is considered one of the most influential bars in American cocktail history. Its bartenders created dozens of cocktails that are now considered modern classics. The bar's cocktail menu has been published as a book that reads as a textbook for the craft cocktail era.",
      history: "Joaquín Simó created the Naked and Famous at Death & Co in 2011, inspired by the Paper Plane's equal-parts framework. The substitution of mezcal for bourbon and yellow Chartreuse for Amaro Nonino created something with its own distinct identity — smokier, more herbal, and distinctly contemporary. The drink demonstrates that the equal-parts template, first codified in the Last Word in 1916, continues to produce great cocktails nearly a century later.",
      famousQuote: "\"Give me four equal parts of anything interesting and I'll make you a drink.\" — Joaquín Simó",
    },
  ],
};

function CocktailApp() {
  const [activeDec, setActiveDec] = useState("pre-1900s");
  const [specialTab, setSpecialTab] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState(() => new Set(JSON.parse(localStorage.getItem("coc-fav") || "[]")));
  const [gross, setGross] = useState(() => new Set(JSON.parse(localStorage.getItem("coc-gross") || "[]")));
  const [made, setMade] = useState(() => new Set(JSON.parse(localStorage.getItem("coc-made") || "[]")));
  const [barCart, setBarCart] = useState(() => new Set(JSON.parse(localStorage.getItem("coc-barcart") || "[]")));
  const [ingredientFilter, setIngredientFilter] = useState(null);
  const [copied, setCopied] = useState(false);
  const [shakeResult, setShakeResult] = useState(null);
  const [shakeExpanded, setShakeExpanded] = useState(false);
  const [shakePermission, setShakePermission] = useState("unknown");
  const shakeActiveRef = useRef(false);

  useEffect(() => { localStorage.setItem("coc-fav", JSON.stringify([...favorites])); }, [favorites]);
  useEffect(() => { localStorage.setItem("coc-gross", JSON.stringify([...gross])); }, [gross]);
  useEffect(() => { localStorage.setItem("coc-made", JSON.stringify([...made])); }, [made]);
  useEffect(() => { localStorage.setItem("coc-barcart", JSON.stringify([...barCart])); }, [barCart]);

  const toggle = (set, setFn, key, name) => (n) => {
    setFn(prev => {
      const next = new Set(prev);
      if (key === "fav" && gross.has(n)) setGross(g => { const ng = new Set(g); ng.delete(n); return ng; });
      if (key === "gross" && favorites.has(n)) setFavorites(f => { const nf = new Set(f); nf.delete(n); return nf; });
      next.has(n) ? next.delete(n) : next.add(n);
      return next;
    });
  };
  const toggleFav = (n) => {
    setFavorites(prev => { const next = new Set(prev); if (gross.has(n)) setGross(g => { const ng = new Set(g); ng.delete(n); return ng; }); next.has(n) ? next.delete(n) : next.add(n); return next; });
  };
  const toggleGross = (n) => {
    setGross(prev => { const next = new Set(prev); if (favorites.has(n)) setFavorites(f => { const nf = new Set(f); nf.delete(n); return nf; }); next.has(n) ? next.delete(n) : next.add(n); return next; });
  };
  const toggleMade = (n) => { setMade(prev => { const next = new Set(prev); next.has(n) ? next.delete(n) : next.add(n); return next; }); };

  const handleShare = (c) => {
    const text = `🍸 ${c.name}\n${"─".repeat(30)}\nGlass: ${c.glass}\nGarnish: ${c.garnish}\nMethod: ${c.method}\n\nIngredients:\n${c.ingredients.map(i => `• ${i}`).join("\n")}\n\nMethod:\n${c.instructions.map((s, i) => `${i + 1}. ${s}`).join("\n")}\n\n${c.famousQuote || ""}\n\nfrom lostcocktails.vercel.app`;
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  const allCocktails = Object.entries(cocktails).flatMap(([decade, list]) => list.map(c => ({ ...c, decade })));

  // ── BAR CART INGREDIENT MAP ──────────────────────────────────────────────
  const BAR_INGREDIENTS = {
    "Spirits": [
      { id: "rye", label: "Rye Whiskey", keywords: ["rye whiskey", " rye "] },
      { id: "bourbon", label: "Bourbon", keywords: ["bourbon"] },
      { id: "scotch", label: "Scotch", keywords: ["scotch", "single malt"] },
      { id: "irish", label: "Irish Whiskey", keywords: ["irish whiskey"] },
      { id: "gin", label: "Gin", keywords: ["gin"] },
      { id: "rum", label: "Rum (White/Light)", keywords: ["white rum", "light rum", "silver rum", "1.5 oz rum", "2 oz rum", "1 oz rum"] },
      { id: "rum-dark", label: "Rum (Dark/Aged)", keywords: ["dark rum", "aged rum", "jamaican rum", "demerara rum"] },
      { id: "vodka", label: "Vodka", keywords: ["vodka"] },
      { id: "cognac", label: "Cognac", keywords: ["cognac"] },
      { id: "brandy", label: "Brandy/Applejack", keywords: ["brandy", "applejack", "calvados", "armagnac"] },
      { id: "tequila", label: "Tequila", keywords: ["tequila"] },
      { id: "mezcal", label: "Mezcal", keywords: ["mezcal"] },
      { id: "absinthe", label: "Absinthe", keywords: ["absinthe", "pastis"] },
    ],
    "Vermouth & Fortified": [
      { id: "sweet-vermouth", label: "Sweet Vermouth", keywords: ["sweet vermouth"] },
      { id: "dry-vermouth", label: "Dry Vermouth", keywords: ["dry vermouth"] },
      { id: "campari", label: "Campari", keywords: ["campari"] },
      { id: "lillet", label: "Lillet/Dubonnet", keywords: ["lillet", "dubonnet"] },
    ],
    "Liqueurs": [
      { id: "cointreau", label: "Cointreau/Triple Sec", keywords: ["cointreau", "triple sec", "curaçao", "curacao"] },
      { id: "maraschino", label: "Maraschino", keywords: ["maraschino"] },
      { id: "chartreuse", label: "Chartreuse", keywords: ["chartreuse"] },
      { id: "benedictine", label: "Bénédictine", keywords: ["bénédictine", "benedictine"] },
      { id: "amaretto", label: "Amaretto", keywords: ["amaretto"] },
      { id: "kahlua", label: "Kahlúa/Coffee Liqueur", keywords: ["kahlúa", "kahlua", "coffee liqueur"] },
      { id: "baileys", label: "Baileys", keywords: ["baileys"] },
      { id: "drambuie", label: "Drambuie", keywords: ["drambuie"] },
      { id: "galliano", label: "Galliano", keywords: ["galliano"] },
      { id: "midori", label: "Midori", keywords: ["midori"] },
      { id: "falernum", label: "Falernum", keywords: ["falernum"] },
    ],
    "Bitters": [
      { id: "angostura", label: "Angostura Bitters", keywords: ["angostura bitters"] },
      { id: "peychauds", label: "Peychaud's Bitters", keywords: ["peychaud"] },
      { id: "orange-bitters", label: "Orange Bitters", keywords: ["orange bitters"] },
    ],
    "Mixers & Fresh": [
      { id: "simple-syrup", label: "Simple Syrup", keywords: ["simple syrup"] },
      { id: "grenadine", label: "Grenadine", keywords: ["grenadine"] },
      { id: "orgeat", label: "Orgeat", keywords: ["orgeat"] },
      { id: "lemon", label: "Fresh Lemon Juice", keywords: ["lemon juice"] },
      { id: "lime", label: "Fresh Lime Juice", keywords: ["lime juice"] },
      { id: "oj", label: "Orange Juice", keywords: ["orange juice"] },
      { id: "grapefruit", label: "Grapefruit Juice", keywords: ["grapefruit juice"] },
      { id: "pineapple", label: "Pineapple Juice", keywords: ["pineapple juice"] },
      { id: "coconut", label: "Coconut Cream", keywords: ["coconut cream", "coconut milk"] },
      { id: "heavy-cream", label: "Heavy Cream", keywords: ["heavy cream"] },
      { id: "egg-white", label: "Egg Whites", keywords: ["egg white"] },
      { id: "whole-egg", label: "Whole Eggs", keywords: ["whole egg"] },
      { id: "club-soda", label: "Club Soda", keywords: ["club soda", "soda water"] },
      { id: "ginger-beer", label: "Ginger Beer", keywords: ["ginger beer"] },
      { id: "champagne", label: "Champagne/Prosecco", keywords: ["champagne", "prosecco", "sparkling wine"] },
      { id: "coffee", label: "Coffee/Espresso", keywords: ["coffee", "espresso"] },
    ],
  };

  const allBarIngredients = Object.values(BAR_INGREDIENTS).flat();

  // Check if a cocktail is makeable given bar cart
  const getCocktailStatus = (cocktail) => {
    if (barCart.size === 0) return { status: "unknown", missing: [] };
    if (!cocktail.ingredients) return { status: "unknown", missing: [] };
    const missing = [];
    for (const ingStr of cocktail.ingredients) {
      const lower = ingStr.toLowerCase();
      if (lower.includes("garnish") || lower.includes("optional") || lower.includes("to taste") ||
          lower.includes("ice") || lower.includes("water") || lower.includes("sugar") ||
          lower.includes("salt") || lower.includes("nutmeg") || lower.includes("mint") ||
          lower.includes("twist") || lower.includes("wedge") || lower.includes("slice") ||
          lower.includes("cherry") || lower.includes("olive") || lower.includes("peel")) continue;
      const covered = allBarIngredients.some(ing =>
        barCart.has(ing.id) && ing.keywords.some(kw => lower.includes(kw))
      );
      if (!covered) missing.push(ingStr);
    }
    if (missing.length === 0) return { status: "makeable", missing: [] };
    if (missing.length === 1) return { status: "almost", missing };
    return { status: "missing", missing };
  };

  const makeableCocktails = allCocktails.filter(c => getCocktailStatus(c).status === "makeable");
  const almostCocktails = allCocktails.filter(c => getCocktailStatus(c).status === "almost");

  // Shake detection
  useEffect(() => {
    let lastShake = 0;
    let lastAcc = { x: 0, y: 0, z: 0 };

    const handleMotion = (e) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc) return;
      const delta = Math.abs(acc.x - lastAcc.x) + Math.abs(acc.y - lastAcc.y) + Math.abs(acc.z - lastAcc.z);
      lastAcc = { x: acc.x || 0, y: acc.y || 0, z: acc.z || 0 };
      const now = Date.now();
      if (delta > 20 && now - lastShake > 1500) {
        if (shakeActiveRef.current) return;
        lastShake = now;
        const pool = barCart.size > 0 && makeableCocktails.length > 0 ? makeableCocktails : allCocktails;
        const pick = pool[Math.floor(Math.random() * pool.length)];
        try { if (navigator.vibrate) navigator.vibrate([80, 40, 80]); } catch(e) {}
        shakeActiveRef.current = true;
        setShakeExpanded(false);
        setShakeResult(pick);
      }
    };

    const setupMotion = () => {
      window.removeEventListener("devicemotion", handleMotion);
      window.addEventListener("devicemotion", handleMotion);
      setShakePermission("granted");
    };

    const requestPermission = async () => {
      if (typeof DeviceMotionEvent !== "undefined" && typeof DeviceMotionEvent.requestPermission === "function") {
        // iOS — must request every page load, permission doesn't persist
        try {
          const perm = await DeviceMotionEvent.requestPermission();
          if (perm === "granted") {
            setupMotion();
            localStorage.setItem("coc-shake-perm", "granted");
          } else {
            setShakePermission("denied");
          }
        } catch (err) {
          // Permission call must come from a user gesture — set up a fallback button
          setShakePermission("needs-gesture");
        }
      } else {
        // Android / non-iOS — no permission needed
        setupMotion();
        setShakePermission("granted");
      }
    };

    requestPermission();
    return () => window.removeEventListener("devicemotion", handleMotion);
  }, [makeableCocktails, allCocktails, barCart]);

  const allIngredients = [...new Set(
    allCocktails.flatMap(c => c.ingredients.map(i => {
      const lower = i.toLowerCase();
      if (lower.includes("gin")) return "Gin";
      if (lower.includes("rum")) return "Rum";
      if (lower.includes("vodka")) return "Vodka";
      if (lower.includes("bourbon") || lower.includes("whiskey") || lower.includes("whisky") || lower.includes("rye") || lower.includes("scotch")) return "Whiskey/Scotch";
      if (lower.includes("tequila") || lower.includes("mezcal")) return "Tequila/Mezcal";
      if (lower.includes("cognac") || lower.includes("brandy")) return "Cognac/Brandy";
      if (lower.includes("campari")) return "Campari";
      if (lower.includes("vermouth")) return "Vermouth";
      if (lower.includes("champagne") || lower.includes("prosecco") || lower.includes("sparkling")) return "Sparkling Wine";
      if (lower.includes("lemon")) return "Lemon";
      if (lower.includes("lime")) return "Lime";
      if (lower.includes("orange juice") || lower.includes("orange")) return "Orange";
      if (lower.includes("pineapple")) return "Pineapple";
      if (lower.includes("ginger")) return "Ginger";
      if (lower.includes("egg white")) return "Egg White";
      if (lower.includes("absinthe")) return "Absinthe";
      if (lower.includes("honey")) return "Honey";
      if (lower.includes("coffee") || lower.includes("espresso")) return "Coffee";
      if (lower.includes("coconut")) return "Coconut";
      return null;
    }).filter(Boolean))
  )].sort();

  const dec = decades.find(d => d.id === activeDec);

  const activePalette = specialTab
    ? { color: "#C9A84C", bg: "#0d0a04", accent: "#8B6914" }
    : dec;

  const getDisplayList = () => {
    let list;
    if (specialTab === "all") list = allCocktails;
    else if (specialTab === "favorites") list = allCocktails.filter(c => favorites.has(c.name));
    else if (specialTab === "gross") list = allCocktails.filter(c => gross.has(c.name));
    else if (specialTab === "made") list = allCocktails.filter(c => made.has(c.name));
    else if (specialTab === "barcart") list = makeableCocktails;
    else list = cocktails[activeDec] || [];

    if (ingredientFilter) {
      list = list.filter(c => c.ingredients.some(i => {
        const lower = i.toLowerCase();
        const f = ingredientFilter;
        if (f === "Gin") return lower.includes("gin");
        if (f === "Rum") return lower.includes("rum");
        if (f === "Vodka") return lower.includes("vodka");
        if (f === "Whiskey/Scotch") return lower.includes("bourbon") || lower.includes("whiskey") || lower.includes("whisky") || lower.includes("rye") || lower.includes("scotch");
        if (f === "Tequila/Mezcal") return lower.includes("tequila") || lower.includes("mezcal");
        if (f === "Cognac/Brandy") return lower.includes("cognac") || lower.includes("brandy");
        if (f === "Campari") return lower.includes("campari");
        if (f === "Vermouth") return lower.includes("vermouth");
        if (f === "Sparkling Wine") return lower.includes("champagne") || lower.includes("prosecco") || lower.includes("sparkling");
        if (f === "Lemon") return lower.includes("lemon");
        if (f === "Lime") return lower.includes("lime");
        if (f === "Orange") return lower.includes("orange");
        if (f === "Pineapple") return lower.includes("pineapple");
        if (f === "Ginger") return lower.includes("ginger");
        if (f === "Egg White") return lower.includes("egg white");
        if (f === "Absinthe") return lower.includes("absinthe");
        if (f === "Honey") return lower.includes("honey");
        if (f === "Coffee") return lower.includes("coffee") || lower.includes("espresso");
        if (f === "Coconut") return lower.includes("coconut");
        return false;
      }));
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.history.toLowerCase().includes(q) ||
        c.notable.toLowerCase().includes(q) ||
        c.ingredients.join(" ").toLowerCase().includes(q) ||
        (c.famousQuote && c.famousQuote.toLowerCase().includes(q))
      );
    }
    return list;
  };

  const displayList = getDisplayList();

  const emptyMessages = {
    favorites: { icon: "🥂", text: "Nothing toasted yet", sub: "Tap 🥂 on any cocktail to save it here." },
    gross:     { icon: "☠️", text: "Nothing passed on yet", sub: "Tap ☠️ on any cocktail you would never drink." },
    made:      { icon: "🥃", text: "Nothing nailed yet", sub: "Tap 🥃 on any cocktail you have made." },
  };

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cinzel+Decorative:wght@400;700&family=IM+Fell+English:ital@0;1&family=Raleway:wght@300;400;600;700&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body { background: #08060f; }

    .cocktail-app {
      min-height: 100vh;
      background: #08060f;
      font-family: 'Raleway', sans-serif;
    }

    .app-header {
      background: linear-gradient(180deg, #0d0a04 0%, #1a1206 50%, #0d0a04 100%);
      border-bottom: 1px solid #C9A84C44;
      padding: 22px 16px 16px;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 4px 24px rgba(0,0,0,0.6);
    }

    .deco-line {
      display: flex;
      align-items: center;
      gap: 10px;
      justify-content: center;
      margin-bottom: 4px;
    }

    .deco-line::before, .deco-line::after {
      content: '';
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, transparent, #C9A84C88, transparent);
    }

    .eyebrow {
      font-family: 'Raleway', sans-serif;
      font-size: 0.58rem;
      font-weight: 700;
      letter-spacing: 0.35em;
      text-transform: uppercase;
      color: #C9A84C;
      opacity: 0.75;
    }

    .app-title {
      font-family: 'Cinzel Decorative', serif;
      font-size: clamp(1.1rem, 3.5vw, 1.7rem);
      font-weight: 700;
      color: #C9A84C;
      text-align: center;
      letter-spacing: 0.05em;
      text-shadow: 0 0 30px rgba(201,168,76,0.4);
      margin-bottom: 14px;
    }

    .decade-row {
      display: flex;
      gap: 5px;
      flex-wrap: wrap;
      justify-content: center;
      margin-bottom: 8px;
    }

    .decade-btn {
      font-family: 'Raleway', sans-serif;
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      padding: 5px 11px;
      border-radius: 20px;
      border: 1px solid rgba(201,168,76,0.3);
      cursor: pointer;
      transition: all 0.2s;
      text-transform: uppercase;
      background: rgba(201,168,76,0.08);
      color: rgba(201,168,76,0.6);
    }

    .decade-btn.active {
      background: #C9A84C;
      color: #0d0a04;
      border-color: #C9A84C;
      font-weight: 700;
      box-shadow: 0 2px 12px rgba(201,168,76,0.4);
    }

    .special-row {
      display: flex;
      gap: 8px;
      justify-content: center;
    }

    .special-btn {
      font-family: 'Raleway', sans-serif;
      font-size: 0.65rem;
      font-weight: 600;
      padding: 5px 10px;
      border-radius: 20px;
      border: 1px solid rgba(201,168,76,0.25);
      cursor: pointer;
      transition: all 0.2s;
      background: transparent;
      color: rgba(201,168,76,0.55);
      white-space: nowrap;
    }

    .special-btn.active {
      background: rgba(201,168,76,0.15);
      color: #C9A84C;
      border-color: rgba(201,168,76,0.5);
    }

    .main-content {
      max-width: 820px;
      margin: 0 auto;
      padding: 16px 12px;
    }

    .search-wrap {
      position: relative;
      margin-bottom: 12px;
    }

    .search-input {
      width: 100%;
      background: rgba(201,168,76,0.06);
      border: 1px solid rgba(201,168,76,0.2);
      border-radius: 24px;
      padding: 10px 36px 10px 38px;
      font-family: 'Raleway', sans-serif;
      font-size: 0.85rem;
      color: #e8d5a3;
      outline: none;
      transition: border-color 0.2s;
    }

    .search-input::placeholder { color: rgba(201,168,76,0.35); }
    .search-input:focus { border-color: rgba(201,168,76,0.5); }

    .ingredient-scroll {
      display: flex;
      gap: 6px;
      overflow-x: auto;
      padding-bottom: 8px;
      margin-bottom: 12px;
      scrollbar-width: none;
    }
    .ingredient-scroll::-webkit-scrollbar { display: none; }

    .ing-pill {
      flex-shrink: 0;
      font-family: 'Raleway', sans-serif;
      font-size: 0.68rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      padding: 4px 12px;
      border-radius: 14px;
      border: 1px solid rgba(201,168,76,0.25);
      cursor: pointer;
      background: transparent;
      color: rgba(201,168,76,0.55);
      transition: all 0.15s;
      white-space: nowrap;
    }

    .ing-pill.active {
      background: rgba(201,168,76,0.2);
      color: #C9A84C;
      border-color: rgba(201,168,76,0.6);
    }

    .cocktail-card {
      border-radius: 8px;
      border-left: 3px solid #C9A84C44;
      padding: 13px 14px;
      cursor: pointer;
      transition: all 0.2s;
      margin-bottom: 7px;
    }

    .cocktail-card:hover { border-left-color: #C9A84C88; }

    .card-name {
      font-family: 'Cinzel', serif;
      font-size: 0.98rem;
      font-weight: 600;
      margin-bottom: 3px;
    }

    .card-preview {
      font-family: 'Raleway', sans-serif;
      font-size: 0.78rem;
      opacity: 0.55;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      font-family: 'Raleway', sans-serif;
      font-size: 0.6rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 2px 7px;
      border-radius: 10px;
      margin-right: 4px;
      margin-bottom: 5px;
    }

    .detail-panel {
      border-radius: 0 0 8px 8px;
      padding: 18px 16px 22px;
      cursor: pointer;
    }

    .detail-section-label {
      font-family: 'Raleway', sans-serif;
      font-size: 0.58rem;
      font-weight: 700;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      opacity: 0.5;
      margin-bottom: 4px;
    }

    .icon-btn {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1rem;
      padding: 3px;
      transition: transform 0.15s;
      line-height: 1;
    }
    .icon-btn:active { transform: scale(0.85); }

    .decade-badge-sm {
      font-family: 'Raleway', sans-serif;
      font-size: 0.58rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      padding: 2px 8px;
      border-radius: 10px;
      display: inline-block;
      margin-bottom: 4px;
      background: rgba(201,168,76,0.15);
      color: #C9A84C;
    }

    .copied-toast {
      position: fixed;
      bottom: 32px;
      left: 50%;
      transform: translateX(-50%);
      background: #C9A84C;
      color: #0d0a04;
      font-family: 'Raleway', sans-serif;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      padding: 10px 22px;
      border-radius: 24px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.5);
      z-index: 999;
    }
  `;

  const renderCard = (c, i, missingIng = null) => {
    const isOpen = activeCard?.name === c.name;
    const isFav = favorites.has(c.name);
    const isGros = gross.has(c.name);
    const isMade = made.has(c.name);
    const cardDec = specialTab ? (decades.find(d => d.id === c.decade) || dec) : dec;

    const badgeColors = {
      bootlegger:  { bg: "rgba(178,34,34,0.2)",  color: "#ff6b6b", border: "rgba(178,34,34,0.4)" },
      classic:     { bg: "rgba(201,168,76,0.15)", color: "#C9A84C", border: "rgba(201,168,76,0.4)" },
      forgotten:   { bg: "rgba(80,80,80,0.3)",    color: "#aaa",    border: "rgba(100,100,100,0.5)" },
      tiki:        { bg: "rgba(34,139,34,0.2)",   color: "#5dbb5d", border: "rgba(34,139,34,0.4)" },
      party_staple: { bg: "rgba(255,140,0,0.2)",   color: "#ffaa44", border: "rgba(255,140,0,0.4)" },
      shot:         { bg: "rgba(180,0,180,0.2)",    color: "#dd66dd", border: "rgba(180,0,180,0.4)" },
    };

    return (
      <div key={c.name + i} style={{ marginBottom: 7 }}>
        <div
          className="cocktail-card"
          onClick={() => setActiveCard(isOpen ? null : c)}
          style={{
            background: isOpen
              ? `linear-gradient(135deg, ${cardDec.color}dd, ${cardDec.color}aa)`
              : "rgba(201,168,76,0.04)",
            borderLeftColor: isOpen ? cardDec.accent : "rgba(201,168,76,0.25)",
            borderLeftWidth: isOpen ? 4 : 3,
            boxShadow: isOpen ? `0 4px 20px ${cardDec.color}44` : "none",
            borderRadius: isOpen ? "8px 8px 0 0" : "8px",
            marginBottom: 0,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              {specialTab && <span className="decade-badge-sm">{c.decade}</span>}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 2, marginBottom: isOpen ? 6 : 4 }}>
                {c.badges.map(b => (
                  <span key={b} className="badge"
                    style={{ background: badgeColors[b].bg, color: badgeColors[b].color, border: `1px solid ${badgeColors[b].border}` }}>
                    {BADGES[b].icon} {BADGES[b].label}
                  </span>
                ))}
              </div>
              <div className="card-name" style={{ color: isOpen ? "#C9A84C" : "#e8d5a3" }}>
                {c.name}
              </div>
              {!isOpen && (
                <div className="card-preview">{c.glass} · {c.method}</div>
              )}
              {!isOpen && missingIng && (
                <div style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.62rem",
                  color: "rgba(201,168,76,0.5)",
                  marginTop: 5,
                  letterSpacing: "0.04em",
                }}>
                  ✦ Need: <span style={{ color: "rgba(201,168,76,0.8)" }}>{missingIng}</span>
                </div>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 2, marginLeft: 8, flexShrink: 0 }}>
              <button className="icon-btn" onClick={e => { e.stopPropagation(); toggleFav(c.name); }}
                style={{ opacity: isFav ? 1 : 0.25, filter: isFav ? "none" : "grayscale(1)" }}>🥂</button>
              <button className="icon-btn" onClick={e => { e.stopPropagation(); toggleGross(c.name); }}
                style={{ opacity: isGros ? 1 : 0.25, filter: isGros ? "none" : "grayscale(1)" }}>☠️</button>
              <button className="icon-btn" onClick={e => { e.stopPropagation(); toggleMade(c.name); }}
                style={{ opacity: isMade ? 1 : 0.25, filter: isMade ? "none" : "grayscale(1)" }}>🥃</button>
              <span style={{ color: "#C9A84C", opacity: 0.5, fontSize: "0.9rem", marginLeft: 4, display: "inline-block", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.25s" }}>▾</span>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="detail-panel"
            onClick={() => setActiveCard(null)}
            style={{ background: "rgba(13,10,4,0.97)", border: `1px solid ${cardDec.accent}44`, borderTop: "none", borderRadius: "0 0 8px 8px", boxShadow: `0 8px 32px ${cardDec.color}33` }}>

            {/* Share */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 14 }}>
              <button onClick={e => { e.stopPropagation(); handleShare(c); }}
                style={{ cursor: "pointer", border: `1px solid ${cardDec.accent}55`, background: "transparent", color: cardDec.accent, fontFamily: "'Raleway', sans-serif", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "5px 14px", borderRadius: 14, fontWeight: 700 }}>
                📤 Share
              </button>
            </div>

            {/* Glass / Garnish / Method row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16, padding: "12px 14px", background: "rgba(201,168,76,0.05)", borderRadius: 6, border: `1px solid ${cardDec.accent}22` }}>
              {[["🥃 Glass", c.glass], ["🌿 Garnish", c.garnish], ["🔀 Method", c.method]].map(([label, val]) => (
                <div key={label}>
                  <div className="detail-section-label" style={{ color: cardDec.accent }}>{label}</div>
                  <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.78rem", color: "#e8d5a3", lineHeight: 1.4 }}>{val}</div>
                </div>
              ))}
            </div>

            {/* Famous Quote */}
            {c.famousQuote && (
              <div style={{ marginBottom: 16, padding: "12px 16px", borderLeft: `3px solid ${cardDec.accent}`, background: "rgba(201,168,76,0.04)", borderRadius: "0 6px 6px 0" }}>
                <div style={{ fontFamily: "'IM Fell English', serif", fontSize: "0.88rem", fontStyle: "italic", color: "#e8d5a3", lineHeight: 1.65, opacity: 0.9 }}>{c.famousQuote}</div>
              </div>
            )}

            {/* Description */}
            <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.86rem", lineHeight: 1.7, color: "#c8b483", marginBottom: 16 }}>{c.description}</p>

            {/* Notable + Region */}
            <div style={{ marginBottom: 16, padding: "12px 14px", background: "rgba(201,168,76,0.04)", borderRadius: 6, border: `1px solid ${cardDec.accent}22` }}>
              {c.region && (
                <div style={{ marginBottom: 8 }}>
                  <div className="detail-section-label" style={{ color: cardDec.accent }}>📍 Origin</div>
                  <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.82rem", color: "#c8b483" }}>{c.region}</div>
                </div>
              )}
              {c.notable && (
                <div style={{ marginBottom: 8 }}>
                  <div className="detail-section-label" style={{ color: cardDec.accent }}>⭐ Notable</div>
                  <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.82rem", color: "#c8b483", fontStyle: "italic" }}>{c.notable}</div>
                </div>
              )}
              {c.history && (
                <div>
                  <div className="detail-section-label" style={{ color: cardDec.accent }}>📖 History</div>
                  <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.82rem", color: "#c8b483", lineHeight: 1.65 }}>{c.history}</div>
                </div>
              )}
            </div>

            {/* Recipe */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
              <div>
                <div className="detail-section-label" style={{ color: cardDec.accent, marginBottom: 8 }}>Ingredients</div>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {c.ingredients.map((ing, j) => (
                    <li key={j} style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.82rem", color: "#e8d5a3", lineHeight: 1.8, paddingLeft: 14, position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: cardDec.accent, opacity: 0.7 }}>·</span>
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="detail-section-label" style={{ color: cardDec.accent, marginBottom: 8 }}>Method</div>
                <ol style={{ listStyle: "none", padding: 0, counterReset: "step" }}>
                  {c.instructions.map((step, j) => (
                    <li key={j} style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.82rem", color: "#e8d5a3", lineHeight: 1.8, paddingLeft: 20, position: "relative", marginBottom: 4, counterIncrement: "step" }}>
                      <span style={{ position: "absolute", left: 0, color: cardDec.accent, opacity: 0.7, fontWeight: 700, fontSize: "0.72rem" }}>{j + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="cocktail-app">
      <style>{styles}</style>

      <div className="app-header">
        <div className="deco-line">
          <span className="eyebrow">Forgotten American Bar</span>
        </div>
        <div className="app-title">A Century of Cocktails</div>

        {/* Decade tabs */}
        <div className="decade-row">
          {decades.map(d => (
            <button key={d.id} className={`decade-btn ${!specialTab && activeDec === d.id ? "active" : ""}`}
              onClick={() => { setActiveDec(d.id); setSpecialTab(null); setActiveCard(null); }}>
              {d.label.endsWith('Present') ? <>{d.label.slice(0, 4)}<span style={{textTransform:"none"}}>s</span>{d.label.slice(5)}</> : <>{d.label.slice(0, -1)}<span style={{textTransform:"none"}}>s</span></>}
            </button>
          ))}
          <button className={`decade-btn ${specialTab === "all" ? "active" : ""}`}
            onClick={() => { setSpecialTab(specialTab === "all" ? null : "all"); setActiveCard(null); }}>
            All
          </button>
        </div>

        {/* Special tabs */}
        <div className="special-row">
          {[
            ["favorites", "🥂 A Toast", favorites.size],
            ["gross",     "☠️ Pass",      gross.size],
            ["made",      "🥃 Nailed It", made.size],
            ["barcart",   "🍹 Bar Cart",  barCart.size],
          ].map(([key, label, count]) => (
            <button key={key} className={`special-btn ${specialTab === key ? "active" : ""}`}
              onClick={() => { setSpecialTab(specialTab === key ? null : key); setActiveCard(null); }}>
              {label}{count > 0 && key === "barcart" ? ` (${makeableCocktails.length} makeable)` : count > 0 ? ` (${count})` : ""}
            </button>
          ))}
        </div>
      </div>

      <div className="main-content">
        {/* Search */}
        <div className="search-wrap">
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#C9A84C", opacity: 0.4, fontSize: "0.85rem", pointerEvents: "none" }}>🔍</span>
          <input className="search-input"
            placeholder="Search cocktails, spirits, bartenders, history..."
            value={search}
            onChange={e => { setSearch(e.target.value); setActiveCard(null); }}
          />
          {search && (
            <button onClick={() => setSearch("")}
              style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", border: "none", background: "none", cursor: "pointer", color: "#C9A84C", opacity: 0.5, fontSize: "0.85rem" }}>✕</button>
          )}
        </div>

        {/* Ingredient filter */}
        <div className="ingredient-scroll">
          <button className={`ing-pill ${!ingredientFilter ? "active" : ""}`}
            onClick={() => setIngredientFilter(null)}>All Spirits</button>
          {allIngredients.map(ing => (
            <button key={ing} className={`ing-pill ${ingredientFilter === ing ? "active" : ""}`}
              onClick={() => setIngredientFilter(ingredientFilter === ing ? null : ing)}>
              {ing}
            </button>
          ))}
        </div>

        {/* Count */}
        {specialTab !== "barcart" && (
          <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(201,168,76,0.4)", marginBottom: 12 }}>
            {displayList.length} cocktail{displayList.length !== 1 ? "s" : ""}
            {ingredientFilter ? ` · ${ingredientFilter}` : ""}
            {search ? ` · "${search}"` : ""}
          </div>
        )}

        {/* Empty state */}
        {specialTab && specialTab !== "all" && specialTab !== "barcart" && displayList.length === 0 && !search && !ingredientFilter && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "rgba(201,168,76,0.35)" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>{emptyMessages[specialTab]?.icon}</div>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1.1rem", marginBottom: 8, color: "rgba(201,168,76,0.5)" }}>{emptyMessages[specialTab]?.text}</div>
            <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.82rem" }}>{emptyMessages[specialTab]?.sub}</div>
          </div>
        )}

        {/* ── BAR CART UI ── */}
        {specialTab === "barcart" && (
          <div>
            {/* Header row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.85rem", color: "#C9A84C", letterSpacing: "0.1em" }}>
                🍹 Your Bar Cart
              </div>
              {barCart.size > 0 && (
                <button onClick={() => setBarCart(new Set())} style={{
                  fontFamily: "'Raleway', sans-serif", fontSize: "0.6rem", fontWeight: 600,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  background: "transparent", border: "1px solid rgba(201,168,76,0.2)",
                  color: "rgba(201,168,76,0.4)", padding: "4px 10px", cursor: "pointer", borderRadius: 12,
                }}>Clear All</button>
              )}
            </div>

            {/* Ingredient categories */}
            {Object.entries(BAR_INGREDIENTS).map(([category, ings]) => (
              <div key={category} style={{ marginBottom: 18 }}>
                <div style={{
                  fontFamily: "'Raleway', sans-serif", fontSize: "0.58rem", fontWeight: 700,
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "rgba(201,168,76,0.4)", marginBottom: 8,
                }}>{category}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {ings.map(ing => {
                    const active = barCart.has(ing.id);
                    return (
                      <button key={ing.id}
                        onClick={() => {
                          setBarCart(prev => {
                            const next = new Set(prev);
                            if (next.has(ing.id)) next.delete(ing.id);
                            else next.add(ing.id);
                            return next;
                          });
                        }}
                        style={{
                          fontFamily: "'Raleway', sans-serif",
                          fontSize: "0.68rem", fontWeight: active ? 700 : 500,
                          padding: "5px 12px", borderRadius: 14,
                          border: `1px solid ${active ? "#C9A84C" : "rgba(201,168,76,0.2)"}`,
                          background: active ? "rgba(201,168,76,0.18)" : "transparent",
                          color: active ? "#C9A84C" : "rgba(201,168,76,0.45)",
                          cursor: "pointer", transition: "all 0.15s",
                        }}>
                        {active ? "✓ " : ""}{ing.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(201,168,76,0.15)", margin: "20px 0" }} />

            {/* Makeable cocktails */}
            {barCart.size === 0 ? (
              <div style={{ textAlign: "center", padding: "30px 20px", color: "rgba(201,168,76,0.3)" }}>
                <div style={{ fontSize: "2rem", marginBottom: 8 }}>🍹</div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.9rem" }}>Tap ingredients above to see what you can make</div>
              </div>
            ) : (
              <div>
                {/* Dice button */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.85rem", color: "#C9A84C" }}>
                    {makeableCocktails.length > 0 ? `${makeableCocktails.length} Cocktails You Can Make` : "No exact matches yet"}
                  </div>
                  {makeableCocktails.length > 0 && (
                    <button
                      onClick={() => {
                        const pick = makeableCocktails[Math.floor(Math.random() * makeableCocktails.length)];
                        try { if (navigator.vibrate) navigator.vibrate([60, 30, 60]); } catch(e) {}
                        setShakeExpanded(false);
                        setShakeResult(pick);
                      }}
                      title="Random cocktail"
                      style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: "1.2rem",
                        background: "rgba(201,168,76,0.1)",
                        border: "1px solid rgba(201,168,76,0.4)",
                        color: "#C9A84C",
                        borderRadius: "50%",
                        width: 42, height: 42,
                        cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.15s",
                      }}>
                      🎲
                    </button>
                  )}
                </div>

                {/* Shake hint */}
                {shakePermission === "granted" && makeableCocktails.length > 0 && (
                  <div style={{
                    fontFamily: "'Raleway', sans-serif", fontSize: "0.62rem",
                    color: "rgba(201,168,76,0.3)", letterSpacing: "0.1em",
                    textAlign: "center", marginBottom: 12, fontStyle: "italic",
                  }}>
                    or shake your phone for a random pick 📳
                  </div>
                )}
                {shakePermission === "needs-gesture" && (
                  <div style={{ textAlign: "center", marginBottom: 12 }}>
                    <button
                      onClick={async () => {
                        try {
                          const perm = await DeviceMotionEvent.requestPermission();
                          if (perm === "granted") {
                            window.addEventListener("devicemotion", () => {});
                            setShakePermission("granted");
                          }
                        } catch(e) {}
                      }}
                      style={{
                        fontFamily: "'Raleway', sans-serif", fontSize: "0.65rem",
                        fontWeight: 600, letterSpacing: "0.1em",
                        background: "transparent", border: "1px solid rgba(201,168,76,0.3)",
                        color: "rgba(201,168,76,0.5)", padding: "6px 14px",
                        borderRadius: 14, cursor: "pointer",
                      }}>
                      📳 Enable shake to randomize
                    </button>
                  </div>
                )}

                {/* Makeable list */}
                {makeableCocktails.map((c, i) => renderCard(c, i))}

                {/* Almost makeable */}
                {almostCocktails.length > 0 && (
                  <div>
                    <div style={{ height: 1, background: "rgba(201,168,76,0.1)", margin: "16px 0 12px" }} />
                    <div style={{
                      fontFamily: "'Cinzel', serif", fontSize: "0.75rem",
                      color: "rgba(201,168,76,0.4)", marginBottom: 10, letterSpacing: "0.08em",
                    }}>
                      {almostCocktails.length} Cocktails — Missing Just One Ingredient
                    </div>
                    {almostCocktails.map((c, i) => {
                      const { missing } = getCocktailStatus(c);
                      return renderCard(c, i + 500, missing[0] || null);
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Cards */}
        {specialTab !== "barcart" && displayList.map((c, i) => renderCard(c, i))}
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", padding: "28px 20px", fontFamily: "'Cinzel', serif", fontSize: "0.65rem", color: "rgba(201,168,76,0.25)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
        ◆ {allCocktails.length} Cocktails · Pre-1900s through Present ◆
      </div>

      {copied && <div className="copied-toast">📋 Copied to clipboard!</div>}

      {/* Shake result overlay */}
      {shakeResult && (() => {
        const c = shakeResult;
        const cardDec = decades.find(d => d.id === c.decade) || decades[0];
        return (
          <div
            onClick={() => { shakeActiveRef.current = false; setShakeResult(null); setShakeExpanded(false); }}
            style={{
              position: "fixed", inset: 0, zIndex: 9999,
              background: "rgba(8,6,15,0.97)",
              display: "flex", flexDirection: "column",
              overflowY: shakeExpanded ? "auto" : "hidden",
            }}>

            {!shakeExpanded ? (
              /* ── Name screen ── */
              <div style={{
                flex: 1, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", padding: 32,
              }}>
                <div
                  onClick={e => {
                    e.stopPropagation();
                    const pool = barCart.size > 0 && makeableCocktails.length > 0 ? makeableCocktails : allCocktails;
                    const pick = pool[Math.floor(Math.random() * pool.length)];
                    setShakeExpanded(false);
                    setShakeResult(pick);
                  }}
                  style={{ fontSize: "2.5rem", marginBottom: 20, opacity: 0.6, cursor: "pointer" }}>🎲</div>
                <div style={{
                  fontFamily: "'Raleway', sans-serif", fontSize: "0.58rem", fontWeight: 700,
                  letterSpacing: "0.35em", textTransform: "uppercase",
                  color: "rgba(201,168,76,0.4)", marginBottom: 16,
                }}>{(() => {
                  const h = new Date().getHours();
                  if (h < 12) return "This morning, make a";
                  if (h < 17) return "This afternoon, make a";
                  if (h < 20) return "This evening, make a";
                  return "Tonight, make a";
                })()}</div>

                <div
                  onClick={e => { e.stopPropagation(); setShakeExpanded(true); }}
                  style={{
                    fontFamily: "'Cinzel Decorative', serif",
                    fontSize: "1.7rem", fontWeight: 700,
                    color: "#C9A84C", textAlign: "center", lineHeight: 1.25,
                    textShadow: "0 0 40px rgba(201,168,76,0.4)",
                    marginBottom: 32,
                    cursor: "pointer",
                    padding: "8px 0",
                  }}>
                  {c.name}
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                  <div style={{ height: 1, width: 40, background: "rgba(201,168,76,0.2)" }} />
                  <div
                    onClick={e => { e.stopPropagation(); setShakeExpanded(true); }}
                    style={{
                      fontFamily: "'IM Fell English', serif",
                      fontStyle: "italic", fontSize: "0.82rem",
                      color: "rgba(201,168,76,0.55)",
                      letterSpacing: "0.05em", cursor: "pointer",
                      padding: "8px 16px",
                    }}>
                    Tap here to consult the recipe
                  </div>
                  <div style={{
                    fontFamily: "'Raleway', sans-serif", fontSize: "0.55rem",
                    color: "rgba(201,168,76,0.2)", letterSpacing: "0.15em",
                    textTransform: "uppercase", marginTop: 8,
                  }}>
                    or tap anywhere to dismiss
                  </div>
                </div>
              </div>

            ) : (
              /* ── Full card screen ── */
              <div onClick={e => e.stopPropagation()} style={{ padding: "0 0 40px" }}>
                {/* Header */}
                <div style={{
                  background: "rgba(8,6,15,0.98)",
                  padding: "20px 16px 14px",
                  borderBottom: `1px solid ${cardDec.accent}33`,
                  position: "sticky", top: 0,
                  zIndex: 1,
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                  <div>
                    <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: cardDec.accent, opacity: 0.6, marginBottom: 4 }}>
                      {c.decade}
                    </div>
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1.15rem", fontWeight: 600, color: "#e8d5a3" }}>
                      {c.name}
                    </div>
                  </div>
                  <button
                    onClick={() => { shakeActiveRef.current = false; setShakeResult(null); setShakeExpanded(false); }}
                    style={{
                      background: "transparent", border: `1px solid ${cardDec.accent}44`,
                      color: cardDec.accent, borderRadius: "50%",
                      width: 32, height: 32, cursor: "pointer",
                      fontFamily: "'Raleway', sans-serif", fontSize: "0.8rem",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>✕</button>
                </div>

                <div style={{ padding: "16px 16px 0" }}>
                  {/* Badges */}
                  <div style={{ marginBottom: 12 }}>
                    {c.badges && c.badges.map(b => {
                      const badgeColors = { classic: { bg: "rgba(201,168,76,0.15)", color: "#C9A84C", label: "⭐ Classic" }, forgotten: { bg: "rgba(120,80,40,0.2)", color: "#c8a06a", label: "💀 Forgotten" }, "party-staple": { bg: "rgba(40,120,80,0.2)", color: "#6ac8a0", label: "🎉 Party Staple" }, bootlegger: { bg: "rgba(80,40,120,0.2)", color: "#a06ac8", label: "🚫 Bootlegger" }, tiki: { bg: "rgba(40,80,120,0.2)", color: "#6aa0c8", label: "🌴 Tiki" }, shot: { bg: "rgba(120,40,40,0.2)", color: "#c86a6a", label: "🥃 Shot" } };
                      const bc = badgeColors[b] || { bg: "rgba(201,168,76,0.1)", color: "#C9A84C", label: b };
                      return <span key={b} className="badge" style={{ background: bc.bg, color: bc.color, border: `1px solid ${bc.color}44` }}>{bc.label}</span>;
                    })}
                  </div>

                  {/* Glass / Garnish / Method */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16, padding: "12px 14px", background: "rgba(201,168,76,0.05)", borderRadius: 6, border: `1px solid ${cardDec.accent}22` }}>
                    {[["🥃 Glass", c.glass], ["🌿 Garnish", c.garnish], ["🔀 Method", c.method]].map(([label, val]) => (
                      <div key={label}>
                        <div className="detail-section-label" style={{ color: cardDec.accent }}>{label}</div>
                        <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.78rem", color: "#e8d5a3", lineHeight: 1.4 }}>{val}</div>
                      </div>
                    ))}
                  </div>

                  {/* Famous Quote */}
                  {c.famousQuote && (
                    <div style={{ marginBottom: 16, padding: "12px 16px", borderLeft: `3px solid ${cardDec.accent}`, background: "rgba(201,168,76,0.04)", borderRadius: "0 6px 6px 0" }}>
                      <div style={{ fontFamily: "'IM Fell English', serif", fontSize: "0.88rem", fontStyle: "italic", color: "#e8d5a3", lineHeight: 1.65, opacity: 0.9 }}>{c.famousQuote}</div>
                    </div>
                  )}

                  {/* Description */}
                  <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.86rem", lineHeight: 1.7, color: "#c8b483", marginBottom: 16 }}>{c.description}</p>

                  {/* Notable + Region + History */}
                  <div style={{ marginBottom: 16, padding: "12px 14px", background: "rgba(201,168,76,0.04)", borderRadius: 6, border: `1px solid ${cardDec.accent}22` }}>
                    {c.region && <div style={{ marginBottom: 8 }}><div className="detail-section-label" style={{ color: cardDec.accent }}>📍 Origin</div><div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.82rem", color: "#c8b483" }}>{c.region}</div></div>}
                    {c.notable && <div style={{ marginBottom: 8 }}><div className="detail-section-label" style={{ color: cardDec.accent }}>⭐ Notable</div><div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.82rem", color: "#c8b483", fontStyle: "italic" }}>{c.notable}</div></div>}
                    {c.history && <div><div className="detail-section-label" style={{ color: cardDec.accent }}>📖 History</div><div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.82rem", color: "#c8b483", lineHeight: 1.65 }}>{c.history}</div></div>}
                  </div>

                  {/* Recipe */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
                    <div>
                      <div className="detail-section-label" style={{ color: cardDec.accent, marginBottom: 8 }}>Ingredients</div>
                      <ul style={{ listStyle: "none", padding: 0 }}>
                        {c.ingredients.map((ing, j) => (
                          <li key={j} style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.82rem", color: "#e8d5a3", lineHeight: 1.8, paddingLeft: 14, position: "relative" }}>
                            <span style={{ position: "absolute", left: 0, color: cardDec.accent, opacity: 0.7 }}>·</span>{ing}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="detail-section-label" style={{ color: cardDec.accent, marginBottom: 8 }}>Method</div>
                      <ol style={{ listStyle: "none", padding: 0, counterReset: "step" }}>
                        {c.instructions.map((step, j) => (
                          <li key={j} style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.82rem", color: "#e8d5a3", lineHeight: 1.8, paddingLeft: 20, position: "relative", marginBottom: 4, counterIncrement: "step" }}>
                            <span style={{ position: "absolute", left: 0, color: cardDec.accent, opacity: 0.7, fontWeight: 700, fontSize: "0.72rem" }}>{j + 1}.</span>{step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
}

export default CocktailApp;
