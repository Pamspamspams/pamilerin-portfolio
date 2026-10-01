/* ============================================================
   AJAX PHOTO GALLERY - Auto-Changing Grid
   ============================================================ */

const galleryImages = [
    { src: 'assets/images/career1.jpg', caption: '🏗️ Construction Site Supervision' },
    { src: 'assets/images/career2.jpg', caption: '📡 Telecom Site Deployment' },
    { src: 'assets/images/career3.jpg', caption: '🔍 Site Inspection' },
    { src: 'assets/images/academic1.jpg', caption: '🎓 University of Lagos' },
    { src: 'assets/images/academic2.jpg', caption: '🏛️ FUTA Campus' },
    { src: 'assets/images/academic3.jpg', caption: '🔬 Research Laboratory' },
    { src: 'assets/images/networking1.jpg', caption: '🌐 Cisco Networking' },
    { src: 'assets/images/networking2.jpg', caption: '📡 IP Addressing & Routing' },
    { src: 'assets/images/networking3.jpg', caption: '🔧 Packet Tracer' },
    { src: 'assets/images/cyber1.jpg', caption: '🛡️ Cybersecurity Essentials' },
    { src: 'assets/images/cyber2.jpg', caption: '⚠️ Risk Management' },
    { src: 'assets/images/cyber3.jpg', caption: '🔒 Network Security' }
];

let galleryGridIndex = 0;
const galleryItemsCount = 8;

function renderGallery() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;

    let html = '';
    for (let i = 0; i < galleryItemsCount; i++) {
        const img = galleryImages[(galleryGridIndex + i) % galleryImages.length];
        html += `
            <div class="gallery-item">
                <img src="${img.src}" alt="${img.caption}" 
                     loading="lazy"
                     onload="this.classList.add('loaded')"
                     onerror="this.src='https://via.placeholder.com/400x400/b8860b/ffffff?text=Pamilerin+Sanni'">
                <div class="gallery-caption">${img.caption}</div>
            </div>
        `;
    }
    grid.innerHTML = html;
}

function rotateGallery() {
    galleryGridIndex = (galleryGridIndex + 1) % galleryImages.length;
    const grid = document.getElementById('galleryGrid');
    if (grid) {
        grid.style.opacity = '0.5';
        grid.style.transition = 'opacity 0.4s';
        setTimeout(() => {
            renderGallery();
            grid.style.opacity = '1';
        }, 400);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderGallery();
    setInterval(rotateGallery, 5000);
});