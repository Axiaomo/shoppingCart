
var vm = new Vue({
    el: "#app",
    data: {
        productList: [],
        totalMoney: 0,
        checkAllflag: false,
        delflag: false,
        curProduct: ''
    },
    mounted() {
        this.get()
    },
    // 格式化金额
    filters: {
        formatMoney: function (value, type) {
            return '￥' + value.toFixed(2) + type
        }
    },
    methods: {
        // 获取数据
        get() {
            axios   
                .get("data/cartData.json", {
                params: {
                    id: '101'
                }
            })
                .then(res => {  
                    this.productList = res.data.result.list
                })
        },
        // 改变数量
        changeMoney(product, num){

            console.log(`this   :`,this)
            if (num > 0) {
                product.productQuantity++;
                if (product.productQuantity > 99) {
                    product.productQuantity = 99
                }
                this.calcTotalPrice();  
            } else {
                product.productQuantity--;
                if (product.productQuantity < 1) {
                    product.productQuantity = 1
                }
                this.calcTotalPrice();
            }
        },
        // 选中商品的方法
        selectedProduct(item){
            if (typeof item.checked == 'undefined') {
                // Vue.set(item, "checked", true);
                this.$set(item, "checked", true);
            } else {
                item.checked = !item.checked;
            }
            this.calcTotalPrice();
        },
        //   全选按钮
        checkAll(flag) {
            this.checkAllflag = flag;
            var _this = this;
            this
                .productList
                .forEach(function (item, index) {
                    if (typeof item.checked == 'undefined') {

                        _this.$set(item, "checked", _this.checkAllflag);
                    } else {
                        item.checked = _this.checkAllflag;
                    }
                })
            this.calcTotalPrice();
        },
        // 计算总金额
        calcTotalPrice() {
            var _this = this;
            this.totalMoney = 0;
            this
                .productList
                .forEach(function (item, index) {
                    if (item.checked) {
                        _this.totalMoney += item.productPrice * item.productQuantity
                    }
                })
        },
        // 删除显示对话框
        delConfirm(item) {
            console.log(JSON.stringify(item) + "@@@")
            this.delflag = true;
            this.curProduct = item;
        },
        // 删除yes
        delProduct() {
            console.log("delproduct:",this)
            var index = this.productList.indexOf(this.curProduct);
            this.productList.splice(index, 1);
            this.delflag = false;
        }

    }
})
