# musescore-score-scraper

Download a Musescore Score even if their is not download link

## Usage

Run the scraper with a target URL:

```bash
node main.js <URL>
```

### Examples

```bash
# Scrape a MuseScore page
node main.js https://musescore.com/score/123456

# Scrape any webpage
node main.js https://developer.chrome.com/
```

### Requirements

- Node.js
- The URL must include the protocol (http:// or https://)
