// ========== KENGAYTIRILGAN QIDIRUV TIZIMI ==========

let searchHistory = JSON.parse(localStorage.getItem('world_navigator_search_history')) || [];
let searchTimeout = null;

function saveToSearchHistory(query, resultCount) {
    searchHistory.unshift({
        query: query,
        resultCount: resultCount,
        timestamp: new Date().toISOString()
    });
    
    if (searchHistory.length > 20) searchHistory.pop();
    localStorage.setItem('world_navigator_search_history', JSON.stringify(searchHistory));
}

function getSearchHistory() {
    return searchHistory;
}

function clearSearchHistory() {
    searchHistory = [];
    localStorage.setItem('world_navigator_search_history', JSON.stringify(searchHistory));
}

function searchAll(query) {
    query = query.toLowerCase().trim();
    const results = [];
    
    if (query.length < 2) return results;
    
    // Davlatlardan qidirish
    Object.keys(worldPlaces).forEach(countryKey => {
        const country = worldPlaces[countryKey];
        
        if (country.country.toLowerCase().includes(query)) {
            results.push({
                type: '🇺🇳 Davlat',
                name: country.country,
                capital: country.capital,
                relevance: 100
            });
        }
        
        country.cities.forEach(city => {
            if (city.name.toLowerCase().includes(query)) {
                results.push({
                    type: '🏙️ Shahar',
                    name: city.name,
                    country: country.country,
                    population: city.population,
                    relevance: city.name.toLowerCase() === query ? 100 : 90
                });
            }
        });
        
        if (country.places) {
            country.places.forEach(place => {
                if (place.name.toLowerCase().includes(query)) {
                    results.push({
                        type: '📍 Diqqatga sazovor joy',
                        name: place.name,
                        city: place.city,
                        country: country.country,
                        relevance: place.name.toLowerCase() === query ? 100 : 85
                    });
                }
            });
        }
    });
    
    // Mahalliy qo'shilgan joylardan qidirish
    const localPlaces = JSON.parse(localStorage.getItem('world_navigator_places')) || [];
    localPlaces.forEach(place => {
        if (place.name.toLowerCase().includes(query)) {
            results.push({
                type: '⭐ Mahalliy joy',
                name: place.name,
                city: place.city,
                country: place.country,
                rating: place.rating,
                relevance: 95
            });
        }
    });
    
    results.sort((a, b) => b.relevance - a.relevance);
    saveToSearchHistory(query, results.length);
    
    return results.slice(0, 50);
}

function getAutocompleteSuggestions(query) {
    query = query.toLowerCase().trim();
    if (query.length < 2) return [];
    
    const suggestions = new Set();
    
    Object.keys(worldPlaces).forEach(countryKey => {
        const country = worldPlaces[countryKey];
        
        if (country.country.toLowerCase().startsWith(query)) {
            suggestions.add(country.country);
        }
        
        country.cities.forEach(city => {
            if (city.name.toLowerCase().startsWith(query)) {
                suggestions.add(`${city.name}, ${country.country}`);
            }
        });
        
        if (country.places) {
            country.places.forEach(place => {
                if (place.name.toLowerCase().startsWith(query)) {
                    suggestions.add(`${place.name} (${place.city})`);
                }
            });
        }
    });
    
    return Array.from(suggestions).slice(0, 10);
}

function createSearchUI() {
    const searchContainer = document.createElement('div');
    searchContainer.id = 'searchContainer';
    searchContainer.className = 'search-container';
    searchContainer.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
        max-width: 500px;
        z-index: 1000;
        pointer-events: auto;
    `;
    
    searchContainer.innerHTML = `
        <div class="search-box glassmorphism" style="display: flex; gap: 10px; padding: 10px; border-radius: 50px;">
            <span style="font-size: 20px;">🔍</span>
            <input type="text" id="globalSearchInput" placeholder="Davlat, shahar, joy nomini qidiring..." style="flex: 1; background: none; border: none; color: white; outline: none; font-size: 16px;">
            <button id="globalSearchBtn" style="background: linear-gradient(45deg, #00ffff, #9d00ff); border: none; border-radius: 30px; padding: 8px 20px; color: white; cursor: pointer;">Qidirish</button>
        </div>
        <div id="searchResults" class="search-results" style="display: none; margin-top: 10px; background: rgba(10,15,30,0.95); backdrop-filter: blur(10px); border-radius: 16px; max-height: 400px; overflow-y: auto; padding: 10px;"></div>
    `;
    
    document.body.appendChild(searchContainer);
    
    const searchInput = document.getElementById('globalSearchInput');
    const searchBtn = document.getElementById('globalSearchBtn');
    const resultsContainer = document.getElementById('searchResults');
    
    searchInput.addEventListener('input', (e) => {
        if (searchTimeout) clearTimeout(searchTimeout);
        
        searchTimeout = setTimeout(() => {
            const query = e.target.value;
            if (query.length >= 2) {
                const suggestions = getAutocompleteSuggestions(query);
                if (suggestions.length > 0) {
                    resultsContainer.innerHTML = suggestions.map(s => 
                        `<div class="suggestion-item" style="padding: 10px; cursor: pointer; border-bottom: 1px solid rgba(255,255,255,0.1); transition: all 0.3s;">${s}</div>`
                    ).join('');
                    resultsContainer.style.display = 'block';
                    
                    document.querySelectorAll('.suggestion-item').forEach(el => {
                        el.addEventListener('click', () => {
                            searchInput.value = el.textContent;
                            resultsContainer.style.display = 'none';
                            performSearch(el.textContent);
                        });
                        el.addEventListener('mouseenter', () => {
                            el.style.background = 'rgba(0,212,255,0.2)';
                        });
                        el.addEventListener('mouseleave', () => {
                            el.style.background = 'transparent';
                        });
                    });
                } else {
                    resultsContainer.style.display = 'none';
                }
            } else {
                resultsContainer.style.display = 'none';
            }
        }, 300);
    });
    
    function performSearch(query) {
        const results = searchAll(query);
        
        if (results.length === 0) {
            resultsContainer.innerHTML = '<div style="padding: 20px; text-align: center;">❌ Hech narsa topilmadi. Iltimos, boshqa so‘z kiriting.</div>';
            resultsContainer.style.display = 'block';
            return;
        }
        
        resultsContainer.innerHTML = results.map(result => `
            <div class="search-result-item" style="padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); cursor: pointer; transition: all 0.3s;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <span style="font-size: 20px; margin-right: 10px;">${result.type === '🇺🇳 Davlat' ? '🌍' : result.type === '🏙️ Shahar' ? '🏙️' : '📍'}</span>
                        <strong>${result.name}</strong>
                        ${result.country ? `<span style="color: #888; font-size: 12px;">, ${result.country}</span>` : ''}
                    </div>
                    <span style="background: rgba(0,212,255,0.2); padding: 4px 10px; border-radius: 20px; font-size: 12px;">${result.type}</span>
                </div>
                ${result.population ? `<div style="font-size: 12px; color: #888; margin-top: 5px;">👥 Aholi: ${result.population.toLocaleString()}</div>` : ''}
                ${result.rating ? `<div style="font-size: 12px; color: #ffcc00; margin-top: 5px;">⭐ Reyting: ${result.rating}/5</div>` : ''}
            </div>
        `).join('');
        resultsContainer.style.display = 'block';
        
        document.querySelectorAll('.search-result-item').forEach(el => {
            el.addEventListener('click', () => {
                resultsContainer.style.display = 'none';
            });
            el.addEventListener('mouseenter', () => {
                el.style.background = 'rgba(0,212,255,0.1)';
            });
            el.addEventListener('mouseleave', () => {
                el.style.background = 'transparent';
            });
        });
    }
    
    searchBtn.addEventListener('click', () => {
        performSearch(searchInput.value);
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });
    
    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target)) {
            resultsContainer.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createSearchUI();
});
