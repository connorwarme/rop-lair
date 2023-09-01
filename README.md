# Rings of Power: Fan Lair

## under construction

### for improvement:
* what are the best practices for validating and sanitizing data? I employed express-validator, using it to handle the data before I saved anything to the database. But then I had to deal with "unescaping" data within React, otherwise it would just print out with the html entity ("yoshi&#39;s party" instead of "yoshi's party"). I spent a couple days trying to find the right way to deal with this issue. Some folks recommended saving the raw data to the db and then validating/sanitizing on output. But others said to immediately validate and sanitize user input... which left me in a quandry. Eventually, I found a bit of a work around (check out my "escape.js" file, but that requires running the function each time I want to display text data from the db). But I don't know the proper method - let me know if you have any insights to share!