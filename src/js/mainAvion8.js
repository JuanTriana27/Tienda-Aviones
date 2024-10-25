// Autores: Juan Triana y Stiven Mahecha

var scene = null;
var camera = null;
var renderer = null;
var controls = null;
var modPlayer = null;
var pointLight = null;
var audioPlayer = document.getElementById('audioPlayer');

function start() {
    initScene();
    animate(); 
}

function redimensionar() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
}

function initScene() {
    // Crear la escena
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa0a0a0);
    scene.fog = new THREE.Fog(0xa0a0a0, 10, 50);

    // Crear la cámara
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // Crear el renderizador
    const canvas = document.querySelector('.webgl');
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Crear los controles de la cámara
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Añadir la cámara a la escena
    scene.add(camera);
    camera.position.set(4.3, 3.7, 4.7);
    controls.update();

    // Escuchar el evento de redimensionar la ventana
    window.addEventListener('resize', redimensionar);

    // Crear luces
    const hemiLight = new THREE.HemisphereLight(0x252850, 0x444444);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const ambientLight = new THREE.AmbientLight(0x252850, 0.4);
    scene.add(ambientLight);

    pointLight = new THREE.PointLight(0xffffff, 0.3, 30);
    pointLight.position.set(0, 10, 2);
    scene.add(pointLight);

    // Crear el suelo
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }));
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add(mesh);    
}

function createLight(typeLight) {
    switch (typeLight) {
        case 'AmbientLight':    
            const ambientLight = new THREE.AmbientLight(0x404040, 3);
            scene.add(ambientLight);
            break;
        case 'DirectionalLight':
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
            scene.add(directionalLight);
            break;
        case 'PointLight':
            const pointLight = new THREE.PointLight(0xffffff, 1, 100);
            pointLight.position.set(1, 2, 1);
            scene.add(pointLight);

            const sphereSize = 1;
            const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
            scene.add(pointLightHelper);
            break;
    }
}

function createObject(Avion) {
    switch (Avion) {
        case 'MostrarAvion':
            const loader = new THREE.GLTFLoader();
            const dracoLoader = new THREE.DRACOLoader();
            
            dracoLoader.setDecoderPath('/models/GLTF/avion8/');
            loader.setDRACOLoader(dracoLoader);
            
            loader.load(
                '/models/gltf/avion8/scene.gltf',
                function (gltf) {
                    gltf.scene.scale.set(0.03, 0.03, 0.03);
                    gltf.scene.position.set(-1, 0, -1);
                    gltf.scene.rotation.set(0,0,0);
                    gltf.scene.position.x = 0;
                    scene.add(gltf.scene);
                },
                function (xhr) {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },
                function (error) {
                    console.log('An error happened');
                }
            );
            break;
    }
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}