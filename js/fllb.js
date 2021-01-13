$(function () {
  const list_info = {
    cat_one: 'all',
    cat_two: 'all',
    cat_three: 'all',
    sort: 'id',
    sortType: 'ASC',
    current: 1,
    pagesize: 12
  }
  getCatOne()
  async function getCatOne() {
    const { list } = await $.get('./server/catOne.php', null, null, 'json')
    let str = '<span class="active">全部</span>'
    list.forEach(item => {
      str += `<span>${item.cat_one_id}</span>`
    })
    $('.cat_one .right').html(str)
  }
  $('.cat_one .right').on('click', 'span', function () {
    $(this).addClass('active').siblings().removeClass('active')
    const cat_one = $(this).text()
    list_info.cat_one = cat_one
    list_info.cat_two = 'all'
    list_info.cat_three = 'all'
    $('.cat_three .right').html('<span class="active">全部</span>')
    if (cat_one === '全部') {
      $('.cat_two .right').html('<span class="active">全部</span>')
      list_info.cat_one = 'all'
    } else {
      getCatTwo()
    }

    console.group('根据下列信息请求商品列表')
    console.log(list_info)
    console.groupEnd()
    getCount()
  })
  async function getCatTwo() {
    const { list } = await $.get('./server/catTwo.php', { cat_one: list_info.cat_one }, null, 'json')
    let str = '<span class="active">全部</span>'
    list.forEach(item => {
      str += `<span>${item.cat_two_id}</span>`
    })
    $('.cat_two .right').html(str)
  }
  $('.cat_two .right').on('click', 'span', function () {
    $(this).addClass('active').siblings().removeClass('active')
    const cat_two = $(this).text()
    list_info.cat_two = cat_two
    list_info.cat_three = 'all'
    if (cat_two === '全部') {
      list_info.cat_two = 'all'
      $('.cat_three .right').html('<span class="active">全部</span>')
    } else {
      getCatThree()
    }


    console.group('根据下列信息请求商品列表')
    console.log(list_info)
    console.groupEnd()
    getCount()
  })
  async function getCatThree() {
    const { list } = await $.get('./server/catThree.php', { cat_one: list_info.cat_one, cat_two: list_info.cat_two }, null, 'json')

    let str = '<span class="active">全部</span>'
    list.forEach(item => {
      str += `<span>${item.cat_three_id}</span>`
    })
    $('.cat_three .right').html(str)
  }

  $('.cat_three .right').on('click', 'span', function () {
    $(this).addClass('active').siblings().removeClass('active')
    const cat_three = $(this).text()

    list_info.cat_three = cat_three

    if (cat_three === '全部') {
      list_info.cat_three = 'all'
    }

    console.group('根据下列信息请求商品列表')
    console.log(list_info)
    console.groupEnd()

    getCount()
  })

  getCount()
  async function getCount() {
    const { count } = await $.get('./server/getCount.php', { cat_one: list_info.cat_one, cat_two: list_info.cat_two, cat_three: list_info.cat_three }, null, 'json')
    new Pagination('.pagination', {
      total: count,
      pagesize: 12,
      sizeList: [12, 16, 20, 24],

      change(current, pagesize) {
        list_info.current = current
        list_info.pagesize = pagesize

        getGoodsList()
      }
    })
  }
  async function getGoodsList() {
    const { list } = await $.get('./server/goodsList.php', list_info, null, 'json')
    let str = ''
    list.forEach(item => {
      str += `
          <li class="thumbnail">
            <img class="tzxqy"src="${item.goods_big_logo}" alt="..."data-id="${item.goods_id}">
            <div class="caption">
              <h3>${item.goods_name}</h3>
              <p class="price">￥ <span class="text-danger">${item.goods_price}</span></p>
              <p>
              <a href="javascript:;" class="btn btn-danger add_crt" role="button">加入购物车</a>
                <a href="./cart.html" class="btn btn-warning" role="button">去结算</a>
              </p>
            </div>
          </li>
        `
    })

    $('.goodsList ul').html(str)
  }

  $('.sort_list .right').on('click', 'span', function () {
    if (list_info.sort === this.dataset.sort) {
      list_info.sortType = list_info.sortType === 'ASC' ? 'DESC' : 'ASC'
    } else {
      list_info.sortType = 'ASC'
    }

    console.log('切换排序方式')
    list_info.sort = this.dataset.sort
    list_info.current = 1

    $(this).addClass('active').siblings().removeClass('active')
    getGoodsList()
  })
  $('.goodsList ul').on('click', '.tzxqy', function () {
    window.sessionStorage.setItem('goods_id', this.dataset.id)
    window.location.href = './detail.html'
  })
  $('.goodsList ul').on('click','.add_crt',function(){
    alert('没做出来>_<')
  })
    
  


})