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
      <h1 class="headline">Happy <strong>23rd</strong>
      <br>Chloè-Kous!!!</br></h1>

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
  if (event.animationName === 'slide-in-left' || event.animationName === 'slide-in-left-sm') leftArrived = true
  if (event.animationName === 'slide-in-right' || event.animationName === 'slide-in-right-sm') rightArrived = true
  if (leftArrived && rightArrived) {
    startConfettiLoop()
    // Remove listeners after first start
    leftPenguin.removeEventListener('animationend', handlePenguinAnimationEnd)
    rightPenguin.removeEventListener('animationend', handlePenguinAnimationEnd)
  }
}

leftPenguin.addEventListener('animationend', handlePenguinAnimationEnd)
rightPenguin.addEventListener('animationend', handlePenguinAnimationEnd)

// Random text distribution utility (even spread with jitter)
let randomTextStrings = []
let randomTextResizeInitialized = false

function shuffleArray(array) {
  // for (let i = array.length - 1; i > 0; i -= 1) {
  //   const j = Math.floor(Math.random() * (i + 1))
  //   ;[array[i], array[j]] = [array[j], array[i]]
  // }
  return array
}

function renderRandomText() {
  document.querySelectorAll('.random-text').forEach((node) => node.remove())

  const container = document.body
  const count = randomTextStrings.length
  if (count === 0) return

  const isMobile = window.matchMedia('(max-width: 600px)').matches
  const marginX = isMobile ? 12 : 16
  const marginBottom = 24

  // Vertical region
  let yTop
  let usableHeight
  if (isMobile) {
    // Between top 30% and top 60% on mobile
    yTop = Math.floor(window.innerHeight * 0.30)
    const yBottom = Math.floor(window.innerHeight * 0.60)
    usableHeight = Math.max(0, yBottom - yTop)
  } else {
    // Desktop/tablet: keep current band derived from yTop
    yTop = Math.floor(window.innerHeight * 0.30)
    usableHeight = Math.max(0, window.innerHeight - yTop - marginBottom)
  }

  // Keep a clear center gap; use left and right bands only
  const centerGapRatio = isMobile ? 0.24 : 0.30
  const totalUsableWidth = Math.max(0, window.innerWidth - marginX * 2)
  const centerGap = Math.floor(totalUsableWidth * centerGapRatio)
  const bandWidth = Math.max(0, (totalUsableWidth - centerGap) / 2)
  const leftStartX = marginX
  const rightStartX = window.innerWidth - marginX - bandWidth

  const leftCount = Math.ceil(count / 2)
  const rightCount = count - leftCount

  function buildCentersForSide(startX, countForSide, side) {
    if (countForSide <= 0) return []
    const cols = countForSide > 3 ? 2 : 1
    const rows = Math.ceil(countForSide / cols)
    const cellW = bandWidth / cols
    const cellH = usableHeight / rows
    const centers = []
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        centers.push({
          x: startX + (c + 0.5) * cellW,
          y: yTop + (r + 0.5) * cellH,
          side,
        })
      }
    }
    return shuffleArray(centers).slice(0, countForSide)
  }

  const leftCenters = buildCentersForSide(leftStartX, leftCount, 'left')
  const rightCenters = buildCentersForSide(rightStartX, rightCount, 'right')
  const allCenters = shuffleArray(leftCenters.concat(rightCenters))

  randomTextStrings.forEach((text, index) => {
    const { x: centerX, y: centerY, side } = allCenters[index]
    // Jitter within each cell (reduced to avoid overlap)
    const jitterX = (Math.random() - 0.5) * (bandWidth / 2) * 0.15
    const jitterY = (Math.random() - 0.5) * (usableHeight / Math.max(1, Math.ceil(count / 2))) * 0.2
    let x = centerX + jitterX
    const y = centerY + jitterY

    // Keep angles consistent per side to minimize unpredictable width
    const angle = side === 'left' ? -10 : 10
    const scale = 0.9 + Math.random() * 0.3

    const el = document.createElement('div')
    el.className = 'random-text'
    el.textContent = text
    // Clamp within each side band to avoid crossing into the other side
    const safeXMargin = 20
    if (side === 'left') {
      const minX = leftStartX + safeXMargin
      const maxX = leftStartX + bandWidth - safeXMargin
      x = Math.min(Math.max(x, minX), maxX)
    } else {
      const minX = rightStartX + safeXMargin
      const maxX = rightStartX + bandWidth - safeXMargin
      x = Math.min(Math.max(x, minX), maxX)
    }

    el.style.left = `${x}px`
    el.style.top = `${y}px`
    el.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scale(${scale})`
    el.style.fontWeight = '700'
    el.style.fontSize = 'clamp(14px, 2.2vw, 22px)'
    el.style.color = 'rgba(255,255,255,0.85)'
    container.appendChild(el)
  })

  // Resolve overlaps by nudging items down within the vertical band
  function rectsOverlap(a, b) {
    return !(
      a.right <= b.left ||
      a.left >= b.right ||
      a.bottom <= b.top ||
      a.top >= b.bottom
    )
  }

  const nodes = Array.from(document.querySelectorAll('.random-text'))
  const regionTop = yTop
  const regionBottom = yTop + usableHeight
  for (let iter = 0; iter < 8; iter += 1) {
    let moved = false
    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const ri = nodes[i].getBoundingClientRect()
        const rj = nodes[j].getBoundingClientRect()
        if (rectsOverlap(ri, rj)) {
          const nodeToMove = ri.top <= rj.top ? nodes[i] : nodes[j]
          const currentTop = parseFloat(nodeToMove.style.top)
          const newTop = Math.min(currentTop + 12, regionBottom - 8)
          nodeToMove.style.top = `${newTop}px`
          moved = true
        }
      }
    }
    if (!moved) break
  }
}

function setupRandomText(strings) {
  randomTextStrings = [...strings]
  renderRandomText()
  if (!randomTextResizeInitialized) {
    randomTextResizeInitialized = true
    let resizeTimeout
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        renderRandomText()
      }, 150)
    })
  }
}

// Example usage. Replace this array with any texts you want distributed
setupRandomText([
  'vibes',
  'pierce that corporate veil 💅',
  'slay',
  'do you want a fizzer?',
  'eureka!',
  'turquand rule',
  'huzzah!',
  'queen',
])
