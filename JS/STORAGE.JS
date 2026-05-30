// ========== LOCALSTORAGE BOSHQARUVI ==========

const STORAGE_KEYS = {
    PLACES: 'world_navigator_places',
    FAVORITES: 'world_navigator_favorites',
    HISTORY: 'world_navigator_search_history',
    SETTINGS: 'world_navigator_settings',
    ROUTES: 'world_navigator_routes'
};

function savePlaces(places) {
    localStorage.setItem(STORAGE_KEYS.PLACES, JSON.stringify(places));
}

function getPlaces() {
    const places = localStorage.getItem(STORAGE_KEYS.PLACES);
    return places ? JSON.parse(places) : [];
}

function saveFavorites(favorites) {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
}

function getFavorites() {
    const favorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return favorites ? JSON.parse(favorites) : [];
}

function addToFavorites(place) {
    const favorites = getFavorites();
    if (!favorites.some(f => f.id === place.id)) {
        favorites.push({ ...place, addedAt: new Date().toISOString() });
        saveFavorites(favorites);
        return true;
    }
    return false;
}

function removeFromFavorites(placeId) {
    const favorites = getFavorites();
    const newFavorites = favorites.filter(f => f.id !== placeId);
    saveFavorites(newFavorites);
    return newFavorites.length !== favorites.length;
}

function isFavorite(placeId) {
    const favorites = getFavorites();
    return favorites.some(f => f.id === placeId);
}

function saveSettings(settings) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
}

function getSettings() {
    const defaultSettings = {
        theme: 'dark',
        language: 'uz',
        animations: true,
        soundEffects: true,
        liveUpdates: false,
        measurementUnit: 'metric'
    };
    
    const settings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return settings ? { ...defaultSettings, ...JSON.parse(settings) } : defaultSettings;
}

function saveRoute(route) {
    const routes = getRoutes();
    routes.unshift({ ...route, timestamp: new Date().toISOString() });
    if (routes.length > 50) routes.pop();
    localStorage.setItem(STORAGE_KEYS.ROUTES, JSON.stringify(routes));
}

function getRoutes() {
    const routes = localStorage.getItem(STORAGE_KEYS.ROUTES);
    return routes ? JSON.parse(routes) : [];
}

function clearRoutes() {
    localStorage.removeItem(STORAGE_KEYS.ROUTES);
}

function exportAllData() {
    const allData = {
        places: getPlaces(),
        favorites: getFavorites(),
        history: getSearchHistory(),
        settings: getSettings(),
        routes: getRoutes(),
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(allData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `world_navigator_backup_${new Date().toISOString().slice(0,19)}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function importData(jsonData) {
    try {
        const data = JSON.parse(jsonData);
        if (data.places) savePlaces(data.places);
        if (data.favorites) saveFavorites(data.favorites);
        if (data.history) localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(data.history));
        if (data.settings) saveSettings(data.settings);
        if (data.routes) localStorage.setItem(STORAGE_KEYS.ROUTES, JSON.stringify(data.routes));
        return true;
    } catch (e) {
        console.error('Import xatosi:', e);
        return false;
    }
}

function clearAllData() {
    Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
    });
}

function getStorageStats() {
    let totalSize = 0;
    Object.values(STORAGE_KEYS).forEach(key => {
        const item = localStorage.getItem(key);
        if (item) totalSize += item.length;
    });
    
    return {
        usedSpace: (totalSize / 1024).toFixed(2),
        itemCount: Object.values(STORAGE_KEYS).filter(key => localStorage.getItem(key)).length
    };
}
