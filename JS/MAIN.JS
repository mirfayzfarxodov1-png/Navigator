// ========== ASOSIY FUNKSIYALAR ==========

let userLocation = null;
let placesData = JSON.parse(localStorage.getItem('world_navigator_places')) || [];

// Lokatsiyani olish
function getBrowserLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        accuracy: position.coords.accuracy
                    };
                    console.log('Lokatsiya aniqlandi:', userLocation);
                    resolve(userLocation);
                },
                (error) => {
                    console.log('Lokatsiya aniqalanmadi:', error.message);
                    userLocation = { lat: 41.3111, lng: 69.2797, accuracy: 100 };
                    resolve(userLocation);
                }
            );
        } else {
            userLocation = { lat: 41.3111, lng: 69.2797, accuracy: 100 };
            resolve(userLocation);
        }
    });
}

// Joy qidirish
function searchPlace(query) {
    query = query.toLowerCase().trim();
    
    const foundPlace = placesData.find(place => 
        place.name.toLowerCase().includes(query) || 
        place.city?.toLowerCase().includes(query) ||
        place.country?.toLowerCase().includes(query)
    );
    
    return foundPlace || null;
}

// Joy qo'shish
function addPlace(placeData) {
    const newPlace = {
        id: Date.now(),
        name: placeData.name,
        type: placeData.type || 'boshqa',
        city: placeData.city,
        country: placeData.country,
        lat: placeData.lat,
        lng: placeData.lng,
        description: placeData.description || '',
        rating: placeData.rating || 0,
        image: placeData.image || '',
        createdAt: new Date().toISOString()
    };
    
    placesData.push(newPlace);
    localStorage.setItem('world_navigator_places', JSON.stringify(placesData));
    return newPlace;
}

// Joyni o'chirish
function deletePlace(placeId) {
    placesData = placesData.filter(place => place.id !== placeId);
    localStorage.setItem('world_navigator_places', JSON.stringify(placesData));
}

// Barcha joylarni olish
function getAllPlaces() {
    return placesData;
}

// Masofa hisoblash (Haversine formulasi)
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

// Eng oson yo'lni topish (simulyatsiya)
function findBestRoute(startLat, startLng, endLat, endLng) {
    const distance = calculateDistance(startLat, startLng, endLat, endLng);
    
    let transport = '🚗 Mashina';
    let time = distance / 60;
    let speed = 60;
    
    if (distance < 2) {
        transport = '🚶 Piyoda';
        time = distance / 5;
        speed = 5;
    } else if (distance < 10) {
        transport = '🚲 Velosiped';
        time = distance / 15;
        speed = 15;
    } else if (distance < 50) {
        transport = '🚌 Avtobus';
        time = distance / 40;
        speed = 40;
    } else if (distance < 500) {
        transport = '🚆 Poyezd';
        time = distance / 80;
        speed = 80;
    } else {
        transport = '✈️ Samolyot';
        time = distance / 800;
        speed = 800;
    }
    
    return {
        distance: distance.toFixed(1),
        time: time.toFixed(1),
        hours: Math.floor(time),
        minutes: Math.floor((time % 1) * 60),
        transport: transport,
        speed: speed
    };
}

// Sahifa yuklanganda
document.addEventListener('DOMContentLoaded', () => {
    getBrowserLocation();
    
    // Yuklash ekranini yashirish
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        const mainContent = document.getElementById('mainContent');
        if (loadingScreen && mainContent) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                mainContent.style.display = 'flex';
            }, 500);
        }
    }, 2500);
    
    // Dialog funksiyalari
    const submitBtn = document.getElementById('submitBtn');
    const placeInput = document.getElementById('placeInput');
    const dialogStep1 = document.getElementById('dialogStep1');
    const dialogStep2 = document.getElementById('dialogStep2');
    const placeResult = document.getElementById('placeResult');
    const dialogMessage = document.getElementById('dialogMessage');
    
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const place = placeInput.value.trim();
            if (place.length < 3) {
                dialogMessage.textContent = '⚠️ Iltimos, kamida 3 harf yozing!';
                dialogMessage.style.color = '#ff3366';
                setTimeout(() => {
                    dialogMessage.textContent = '👋 Salom! Dunyo navigatoriga xush kelibsiz!';
                    dialogMessage.style.color = '#ffffff';
                }, 2000);
                return;
            }
            
            const found = searchPlace(place);
            
            if (found) {
                dialogMessage.textContent = `✅ Topildi: ${found.name}!`;
                placeResult.textContent = `📍 ${found.name} - ${found.city}, ${found.country}`;
            } else {
                placeResult.textContent = `📍 Siz "${place}" joyini qidirdingiz. Bu joy hali maʼlumotlar bazasiga qoʻshilmagan.`;
                dialogMessage.textContent = '❓ Hali hech nima qo‘shilmagan!';
            }
            
            dialogStep1.style.display = 'none';
            dialogStep2.style.display = 'block';
        });
    }
    
    const addPlaceBtn = document.getElementById('addPlaceBtn');
    if (addPlaceBtn) {
        addPlaceBtn.addEventListener('click', () => {
            dialogMessage.textContent = '✅ Joy qo‘shish formasi ochiladi';
            dialogMessage.style.color = '#00ff88';
            setTimeout(() => {
                alert('Joy qo‘shish formasi (3-qadamda to‘liq ishlaydi)');
            }, 500);
        });
    }
    
    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            dialogStep2.style.display = 'none';
            dialogStep1.style.display = 'block';
            placeInput.value = '';
            dialogMessage.textContent = '👋 Salom! Dunyo navigatoriga xush kelibsiz!';
            dialogMessage.style.color = '#ffffff';
        });
    }
    
    const dialogClose = document.getElementById('dialogClose');
    if (dialogClose) {
        dialogClose.addEventListener('click', () => {
            document.getElementById('dialogBox').style.display = 'none';
        });
    }
    
    if (placeInput) {
        placeInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && submitBtn) {
                submitBtn.click();
            }
        });
    }
});
