import './style.css'

const appRoot = document.querySelector('#app')

appRoot.innerHTML = `
  <div class="birthday-page" role="presentation">
    <div class="marquee" aria-hidden="true">
      <div class="marquee-inner">
        <div class="marquee-group">
          <span class="marquee-text">HAPPY BIRTHDAY</span>
          <span class="marquee-text">HAPPY BIRTHDAY</span>
          <span class="marquee-text">HAPPY BIRTHDAY</span>
        </div>
        <div class="marquee-group" aria-hidden="true">
          <span class="marquee-text">HAPPY BIRTHDAY</span>
          <span class="marquee-text">HAPPY BIRTHDAY</span>
          <span class="marquee-text">HAPPY BIRTHDAY</span>
        </div>
      </div>
    </div>

    <main class="stage" aria-label="Birthday stage with penguins">
      <div class="penguin left" aria-label="Left penguin" role="img"><img src="/penguin.png"/></div>
      <div class="penguin right" aria-label="Right penguin" role="img"><img src="/penguin.png"/></div>
      <h1 class="headline">Happy 23rd
      <br>My Chloè-Kous!!!</br></h1>
    </main>
  </div>
`

// Confetti overlay canvas
const confettiCanvas = document.createElement('canvas')
confettiCanvas.className = 'confetti-canvas'
document.body.appendChild(confettiCanvas)
const confettiContext = confettiCanvas.getContext('2d')

function resizeConfettiCanvas() {
  const ratio = Math.max(window.devicePixelRatio || 1, 1)
  confettiCanvas.width = Math.floor(window.innerWidth * ratio)
  confettiCanvas.height = Math.floor(window.innerHeight * ratio)
  confettiCanvas.style.width = `${window.innerWidth}px`
  confettiCanvas.style.height = `${window.innerHeight}px`
  confettiContext.setTransform(ratio, 0, 0, ratio, 0, 0)
}

window.addEventListener('resize', resizeConfettiCanvas)
resizeConfettiCanvas()

// Simple confetti engine
const confettiParticles = []
const confettiColors = ['#ff6b6b', '#ffd93d', '#6bcBef', '#b28dff', '#51cf66', '#ffa8a8']
let confettiAnimationId = null
let confettiIntervalId = null
let confettiStarted = false

function spawnConfettiBurst(centerX, centerY, particleCount = 48) {
  for (let i = 0; i < particleCount; i += 1) {
    const angle = Math.random() * Math.PI * 2
    const speed = 3 + Math.random() * 5
    confettiParticles.push({
      x: centerX + (Math.random() - 0.5) * 16,
      y: centerY + (Math.random() - 0.5) * 16,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
      size: 4 + Math.random() * 6,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      rotation: Math.random() * Math.PI,
      rotationSpeed: (Math.random() - 0.5) * 0.2,
      life: 120 + Math.floor(Math.random() * 60),
    })
  }
}

function stepConfetti() {
  confettiContext.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height)
  const gravity = 0.15
  const airResistance = 0.995

  for (let i = confettiParticles.length - 1; i >= 0; i -= 1) {
    const p = confettiParticles[i]
    p.vx *= airResistance
    p.vy = p.vy * airResistance + gravity
    p.x += p.vx
    p.y += p.vy
    p.rotation += p.rotationSpeed
    p.life -= 1

    // Remove if off-screen or life ended
    if (p.life <= 0 || p.y - p.size > window.innerHeight + 50) {
      confettiParticles.splice(i, 1)
      continue
    }

    confettiContext.save()
    confettiContext.translate(p.x, p.y)
    confettiContext.rotate(p.rotation)
    confettiContext.fillStyle = p.color
    confettiContext.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7)
    confettiContext.restore()
  }

  confettiAnimationId = requestAnimationFrame(stepConfetti)
}

function startConfettiLoop() {
  if (confettiStarted) return
  confettiStarted = true
  const centerX = window.innerWidth / 2
  const centerY = window.innerHeight * 0.6

  // Initial burst
  spawnConfettiBurst(centerX, centerY, 60)
  // Repeating bursts
  confettiIntervalId = setInterval(() => {
    spawnConfettiBurst(centerX + (Math.random() - 0.5) * 120, centerY + (Math.random() - 0.5) * 40, 48)
  }, 900)

  if (confettiAnimationId == null) {
    confettiAnimationId = requestAnimationFrame(stepConfetti)
  }
}

// Start confetti once BOTH penguins have finished sliding in
const leftPenguin = document.querySelector('.penguin.left')
const rightPenguin = document.querySelector('.penguin.right')
let leftArrived = false
let rightArrived = false

function handlePenguinAnimationEnd(event) {
  if (event.animationName === 'slide-in-left') leftArrived = true
  if (event.animationName === 'slide-in-right') rightArrived = true
  if (leftArrived && rightArrived) {
    startConfettiLoop()
    // Remove listeners after first start
    leftPenguin.removeEventListener('animationend', handlePenguinAnimationEnd)
    rightPenguin.removeEventListener('animationend', handlePenguinAnimationEnd)
  }
}

leftPenguin.addEventListener('animationend', handlePenguinAnimationEnd)
rightPenguin.addEventListener('animationend', handlePenguinAnimationEnd)
