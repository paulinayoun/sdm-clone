// shinobi-api.js
const config = require('../config');

class ShinobiAPI {
    constructor() {
        this.baseUrl = config.shinobi.url;
        this.apiKey = config.shinobi.apiKey;
        this.groupKey = config.shinobi.groupKey;
    }
    // ... 나머지 메서드들
}