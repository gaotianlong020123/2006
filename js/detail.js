
$(function () {
  let goods_number = 1
  let count = 1
  let goods_info = null
  const id = window.sessionStorage.getItem('goods_id')
  if (!id) {
    alert('您查看的商品不存在, 点击确定回到列表页')
    window.location.href = './list.html'
    return
  }
  getGoodsInfo()
  async function getGoodsInfo() {
    const res = await $.get('./server/goodsInfo.php', { id }, null, 'json')

    bindHtml(res.info)
  }
  function bindHtml(info) {
    goods_number = info.goods_number
    goods_info = info

    let s1 = `
      <div class="enlargeBox">
        <div class="show">
          <img src="${ info.goods_big_logo }" alt="">
        </div>
        <div class="list">
          <p class="active">
            <img src="${ info.goods_small_logo }" alt="">
          </p>
        </div>
      </div>
      <div class="goodsInfo">
        <p class="desc">${ info.goods_name }</p>
        <div class="btn-group size">
          <button type="button" class="btn btn-default">S</button>
          <button type="button" class="btn btn-default">M</button>
          <button type="button" class="btn btn-default">L</button>
          <button type="button" class="btn btn-default">XL</button>
        </div>
        <p class="price">
          ￥ <span class="text-danger">${ info.goods_price }</span>
        </p>
        <div class="num">
          <button class="sub">-</button>
          <input class="number" type="text" value="1">
          <button class="add">+</button>
        </div>
        <div>
          <button class="add_cart btn btn-success">加入购物车</button>
          <button class="btn btn-warning">继续去购物</button>
        </div>
      </div>
    `
    $('.goodsDetail').html(s1)
    $('.goodsDesc').html(info.goods_introduce)
  }
  $('.goodsDetail').on('click', '.add', () => {
    count++
    if (count > goods_number) return count = goods_number
    $('.goodsDetail .number').val(count)
  })
  $('.goodsDetail').on('click', '.sub', () => {
    count--
    if (count < 1) return count = 1
    $('.goodsDetail .number').val(count)
  })
  $('.goodsDetail').on('click', '.add_cart', function () {
    const list = JSON.parse(window.localStorage.getItem('list')) || []
    const res = list.filter(item => item.goods_id === goods_info.goods_id)
    if (res.length) {
      res[0].cart_number += count
    } else {
      goods_info.cart_number = count
      list.push(goods_info)
    }
    window.localStorage.setItem('list', JSON.stringify(list))
  })
  $('.goodsDetail').on('click', '.btn-warning', function () {
    window.location.href = './sy.html'
  })
})
