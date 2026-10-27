/**
 * THREE.JS & WEBGL CONTROLLER
 * High-performance 3D scene with dynamic geometry switching, particle starfield,
 * interactive mouse parallax, shockwaves, and theme color transitions.
 * Includes automatic 2D Canvas 3D projection fallback if WebGL/CDN is unavailable.
 */
class Portfolio3DScene {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.isThreeAvailable = typeof THREE !== 'undefined';
    this.currentShape = 'torus';
    this.warpMode = false;
    this.themeColors = {
      primary: 0x00f0ff,
      accent: 0x8a2be2
    };

    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.shockwaves = [];
    this.clock = { lastTime: performance.now(), elapsed: 0 };

    if (this.isThreeAvailable) {
      this.initThree();
    } else {
      console.warn('Three.js not loaded, falling back to procedural Canvas 3D projection');
      this.initCanvasFallback();
    }

    this.bindEvents();
  }

  initThree() {
    // 1. Scene, Camera, Renderer
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 24;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. Lights (softened for maximum text contrast & reading focus)
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    this.scene.add(this.ambientLight);

    this.pointLight1 = new THREE.PointLight(this.themeColors.primary, 2.2, 50);
    this.pointLight1.position.set(15, 12, 10);
    this.scene.add(this.pointLight1);

    this.pointLight2 = new THREE.PointLight(this.themeColors.accent, 2.2, 50);
    this.pointLight2.position.set(-15, -12, 10);
    this.scene.add(this.pointLight2);

    // 3. Central Geometry Meshes Group
    this.meshGroup = new THREE.Group();
    this.scene.add(this.meshGroup);

    this.createCenterpieces();
    this.createStarfield();
    this.initAutoCycle();

    // 4. Start Render Loop
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  createCenterpieces() {
    this.shapes = {};

    // Shape 1: Torus Knot
    const torusGeo = new THREE.TorusKnotGeometry(4.5, 1.2, 120, 24);
    const torusMat = new THREE.MeshStandardMaterial({
      color: this.themeColors.primary,
      wireframe: true,
      emissive: this.themeColors.primary,
      emissiveIntensity: 0.25,
      roughness: 0.2,
      metalness: 0.8
    });
    this.shapes.torus = new THREE.Mesh(torusGeo, torusMat);
    this.meshGroup.add(this.shapes.torus);

    // Shape 2: Crystal Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(5.2, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: this.themeColors.accent,
      wireframe: false,
      roughness: 0.1,
      metalness: 0.9,
      flatShading: true
    });
    const icoWire = new THREE.LineSegments(
      new THREE.WireframeGeometry(icoGeo),
      new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4 })
    );
    const icoGroup = new THREE.Group();
    icoGroup.add(new THREE.Mesh(icoGeo, icoMat));
    icoGroup.add(icoWire);
    icoGroup.visible = false;
    this.shapes.icosahedron = icoGroup;
    this.meshGroup.add(icoGroup);

    // Shape 3: Cyber Wave Grid
    const planeGeo = new THREE.PlaneGeometry(24, 24, 28, 28);
    const planeMat = new THREE.MeshBasicMaterial({
      color: this.themeColors.primary,
      wireframe: true,
      transparent: true,
      opacity: 0.65
    });
    const planeMesh = new THREE.Mesh(planeGeo, planeMat);
    planeMesh.rotation.x = -Math.PI / 2.5;
    planeMesh.position.y = -4;
    planeMesh.visible = false;
    this.shapes.wave = planeMesh;
    this.meshGroup.add(planeMesh);
  }

  createStarfield() {
    const count = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const velocities = new Float32Array(count);

    const c1 = new THREE.Color(this.themeColors.primary);
    const c2 = new THREE.Color(this.themeColors.accent);
    const white = new THREE.Color(0xffffff);

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const x = (Math.random() - 0.5) * 80;
      const y = (Math.random() - 0.5) * 80;
      const z = (Math.random() - 0.5) * 80;

      positions[idx] = x;
      positions[idx + 1] = y;
      positions[idx + 2] = z;

      originalPositions[idx] = x;
      originalPositions[idx + 1] = y;
      originalPositions[idx + 2] = z;

      velocities[i] = 0.04 + Math.random() * 0.08;

      const rand = Math.random();
      const chosenColor = rand > 0.6 ? c1 : (rand > 0.3 ? c2 : white);
      colors[idx] = chosenColor.r;
      colors[idx + 1] = chosenColor.g;
      colors[idx + 2] = chosenColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.28,
      vertexColors: true,
      transparent: true,
      opacity: 0.65
    });

    this.starfield = new THREE.Points(geometry, material);
    this.starfieldData = { originalPositions, velocities };
    this.scene.add(this.starfield);
  }

  initAutoCycle() {
    this.styles = ['torus', 'icosahedron', 'wave'];
    this.currentStyleIndex = 0;
    
    // Automatically morph and transition to different geometry styles every 9.5 seconds
    this.autoCycleTimer = setInterval(() => {
      this.transitionToNextStyle();
    }, 9500);
  }

  transitionToNextStyle() {
    this.currentStyleIndex = (this.currentStyleIndex + 1) % this.styles.length;
    const nextShape = this.styles[this.currentStyleIndex];
    this.transitionToShape(nextShape);
  }

  transitionToShape(newShape) {
    if (!this.shapes || !this.shapes[newShape] || newShape === this.currentShape) return;
    const oldShape = this.currentShape;
    this.currentShape = newShape;

    const oldObj = this.shapes[oldShape];
    const newObj = this.shapes[newShape];

    if (oldObj && newObj) {
      newObj.visible = true;
      newObj.scale.set(0.01, 0.01, 0.01);

      let step = 0;
      const totalSteps = 24;
      const interval = setInterval(() => {
        step++;
        const progress = step / totalSteps;
        if (progress >= 1) {
          clearInterval(interval);
          oldObj.visible = false;
          oldObj.scale.set(1, 1, 1);
          newObj.scale.set(1, 1, 1);
        } else {
          // Smooth sinusoidal ease-in-out
          const ease = 0.5 - Math.cos(progress * Math.PI) / 2;
          const outScale = Math.max(0.01, 1 - ease);
          const inScale = Math.max(0.01, ease);
          oldObj.scale.set(outScale, outScale, outScale);
          newObj.scale.set(inScale, inScale, inScale);
        }
      }, 20);
    } else {
      this.setShape(newShape);
    }
  }

  setShape(shapeKey) {
    if (!this.shapes || !this.shapes[shapeKey]) return;
    this.currentShape = shapeKey;
    Object.keys(this.shapes).forEach(key => {
      this.shapes[key].visible = (key === shapeKey);
    });
  }

  toggleWarp() {
    this.warpMode = !this.warpMode;
    return this.warpMode;
  }

  triggerShockwave(clientX, clientY) {
    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = -(clientY / window.innerHeight) * 2 + 1;
    this.shockwaves.push({
      x: x * 15,
      y: y * 10,
      radius: 0.5,
      maxRadius: 28,
      speed: 0.8
    });
  }

  setThemeColors(hexPrimary, hexAccent) {
    const numPrimary = parseInt(hexPrimary.replace('#', '0x'), 16);
    const numAccent = parseInt(hexAccent.replace('#', '0x'), 16);
    this.themeColors.primary = numPrimary;
    this.themeColors.accent = numAccent;

    if (this.pointLight1) this.pointLight1.color.setHex(numPrimary);
    if (this.pointLight2) this.pointLight2.color.setHex(numAccent);

    if (this.shapes && this.shapes.torus) {
      this.shapes.torus.material.color.setHex(numPrimary);
      this.shapes.torus.material.emissive.setHex(numPrimary);
    }
    if (this.shapes && this.shapes.icosahedron) {
      const mesh = this.shapes.icosahedron.children[0];
      if (mesh) mesh.material.color.setHex(numAccent);
    }
    if (this.shapes && this.shapes.wave) {
      this.shapes.wave.material.color.setHex(numPrimary);
    }
  }

  animate(now) {
    requestAnimationFrame(this.animate);

    const delta = (now - this.clock.lastTime) * 0.001;
    this.clock.lastTime = now;
    this.clock.elapsed += delta;

    // Smooth mouse lerp
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    // Centerpiece Rotation & Float
    if (this.meshGroup) {
      this.meshGroup.rotation.x = this.mouse.y * 0.4 + Math.sin(this.clock.elapsed * 0.5) * 0.1;
      this.meshGroup.rotation.y = this.mouse.x * 0.4 + this.clock.elapsed * 0.25;

      const activeMesh = this.shapes[this.currentShape];
      if (activeMesh && this.currentShape === 'torus') {
        activeMesh.rotation.z += 0.008;
      } else if (activeMesh && this.currentShape === 'icosahedron') {
        activeMesh.rotation.y += 0.007;
        activeMesh.rotation.x += 0.004;
      } else if (activeMesh && this.currentShape === 'wave') {
        const pos = activeMesh.geometry.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const u = pos.getX(i);
          const v = pos.getY(i);
          pos.setZ(i, Math.sin(u * 0.5 + this.clock.elapsed * 2) * Math.cos(v * 0.5 + this.clock.elapsed * 1.5) * 1.2);
        }
        pos.needsUpdate = true;
      }
    }

    // Starfield Particle Movement & Warp Speed
    if (this.starfield) {
      const posAttr = this.starfield.geometry.attributes.position;
      const count = posAttr.count;
      const speedMultiplier = this.warpMode ? 8.5 : 1.0;

      for (let i = 0; i < count; i++) {
        let z = posAttr.getZ(i);
        const vel = this.starfieldData.velocities[i] * speedMultiplier;
        z += vel;

        if (z > 40) {
          z = -40;
          posAttr.setX(i, (Math.random() - 0.5) * 80);
          posAttr.setY(i, (Math.random() - 0.5) * 80);
        }
        posAttr.setZ(i, z);

        // Apply Shockwaves
        for (let s = 0; s < this.shockwaves.length; s++) {
          const sw = this.shockwaves[s];
          const dx = posAttr.getX(i) - sw.x;
          const dy = posAttr.getY(i) - sw.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (Math.abs(dist - sw.radius) < 2.5) {
            posAttr.setX(i, posAttr.getX(i) + (dx / dist) * 0.3);
            posAttr.setY(i, posAttr.getY(i) + (dy / dist) * 0.3);
          }
        }
      }
      posAttr.needsUpdate = true;

      // Update shockwave radii
      for (let s = this.shockwaves.length - 1; s >= 0; s--) {
        this.shockwaves[s].radius += this.shockwaves[s].speed;
        if (this.shockwaves[s].radius > this.shockwaves[s].maxRadius) {
          this.shockwaves.splice(s, 1);
        }
      }
    }

    this.renderer.render(this.scene, this.camera);
  }

  // Fallback 2D Canvas when Three.js is not present
  initCanvasFallback() {
    const ctx = this.canvas.getContext('2d');
    let width = (this.canvas.width = window.innerWidth);
    let height = (this.canvas.height = window.innerHeight);

    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      size: Math.random() * 2 + 1
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx * (this.warpMode ? 5 : 1);
        p1.y += p1.vy * (this.warpMode ? 5 : 1);

        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        ctx.fillStyle = '#00f0ff';
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.strokeStyle = `rgba(0, 240, 255, ${1 - dist / 100})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(render);
    };
    render();
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      if (this.renderer && this.camera) {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      }
    });

    window.addEventListener('pointermove', e => {
      this.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener('click', e => {
      if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A' && !e.target.closest('.interactive-card')) {
        this.triggerShockwave(e.clientX, e.clientY);
      }
    });
  }
}

window.Portfolio3DScene = Portfolio3DScene;
