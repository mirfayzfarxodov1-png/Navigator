// ========== 3D YER SAYYORASI (Three.js) ==========

let scene, camera, renderer, earth, stars, clouds;
let mouseX = 0, mouseY = 0;
let targetRotationX = 0, targetRotationY = 0;
let isUserInteracting = false;

function initEarth() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05080f);
    scene.fog = new THREE.FogExp2(0x05080f, 0.0005);
    
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 3;
    camera.position.y = 0;
    
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('earthCanvas'), alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Yorug'liklar
    const ambientLight = new THREE.AmbientLight(0x404060);
    scene.add(ambientLight);
    
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(5, 3, 5);
    scene.add(mainLight);
    
    const fillLight = new THREE.PointLight(0x4466cc, 0.3);
    fillLight.position.set(-2, 1, 3);
    scene.add(fillLight);
    
    const backLight = new THREE.PointLight(0xffaa66, 0.2);
    backLight.position.set(0, 0, -3);
    scene.add(backLight);
    
    // Yer yaratish
    const geometry = new THREE.SphereGeometry(1, 128, 128);
    const material = new THREE.MeshStandardMaterial({
        color: 0x2a6f8f,
        roughness: 0.5,
        metalness: 0.1,
        emissive: 0x0a2a3f,
        emissiveIntensity: 0.2
    });
    earth = new THREE.Mesh(geometry, material);
    scene.add(earth);
    
    // Bulutlar
    const cloudGeometry = new THREE.SphereGeometry(1.01, 128, 128);
    const cloudMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.15
    });
    clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(clouds);
    
    // Yulduzlar
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 5000;
    const starsPositions = new Float32Array(starsCount * 3);
    const starsColors = new Float32Array(starsCount * 3);
    
    for (let i = 0; i < starsCount; i++) {
        const radius = 80 + Math.random() * 40;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        starsPositions[i*3] = radius * Math.sin(phi) * Math.cos(theta);
        starsPositions[i*3+1] = radius * Math.sin(phi) * Math.sin(theta);
        starsPositions[i*3+2] = radius * Math.cos(phi);
        
        const colorIntensity = 0.5 + Math.random() * 0.5;
        starsColors[i*3] = colorIntensity;
        starsColors[i*3+1] = colorIntensity;
        starsColors[i*3+2] = colorIntensity;
    }
    
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(starsColors, 3));
    
    const starsMaterial = new THREE.PointsMaterial({ size: 0.2, vertexColors: true, transparent: true, opacity: 0.8 });
    stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
    
    // Uzoqdagi galaktikalar
    const galaxyGeometry = new THREE.BufferGeometry();
    const galaxyCount = 200;
    const galaxyPositions = new Float32Array(galaxyCount * 3);
    
    for (let i = 0; i < galaxyCount; i++) {
        galaxyPositions[i*3] = (Math.random() - 0.5) * 400;
        galaxyPositions[i*3+1] = (Math.random() - 0.5) * 200;
        galaxyPositions[i*3+2] = (Math.random() - 0.5) * 200 - 100;
    }
    
    galaxyGeometry.setAttribute('position', new THREE.BufferAttribute(galaxyPositions, 3));
    const galaxyMaterial = new THREE.PointsMaterial({ color: 0x88aaff, size: 0.15, transparent: true, opacity: 0.4 });
    const galaxies = new THREE.Points(galaxyGeometry, galaxyMaterial);
    scene.add(galaxies);
    
    // Mishka interaksiyasi
    document.addEventListener('mousemove', (e) => {
        if (!isUserInteracting) {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = (e.clientY / window.innerHeight) * 2 - 1;
            targetRotationX = mouseY * 0.5;
            targetRotationY = mouseX * 0.5;
        }
    });
    
    document.addEventListener('mousedown', () => { isUserInteracting = true; });
    document.addEventListener('mouseup', () => { isUserInteracting = false; });
    
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    
    if (!isUserInteracting) {
        earth.rotation.y += 0.002;
        earth.rotation.x += 0.0005;
        clouds.rotation.y += 0.0022;
        clouds.rotation.x += 0.0006;
        stars.rotation.y += 0.0002;
        stars.rotation.x += 0.0001;
    } else {
        earth.rotation.x += (targetRotationX - earth.rotation.x) * 0.05;
        earth.rotation.y += (targetRotationY - earth.rotation.y) * 0.05;
        clouds.rotation.x = earth.rotation.x;
        clouds.rotation.y = earth.rotation.y;
    }
    
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Sahifa yuklanganda ishga tushirish
window.addEventListener('load', () => {
    initEarth();
});
