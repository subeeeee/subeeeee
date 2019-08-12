<template>
	<div>
		<iframe :src="NewSrc+Token1" noresize="0" scrolling="yes" frameborder="0"></iframe>
	</div>
</template>

<script>
	import { mapGetters, mapMutations, mapActions } from 'vuex'
	export default{
		name:'cpxsssdbb',
		data(){
			return{
				
			}
		},
		computed:{
			...mapGetters(['Token']),
			Token1:{
				get:function(){
					if(this.NewSrc.indexOf('?') == -1){
						return '?_s=' + this.Token;
					}else{
						return '&_s=' + this.Token;
					}
				}
			}
		},
		props:{
			NewSrc:{
				type:String,
				default:''
			}
		},
		methods:{
			
		}
	}
</script>

<style>
</style>