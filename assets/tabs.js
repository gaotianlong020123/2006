function Tabs(ele, type = 'click') {
  this.ele = document.querySelector(ele)
  this.btns = this.ele.querySelectorAll('ul > li')
  this.tabs = this.ele.querySelectorAll('ol > li')
  this.change(type)
}

Tabs.prototype.change = function (type) {
  this.btns.forEach((item, index) => {
    item['on' + type] = () => {
      this.btns.forEach((item, index) => {
        this.btns[index].classList.remove('active')
        this.tabs[index].classList.remove('active')
      })
      this.btns[index].classList.add('active')
      this.tabs[index].classList.add('active')
    }
  })
}
