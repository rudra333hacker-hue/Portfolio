// Basic Three.js setup for the Sports Car wireframe
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight/2), 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight / 2);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Create a "Car" using primitives (Box + Cylinders) for wireframe vibe
const carBody = new THREE.Mesh(
    new THREE.BoxGeometry(4, 1, 2),
    new THREE.MeshBasicMaterial({ color: 0x00f3ff, wireframe: true })
);
scene.add(carBody);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    carBody.rotation.y += 0.01;
    carBody.rotation.x += 0.005;
    renderer.render(scene, camera);
}
animate();

// GSAP Loader Logic
let progress = { val: 0 };
gsap.to(progress, {
    val: 100,
    duration: 3,
    onUpdate: () => {
        document.getElementById('fill').style.width = progress.val + "%";
    },
    onComplete: () => {
        gsap.to("#loader", { opacity: 0, duration: 1, onComplete: () => {
            document.getElementById('loader').style.display = 'none';
            document.getElementById('main-content').style.visibility = 'visible';
            gsap.from("#main-content", { opacity: 0, duration: 1 });
        }});
    }
});