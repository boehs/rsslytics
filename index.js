"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countRss = void 0;
var cyrb53 = function (str, seed) {
    if (seed === void 0) { seed = 0; }
    var h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (var i = 0, ch = void 0; i < str.length; i++) {
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
var readers = [
    "miniflux",
    "inoreader",
    "feedbin",
    "feedly",
    "newsblur",
    "miniflux",
    "bazqux",
    "tiny tiny rss",
    "reeder",
    "netnewswire",
    "freshrss",
    "theoldreader",
];
function countRss(userAgent, feedUrl, ip) {
    var subscriberCountT = userAgent.match(/([0-9]+) subscriber/);
    var subscriberCount = subscriberCountT
        ? Number(subscriberCountT[1])
        : subscriberCountT;
    var feedIdT = userAgent.match(/feed-id.(.*?)[ )]/);
    var feedId = feedIdT ? feedIdT[1] : feedIdT;
    var readerName = readers.find(function (r) { return userAgent.toLowerCase().includes(r); }) || null;
    var version = readers.filter(function (r) { return userAgent.match(new RegExp(r + "\\/[^;) ]*")); })[0] ||
        null;
    if (version)
        version = userAgent.match(new RegExp(version + "\\/[^;) ]*"))[1];
    var entry = {
        date: Date.now(),
        ip: ip,
        feedUrl: feedUrl,
        readerId: subscriberCount
            ? cyrb53(readerName + feedUrl + feedId)
            : cyrb53(readerName + feedUrl + ip + version),
        feedId: feedId,
        subscriberCount: subscriberCount,
        readerVersion: version,
        readerName: readerName,
        userAgent: userAgent,
    };
}
exports.countRss = countRss;
