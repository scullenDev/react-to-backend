# MERN (MySQL) Stack - Connecting the Front to the Back Starter

## A little bit of setup is necessary:

1. Create a MySQL database.
2. Update your database/username/port/etc info in `/server/config/config.json`
3. Add a `.env` directly within `/client` and add this line, customizing the port number to point to the port your API (back-end) server runs on:

```text
API_PATH=http://localhost:8080
```

4. cd into `/server` and run `npm i`; this will take care of the necessary install for both the front-end and the back-end.
5. Run `npm start` from this location to spin up both the back-end and front-end servers.

_(Note that the use of reactstrap here, as well as all of its irritating dependencies, is less than ideal... It was used in a pinch to crank out a quick, clean UI.)_
