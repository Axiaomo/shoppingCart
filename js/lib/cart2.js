Vue.filter("money", function (value, type) {
    return '￥' + value.toFixed(2) + type
});
var vm = new Vue({
    el: '#app',
    data: {
        ProductList: [],
        checkAllFlg: false,
        TotalPrice: 0,
        mdshow: false,
        curProduct: ''
    },
    mounted() {
        this.GetJson();
    },
    // filters:{
    //     money:(value)=> {
    //         return '￥' + value.toFixed(2)
    //     }
    // },
    methods: {
        GetJson() {
            axios
                .get("data/cartData.json", {
                params: {
                    ID: 101
                }
            })
                .then(res => {
                    this.ProductList = res.data.result.list
                })
        },
        // 更改数量
        changenum(item, way) {
            if (way < 0) {
                item.productQuantity--;
                if (item.productQuantity < 1) {
                    item.productQuantity = 1
                }
            } else {
                item.productQuantity++
            }
            this.CalcTotalPrice()
        },
        // 单选
        chechkPrice(item) {
            if (typeof item.checked == 'undefined') {
                Vue.set(item, 'checked', true)
            } else {
                item.checked = !item.checked
            }
            this.CalcTotalPrice()
        },
        // 全选
        checkAll() {
            this.checkAllFlg = !this.checkAllFlg
            this
                .ProductList
                .forEach((item, index) => {
                    if (typeof item.checked == 'undefined') {
                        Vue.set(item, 'checked', this.checkAllFlg)
                    } else {
                        item.checked = this.checkAllFlg
                    }
                });
            this.CalcTotalPrice()

        },
        // 总价格
        CalcTotalPrice() {
            this.TotalPrice = 0;
            this
                .ProductList
                .forEach((item, index) => {
                    if (item.checked) {
                        this.TotalPrice += item.productQuantity * item.productPrice
                    }
                })
        },
        // 删除
        del(item) {
            this.mdshow = true;
            this.curProduct = item;
        },
        // ok删除
        okdele() {
            var index = this
                .ProductList
                .indexOf(this.curProduct)
            this
                .ProductList
                .splice(index, 1);
            this.mdshow = false
        }
    }

});
