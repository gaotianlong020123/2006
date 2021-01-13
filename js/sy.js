const imgBox = document.querySelector('.imgBox')
const pointBox = document.querySelector('.pointBox')
const bannerBox = document.querySelector('.banner')
const rightBtn = document.querySelector('.right')
const leftBtn = document.querySelector('.left')
const lbtbj=document.querySelector('.lbtbj')
const banner_width = bannerBox.clientWidth
let index = 1
let timer = 0
let flag = true
function setPoint() {
  const pointNum = imgBox.children.length
  const frg = document.createDocumentFragment()
  for (let i = 0; i < pointNum; i++) {
    const li = document.createElement('li')
    if (i === 0) li.classList.add('active')
    li.dataset.page = i
    frg.appendChild(li)
  }
  pointBox.appendChild(frg)
  pointBox.style.width = pointNum * (20 + 10) + 'px'
}
function copyEle() {
  const first = imgBox.firstElementChild.cloneNode(true)
  const last = imgBox.lastElementChild.cloneNode(true)
  imgBox.appendChild(first)
  imgBox.insertBefore(last, imgBox.firstElementChild)
  imgBox.style.width = imgBox.children.length * 100 + '%'
  imgBox.style.left = -banner_width + 'px'
}
function autoPlay() {
  timer = setInterval(() => {
    index++
    move(imgBox, { left: -index * banner_width }, moveEnd)
  }, 7000)
}
function moveEnd() {
  if (index === imgBox.children.length - 1) {
    index = 1
    imgBox.style.left = -index * banner_width + 'px'
  }
  if (index === 0) {
    index = imgBox.children.length - 2
    imgBox.style.left = -index * banner_width + 'px'
  }
  for (let i = 0; i < pointBox.children.length; i++) {
    pointBox.children[i].classList.remove('active')
  }
  pointBox.children[index - 1].classList.add('active')
  flag = true
}
function overOut() {
  bannerBox.addEventListener('mouseover', () => clearInterval(timer))
  bannerBox.addEventListener('mouseout', () => autoPlay())
}
function leftRight() {
  rightBtn.addEventListener('click', () => {
    if (!flag) return
    flag = false
    index++
    move(imgBox, { left: -index * banner_width }, moveEnd)
  })
  leftBtn.addEventListener('click', () => {
    if (!flag) return
    flag = false
    index--
    move(imgBox, { left: -index * banner_width }, moveEnd)
  })
}
function pointEvent() {
  pointBox.addEventListener('click', e => {
    e = e || window.event
    const target = e.target || e.srcElement
    if (target.nodeName === 'LI') {
      if (!flag) return
      flag = false
      const page = target.dataset.page - 0
      index = page + 1
      move(imgBox, { left: -index * banner_width }, moveEnd)
    }
  })
}
function tabChange() {
  document.addEventListener('visibilitychange', () => {
    const state = document.visibilityState
    if (state === 'hidden') clearInterval(timer)
    if (state === 'visible') autoPlay()
  })
}
function init() {
  setPoint()
  copyEle()
  autoPlay()
  overOut()
  leftRight()
  pointEvent()
  tabChange()
}
init()
