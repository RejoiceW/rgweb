<template>
	<div id="home">
		<!--左侧导航 和 右侧轮播图-->
		<el-row>
			<el-col :span="3" :push="3">
				<div class="grid-content bg-purple">
					<ul id="list-nav">
						<table border="0" cellspacing="" cellpadding="">
							<tr>
								<td>
									<li v-for="item in breed" style="margin-top: 7px;text-align: left;" :key="item.breed">
										<el-link href="/商品列表" target="_blank" :underline="false" class="li-nav">{{item}}</el-link>
									</li>
								</td>
								<td>
									<li v-for="item1 in breed2" style="margin-top: 7px;text-align: left;" :key="item1.breed2" >
										<el-link href="/商品列表" target="_blank" :underline="false" class="li-nav">{{item1}}</el-link>
									</li>
								</td>
							</tr>
						</table>
						<!--<li v-for="item in breed" style="margin-top: 7px;text-align: left;">
							<el-link href="/家用电器" target="_blank" :underline="false" class="li-nav">{{item}}</el-link>
						</li>-->

					</ul>
				</div>
			</el-col>
			<el-col :span="16" :push="3" style="margin-left: 40px;">
				<div class="grid-content bg-purple-light">
					<el-carousel :interval="5000" arrow="always" id="lunbo" style="height: 600px;">
						<el-carousel-item style="height: 550px;" v-for="item in lunbolist" :key="item.lunbolist" >
							<img :src="item.pic" style="height: 100%;width: 100%;" />
						</el-carousel-item>
					</el-carousel>
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="10">
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<ul style="list-style: none; width: 98%;">
					<li class="breedtitle" v-for="breedtitle in breedtitle" :class="breedtitle.color" :key="breedtitle.breedtitle" >
						<div>
							<span>———</span>&nbsp;&nbsp; {{breedtitle.name}}&nbsp;&nbsp;
							<span>———</span>
							<hr :class="breedtitle.color" size="2px" noshade=true style="margin:30px 0px 30px 170px;width:82%;" />
						</div>
						<ul id="pics_ul">
							<li v-for="smallad in smallads" style="position: relative;" :key="smallad.smallads" >
								<a :href="smallad.a_href">
									<span id="" style="position: absolute;top: 20px;left:20px;font-size: 23px;color:rgb(85,85,85);font-weight: 400;">
								{{smallad.title}}
							</span>
									<!--<el-link href="/商品列表" target="_blank" :underline="false" class="li-nav">{{item}}</el-link>-->
									<img :src="smallad.pic" style="width: 300px;height: 300px;" />
								</a>
							</li>
						</ul>
					</li>
				</ul>
			</el-col>
		</el-row>
		<!--<div v-for="item in breedurl">
			<span>{{item}}</span>
		</div>-->
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
					var item2;
					var item4;
					var itemlian;
					//					var newjson=JSON.stringify(jsondata);
					var len = jsondata.length;
					//								console.log(jsondata.n)	;	
					for(var i = 0; i < len; i++) {
						var item = jsondata[i];
						if(item.i && item.i.length != 0) {
							//							console.log(item.i)
							var child = item.i;
							for(var j = 0; j < child.length; j = j + 12) {
								item2 = child[j].n;
								itemlian = child[j].u;
								this.breed.push(item2);
								this.breedurl.push(itemlian);
								//								this.breed = item2.n
								//								console.log(item2.n);
								//								this.breed = JSON.parse(JSON.stringify(item2));
								console.log(this.breed);
								console.log(this.breedurl);
								//								for(var m = 0; m < 12; m++) {
								//									 item3 = jsondata2[m];
								//									 var jsondata3 = JSON.parse(JSON.stringify(item3)).n;
								//									console.log(jsondata3 );
								//									console.log(item3);
								//									return item3;

								//								}
							}
						}
					};
					for(var i = 0; i < len; i++) {
						var item3 = jsondata[i];
						if(item3.i && item3.i.length != 0) { //							console.log(item.i)
							var child = item3.i;
							for(var j = 1; j < child.length; j = j + 11) {
								item4 = child[j].n;
								this.breed2.push(item4);

								//								this.breed = item2.n
								//								console.log(item2.n);
								//								this.breed = JSON.parse(JSON.stringify(item2));
								console.log(this.breed2);

								//								for(var m = 0; m < 12; m++) {
								//									item3 = jsondata2[m];
								//									var jsondata3 = JSON.parse(JSON.stringify(item3)).n;
								//									console.log(jsondata3);
								//									console.log(item3);
								//									return item3;
								//
								//								}

							}
						}
					};

				}).catch((Error) => {
					console.log(newjson);
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
				breed2: [],
				breed3: [],
				breedurl: [],
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