import ownership from './compontents/com'

const component = {
  install:function (vue) {
    vue.component('ownershipNo',ownership)
  }
};

export default component
