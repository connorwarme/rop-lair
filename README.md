# [Rings of Power: Fan Lair](https://connorwarme.github.io/rop-lair/login)

![homepage](https://github.com/connorwarme/rop-lair/blob/main/public/screenshots/homeshort.png?raw=true "homepage preview")  

## objectives
* build a social media app with a LOTR: Rings of Power theme  
* showcase frontend (React) and backend (Express w/ MongoDB) skills
* authentication with PassportJS - options for local or via Google (implement oauth, creating user from account details) 
* users can edit their profile page (including photo)
* users can create/edit posts, option to include photo
* users can comment (and edit/delete their comments) as well as like/unlike posts
* users can add or remove friends  
* responsive design - for desktop, tablet, mobile  
* cross-browser functionality - tested in Chrome, Firefox, and Safari  
  
## reflections  
* I'm proud of seeing this project through. I started 7 months ago and have slowly but consistently chipped away: first building a backend, then a frontend, then hooking them up (locally), before deploying them.  
* Learned a TON. For the backend, figuring out authentication via PassportJS w/ JWT was a big one. For the frontend, continuing to grow my understanding of React (especially state, hooks, and context) took time and intention, as well as navigating how to integrate the stack to build a functional application. 
* As I learned and continued to build, I was continually reminded of how much more there is to learn! Looking forward to an opportunity to grow my knowledge and technical skill. 
* I spent a lot of time on little details. I'm not sure many folks will notice but I hope the app provides a polished feel.  

## screenshots  
* full screen  
![profile](https://github.com/connorwarme/rop-lair/blob/main/public/screenshots/prof1.png?raw=true "profile preview")  
![profile](https://github.com/connorwarme/rop-lair/blob/main/public/screenshots/prof2.png?raw=true "profile preview continued")   
![post](https://github.com/connorwarme/rop-lair/blob/main/public/screenshots/post.png?raw=true "post preview")  
![users](https://github.com/connorwarme/rop-lair/blob/main/public/screenshots/users.png?raw=true "users preview")
![homepage](https://github.com/connorwarme/rop-lair/blob/main/public/screenshots/home2.png?raw=true "homepage preview continued")  
![login](https://github.com/connorwarme/rop-lair/blob/main/public/screenshots/login.png?raw=true "login preview")    
* mobile mode  
![home](https://github.com/connorwarme/rop-lair/blob/main/public/screenshots/homemobile.png?raw=true "homepage on mobile preview")  
![createpost](https://github.com/connorwarme/rop-lair/blob/main/public/screenshots/postmobile.png?raw=true "create post on mobile preview")  
(The background doesn't repeat on webpage - the background image is fixed.)
![post](https://github.com/connorwarme/rop-lair/blob/main/public/screenshots/postmobilefull.png?raw=true "post on mobile preview")  
![create](https://github.com/connorwarme/rop-lair/blob/main/public/screenshots/createmobile.png?raw=true "create account on mobile preview") 

### for improvement:
* what are the best practices for validating and sanitizing data? I employed express-validator, using it to handle the data before I saved anything to the database. But then I had to deal with "unescaping" data within React, otherwise it would just print out with the html entity ("yoshi&*#*3*9*;s party" instead of "yoshi's party"). I spent a couple days trying to find the right way to deal with this issue. Some folks recommended saving the raw data to the db and then validating/sanitizing on output. But others said to immediately validate and sanitize user input... which left me in a quandry. Eventually, I found a bit of a work around (check out my "escape.js" file, but that requires running the function each time I want to display text data from the db). But I don't know the proper method - let me know if you have any insights to share!