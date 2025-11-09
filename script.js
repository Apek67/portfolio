/* ===== Mobile menu ===== */
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn?.addEventListener('click', () => navLinks.classList.toggle('open'));

/* ===== Scroll spy (active nav) ===== */
const links = Array.from(document.querySelectorAll('.nav__link'));
const sections = links
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

const onScroll = () => {
    const y = window.scrollY + 120;
    let active = links[0];
    for (let i = 0; i < sections.length; i++) {
        const s = sections[i];
        if (s.offsetTop <= y) active = links[i];
    }
    links.forEach(l => l.classList.remove('active'));
    active?.classList.add('active');
};
document.addEventListener('scroll', onScroll);
onScroll();

/* ===== Year in footer ===== */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ===== Typing effect ===== */
const typingEl = document.querySelector('.typing');
const cursor = document.querySelector('.cursor');
if (typingEl && cursor) {
    const roles = JSON.parse(typingEl.dataset.roles || '[]');
    let roleIdx = 0,
        charIdx = 0,
        deleting = false;

    const type = () => {
        const current = roles[roleIdx] || '';
        if (!deleting) {
            typingEl.textContent = current.slice(0, ++charIdx);
            if (charIdx === current.length) {
                deleting = true;
                setTimeout(type, 1400);
                return;
            }
        } else {
            typingEl.textContent = current.slice(0, --charIdx);
            if (charIdx === 0) {
                deleting = false;
                roleIdx = (roleIdx + 1) % roles.length;
            }
        }
        const speed = deleting ? 45 : 85;
        setTimeout(type, speed);
    };
    type();

    // blinking cursor
    setInterval(() => cursor.classList.toggle('hide'), 450);
}

/* ===== Smooth internal links ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        const el = document.querySelector(id);
        if (el) {
            e.preventDefault();
            window.scrollTo({
                top: el.offsetTop - 70,
                behavior: 'smooth'
            });
            navLinks?.classList.remove('open');
        }
    });
});

/* ===== AOS Refresh on Resize ===== */
window.addEventListener('resize', () => {
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
});

/* ===== Scroll To Top Button (optional enhancement) ===== */
const scrollBtn = document.createElement('button');
scrollBtn.textContent = '↑';
scrollBtn.className = 'scroll-top';
scrollBtn.style.cssText = `
  position: fixed;
  bottom: 25px;
  right: 25px;
  background: var(--accent);
  color: white;
  border: none;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1000;
`;

document.body.appendChild(scrollBtn);

window.addEventListener('scroll', () => {
    scrollBtn.style.opacity = window.scrollY > 500 ? '1' : '0';
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
/* ===== Contact Form Modal ===== */
const formBtn = document.querySelector('.contact-question .btn');
const formModal = document.getElementById('formModal');
const closeForm = document.getElementById('closeForm');

if (formBtn && formModal && closeForm) {
    formBtn.addEventListener('click', e => {
        e.preventDefault();
        formModal.style.display = 'flex';
    });

    closeForm.addEventListener('click', () => {
        formModal.style.display = 'none';
    });

    formModal.addEventListener('click', e => {
        if (e.target.classList.contains('form-overlay')) {
            formModal.style.display = 'none';
        }
    });
}
