const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const progressBar = document.querySelector('.sunshine-progress span');
const revealItems = document.querySelectorAll('.reveal');
const modal = document.querySelector('.sunshine-modal');
const modalMessage = document.querySelector('.sunshine-message');
const sunshineButtons = document.querySelectorAll('.sunshine-now-btn, .another-sunshine');
const modalClose = document.querySelector('.modal-close');
const modalBackdrop = document.querySelector('.sunshine-modal-backdrop');
const placeholderLinks = document.querySelectorAll('[data-placeholder-link]');
const reminder = document.querySelector('.link-reminder');

document.getElementById('year').textContent = new Date().getFullYear();

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${progress}%`;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach(item => observer.observe(item));

const sunshineMessages = [
  "You are allowed to pause without feeling guilty. Rest can also be an act of faith.",
  "Your current chapter is not your final story. God is still writing.",
  "You do not need to have all the answers today. One faithful next step is enough.",
  "You can miss someone and still choose the boundary that protects your peace.",
  "Healing is not always dramatic. Sometimes it looks like choosing yourself quietly.",
  "You are not behind. You are becoming at the pace grace allows.",
  "God can meet you in the uncertainty, not only after everything makes sense.",
  "Take one slow breath. You are here. You are held. You are not alone.",
  "The fact that this matters to you does not mean you failed. It means you cared.",
  "You can be loving without giving everyone unlimited access to you."
];

function openSunshineModal() {
  const message = sunshineMessages[Math.floor(Math.random() * sunshineMessages.length)];
  modalMessage.textContent = message;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeSunshineModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

sunshineButtons.forEach(button => button.addEventListener('click', openSunshineModal));
modalClose?.addEventListener('click', closeSunshineModal);
modalBackdrop?.addEventListener('click', closeSunshineModal);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeSunshineModal();
});

placeholderLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    reminder.textContent = 'Replace this placeholder with your Messenger, Instagram, booking form, or email link before promoting the site.';
  });
});
