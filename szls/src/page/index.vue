<template>
	<div>
		<Header></Header>
		<router-view></router-view>
		<Footer></Footer>
	</div>
</template>

<script>
	import Header from '@/components/common/header.vue'
	import Footer from '@/components/common/footer.vue'
	
	export default {
		components: {
			Header,
			Footer
		},
		data() {
			return {
				list: []
			}
		},
		created() {
			/*this.$api.get('topics',null,r=>{
				console.log(r)
			})*/
			this.getData()
		},
		methods: {
			getData() {
//				this.$api.get('topics', null, r => {
//					this.list = r.data
//				})
			}
		}
	}
</script>

<style scoped="scoped">
	
</style>