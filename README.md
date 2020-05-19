
### Created with gatsby default boilerplate. This website contains both static and dynamic content.

#### Description
Email vertified users can share different knitting projects and comment on each other projects. These projects are statically rendered on build. Ideally, I would rebuild the pages every time a new project by a trigger in Google Functions. However, this is currently just a showcase and I therefore use Zapier to trigger a rebuild once a week. The comments related to each project post are dynamically fetch using firestore, and will update in realtime.

#### Links
Link to my google functions setup: https://github.com/oddhus/strikkeklubben-firebase

Link to the website: https://strikkeklubben.netlify.app
