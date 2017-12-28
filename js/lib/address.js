new Vue({
  el: '.container',
  data: {
    dressList: [],
    checkFlg: 0,
    limitNum: 3,
    shippingMethod:1
  },
  mounted() {
    this.$nextTick(function () {
      this.getJson()
    })
  },
  computed: {
    filterAdress() {
      return this.dressList.slice(0, this.limitNum)
    }
  },
  methods: {
    getJson() {
      axios
        .get('data/address.json')
        .then(res => {
          this.dressList = res.data.result
        })
    },
    shipping(num){
      this.shippingMethod=num
    },
    more() {
      this.limitNum = this.dressList.length
    },
    // 设为默认
    setDefault(addressId) {
      this.dressList.forEach((adress, index) => {
        if (adress.addressId == addressId) {
            adress.isDefault=true
        }else{
            adress.isDefault=false
        }
      });
    }
  },

})
