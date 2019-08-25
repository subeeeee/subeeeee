module.exports = file => require('@/pages' + file + '.vue').default 

//module.exports = file => () => import('@/pages' + file + '.vue')

