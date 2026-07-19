/**
 * Gorillas Clouds - Destila2 Mtr
 * Main Application Logic & Product Catalog Manager
 */

const WHATSAPP_NUMBER = "573236587684";
const INSTAGRAM_URL = "https://www.instagram.com/destimtr.oficial/";

// Product Catalog Data - Extracted directly from image flyers
const PRODUCTS = [
  {
    id: 1,
    name: "Batería All In Vape 510 - Pantalla LED & Control Digital",
    category: "cartuchos",
    price: 50000,
    formattedPrice: "$50.000 COP",
    kitPrice: "Kit con Cápsula: $90.000 COP",
    strains: "Universal 510 - Control Digital",
    cannabinoids: ["650mAh Batería", "Pantalla LED", "Control Digital Voltaje"],
    desc: "Batería 650mAh con indicador LED de carga y voltaje regulable. Compatible con todos los cartuchos 510. Protección sobrecarga.",
    image: "img/destilado-1.jpg",
    badge: "Más Vendido 🔥"
  },
  {
    id: 2,
    name: "Kik Zombie Blend 4.2ML - Live Resin + Liquid Diamonds",
    category: "live-resin",
    price: 160000,
    formattedPrice: "$160.000 COP",
    strains: "Indica Premium - Kalibloom Zombie",
    cannabinoids: ["THCA Liquid Diamonds", "Live Resin CDT", "HHCP / THCP"],
    desc: "Dispositivo recargable de 4.2ML de máxima capacidad. Extracción de resina viva con diamantes líquidos y perfil terpénico CDT.",
    image: "img/destilado-2.jpg",
    badge: "4.2ML Potente 💎"
  },
  {
    id: 3,
    name: "Live Resin Cartridge Delta 9 - Terpenos Naturales",
    category: "cartuchos",
    price: 120000,
    formattedPrice: "$120.000 COP",
    strains: "Espectro Completo - Terps Vivos",
    cannabinoids: ["Delta 9 Pure", "Live Resin", "Sin Rellenos"],
    desc: "Cartucho 510 de aceite puro sin aditivos ni agentes de corte. Extracción premium de terpenos naturales de sabor intenso.",
    image: "img/destilado-3.jpg",
    badge: "Aceite Puro ✨"
  },
  {
    id: 4,
    name: "Batería Yocan Kodo 510 - Carga Rápida USB-C",
    category: "cartuchos",
    price: 70000,
    formattedPrice: "$70.000 COP",
    kitPrice: "Kit con Cápsula: $120.000 COP",
    strains: "3 Niveles de Voltaje Variable",
    cannabinoids: ["Carga USB-C", "Diseño Ultra Compacto", "Conexión 510"],
    desc: "Batería ultra portátil para extracciones. 3 niveles de potencia regulable, encendido rápido de 5 clics y puerto USB-C.",
    image: "img/destilado-4.jpg",
    badge: "Carga Rápida ⚡"
  },
  {
    id: 5,
    name: "Green Dragon Live Resin Cartridge 1G",
    category: "live-resin",
    price: 110000,
    formattedPrice: "$110.000 COP",
    strains: "Híbrida - Green Dragon Strain",
    cannabinoids: ["Live Resin 100%", "Terpenos Botánicos"],
    desc: "Perfil terpénico concentrado de resina viva. Sabor aromático natural con efecto relajante muscular de larga duración.",
    image: "img/destilado-5.jpg",
    badge: "Resina Viva 🌿"
  },
  {
    id: 6,
    name: "Disposable Tangie Live Resin 2G",
    category: "disposables",
    price: 150000,
    formattedPrice: "$150.000 COP",
    strains: "Sativa Energizante - Tangie Citrus",
    cannabinoids: ["Live Resin 2G", "Sativa Lúcida", "Recargable"],
    desc: "Vape desechable recargable de 2 gramos sabor cítrico dulce Tangie. Enfoque diurno activo y elevación lúcida.",
    image: "img/destilado-6.jpg",
    badge: "Sativa Citrus 🍊"
  },
  {
    id: 7,
    name: "Dazed Titan 2000mg (2ML) - Delta 8 / Delta 10 Live Resin",
    category: "disposables",
    price: 105000,
    formattedPrice: "$105.000 COP",
    strains: "Variedad: Oreoz / Apple Fritter",
    cannabinoids: ["2000mg THC", "Coil Cerámico", "Delta 8 / Delta 10"],
    desc: "Dispositivo recargable 2ML con resistencia de cerámica para vapor denso y sabor puro sin quemados.",
    image: "img/destilado-7.jpg",
    badge: "Coil Cerámico 💨"
  }
];


// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initAgeModal();
  initLogoLightbox();
  renderProducts('all');
  initFilterButtons();
  initMobileMenu();
  initSmoothScroll();
});

// Logo Lightbox Profile View Modal
function initLogoLightbox() {
  const logoImg = document.querySelector('.brand-logo-img');
  const modal = document.getElementById('logoLightboxModal');
  const closeBtn = document.getElementById('btnCloseLogoLightbox');

  if (!logoImg || !modal) return;

  logoImg.style.cursor = 'pointer';
  logoImg.title = 'Ver logo en grande';

  logoImg.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    modal.classList.remove('hidden');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });
}


// Age Verification Modal (+18)
function initAgeModal() {
  const modal = document.getElementById('ageModal');
  const btnYes = document.getElementById('btnAgeYes');
  const btnNo = document.getElementById('btnAgeNo');

  if (!modal) return;

  const isVerified = localStorage.getItem('gorillas_age_verified');
  if (isVerified === 'true') {
    modal.classList.add('hidden');
  }

  if (btnYes) {
    btnYes.addEventListener('click', () => {
      localStorage.setItem('gorillas_age_verified', 'true');
      modal.classList.add('hidden');
    });
  }

  if (btnNo) {
    btnNo.addEventListener('click', () => {
      alert('Lo sentimos, debes ser mayor de 18 años para ingresar a Gorillas Clouds.');
      window.location.href = 'https://www.google.com';
    });
  }
}

// Render Products Grid
function renderProducts(category = 'all') {
  const container = document.getElementById('productsGrid');
  if (!container) return;

  const filtered = category === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === category);

  if (filtered.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; text-align:center; padding: 2rem; color: var(--text-muted);">No hay productos en esta categoría por el momento.</p>`;
    return;
  }

  container.innerHTML = filtered.map(product => `
    <article class="product-card" data-category="${product.category}">
      <div class="product-img-wrapper">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <span class="product-tag-cat">${product.badge || product.category.toUpperCase()}</span>
      </div>
      <div class="product-body">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-strains">🌿 ${product.strains}</p>
        <p class="product-desc">${product.desc}</p>
        <div style="margin-bottom: 0.85rem; display: flex; gap: 0.35rem; flex-wrap: wrap;">
          ${product.cannabinoids.map(c => `<span style="background: rgba(16,185,129,0.1); color: var(--accent-emerald); font-size: 0.75rem; font-weight: 700; padding: 0.15rem 0.5rem; border-radius: 4px;">${c}</span>`).join('')}
        </div>
        <div class="product-price-row">
          <div>
            <span class="product-price">${product.formattedPrice}</span>
            ${product.kitPrice ? `<span style="display:block; font-size:0.75rem; color:var(--accent-gold-dark); font-weight:700;">${product.kitPrice}</span>` : ''}
          </div>
          <button onclick="orderProductViaWhatsApp('${product.name}', '${product.formattedPrice}')" class="btn-order-wa">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            Pedir
          </button>
        </div>

      </div>
    </article>
  `).join('');
}

// Filter Buttons
function initFilterButtons() {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');
      renderProducts(cat);
    });
  });
}

// Generate Pre-formatted WhatsApp Order Link
function orderProductViaWhatsApp(productName, productPrice) {
  const text = `Hola Gorillas Clouds 🦍! Me interesa comprar el producto: *${productName}* (${productPrice}). ¿Tienen disponibilidad y envíos discretos para entrega inmediata?`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  
  // Track conversion event if analytics script present
  if (window.trackConversionEvent) {
    window.trackConversionEvent('whatsapp_click', { product: productName, price: productPrice });
  }

  window.open(url, '_blank');
}

// General WhatsApp Inquiry
function openGeneralWhatsApp() {
  const text = `Hola Gorillas Clouds - Destila2 Mtr 🦍! Quisiera recibir información sobre el catálogo completo y promociones del día.`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

// Mobile Menu Drawer Navigation
function initMobileMenu() {
  const toggleBtn = document.getElementById('navToggleBtn');
  let overlay = document.getElementById('mobileNavOverlay');

  // Dynamically create mobile nav overlay if not present
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'mobileNavOverlay';
    overlay.className = 'mobile-nav-overlay';
    overlay.innerHTML = `
      <div class="mobile-nav-box">
        <button class="mobile-nav-close" id="mobileNavClose" aria-label="Cerrar">&times;</button>
        <img src="img/logo.jpg" alt="Gorillas Clouds" style="width: 50px; height: 50px; border-radius: 50%; margin: 0 auto 1rem; display: block; border: 2px solid var(--accent-mint);">
        <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 1.25rem; color: var(--text-dark); margin-bottom: 1.5rem;">Gorillas Clouds</h4>
        <ul class="mobile-nav-links">
          <li><a href="#beneficios" onclick="closeMobileNav()">Beneficios THC/THCV</a></li>
          <li><a href="#catalogo" onclick="closeMobileNav()">Productos & Precios</a></li>
          <li><a href="#comunidad" onclick="closeMobileNav()">Instagram Oficial</a></li>
        </ul>
        <button onclick="openGeneralWhatsApp(); closeMobileNav();" class="btn-hero-primary" style="width: 100%; min-height: 48px;">
          Contactar en WhatsApp
        </button>
      </div>
    `;
    document.body.appendChild(overlay);
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      overlay.classList.add('active');
    });
  }

  const closeBtn = document.getElementById('mobileNavClose');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMobileNav);
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeMobileNav();
    }
  });
}

function closeMobileNav() {
  const overlay = document.getElementById('mobileNavOverlay');
  if (overlay) {
    overlay.classList.remove('active');
  }
}


// Smooth Scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
