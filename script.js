
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
const progress = document.querySelector(".scroll-progress span");
const reveals = document.querySelectorAll(".reveal");
const year = document.getElementById("year");

if (year) year.textContent = new Date().getFullYear();

// Mobile navigation
menuToggle?.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuToggle.setAttribute(
    "aria-expanded",
    nav.classList.contains("open") ? "true" : "false"
  );
});

document.querySelectorAll(".nav-links a").forEach(link=>{
  link.addEventListener("click", ()=>{
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded","false");
  });
});

// Scroll progress
window.addEventListener("scroll", ()=>{
  const h=document.documentElement;
  const total=h.scrollHeight-window.innerHeight;
  const pct= total>0 ? (window.scrollY/total)*100 : 0;
  if(progress) progress.style.width=`${pct}%`;
});

// Reveal animation
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add("visible");
      io.unobserve(e.target);
    }
  });
},{threshold:.12});

reveals.forEach(el=>io.observe(el));

// Journey cards
const responses = {
 exhausted:{
  title:"Rest is not weakness.",
  copy:"You don't have to solve everything today. Give yourself permission to pause, breathe, and receive grace before taking your next step."
 },
 heartbreak:{
  title:"Healing is not the same as forgetting.",
  copy:"You can miss someone and still choose the boundary that protects your peace."
 },
 clarity:{
  title:"One faithful step is enough.",
  copy:"You don't need the whole map today. Trust God with the next right step."
 },
 faith:{
  title:"Stay close to Jesus.",
  copy:"Growth often looks quiet. Keep showing up, keep praying, and keep walking."
 },
 conversation:{
  title:"You don't have to process life alone.",
  copy:"Sometimes one honest conversation changes everything. Reaching out is a courageous step."
 }
};

const responseBox=document.querySelector(".journey-response");
const responseTitle=document.querySelector(".journey-response-title");
const responseCopy=document.querySelector(".journey-response-copy");

document.querySelectorAll(".journey-card[data-journey]").forEach(card=>{
  card.addEventListener("click",()=>{
    document.querySelectorAll(".journey-card").forEach(c=>c.classList.remove("active"));
    card.classList.add("active");
    const data=responses[card.dataset.journey];
    if(data){
      responseTitle.textContent=data.title;
      responseCopy.textContent=data.copy;
      responseBox.classList.add("visible");
      responseBox.scrollIntoView({behavior:"smooth",block:"nearest"});
    }
  });
});

// Sunshine modal
const modal=document.querySelector(".sunshine-modal");
const msg=document.querySelector(".sunshine-message");

const sunshine=[
"God is not asking you to carry tomorrow. Trust Him with today.",
"Your current chapter is not your final story.",
"You are deeply loved, even on the days you don't feel strong.",
"Grace meets you before perfection ever will.",
"Take one slow breath. Hope is still here.",
"Small faithful steps are still progress.",
"Healing often begins with one honest conversation.",
"You don't have to figure everything out alone.",
"God is still working, even when you cannot see it.",
"Receive your sunshine today. ☀️"
];

function randomSunshine(){
  msg.textContent=sunshine[Math.floor(Math.random()*sunshine.length)];
}
function openModal(){
  randomSunshine();
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";
}
function closeModal(){
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
  document.body.style.overflow="";
}

document.querySelectorAll("[data-open-sunshine]").forEach(b=>{
  b.addEventListener("click",openModal);
});
document.querySelectorAll("[data-close-sunshine]").forEach(b=>{
  b.addEventListener("click",closeModal);
});
document.querySelector("[data-another-sunshine]")?.addEventListener("click",randomSunshine);

document.addEventListener("keydown",e=>{
  if(e.key==="Escape") closeModal();
});

// Placeholder links
const reminder=document.querySelector(".contact-reminder");
document.querySelectorAll("[data-placeholder-link]").forEach(link=>{
  link.addEventListener("click",e=>{
    e.preventDefault();
    if(reminder){
      reminder.textContent="Replace this placeholder with your Messenger, booking form, Instagram, or email before launching.";
    }
  });
});
