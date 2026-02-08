
class StarField {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas?.getContext('2d') ?? null;

    this.stars = [];
    this.mousePosition = { x: -1000, y: -1000 };
    this.SPACING = 18;
    this.starRadius = 1;
    this.influenceRadius = 80;
    this.starColor = '255, 255, 255';

    this.canvasWidth = this.getCanvasWidth();
    this.canvasHeight = this.getCanvasHeight();

    if (this.context !== null) {
      this.initStars();
      this.resizeCanvas();
      this.drawStars();
      this.addEventListeners();
      this.observeThemeChanges();
    }

    window.addEventListener('resize', this.onResize.bind(this), false);
  }

  getCanvasWidth() {
    return this.canvas.clientWidth;
  }

  getCanvasHeight() {
    return this.canvas.clientHeight;
  }

  resizeCanvas() {
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
  }

  initStars() {
    this.stars = [];

    for (let x = -5; x < this.canvasWidth; x += this.SPACING) {
      for (let y = -5; y < this.canvasHeight; y += this.SPACING) {
        this.stars.push({
          x,
          y,
          originalX: x,
          originalY: y,
          alpha: Math.random(),
          speed: Math.random() * 0.005 + 0.002
        });
      }
    }
  }

  drawStars() {
    if (this.context !== null) {
      this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    this.stars.forEach((star) => {
      const dx = this.mousePosition.x - star.x;
      const dy = this.mousePosition.y - star.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.influenceRadius) {
        const angle = Math.atan2(dy, dx);
        const force = (this.influenceRadius - distance) / this.influenceRadius;
        star.x = star.originalX - Math.cos(angle) * force * 20;
        star.y = star.originalY - Math.sin(angle) * force * 20;
      } else {
        star.x += (star.originalX - star.x) * 0.05;
        star.y += (star.originalY - star.y) * 0.05;
      }

      star.alpha += star.speed;
      if (star.alpha > 1 || star.alpha < 0) {
        star.speed = -star.speed;
      }

      if (this.context !== null) {
        this.context.fillStyle = `rgba(${this.starColor}, ${Math.abs(star.alpha)})`;
        this.context.beginPath();
        this.context.arc(star.x, star.y, this.starRadius, 0, Math.PI * 2);
        this.context.fill();
      }
    });

    requestAnimationFrame(this.drawStars.bind(this));
  }

  addEventListeners() {
    this.canvas.parentElement?.addEventListener(
      'mousemove',
      this.onMouseMove.bind(this)
    );
    this.canvas.parentElement?.addEventListener(
      'mouseleave',
      this.onMouseLeave.bind(this)
    );
  }

  onMouseMove(event) {
    const rect = this.canvas.getBoundingClientRect();
    this.mousePosition.x = event.clientX - rect.left;
    this.mousePosition.y = event.clientY - rect.top;
  }

  onMouseLeave() {
    this.mousePosition.x = -1000;
    this.mousePosition.y = -1000;
  }

  onResize() {
    this.canvasWidth = this.getCanvasWidth();
    this.canvasHeight = this.getCanvasHeight();
    this.resizeCanvas();
    this.initStars();
  }

  observeThemeChanges() {
    const htmlElement = document.documentElement;

    this.updateStarColor();

    const observer = new MutationObserver(() => {
        this.updateStarColor();
    });

    observer.observe(htmlElement, {
        attributes: true,
        attributeFilter: ['data-theme'] // Watch data-theme instead of class
    });
    }

  updateStarColor() {
    const htmlElement = document.documentElement;

    if (htmlElement.getAttribute('data-theme') === 'light') {
        this.starColor = '0, 0, 0'; // Black stars for light mode
    } else {
        this.starColor = '255, 255, 255'; // White stars for dark mode
    }
    }
}

// Initialize StarField for skills section
function initSkillsStarField() {
  const skillSections = document.querySelectorAll('.starfield');

  if (!skillSections.length) return;

  skillSections.forEach(section => {
    // Prevent duplicate canvases
    if (section.querySelector('canvas')) return;

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    canvas.style.borderRadius = '16px';

    section.style.position = 'relative';
    section.prepend(canvas);

    new StarField(canvas);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSkillsStarField);
} else {
  initSkillsStarField();
}