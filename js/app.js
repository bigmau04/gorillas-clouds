/**
 * Gorillas Clouds - Destila2 Mtr
 * Main Application Logic & Product Catalog Manager
 */

const WHATSAPP_NUMBER = "573236587684";
const INSTAGRAM_URL = "https://www.instagram.com/destimtr.oficial/";

// Product Catalog Data
const PRODUCTS = [
  {
    id: 1,
    name: "Gorilla Vapor Disposable 2G - THC-X + Live Resin",
    category: "disposables",
    price: 180000,
    formattedPrice: "$180.000 COP",
    strains: "Sativa / Híbrida - Gelato Mint",
    cannabinoids: ["THC-X", "Live Resin", "Terpenos Botánicos"],
    desc: "Vape desechable recargable de 2 gramos. Extracción en frío de resina viva con destilado de alta densidad y sabor terpénico natural.",
    image: "img/destilado-1.jpg",
    badge: "Más Vendido 🔥"
  },
  {
    id: 2,
    name: "Live Resin Pod 1G - THCV Pure Energy",
    category: "live-resin",
    price: 140000,
    formattedPrice: "$140.000 COP",
    strains: "Sativa Lúcida - Super Lemon Haze",
    cannabinoids: ["THCV", "CBD", "Terpenos Vivos"],
    desc: "Formulado para un enfoque mental claro y energía limpia sin ansiedad ni letargo. Ideal para consumo diurno activo.",
    image: "img/destilado-2.jpg",
    badge: "Efecto Lúcido ✨"
  },
  {
    id: 3,
    name: "Cartucho 510 Thread 1G - THC Ultra Clear",
    category: "cartuchos",
    price: 120000,
    formattedPrice: "$120.000 COP",
    strains: "Indica Profunda - Zkittlez Cloud",
    cannabinoids: ["THC 95%", "Terpenos Orgánicos"],
    desc: "Cartucho universal 510 con destilado triple filtrado de alta pureza. Relajación física intensa y vapor denso de aroma dulce.",
    image: "img/destilado-3.jpg",
    badge: "Alta Potencia 💎"
  },
  {
    id: 4,
    name: "Destilado Concentrado Jar 3G - Pure Diamonds & Sauce",
    category: "concentrados",
    price: 220000,
    formattedPrice: "$220.000 COP",
    strains: "Híbrida Premium - Gorilla Glue #4",
    cannabinoids: ["THC-X", "CBN", "Live Terps"],
    desc: "Salsa de resina viva con cristales concentrados para dabs o recarga. Máximo perfil aromático y potencia de espectro completo.",
    image: "img/destilado-4.jpg",
    badge: "Edición Limitada 👑"
  },
  {
    id: 5,
    name: "Gorilla Gummies Infused 500mg - THC + CBN Night",
    category: "edibles",
    price: 95000,
    formattedPrice: "$95.000 COP",
    strains: "Fruit Punch / Mango Wild",
    cannabinoids: ["THC", "CBN", "CBG"],
    desc: "Gomas artesanales de lenta absorción para un descanso reparador y alivio muscular nocturno. 10 unidades de 50mg.",
    image: "img/destilado-5.jpg",
    badge: "Descanso Profundo 🌙"
  },
  {
    id: 6,
    name: "Disposable Heavy Hitter 3G - THC-X Dual Strain",
    category: "disposables",
    price: 240000,
    formattedPrice: "$240.000 COP",
    strains: "Doble Boquilla: Indica + Sativa",
    cannabinoids: ["THC-X", "THCV", "Live Resin"],
    desc: "Sistema dual de vapeo. Cambia entre efecto energizante diurno y relajante nocturno en un solo dispositivo premium.",
    image: "img/destilado-6.jpg",
    badge: "Innovación 🚀"
  },
  {
    id: 7,
    name: "Pack Destila2 Mtr Starter Kit - Vape 2G + Cart 1G",
    category: "disposables",
    price: 270000,
    formattedPrice: "$270.000 COP",
    strains: "Surtido Seleccionado",
    cannabinoids: ["THC", "Live Resin", "THC-X"],
    desc: "Combo especial de iniciación con envío discreto gratuito a nivel nacional. Incluye accesorios y lanyard exclusivo Gorillas Clouds.",
    image: "img/destilado-7.jpg",
    badge: "Oferta Combo 🎁"
  }
];

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initAgeModal();
  renderProducts('all');
  initFilterButtons();
  initMobileMenu();
  initSmoothScroll();
});

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
          <span class="product-price">${product.formattedPrice}</span>
          <button onclick="orderProductViaWhatsApp('${product.name}', '${product.formattedPrice}')" class="btn-order-wa">
            <i class="fab fa-whatsapp">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </i>
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

// Mobile Menu Navigation
function initMobileMenu() {
  const toggleBtn = document.getElementById('navToggleBtn');
  const menu = document.getElementById('navMenu');
  if (toggleBtn && menu) {
    toggleBtn.addEventListener('click', () => {
      menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
      menu.style.flexDirection = 'column';
      menu.style.position = 'absolute';
      menu.style.top = '100%';
      menu.style.left = '0';
      menu.style.width = '100%';
      menu.style.background = 'rgba(255, 255, 255, 0.95)';
      menu.style.padding = '1.5rem';
      menu.style.borderRadius = '16px';
      menu.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    });
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
