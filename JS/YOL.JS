// ========== ENG OSON YO‘L TOPISH TIZIMI ==========

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

function getTransportType(distance, timeOfDay, trafficLevel = 'normal') {
    if (distance < 2) {
        return {
            name: '🚶 Piyoda',
            speed: 5,
            icon: '🚶',
            co2: 0,
            calories: distance * 65,
            time: distance / 5 * 60
        };
    } else if (distance < 8) {
        return {
            name: '🚲 Velosiped',
            speed: 15,
            icon: '🚲',
            co2: 0,
            calories: distance * 35,
            time: distance / 15 * 60
        };
    } else if (distance < 50) {
        let speed = 40;
        if (trafficLevel === 'heavy') speed = 25;
        else if (trafficLevel === 'light') speed = 50;
        return {
            name: '🚌 Avtobus',
            speed: speed,
            icon: '🚌',
            co2: distance * 0.1,
            calories: 0,
            time: distance / speed * 60
        };
    } else if (distance < 500) {
        return {
            name: '🚆 Poyezd',
            speed: 80,
            icon: '🚆',
            co2: distance * 0.05,
            calories: 0,
            time: distance / 80 * 60
        };
    } else {
        return {
            name: '✈️ Samolyot',
            speed: 800,
            icon: '✈️',
            co2: distance * 0.2,
            calories: 0,
            time: distance / 800 * 60
        };
    }
}

function getTrafficLevel() {
    const hour = new Date().getHours();
    if ((hour >= 8 && hour <= 10) || (hour >= 17 && hour <= 19)) {
        return 'heavy';
    } else if ((hour >= 11 && hour <= 16) || (hour >= 20 && hour <= 22)) {
        return 'normal';
    } else {
        return 'light';
    }
}

function findBestRoute(startLat, startLng, endLat, endLng) {
    const distance = calculateDistance(startLat, startLng, endLat, endLng);
    const traffic = getTrafficLevel();
    const transport = getTransportType(distance, null, traffic);
    
    const totalMinutes = transport.time;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);
    
    const steps = [];
    const stepDistance = distance / 4;
    
    for (let i = 0; i < 4; i++) {
        const stepStart = i * stepDistance;
        const stepEnd = (i + 1) * stepDistance;
        const stepDuration = (transport.time / 4);
        
        let instruction = '';
        if (i === 0) instruction = `⬆️ To‘g‘ri ${stepDistance.toFixed(1)} km yuring`;
        else if (i === 1) instruction = `➡️ O‘ngga buriling va ${stepDistance.toFixed(1)} km yuring`;
        else if (i === 2) instruction = `⬅️ Chapga buriling va ${stepDistance.toFixed(1)} km yuring`;
        else instruction = `🏁 Manzilga ${stepDistance.toFixed(1)} km qoldi`;
        
        steps.push({
            instruction: instruction,
            distance: stepDistance.toFixed(1),
            duration: Math.floor(stepDuration),
            icon: transport.icon
        });
    }
    
    return {
        distance: distance.toFixed(1),
        kilometers: distance,
        time: transport.time,
        hours: hours,
        minutes: minutes,
        transport: transport.name,
        transportIcon: transport.icon,
        speed: transport.speed,
        co2: transport.co2.toFixed(1),
        calories: transport.calories ? Math.floor(transport.calories) : 0,
        traffic: traffic === 'heavy' ? '🔴 Tirbandlik (og‘ir)' : (traffic === 'light' ? '🟢 Tirbandlik (yengil)' : '🟡 Tirbandlik (normal)'),
        steps: steps
    };
}

function getAlternativeRoutes(startLat, startLng, endLat, endLng) {
    const routes = [];
    const transportTypes = [
        { name: '🚗 Mashina', speed: 60, icon: '🚗' },
        { name: '🚌 Avtobus', speed: 35, icon: '🚌' },
        { name: '🚇 Metro', speed: 45, icon: '🚇' },
        { name: '🚲 Velosiped', speed: 15, icon: '🚲' },
        { name: '🚶 Piyoda', speed: 5, icon: '🚶' }
    ];
    
    const distance = calculateDistance(startLat, startLng, endLat, endLng);
    
    transportTypes.forEach(transport => {
        const time = distance / transport.speed * 60;
        routes.push({
            transport: transport.name,
            icon: transport.icon,
            time: Math.floor(time),
            hours: Math.floor(time / 60),
            minutes: Math.floor(time % 60),
            distance: distance.toFixed(1)
        });
    });
    
    return routes.sort((a, b) => a.time - b.time);
}

function getNearbyPlaces(lat, lng, radius = 5) {
    const allPlaces = [];
    
    Object.keys(worldPlaces).forEach(countryKey => {
        const country = worldPlaces[countryKey];
        
        if (country.places) {
            country.places.forEach(place => {
                const distance = calculateDistance(lat, lng, place.lat, place.lng);
                if (distance <= radius) {
                    allPlaces.push({
                        ...place,
                        distance: distance.toFixed(1),
                        country: country.country
                    });
                }
            });
        }
        
        country.cities.forEach(city => {
            const distance = calculateDistance(lat, lng, city.lat, city.lng);
            if (distance <= radius) {
                allPlaces.push({
                    name: city.name,
                    type: 'shahar',
                    distance: distance.toFixed(1),
                    country: country.country,
                    population: city.population
                });
            }
        });
    });
    
    return allPlaces.sort((a, b) => a.distance - b.distance).slice(0, 10);
}
