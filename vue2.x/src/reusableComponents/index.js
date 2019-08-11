import com from './compontents/com'

const component = {
  install:function (vue) {
    vue.component('com',com)
  }
};

export default component
