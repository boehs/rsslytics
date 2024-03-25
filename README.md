**RSSLytics** is a little bit of code I use for collecting analytics on my RSS feed. It's an incredibly creative name. When I get around to it I'll publish some code I use for analysis as well, but this should do for now.

```
CREATE TABLE IF NOT EXISTS log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date DATE NOT NULL,
    readerId TEXT NOT NULL,
    ip TEXT NOT NULL,
    feedUrl TEXT NOT NULL,
    feedId TEXT,
    subscriberCount INTEGER,
    readerName TEXT,
    readerVersion TEXT,
    userAgent TEXT NOT NULL
);
```
