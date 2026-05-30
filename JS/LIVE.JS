// ========== LIVE REJIM – REAL VAQT MA'LUMOTLARI ==========

let liveInterval = null;
let isLiveActive = false;
let currentWeatherData = null;
let currentTrafficData = null;

function generateRandomWeather(lat, lng) {
    const seasons = ['🌞 Quyoshli', '☁️ Bulutli', '🌧️ Yomg‘irli', '❄️ Qorli', '🌪️ Shamolli'];
    const randomSeason = seasons[Math.floor(Math.random() * seasons.length)];
    const temperature = Math.floor(Math.random() * 40) - 10;
    const humidity = Math.floor(Math.random() * 100);
    const windSpeed = Math.floor(Math.random() * 50);
    
    return {
        condition: randomSeason,
        temperature: temperature,
        feelsLike: temperature + Math.floor(Math.random() * 5) - 2,
        humidity: humidity,
        windSpeed: windSpeed,
        pressure: 950 + Math.floor(Math.random() * 80),
        uvIndex: Math.floor(Math.random() * 12),
        visibility: Math.floor(Math.random() * 20) + 5,
        icon: randomSeason === '🌞 Quyoshli' ? '☀️' : 
              randomSeason === '☁️ Bulutli' ? '☁️' :
              randomSeason === '🌧️ Yomg‘irli' ? '🌧️' :
              randomSeason === '❄️ Qorli' ? '❄️' : '💨'
    };
}

function generateRandomTraffic() {
    const density = Math.floor(Math.random() * 100);
    let status = '🟢 Bo‘sh';
    if (density > 70) status = '🔴 Tirband';
    else if (density > 40) status = '🟡 O‘rtacha';
    
    return {
        density: density,
        status: status,
        averageSpeed: Math.floor(Math.random() * 60) + 10,
        accidents: Math.floor(Math.random() * 3),
        roadWorks: Math.random() > 0.8
    };
}

function generateRandomAirQuality() {
    const aqi = Math.floor(Math.random() * 150) + 20;
    let level = '🟢 Yaxshi';
    if (aqi > 100) level = '🔴 Yomon';
    else if (aqi > 50) level = '🟡 O‘rtacha';
    
    return {
        aqi: aqi,
        level: level,
        pm25: Math.floor(Math.random() * 50) + 5,
        pm10: Math.floor(Math.random() * 80) + 10,
        no2: Math.floor(Math.random() * 40) + 5,
        o3: Math.floor(Math.random() * 60) + 10
    };
}

function startLiveUpdates() {
    if (liveInterval) clearInterval(liveInterval);
    isLiveActive = true;
    
    liveInterval = setInterval(() => {
        currentWeatherData = generateRandomWeather(0, 0);
        currentTrafficData = generateRandomTraffic();
        
        const event = new CustomEvent('liveUpdate', { 
            detail: {
                weather: currentWeatherData,
                traffic: currentTrafficData,
                timestamp: new Date().toISOString()
            }
        });
        document.dispatchEvent(event);
        
        updateLiveDisplay();
    }, 2000);
}

function stopLiveUpdates() {
    if (liveInterval) {
        clearInterval(liveInterval);
        liveInterval = null;
        isLiveActive = false;
    }
}

function updateLiveDisplay() {
    const liveContainer = document.getElementById('liveContainer');
    if (!liveContainer) return;
    
    if (!currentWeatherData) return;
    
    liveContainer.innerHTML = `
        <div class="live-card glassmorphism">
            <div class="live-header">
                <span class="live-icon">🔴</span>
                <h3>LIVE MA'LUMOTLAR</h3>
                <span class="live-time">${new Date().toLocaleTimeString()}</span>
            </div>
            <div class="live-body">
                <div class="weather-section">
                    <h4>🌤️ OB-HAVO</h4>
                    <div class="weather-grid">
                        <div class="weather-item">
                            <span class="weather-icon">${currentWeatherData.icon}</span>
                            <span class="weather-value">${currentWeatherData.condition}</span>
                        </div>
                        <div class="weather-item">
                            <span>🌡️ Harorat</span>
                            <span>${currentWeatherData.temperature}°C</span>
                        </div>
                        <div class="weather-item">
                            <span>💧 Namlik</span>
                            <span>${currentWeatherData.humidity}%</span>
                        </div>
                        <div class="weather-item">
                            <span>💨 Shamol</span>
                            <span>${currentWeatherData.windSpeed} km/soat</span>
                        </div>
                        <div class="weather-item">
                            <span>☀️ UV indeks</span>
                            <span>${currentWeatherData.uvIndex}</span>
                        </div>
                        <div class="weather-item">
                            <span>👁️ Ko‘rinish</span>
                            <span>${currentWeatherData.visibility} km</span>
                        </div>
                    </div>
                </div>
                <div class="traffic-section">
                    <h4>🚦 TRANSPORT</h4>
                    <div class="traffic-grid">
                        <div class="traffic-item">
                            <span>Tirbandlik</span>
                            <span>${currentTrafficData.status}</span>
                        </div>
                        <div class="traffic-item">
                            <span>O‘rtacha tezlik</span>
                            <span>${currentTrafficData.averageSpeed} km/soat</span>
                        </div>
                        <div class="traffic-item">
                            <span>Yo‘l harakati zichligi</span>
                            <span>${currentTrafficData.density}%</span>
                        </div>
                        <div class="traffic-item">
                            <span>Yo‘l ishlari</span>
                            <span>${currentTrafficData.roadWorks ? '✅ Bor' : '❌ Yo‘q'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createLiveToggle() {
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'liveToggle';
    toggleBtn.className = 'live-toggle';
    toggleBtn.innerHTML = '🔴 LIVE YOQISH';
    toggleBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        padding: 12px 24px;
        background: linear-gradient(45deg, #ff3366, #ff00ff);
        border: none;
        border-radius: 30px;
        color: white;
        font-weight: bold;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 0 15px #ff3366;
    `;
    
    toggleBtn.addEventListener('click', () => {
        if (isLiveActive) {
            stopLiveUpdates();
            toggleBtn.innerHTML = '🔴 LIVE YOQISH';
            toggleBtn.style.background = 'linear-gradient(45deg, #ff3366, #ff00ff)';
        } else {
            startLiveUpdates();
            toggleBtn.innerHTML = '🟢 LIVE O‘CHIRISH';
            toggleBtn.style.background = 'linear-gradient(45deg, #00ff88, #00cc66)';
        }
    });
    
    toggleBtn.addEventListener('mouseenter', () => {
        toggleBtn.style.transform = 'scale(1.05)';
    });
    toggleBtn.addEventListener('mouseleave', () => {
        toggleBtn.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(toggleBtn);
}

document.addEventListener('DOMContentLoaded', () => {
    createLiveToggle();
});
