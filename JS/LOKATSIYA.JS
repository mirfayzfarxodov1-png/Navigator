// ========== LOKATSIYANI YOQISH TIZIMI ==========

let currentPosition = null;
let watchId = null;
let isLocationActive = false;

function getLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Brauzer lokatsiyani qo‘llab-quvvatlamaydi'));
            return;
        }
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                currentPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                    timestamp: position.timestamp
                };
                resolve(currentPosition);
            },
            (error) => {
                let errorMessage = 'Lokatsiya aniqalanmadi';
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Siz lokatsiyaga ruxsat bermadingiz';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Lokatsiya maʼlumoti mavjud emas';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'Lokatsiya aniqlash vaqti tugadi';
                        break;
                }
                reject(new Error(errorMessage));
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    });
}

function startWatchingLocation() {
    if (watchId !== null) return;
    
    if (!navigator.geolocation) {
        console.log('Brauzer lokatsiyani qo‘llab-quvvatlamaydi');
        return;
    }
    
    watchId = navigator.geolocation.watchPosition(
        (position) => {
            currentPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                accuracy: position.coords.accuracy,
                timestamp: position.timestamp
            };
            isLocationActive = true;
            
            const event = new CustomEvent('locationChanged', { detail: currentPosition });
            document.dispatchEvent(event);
        },
        (error) => {
            console.log('Lokatsiya kuzatuv xatosi:', error.message);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );
}

function stopWatchingLocation() {
    if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
        isLocationActive = false;
    }
}

function calculateDistanceFromCurrent(lat, lng) {
    if (!currentPosition) return null;
    
    const R = 6371;
    const dLat = (lat - currentPosition.lat) * Math.PI / 180;
    const dLon = (lng - currentPosition.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(currentPosition.lat * Math.PI / 180) * Math.cos(lat * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

function getCurrentAddress() {
    if (!currentPosition) return null;
    
    return {
        lat: currentPosition.lat,
        lng: currentPosition.lng,
        accuracy: currentPosition.accuracy,
        url: `https://www.google.com/maps?q=${currentPosition.lat},${currentPosition.lng}`
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const locationBtn = document.getElementById('locationBtn');
    if (locationBtn) {
        locationBtn.addEventListener('click', async () => {
            try {
                const position = await getLocation();
                startWatchingLocation();
                console.log('Lokatsiya yoqildi:', position);
            } catch (error) {
                console.log('Lokatsiya xatosi:', error.message);
            }
        });
    }
});
