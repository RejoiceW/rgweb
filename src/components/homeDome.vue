<template>
	<div id="home">
		<!--左侧导航 和 右侧轮播图-->
		<el-row>
			<el-col :span="3" :push="3">
				<div class="grid-content bg-purple">
					<ul id="list-nav">
						<li>
							<el-link href="/家用电器" target="_blank" :underline="false" class="li-nav">家用电器</el-link>
						</li>
						<li>
							<el-link :href="'/'+item.title " target="_blank" :underline="false" class="li-nav" v-for="item in list1">{{item.title}}</el-link>
						</li>
						<li>
							<el-link :router="true" href="/家用电器" target="_blank" :underline="false" class="li-nav" v-for="item in list2">{{item.title}}</el-link>
						</li>
						<li>
							<el-link href="" target="_blank" :underline="false" class="li-nav" v-for="item in list3">{{item.title}}</el-link>
						</li>
						<li>
							<el-link href="" target="_blank" :underline="false" class="li-nav" v-for="item in list4">{{item.title}}</el-link>
						</li>
						<li>
							<el-link href="" target="_blank" :underline="false" class="li-nav" v-for="item in list5">{{item.title}}</el-link>
						</li>
						<li>
							<el-link href="" target="_blank" :underline="false" class="li-nav" v-for="item in list6">{{item.title}}</el-link>
						</li>
						<li>
							<el-link href="" target="_blank" :underline="false" class="li-nav" v-for="item in list7">{{item.title}}</el-link>
						</li>
						<li>
							<el-link href="" target="_blank" :underline="false" class="li-nav" v-for="item in list8">{{item.title}}</el-link>
						</li>
						<li>
							<el-link href="" target="_blank" :underline="false" class="li-nav" v-for="item in list9">{{item.title}}</el-link>
						</li>
					</ul>
				</div>
			</el-col>
			<el-col :span="16" :push="3" style="margin-left: 40px;">
				<div class="grid-content bg-purple-light">
					<el-carousel :interval="5000" arrow="always" id="lunbo" style="height: 600px;">
						<el-carousel-item style="height: 550px;" v-for="item in lunbolist">
							<img :src="item.pic" style="height: 100%;width: 100%;" />
						</el-carousel-item>
					</el-carousel>
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="10">
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<ul style="list-style: none; width: 98%;">
					<li class="breedtitle" v-for="breedtitle in breedtitle" :class="breedtitle.color">
						<div>
							<span>———</span>&nbsp;&nbsp; {{breedtitle.name}}&nbsp;&nbsp;
							<span>———</span>
							<hr :class="breedtitle.color" size="2px" noshade=true style="margin:30px 0px 30px 170px;width:82%;" />
						</div>
						<ul id="pics_ul">
							<li v-for="smallad in smallads" style="position: relative;">
								<a :href="smallad.a_href">
									<span id="" style="position: absolute;top: 20px;left:20px;font-size: 23px;color:rgb(85,85,85);font-weight: 400;">
								{{smallad.title}}
							</span>
									<img :src="smallad.pic" style="width: 300px;height: 300px;" />
								</a>
							</li>
						</ul>
					</li>
				</ul>
			</el-col>
		</el-row>
		<!--<ul v-for="item in lunbolist">
			<li>{{item.pic}}</li>
		</ul>-->
	</div>
</template>

<script>
	export default {
		methods: {
			getdata() {
				this.axios.get('/wenkang/rest/content/list/89').then((response) => {
					//				console.log(response.data.data);
					var jsondata = JSON.parse(JSON.stringify(response.data.data));
					this.lunbolist = jsondata;
				}).catch((Error) => {
					console.log(Error);
				});
				this.axios.get('/wenkang/rest/content/list/90').then((response) => {
					//				console.log(response.data.data);
					var jsondata = JSON.parse(JSON.stringify(response.data.data));
					this.smallads = jsondata;
				}).catch((Error) => {
					console.log(Error);
				});
				this.axios.get('/wenkang/rest/itemcat/list?callBack=category.getDataService').then((response) => {
					var jsondata = JSON.parse(JSON.stringify(response.data)).data;
					//				var newjson=JSON.stringify(jsondata);
					var len = jsondata.length;
					for(var i = 0; i < len; i++) {
						var item = newjson[i];
						if(item.children && item.item.children.length != 0) {
							var child = item.children;
							for(var j = 0; j < child.length; j++) {
								if(item.parentNode) {
									child[j].parentNode = item.parentNode.concat([item.id]);
								} else {
									child[j].parentNode = [item.id]
								}
								console.log(item.parentNode, item.id);
								newJson[len + j] = child[j];
							}
							len = newJson.length;
						}
					}
					  return newJson;
					console.log(len);
					this.breed = jsondata;
				}).catch((Error) => {
					console.log(Error);
				});
			},
		},
		mounted() { //生命周期函数
			this.getdata();
		},
		data() {
			return {
				lunbolist: [],
				smallads: [],
				breed: [],
				list1: [{
					href: 'https://www.baidu.com',
					title: '手机'
				}, {
					href: 'https://www.baidu.com',
					title: '运营商'
				}, {
					href: '#',
					title: '数码'
				}],
				list2: [{
					href: 'https://www.baidu.com',
					title: '电脑'
				}, {
					href: 'https://www.baidu.com',
					title: '办公配件'
				}],
				list3: [{
					href: 'https://www.baidu.com',
					title: '家居'
				}, {
					href: 'https://www.baidu.com',
					title: '家具'
				}, {
					href: '#',
					title: '家装'
				}, {
					href: '#',
					title: '厨具'
				}],
				list4: [{
					href: 'https://www.baidu.com',
					title: '男装'
				}, {
					href: 'https://www.baidu.com',
					title: '女装'
				}, {
					href: '#',
					title: '童装'
				}, {
					href: '#',
					title: '内衣'
				}],
				list5: [{
					href: 'https://www.baidu.com',
					title: '美妆'
				}, {
					href: 'https://www.baidu.com',
					title: '个护清洁'
				}],
				list6: [{
					href: 'https://www.baidu.com',
					title: '女鞋'
				}, {
					href: 'https://www.baidu.com',
					title: '箱包'
				}, {
					href: '#',
					title: '钟表'
				}, {
					href: '#',
					title: '珠宝'
				}],
				list7: [{
					href: 'https://www.baidu.com',
					title: '男鞋'
				}, {
					href: 'https://www.baidu.com',
					title: '运动'
				}, {
					href: '#',
					title: '户外'
				}],
				list8: [{
					href: 'https://www.baidu.com',
					title: '母婴'
				}, {
					href: 'https://www.baidu.com',
					title: '玩具乐器'
				}],
				list9: [{
					href: 'https://www.baidu.com',
					title: '图书'
				}, {
					href: 'https://www.baidu.com',
					title: '文娱'
				}, {
					href: '#',
					title: '电子书'
				}],
				breedtitle: [{
						color: 'black',
						name: '家用电器'
					}, {
						color: 'seagreen',
						name: '数码3C'
					}, {
						color: 'darkred',
						name: '服装箱包'
					}, {
						color: 'steelblue',
						name: '食品生鲜'
					}, {
						color: 'purple',
						name: '酒水饮料'
					}]
					//				图片数组
					,
				pics: [{
						src: '../image/images/18.png',
						a_href: 'https://www.baidu.com'
					},
					{
						src: '../image/images/11.jpg',
						a_href: 'https://www.baidu.com'
					},
					{
						src: '../image/images/11.jpg',
						a_href: 'https://www.baidu.com'
					},
					{
						src: '../image/images/11.jpg',
						a_href: 'https://www.baidu.com'
					},

				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	#home {
		background: rgb(246, 246, 246);
	}
	
	#list-nav {
		overflow: hidden;
		list-style: none;
		background: white;
		width: 255px;
		margin-top: 40px;
		margin-left: -40px;
		padding-bottom: 5px;
	}
	
	#list-nav li {
		margin-top: 20px;
		margin-right: 20px;
	}
	
	.li-nav {
		padding-left: 10px;
	}
	
	.el-carousel__item h3 {
		color: #475669;
		font-size: 18px;
		opacity: 0.75;
		line-height: 300px;
		margin: 0;
	}
	
	#lunbo {
		margin-top: 40px;
		width: 95%;
		margin-right: -30px;
	}
	
	.el.carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}
	
	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}
	
	.breedtitle {
		font-size: 35px;
		font-weight: bolder;
	}
	
	.black {
		color: black;
	}
	
	.seagreen {
		color: seagreen;
	}
	
	.darkred {
		color: darkred;
	}
	
	.steelblue {
		color: steelblue;
	}
	
	.purple {
		color: purple;
	}
	
	#pics_ul {
		overflow: hidden;
		list-style: none;
		margin-left: 155px;
	}
	
	#pics_ul li {
		float: left;
		margin-left: 20px;
	}
</style>