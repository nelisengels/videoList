Models

## user

{

	"_id" : ObjectId("52f53eb02da57bd264000011"),

"password" : "$2a$10$mRIA5AmAzIajK56M3",

	"email" : "alisabinator@gmail.com",

"avatar" : "/img/profile.jpg",

	"name" : "string",

	"jobTitle" : "string",

	"company" : "string",

	"location" : "string",

	"admin" : false,

	"channels" : [ //array of Channel _id’s

ObjectId("52f53eb02da57bd264000011"),

ObjectId("52f53eb02da57bd264000011"),

ObjectId("52f53eb02da57bd264000011"),	

]

}

## video

{

	"_id" : ObjectId("52f53eb02da57bd264000011"),

"classLevels" : [ // array of classLevel _ids

ObjectId("52f53eb02da57bd264000011"),

ObjectId("52f53eb02da57bd264000011"),

ObjectId("52f53eb02da57bd264000011"),	

]

	"createdBy" : "ObjectId("52f53eb02da57bd264000011")", // a user _id 

	"title" : “string” // title derived via the youTube API for “user”

	"source" :  "ObjectId("52f53eb02da57bd264000011")", // a source _id via the youTube API for “user”

	"language" : ObjectId("52f53eb02da57bd264000011"), // a language id 

	"description" : "string" ,

	"src" : “[http://youtube.com/yz$exampleID](http://youtube.com/yz$exampleID)”

"tag" : [  // array of tag _ids

ObjectId("52f53eb02da57bd264000011"),

ObjectId("52f53eb02da57bd264000011"),

ObjectId("52f53eb02da57bd264000011"),	

]

}

## channel

{

	"_id" : ObjectId("52f53eb02da57bd264000011"),

	"title" : “string”,

	"classLevel" : ObjectId("52f53eb02da57bd264000011"),

"userFavorites" : [ //array of video  _id’s

ObjectId("52f53eb02da57bd264000011"),

ObjectId("52f53eb02da57bd264000011"),

ObjectId("52f53eb02da57bd264000011"),	

]

"userBlocked" : [ //array of video  _id’s

ObjectId("52f53eb02da57bd264000011"),

ObjectId("52f53eb02da57bd264000011"),

ObjectId("52f53eb02da57bd264000011"),	

]

"channelLikes" :  [  //array of video _id’s

ObjectId("52f53eb02da57bd264000011"),

ObjectId("52f53eb02da57bd264000011"),

]

"channelDislikes" :  [ //array of video _id’s

ObjectId("52f53eb02da57bd264000011"),

ObjectId("52f53eb02da57bd264000011"),

]

}

## classLevel

{

	"_id" : ObjectId("52f53eb02da57bd264000011"),

	"name" : “string”,

	"value" : integer

	

}

## language

{

	"_id" : ObjectId("52f53eb02da57bd264000011"),

	"name" : “string”

}

## **tag** 

{

	"_id" : ObjectId("52f53eb02da57bd264000011"),

	"name" : “string”

	}

}

## tagList

{	

	"_id" : ObjectId("52f53eb02da57bd264000011"),

	"name" : “string”

	"classLevel": [ //array of classLevel _id’s 

ObjectId("52f53eb02da57bd264000011"),

ObjectId("52f53eb02da57bd264000011"),

],

	"weight" : integer 

"listHeaderImg" : // image file reference 

	"tags" :[ //array of tag _id’s 

ObjectId("52f53eb02da57bd264000011"),

ObjectId("52f53eb02da57bd264000011"),

],

"description" : “string”

}		

## subject

{

	"_id" : ObjectId("52f53eb02da57bd264000011"),

	"name" : “string”

	"weight" : integer 

	"tagLists" :[ //array of tagList _id’s 

ObjectId("52f53eb02da57bd264000011"),

ObjectId("52f53eb02da57bd264000011"),

],

}

## **source** 

{

	"_id" : ObjectId("52f53eb02da57bd264000011"),

	"name" : “string”,

	"link" : “string”,

}

Landing Page

## non-logged in visitor enters site

hits landing page 

![image alt text](image_0.jpg)

## Login Flow

**If user clicks "Login" login modal appears **

![image alt text](image_1.jpg)

----- After Login Routed to [Userpage](#bookmark=id.dfacukte9uxs)

## Sign Up Flow

**if user clicks "SignUp", signup modal is displayed **

![image alt text](image_2.jpg)

**--- After Email and Password entered Channel Profile Modal opens **

![image alt text](image_3.jpg)

**Clicking "add another channel"**

![image alt text](image_4.png)

**Adds fields for a 2nd, 3rd, 5th, etc Channel,**

 a "remove"  option shows next to the title of the subsequent channels, the 1st channel can not be removed. 

![image alt text](image_5.jpg)

**---- After clicking "Save" user is taken to userpage**

Userpage 

![image alt text](image_6.jpg)

**user page with descriptions overlayed**

![image alt text](image_7.jpg)

# userpage displays … 

1. **topbar with button links for**

    1.  "library" 

    2.   "view {user’s active channel.name}’s channel"

    3. "my settings"

"The Library" is the name of the default view of the userpage, so clicking the library button does nothing, it is styled in an “active” state 

"view {user’s active channel.name}’s channel" button link opens the “playerView” for that channel

"my settings" opens the settings modal view  

2. **channel name links **![image alt text](image_8.png)

    4. channel name links filter the "tagsLists" to show only tagLists that have a classLevel that is equal to the classLevel of that channel

        1. by default the user’s first channel is the "active channel" filtering results by that channel’s classLevel clicking the  other channel names updates the filter for the tagLists 

3. **"add a channel" **

    5. clicking the "add a child" link![image alt text](image_9.png) ** …. **

    6. opens the "setup channel profile" modal![image alt text](image_10.png) 

        2. same modal from initial user signup flow, only in this case a "close" X is included in the corner  

4. **the tagLists **

    7. using the active channel’s "classLevel" value as a filter, a certain list of tagLists will display filtered to the “classLevel” of the active channel 

        3. all tagLists that have a "classLevel" that equals the active channel’s “classLevel” should be listed

            1. the tagLists are displayed organized under the "subject" which the tagList exists within 

**	**![image alt text](image_11.jpg)

** <ul>’s , with each <li> being a div that links to a page showing all videos which share a certain tag _id**

**---- something like this **

**<h2> {{subject.name}} </h2>**

**<ul>**

**	<li> <a href=/{{tagList.name}}> <div><p>{{tagList.name}}</p><img src={{ tagList.listHeaderImg }}/> </div> </li>**

**<li> <a href=/{{tagList.name}}> <div><p>{{tagList.name }}</p><img src={{ tagList.listHeaderImg }}/> </div> </li>**

**<li> <a href="/{{tagList.name}}”> <div><p>{{tagList.name}}</p><img src={{ tagList:listHeaderImg}}/> </div> </li>**

**</ul>**

**if using Bootstrap we can style like this**

**horizontal scroll with Bootstrap **

[http://stackoverflow.com/questions/13906721/css-horizontal-scrolling-with-bootstrap-using-ul-li-tags](http://stackoverflow.com/questions/13906721/css-horizontal-scrolling-with-bootstrap-using-ul-li-tags)

Filtered Video List View 

* clicking a tagList.listHeaderImg or name displays a view that displays a scrolling grid view of all the videos defined 

    * videos are shown as iframes using youtube’s html5 embed 

        * **video thumbs are displayed in the fashion described in the link below **

            * **[http://www.sitepoint.com/faster-youtube-embeds-javascript**/](http://www.sitepoint.com/faster-youtube-embeds-javascript/)

**can be used to display all videos that have any tag within a tagList **

![image alt text](image_12.jpg)

Video Overlay for Userpage

**clicking a video thumb opens a video modal view for that video **

![image alt text](image_13.jpg)

**if the video has a value in the  createdBy field , AND the User_id  has a values for "name", “avatar” “job” “company” “location” then the we display a “ Curator: name [avatar img] job, company, location”  …. if one of the values is missing we do not diplay any data for Curator.**

# Player View 

clicking the "view {{channel.name}}  channel" button toggles playerView for that channel 

![image alt text](image_14.jpg)

**Player view displays a RANDOM selection of 9 video thumbnails from all the videos available to the channel -- all videos filtered by the classLevel of the channel, minus the videos that are included in the userBlocked[ ] list of videos for that channel **

* **the title and source of the video are drawn from the Youtube Javascript API **

![image alt text](image_15.jpg)

**clicking one of the thumbs displays the iframe of the video using the youtube javascript API set to auto play **

![image alt text](image_16.jpg)

**when video finishes playing, another grid of 9 RANDOMLY selected video thumbnails is displayed **

![image alt text](image_17.jpg)

## "My Settings"

![image alt text](image_18.jpg)

**clicking the "update" button next to the email field opens the email update modal  **

![image alt text](image_19.png)

![image alt text](image_20.jpg)

**clicking the "reset password" button below  the email field opens the reset password modal **

![image alt text](image_21.png)![image alt text](image_22.jpg)

**clicking an "update" channel button next to a channel’s info fields  the email field opens the update channel modal **

![image alt text](image_23.png)

![image alt text](image_24.jpg)

**clicking "+ add a new channel"  opens the setup channel modal **

# ![image alt text](image_25.png)

# ![image alt text](image_26.png)

# Admin Userpage

# **if a logged in user has "admin" : true ,  **

* **a new button displays for  "+ add video" in the topbar next to the “My Settings” button**

# ![image alt text](image_27.png)![image alt text](image_28.png)

* **additionally there are more options available for admins in the "my settings" for a user which is logged in with “admin” : true**

**clicking "update" next the name,job,company,location field opens the update modal for those fields **

![image alt text](image_29.png)

**clicking "update avatar" button, opens the update avatar modal which includes a file upload function **

![image alt text](image_30.png)

# Importing Video Data

Admin users have a "add video" button in their topbar.

![image alt text](image_31.png)![image alt text](image_32.png)

**clicking the " + video" button opens the Video Import Modal **

![image alt text](image_33.png)

**src:  is a youtube link source**

**classLevels:  **

* ** **user can enter multiple classLevels separated by commas

* when classLevel values which are new to the system are entered new classLevel Objects are  created 

**language:  **

* ** **user can enter multiple language names separated by commas

    * when language name values which are new to the system are entered new language Objects are created 

**tags:  ** 

* user can enter multiple tag names separated by commas

    * when tag name values which are new to the system are entered new tag Objects are create**d **

# Creating "Subject" Data via a Console

**admin users also have access to a "Subject Console" which opens a modal for inputing Subject data into the database **

![image alt text](image_34.png)

# Creating "Tag List" Data via a Console

**admin users also have access to a tagList console which opens a modal for inputing tagList data into the database **

**Using this console creates a new tagList in the database**

**listImgHeader:**

*  is a file upload field, "browse files" alows user to select a file from their computer

**subject:**

* user can input multiple subject names

**classLevels:**

* user can input multiple classLevels 

![image alt text](image_35.png)

# Blocking and Favoriting 

**Users have the ability to add videos to the blocked or favorited videos on each on their channels **

each channel object has an array for userBlocked and userFavorites

when the user is viewing their userpage they can select blocked or favorite on videos, taglists ![image alt text](image_36.png)or subjects for the particular active channel they are viewing 

![image alt text](image_37.jpg)

checking favorite and block next to the "subject" name blocks or favorites all videos found in subject.tagList[].tag[].videos[], not checking either does nothing

 

checking favorite and block on the "tagList.listHeaderImg" blocks or favorites all videos found in tagList[].tag[].videos[], not checking either does nothing

![image alt text](image_38.jpg)

![image alt text](image_39.jpg)


