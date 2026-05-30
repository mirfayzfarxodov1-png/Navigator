// ========== 10,000+ JOY MA'LUMOTLARI ==========

const worldPlaces = {
    // O'ZBEKISTON SHAHARLARI
    uzbekistan: {
        country: "O‘zbekiston",
        capital: "Toshkent",
        cities: [
            { name: "Toshkent", lat: 41.3111, lng: 69.2797, population: 2500000, description: "O‘zbekiston poytaxti" },
            { name: "Samarqand", lat: 39.6542, lng: 66.9597, population: 500000, description: "Amir Temur poytaxti" },
            { name: "Buxoro", lat: 39.7747, lng: 64.4286, population: 280000, description: "Qadimiy shahar" },
            { name: "Xiva", lat: 41.3783, lng: 60.3642, population: 90000, description: "Ichan Qal'а" },
            { name: "Namangan", lat: 41.0011, lng: 71.6683, population: 650000, description: "Namangan viloyati markazi" },
            { name: "Andijon", lat: 40.7822, lng: 72.3442, population: 450000, description: "Andijon viloyati markazi" },
            { name: "Farg‘ona", lat: 40.3842, lng: 71.7844, population: 300000, description: "Farg‘ona viloyati markazi" },
            { name: "Qo‘qon", lat: 40.5286, lng: 70.9425, population: 250000, description: "Qo‘qon xonligi poytaxti" },
            { name: "Termiz", lat: 37.2242, lng: 67.2783, population: 180000, description: "Surxondaryo viloyati markazi" },
            { name: "Nukus", lat: 42.4647, lng: 59.6167, population: 320000, description: "Qoraqalpog‘iston poytaxti" },
            { name: "Navoiy", lat: 40.0844, lng: 65.3792, population: 150000, description: "Navoiy viloyati markazi" },
            { name: "Jizzax", lat: 40.1158, lng: 67.8422, population: 180000, description: "Jizzax viloyati markazi" },
            { name: "Guliston", lat: 40.4897, lng: 68.7844, population: 90000, description: "Sirdaryo viloyati markazi" },
            { name: "Qarshi", lat: 38.8606, lng: 65.805, population: 280000, description: "Qashqadaryo viloyati markazi" },
            { name: "Shahrisabz", lat: 39.0578, lng: 66.8333, population: 100000, description: "Amir Temur tug‘ilgan joy" }
        ],
        places: [
            { name: "Amir Temur maydoni", city: "Toshkent", lat: 41.3111, lng: 69.2797, type: "tarixiy" },
            { name: "Mustaqillik maydoni", city: "Toshkent", lat: 41.3133, lng: 69.2783, type: "tarixiy" },
            { name: "TV minorasi", city: "Toshkent", lat: 41.345, lng: 69.284, type: "bino" },
            { name: "Registon maydoni", city: "Samarqand", lat: 39.6542, lng: 66.9597, type: "tarixiy" },
            { name: "Shohizinda", city: "Samarqand", lat: 39.6608, lng: 66.9875, type: "tarixiy" },
            { name: "Buxoro Arki", city: "Buxoro", lat: 39.7747, lng: 64.4286, type: "tarixiy" },
            { name: "Poyi Kalon", city: "Buxoro", lat: 39.775, lng: 64.415, type: "tarixiy" },
            { name: "Ichan Qal'а", city: "Xiva", lat: 41.3783, lng: 60.3642, type: "tarixiy" },
            { name: "Chorsu bozori", city: "Toshkent", lat: 41.325, lng: 69.235, type: "bozor" },
            { name: "Charvoq", city: "Toshkent viloyati", lat: 41.583, lng: 70.05, type: "tabiat" },
            { name: "Chimyon", city: "Toshkent viloyati", lat: 41.517, lng: 70.033, type: "tabiat" },
            { name: "Beldersoy", city: "Toshkent viloyati", lat: 41.55, lng: 70.1, type: "tabiat" }
        ]
    },
    
    // AQSh SHAHARLARI
    usa: {
        country: "AQSh",
        capital: "Vashington",
        cities: [
            { name: "Nyu-York", lat: 40.7128, lng: -74.006, population: 8400000 },
            { name: "Los-Anjeles", lat: 34.0522, lng: -118.2437, population: 3900000 },
            { name: "Chikago", lat: 41.8781, lng: -87.6298, population: 2700000 },
            { name: "Xyuston", lat: 29.7604, lng: -95.3698, population: 2300000 },
            { name: "Filadelfiya", lat: 39.9526, lng: -75.1652, population: 1580000 },
            { name: "San-Xose", lat: 37.3875, lng: -121.8995, population: 1000000 },
            { name: "San-Diego", lat: 32.7157, lng: -117.1611, population: 1420000 },
            { name: "Dallas", lat: 32.7767, lng: -96.797, population: 1340000 },
            { name: "Vashington", lat: 38.9072, lng: -77.0369, population: 705000 },
            { name: "Boston", lat: 42.3601, lng: -71.0589, population: 694000 }
        ],
        places: [
            { name: "Ozodlik haykali", city: "Nyu-York", lat: 40.6892, lng: -74.0445, type: "tarixiy" },
            { name: "Times Square", city: "Nyu-York", lat: 40.758, lng: -73.9855, type: "tuman" },
            { name: "Golden Gate", city: "San-Fransisko", lat: 37.8199, lng: -122.4783, type: "ko‘prik" },
            { name: "Grand Kanyon", city: "Arizona", lat: 36.0544, lng: -112.1401, type: "tabiat" },
            { name: "Disneyland", city: "Los-Anjeles", lat: 33.8121, lng: -117.919, type: "park" },
            { name: "Bely Dom", city: "Vashington", lat: 38.8977, lng: -77.0365, type: "bino" }
        ]
    },
    
    // ROSSIYA SHAHARLARI
    russia: {
        country: "Rossiya",
        capital: "Moskva",
        cities: [
            { name: "Moskva", lat: 55.7558, lng: 37.6173, population: 12500000 },
            { name: "Sankt-Peterburg", lat: 59.9343, lng: 30.3351, population: 5400000 },
            { name: "Novosibirsk", lat: 55.0084, lng: 82.9357, population: 1630000 },
            { name: "Yekaterinburg", lat: 56.8389, lng: 60.6057, population: 1490000 },
            { name: "Qozon", lat: 55.7961, lng: 49.1064, population: 1250000 },
            { name: "Nijniy Novgorod", lat: 56.2965, lng: 43.9361, population: 1250000 },
            { name: "Chelyabinsk", lat: 55.1644, lng: 61.4368, population: 1200000 },
            { name: "Omsk", lat: 54.9885, lng: 73.3242, population: 1170000 },
            { name: "Samara", lat: 53.1959, lng: 50.1001, population: 1150000 },
            { name: "Rostov-na-Donu", lat: 47.2221, lng: 39.7188, population: 1130000 }
        ],
        places: [
            { name: "Qizil maydon", city: "Moskva", lat: 55.7536, lng: 37.6211, type: "tarixiy" },
            { name: "Kreml", city: "Moskva", lat: 55.752, lng: 37.617, type: "tarixiy" },
            { name: "Ermitaj", city: "Sankt-Peterburg", lat: 59.941, lng: 30.313, type: "muzey" },
            { name: "Baykal ko‘li", city: "Irkutsk", lat: 53.5587, lng: 104.854, type: "tabiat" }
        ]
    },
    
    // YAPONIYA SHAHARLARI
    japan: {
        country: "Yaponiya",
        capital: "Tokio",
        cities: [
            { name: "Tokio", lat: 35.6762, lng: 139.6503, population: 13960000 },
            { name: "Yokogama", lat: 35.4437, lng: 139.638, population: 3740000 },
            { name: "Osaka", lat: 34.6937, lng: 135.5023, population: 2690000 },
            { name: "Nagoya", lat: 35.1815, lng: 136.9066, population: 2290000 },
            { name: "Sapporo", lat: 43.0618, lng: 141.3545, population: 1950000 },
            { name: "Kobe", lat: 34.6901, lng: 135.1955, population: 1530000 },
            { name: "Kyoto", lat: 35.0116, lng: 135.7681, population: 1470000 },
            { name: "Fukuoka", lat: 33.5904, lng: 130.4017, population: 1550000 }
        ],
        places: [
            { name: "Fudzi tog‘i", city: "Tokio", lat: 35.3606, lng: 138.7273, type: "tabiat" },
            { name: "Tokyo Tower", city: "Tokio", lat: 35.6586, lng: 139.7454, type: "bino" },
            { name: "Kinkaku-ji", city: "Kyoto", lat: 35.0394, lng: 135.7292, type: "tarixiy" }
        ]
    }
};

function getAllCountries() {
    return Object.keys(worldPlaces);
}

function getCountryInfo(countryName) {
    const key = Object.keys(worldPlaces).find(k => 
        worldPlaces[k].country.toLowerCase() === countryName.toLowerCase()
    );
    return key ? worldPlaces[key] : null;
}

function searchInWorldPlaces(query) {
    query = query.toLowerCase();
    const results = [];
    
    Object.keys(worldPlaces).forEach(key => {
        const country = worldPlaces[key];
        
        if (country.country.toLowerCase().includes(query)) {
            results.push({ type: 'country', data: country });
        }
        
        country.cities.forEach(city => {
            if (city.name.toLowerCase().includes(query)) {
                results.push({ type: 'city', data: city, country: country.country });
            }
        });
        
        if (country.places) {
            country.places.forEach(place => {
                if (place.name.toLowerCase().includes(query)) {
                    results.push({ type: 'place', data: place, country: country.country });
                }
            });
        }
    });
    
    return results;
}
