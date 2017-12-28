var vm = new Vue({
  el: "#app",
  data: {
    productList: [],
    checkAllFlg: false,
    totalMoney: 0,
    togglle: false,
    curProduct: ''
  },
  mounted() {
    this.getjson();

  },
  //   money局部过滤器
  filters: {
    money(value) {
      return '￥' + value.toFixed(2)
    }
  },
  methods: {
    //   初始化
    getjson() {
      axios
        .get("data/cartData.json", {
        params: {
          Id: 101
        }
      })
        .then(res => {
          this.productList = res.data.result.list
        })
    },
    // 计算数量
    changemoney(item, way) {
      console.log(item);
      if (way > 0) {
        item.productQuantity++;
      } else {
        item.productQuantity--;
        if (item.productQuantity < 1) {
          item.productQuantity = 1
        }
      }
      this.calcTotalPrice()
    },
    // 单选
    selectProduct(item) {
      if (typeof item.checked == 'undefined') {
        Vue.set(item, 'checked', true)
      } else {
        item.checked = !item.checked
      };
      this.calcTotalPrice()
    },
    // selectProduct(item) {   // 判断item中的checked是否存在，用typeof   if (typeof
    // item.checked == 'undefined') {     // 不存在在item中全局注册checked $set
    // 如果data中没有定义a变量，我们恰巧需要a变量，可以用$set中注册一个     Vue.set(item, "checked", true) //
    // 不存在在item中局部注册checked     // this.$set(item, "checked", true)   } else {
    // item.checked = !item.checked   } }, 全选 checkAll() {   this.checkAllFlg =
    // !this.checkAllFlg   this.productList.forEach((item, index) => {
    // console.log(JSON.stringify(item) + "##########")     console.log(index +
    // "*********")     if (typeof item.checked == 'undefined') { this.$set(item,
    // "checked", this.checkAllFlg)     } else {       item.checked =
    // this.checkAllFlg     }   }); }
    checkAll() {
      this.checkAllFlg = !this.checkAllFlg;
      this
        .productList
        .forEach((item, index) => {
          if (typeof item.checked == 'undefined') {
            Vue.set(item, 'checked', this.checkAllFlg)
          } else {
            item.checked = this.checkAllFlg
          }
        });
      this.calcTotalPrice()
    },
    // 计算总金额
    calcTotalPrice() {
      this.totalMoney = 0;
      this.productList.forEach((item, index) => {
          if (item.checked) {
            this.totalMoney += item.productQuantity * item.productPrice
          }
        })
    },
    // 删除按钮
    del(item) {
      this.togglle = true;
      console.log(JSON.stringify(item) + "!!!!!!!!!!!!!")
      this.curProduct = item
    },
    // 删除列表
    dellist() {
      var index = this
        .productList
        .indexOf(this.curProduct);
      this
        .productList
        .splice(index, 1)
      this.togglle = false;
    }
  }
})
// 全局过滤器
Vue.filter('moneya', function (value, type) {
  return '$' + value + type
})
