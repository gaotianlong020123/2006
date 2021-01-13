
$(function () {
  let cart_list = null
  const nickname = getCookie('nickname')
  if (!nickname) {
    window.sessionStorage.setItem('url', 'cart')
    window.location.href = './login.html'
    return
  }
  bindCart()
  function bindCart() {
    cart_list = JSON.parse(window.localStorage.getItem('list')) || []
    if (cart_list.length) {
      $('.on').removeClass('hide')
      $('.off').addClass('hide')
      bindHtml()
    } else {
      $('.on').addClass('hide')
      $('.off').removeClass('hide')
    }
  }
  function bindHtml() {
    const selectAll = cart_list.every(item => item.is_select === 1)
    let total = 0
    let totalPrice = 0
    cart_list.forEach(item => {
      if (item.is_select === 1) {
        total += item.cart_number
        totalPrice += item.cart_number * item.goods_price
      }
    })

    let str = `
      <div class="panel-heading">
        <p class="selectAll">
          <span>全选:</span>
          <input class="all" type="checkbox" ${ selectAll ? 'checked' : '' }>
          <span class="text">购 物 清 单</span>
        </p>
      </div>
      <div class="panel-body">
        <ul class="goodsList">
    `

    cart_list.forEach(item => {
      const xiaoji = item.goods_price * item.cart_number

      str += `
        <li>
          <div class="select">
            <input data-id="${ item.goods_id }" class="select_item" type="checkbox" ${ item.is_select === 1 ? 'checked' : '' }>
          </div>
          <div class="goodsImg">
            <img src="${ item.goods_small_logo }" alt="">
          </div>
          <div class="goodsDesc">
            <p>${ item.goods_name }</p>
          </div>
          <div class="price">
            ￥ <span class="text-danger">${ item.goods_price }</span>
          </div>
          <div class="count">
            <button class="sub" data-id="${ item.goods_id }">-</button>
            <input type="text" value="${ item.cart_number }">
            <button class="add" data-id="${ item.goods_id }">+</button>
          </div>
          <div class="xiaoji">
            ￥ <span class="text-danger">${ xiaoji.toFixed(2) }</span>
          </div>
          <div class="operate">
            <button data-id="${ item.goods_id }" class="delete_item btn btn-danger">删除</button>
          </div>
        </li>
      `
    })

    str += `
        </ul>
      </div>
      <div class="panel-footer">
        <div class="row buyInfo">
          <p class="col-sm-3 buyNum">
            购买总数量: <span class="text-danger cartNum">${ total }</span> 件商品
          </p>
          <p class="col-sm-3 buyMoney">
            购买总价格: <span class="text-danger total">${ totalPrice.toFixed(2) }</span> 元
          </p>
          <p class="col-sm-4 operate">
            <button class="btn btn-success" ${ totalPrice === 0 ? 'disabled' : '' }>立即付款</button>
            <button class="btn btn-danger clear">清空购物车</button>
            <button class="btn btn-primary">继续购物</button>
          </p>
        </div>
      </div>
    `
    $('.content .panel').html(str)
  }
  $('.content .panel').on('click', '.select_item', function () {
    const id = this.dataset.id - 0
    const type = this.checked
    const res = cart_list.filter(item => item.goods_id == id)[0]
    res.is_select = type - 0
    window.localStorage.setItem('list', JSON.stringify(cart_list))
    bindCart()
  })
  $('.content .panel').on('click', '.add', function () {
    const id = this.dataset.id - 0
    const res = cart_list.filter(item => item.goods_id == id)[0]
    res.cart_number >= res.goods_number ? '' : res.cart_number++
    window.localStorage.setItem('list', JSON.stringify(cart_list))
    bindCart()
  })
  $('.content .panel').on('click', '.sub', function () {
    const id = this.dataset.id - 0
    const res = cart_list.filter(item => item.goods_id == id)[0]
    res.cart_number <= 1 ? '' : res.cart_number--
    window.localStorage.setItem('list', JSON.stringify(cart_list))
    bindCart()
  })
  $('.content .panel').on('click', '.delete_item', function () {
    const id = this.dataset.id - 0
    for (let i = 0; i < cart_list.length; i++) {
      if (cart_list[i].goods_id == id) {
        cart_list.splice(i, 1)
        break
      }
    }
    window.localStorage.setItem('list', JSON.stringify(cart_list))
    bindCart()
  })
  $('.content .panel').on('click', '.all', function () {
    cart_list.forEach(item => {
      item.is_select = this.checked - 0
    })
    window.localStorage.setItem('list', JSON.stringify(cart_list))
    bindCart()
  })
  $('.content .panel').on('click', '.clear', function () {
    cart_list = []
    window.localStorage.setItem('list', JSON.stringify(cart_list))
    bindCart()
  })
  $('.content .panel').on('click', '.btn-primary', function () {
         window.location.href = './sy.html'
         
  })
  
})
