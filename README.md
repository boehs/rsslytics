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
