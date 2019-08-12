<template>
    <div class="ecsc-slider-wrp">
        <div class="ecsc-slider-con">
            <div class="ecsc-slider-header">
                <span class="ecsc-slider-callboard">{{sliderInfo.title}}</span>
                <p v-if="sliderInfo.info" class="ecsc-slider-header-info">最后修改人：吉格斯 最后修改时间：2017-09-08 15:30</p>
                <a class="ecsc-slider-ico" href="javascript:" @click="setShowSlider(false)">
                    <i class="el-icon-close"></i>
                </a>
            </div>
            <div class="ecsc-slider-body">
                <component v-bind:is="sliderInfo.name" :selectItem="sliderInfo.selectItem"
                           v-on:changeSelection="changeSelection" v-bind:dtype="sliderInfo.type"></component>
            </div>
        </div>
    </div>

</template>
<script>
    import grStore from '../pages/wareHouse/gr-store.vue'
    import grSee from '../pages/goodsRecord/gr-see.vue'
    import msAdd from '../pages/measureMent/ms-add.vue'
    import gcAdd from '../pages/goodsClass/gc-add.vue'
    import gBAdd from '../pages/goodBOM/recordAdd-BOM.vue'
    import addOrder from '../pages/goodsRecord/add-order.vue'
    import sliderList from '../pages/goodsRecord/sliderList.vue'
    import distribution from '../pages/goodsRecord/gr-distribution.vue'
    import storeGoods from '../pages/wareHouse/storeGoods.vue'
    import storeGoodsCopy from '../pages/wareHouse/copyToOthers.vue'
    import selectGood from '../pages/goodBOM/selectGoods.vue'
    import selectBOMGood from '../pages/goodBOM/selectGoods.vue'
    import agencySlider from '../pages/agency/agencySilder.vue'
    import schudel from '../pages/distributeRoute/selectMechanList.vue'
    import batchSet from  '../pages/distributeRouteGood/batchSet.vue'
    import goodList from '../pages/distributeRouteCharts/selectRouteGoods.vue'
    import {mapGetters, mapMutations, mapActions} from 'vuex'
    import  config from '../utils/config'
    export default {
        name: 'ecsc-slider',
        data(){
            return {}
        },
        computed: {
            ...mapGetters([
                'showSlider', 'sliderInfo'
            ])
        },
        components: {
            goodList,schudel,grSee, grStore, msAdd, gcAdd, gBAdd, addOrder, sliderList, distribution, storeGoods, selectBOMGood,storeGoodsCopy,agencySlider,batchSet
        },
        methods: {
            ...mapMutations([
                'setShowSlider'
            ]),
            changeSelection(selectItem){
                if (config[this.sliderInfo.type]) {
                    let storeGroupList = [];
                    let model = config[this.sliderInfo.type]['childModel'];
                    selectItem.forEach((item) => {
                        let storeGroup = {};
                        for (let key of Object.keys(model)) {
                            //对应不上的值可以设置默认值默认值的字段名称为default
                         if(typeof(model[key])=='string'){
                                if (model[key] && model[key] != '' && model[key] != key) {
                                    storeGroup[key] = item[model[key]];
                                }
                                else {
                                    storeGroup[key] = item[key] || '';
                                }
                            }else {
                                storeGroup[key]=model[key]['default']||'';
                            }


                        }
                        storeGroupList.push(storeGroup);

                    });
                    this.sliderInfo.changeSelection(storeGroupList);
                } else {
                    this.sliderInfo.changeSelection(selectItem);
                }
            }

        }
    }
</script>

<style lang="less" scoped>
    .ecsc-slider-header {
        width: 100%;
        height: auto;
        background: #F0F5F9;
        position: relative;
        padding-top: 15px;
        padding-bottom: 15px;
        .ecsc-slider-callboard {
            font-size: 16px;
            font-family: PingFangSC-Regular;
            color: #243546;
            display: block;
            height: 20px;
            text-align: left;
            padding-left: 20px;
        }
        .ecsc-slider-ico {
            width: 20px;
            height: 20px;
            top: 12px;
            right: 12px;
            position: absolute;
            font-size: 12px;
            .el-icon-close {
                color: #C4C9D2;
            }
        }
    }

    .ecsc-slider-wrp {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1000
    }

    .ecsc-slider-body {
        padding-right: 20px;
        padding-left: 20px;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    }

    .ecsc-slider-header-info {
        font-size: 12px;
        padding: 0;
        margin: 0;
        display: block;
        text-align: left;
        padding-left: 20px;
        margin-top: 12px;
        color: #9AABB8;
    }

</style>
