/**
 * Gorillas Clouds - Destila2 Mtr
 * Interactive Smoke Canvas Particle Engine for WhatsApp Button
 * Creates realistic, smooth vapor/smoke clouds on hover and click!
 */

class SmokeEngine {
  constructor(canvasId, targetBtnId) {
    this.canvas = document.getElementById(canvasId);
    this.targetBtn = document.getElementById(targetBtnId);
    if (!this.canvas || !this.targetBtn) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.isEmittingIntense = false;

    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    this.initEventListeners();
    this.startLoop();
  }

  resizeCanvas() {
    this.canvas.width = 200;
    this.canvas.height = 260;
  }

  initEventListeners() {
    // Click burst smoke effect
    this.targetBtn.addEventListener('click', (e) => {
      this.burstSmoke(45);
    });

    // Hover continuous smoke emission
    this.targetBtn.addEventListener('mouseenter', () => {
      this.isEmittingIntense = true;
    });

    this.targetBtn.addEventListener('mouseleave', () => {
      this.isEmittingIntense = false;
    });
  }

  createParticle(isBurst = false) {
    // Emitter center relative to canvas (bottom-right region)
    const originX = 140 + (Math.random() * 20 - 10);
    const originY = 190 + (Math.random() * 10 - 5);

    const size = isBurst ? 18 + Math.random() * 25 : 12 + Math.random() * 18;
    const maxLife = isBurst ? 90 + Math.random() * 50 : 70 + Math.random() * 40;

    return {
      x: originX,
      y: originY,
      vx: (Math.random() - 0.7) * (isBurst ? 2.5 : 1.2), // slightly drift leftwards/upwards
      vy: - (1.2 + Math.random() * (isBurst ? 2.8 : 1.5)), // rising speed
      size: size,
      maxSize: size * (3.5 + Math.random() * 2),
      alpha: isBurst ? 0.6 + Math.random() * 0.3 : 0.35 + Math.random() * 0.2,
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.04,
      life: 0,
      maxLife: maxLife,
      // Subtle color variation between pure vapor white and soft mint
      colorType: Math.random() > 0.4 ? 'white' : 'mint'
    };
  }

  burstSmoke(count) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        if (this.particles.length < 150) {
          this.particles.push(this.createParticle(true));
        }
      }, i * 18);
    }
  }

  update() {
    // Ambient continuous puff
    if (Math.random() < 0.25 || (this.isEmittingIntense && Math.random() < 0.75)) {
      if (this.particles.length < 120) {
        this.particles.push(this.createParticle(this.isEmittingIntense));
      }
    }

    // Update existing particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life++;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.vRot;
      
      // Expand size over life
      const progress = p.life / p.maxLife;
      p.currentSize = p.size + (p.maxSize - p.size) * progress;

      // Smooth fade out
      if (progress < 0.2) {
        p.currentAlpha = p.alpha * (progress / 0.2);
      } else {
        p.currentAlpha = p.alpha * (1 - (progress - 0.2) / 0.8);
      }

      // Remove dead particles
      if (p.life >= p.maxLife) {
        this.particles.splice(i, 1);
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const p of this.particles) {
      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);

      const grad = this.ctx.createRadialGradient(0, 0, 0, 0, 0, p.currentSize);
      if (p.colorType === 'mint') {
        grad.addColorStop(0, `rgba(209, 250, 229, ${p.currentAlpha})`);
        grad.addColorStop(0.5, `rgba(16, 185, 129, ${p.currentAlpha * 0.4})`);
        grad.addColorStop(1, `rgba(255, 255, 255, 0)`);
      } else {
        grad.addColorStop(0, `rgba(255, 255, 255, ${p.currentAlpha})`);
        grad.addColorStop(0.6, `rgba(241, 245, 249, ${p.currentAlpha * 0.5})`);
        grad.addColorStop(1, `rgba(255, 255, 255, 0)`);
      }

      this.ctx.fillStyle = grad;
      this.ctx.beginPath();
      this.ctx.arc(0, 0, p.currentSize, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }
  }

  startLoop() {
    const loop = () => {
      this.update();
      this.draw();
      requestAnimationFrame(loop);
    };
    loop();
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new SmokeEngine('smokeCanvas', 'waFloatingBtn');
});
