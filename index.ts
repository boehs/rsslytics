const cyrb53 = (str: string, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

export interface LogEntry {
  date: number;
  readerId: number;
  ip: string;
  feedUrl: string;

  feedId: string | null;
  subscriberCount: number | null;
  readerName: string | null;
  readerVersion: string | null;
  userAgent: string;
}

const readers = [
  "miniflux",
  "inoreader",
  "feedbin",
  "feedly",
  "newsblur",
  "bazqux",
  "tiny tiny rss",
  "reeder",
  "netnewswire",
  "freshrss",
  "theoldreader",
  "rss-parrot-bot",
  "nextcloud-news",
  "blogtrottr",
  "feedmail.org",
  "spacecowboys android rss reader",
  "akregator",
  "simplepie",
  "readyou",
  "liferea",
];

let replacements = {
  "spacecowboys android rss reader": "feeder",
  "rss-parrot-bot": "rss parrot",
};

let excludes = ["bytespider", "petalbot", "amazonbot", "ariadne", "bingbot"];
let excludesUrl = ["wp-includes/wlwmanifest.xml"];

export function countRss(userAgent: string, feedUrl: string, ip: string) {
  if (
    excludes.find((r) => userAgent.toLowerCase().includes(r)) != undefined ||
    excludesUrl.find((r) => feedUrl.toLowerCase().includes(r)) != undefined
  ) {
    return;
  }

  let subscriberCountT = userAgent.match(/([0-9]+) subscriber/);
  let subscriberCount = subscriberCountT
    ? Number(subscriberCountT[1])
    : subscriberCountT;

  let feedIdT = userAgent.match(/feed-id.(.*?)[ )]/);
  let feedId = feedIdT ? feedIdT[1] : feedIdT;

  let readerName =
    readers.find((r) => userAgent.toLowerCase().includes(r)) || null;
  // @ts-ignore
  readerName = replacements[readerName] || readerName || null;

  let version =
    readers.filter((r) =>
      userAgent.toLowerCase().match(new RegExp(r + " ?\\/ ?([^;) ]*)"))
    )[0] || null;
  if (version)
    version = userAgent
      .toLowerCase()
      .match(new RegExp(version + " ?\\/ ?([^;) ]*)"))![1];

  let entry: LogEntry = {
    date: Date.now(),
    ip,
    feedUrl,
    readerId: subscriberCount
      ? cyrb53(readerName + feedUrl + feedId)
      : cyrb53(readerName + feedUrl + ip + version),
    feedId,
    subscriberCount,
    readerVersion: version,
    readerName,
    userAgent,
  };
  return entry;
}
