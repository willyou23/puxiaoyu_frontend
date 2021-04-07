<template>
  <div class="body">
    <div class="block">
      <el-carousel height="450px">
        <el-carousel-item v-for="item in url" :key="item">
          <el-image style="width: 650px; height: 350px;display: inline-flex; margin-left: 60px"
                    :src="require('@/assets/'+item)"
                    fit="contain"
          ></el-image><!--:fit="contain"-->
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="center_con">

      <div class="goods_detail_list fr">
        <h3>{{ this.$route.query.title }}
          <span class="desc"> 类别:{{ cag }}</span>
          <span class="kucun">库存：{{ inventory }}</span>
        </h3>

        <p>{{ desc }}</p>
        <div class="prize_bar">
          ￥<em>{{ price }}</em>
          <!--            <span class="oldprice"><em>28.8</em></span>-->
        </div>
        <div class="operate_btn">
          <a href="" class="buy_btn">立即购买</a>
          <a href="" class="add_cart">收藏</a>
        </div>
      </div>

    </div>
  </div>
</template>


<script>
import qs from "qs";

export default {
  name: "lianxikefu",
  data: function () {
    return {
      url: [
        // 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        // 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        // 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        // 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        // 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
        // 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
        // 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
        // 'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
      ],
      desc: "",
      price: null,
      inventory: null,
      cag: ""
    }
  },
  methods: {},
  mounted() {
    //内存中的模板已经挂载到页面中，页面渲染完成。
    this.url = []
    let params = {
      goods_name: this.$route.query.title,
    }
    if (this.$route.query.title !== "") {
      this.$axios.post('/api/goods/',
          qs.stringify(params)
      ).then(res => {
        // this.url = JSON.parse(res.data)
        // this.url.push(res.data[0].fields["goods_img"])
        // var jsonObj = JSON.parse(JSON.stringify(res.data));

        // var ans = JSON.parse(res.data)
        // console.log(ans['ans'][0])
        const dataDict = JSON.parse(res.data);
        this.url = dataDict.pics
        console.log(this.url)
        this.price = dataDict.price
        this.inventory = dataDict.inventory
        this.desc = dataDict.desc
        this.cag = dataDict.cag
        // console.log(JSON.parse(res.data)[0])

        // for(let i=0; i< res.data.length; i++){
        //   this.url.push(res.data[i])
        // }

        // this.des = res.data2
        // if (res.data === "true") {
        //   this.$message.success("success")
        // } else {
        //   this.$message.error("False")
        // }
      })

    }
  }
}
</script>

<style scoped>

.body {
  margin-top: 10px;
}

.center_con {
  width: 1200px;
  height: 350px;
  margin: 0 auto;

}

.goods_detail_list {
  width: 730px;
  height: 350px;
  margin-left: auto;
  margin-right: auto;
}

.goods_detail_list h3 {
  font-size: 24px;
  line-height: 24px;
  color: #666;
  font-weight: normal;
}

.desc {
  font-size: 15px;
  color: #9e9e9e;
  border: 1px solid;
  border-radius: 6px;
}

.kucun {
  font-size: 15px;
  color: #9e9e9e;
  float: right;

}

.goods_detail_list p {
  color: #666;
  line-height: 40px;
}

.prize_bar {
  height: 72px;
  background-color: #fff5f5;
  line-height: 72px;

  font-size: 25px;
  color: #ff3e3e;
  padding-left: 20px;
}

.oldprice {
  font-size: 18px;
  color: #9e9e9e;
  padding-left: 16px;
  text-decoration: line-through;
}

.total em {
  font-style: normal;
  color: #ff3e3e;
  font-size: 18px
}

.operate_btn {
  height: 40px;
  margin-top: 35px;
  font-size: 0;
  position: relative;

}

.operate_btn .buy_btn, .operate_btn .add_cart {
  display: inline-block;
  width: 178px;
  height: 38px;
  border: 1px solid #c40000;
  font-size: 14px;
  color: #c40000;
  line-height: 38px;
  text-align: center;
  background-color: #ffeded;
}

.operate_btn .add_cart {
  background-color: #c40000;
  color: #fff;
  margin-left: 10px;
  position: relative;
  z-index: 10;
}


.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.block {
  width: 760px;
  margin-left: auto;
  margin-right: auto;
}


</style>