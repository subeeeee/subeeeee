<template>
  <div class="login-container">
    <div style="padding-top: 50px;padding-left: 20px;">
      <div style="width: 800px;height:90px;margin: 0 auto;">
        <img src="../../assets/wisdom_images/tjLogo.svg" style="width: 90px;height: 90px;display: inline-block;" />
        <img src="../../assets/wisdom_images/title.svg" style="width: 700px;height: 90px;display: inline-block;" />
      </div>
    </div>
    <div class="login_main">
      <div class="login_box_left">
        <img style="position: absolute;left: 38%; top: 15%;" src="../../assets/wisdom_images/pic.png"/>
      </div>
      <div class="login_box">
        <el-card class="box-card" style="text-align:center;">
          <!-- <img src="../../assets/login_images/person.png" /> -->
          <!-- <p style="font-size:16px;line-height:20px;text-align:center;color:#93C1E5;margin: 5;">用户登录</p> -->
          <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="card-box wisdomInput" name="loginForm" methods="post" :action="mayUser">
            <el-form-item prop="username">
              <el-input ref="username" name="username" type="text" v-model="loginForm.name" placeholder="请输入用户名" style="position:relative;"></el-input>
              <img src="../../assets/wisdom_images/user.png" style="width:22px;position:absolute;left:5px;top:8px;" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input name="password" type="password" v-model="loginForm.password" placeholder="请输入密码">
              </el-input>
              <el-input name="sign" type="hidden" value="1" style="display: none" ></el-input>
              <img src="../../assets/wisdom_images/pass.png" style="width:22px;position:absolute;left:5px;top:8px;" />
            </el-form-item>
            <el-form-item>
              <el-button style="width:100%;margin-bottom:3%;background:rgb(97, 173, 248);color:#fff;border: none;" :loading="loading" @click.native.prevent="handleLogin">
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>

</template>

<script>
  // import Cookies from 'js-cookie'
  import axios from 'axios'
  import {loginUrl} from '@/api/index.build'
  export default {
    components: {},
    name: 'login',
    data() {
//    const validatePass = (rule, value, callback) => {
//      if (value.length < 5) {
//        callback(new Error('密码不能小于5位'))
//      } else {
//        callback()
//      }
//    }
      return {
        mayUser:loginUrl + "/login/login",
        loginForm: {
          name: null,
          password: null,
          code: null
        },
        loginRules: {
          name: [{
            required: true,
            message: '账户不能为空',
            trigger: 'change'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
          ],
          password: [{
            required: true,
            message: '密码不能为空',
            trigger: 'change'
          },
          {
            min: 5,
            message: '密码不能小于5位',
            trigger: 'blur'
          }]
        },
        loading: false,
        showDialog: false
      }
    },
    methods: {
      handleLogin() {
        // this.$router.push({
        //   path: '/userinfo'
        // })
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true

          /*  let hrefUrl = window.location.href
            let url = hrefUrl.split("#")[0] + '#/userInfo'
            this.loginForm.returnUrl = url
            console.log(this.loginForm)
            axios({
              url: 'http://192.168.123.15:11020/myuser/login/login',
              method: 'post',
              data: this.loginForm,
              transformRequest: [function (data) {
                // Do whatever you want to transform the data
                let ret = ''
                for (let it in data) {
                  ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
              }],

            })*/
document.loginForm.submit()

            // this.loginForm.password = Base.encode(this.loginForm.password);
  /*          this.$store.dispatch('Login', this.loginForm).then(response => {
            	console.log(response,885)
            	if(response.infoCode===200){
	              // const LoginCode = {
	              //   loginCode: '1',
	              //   username: this.loginForm.name,
	              //   password: this.loginForm.password
	              // }
	              // // console.log(LoginCode);
	              // sessionStorage.setItem('LoginCode', JSON.stringify(LoginCode))

	              this.loading = false
	              this.$router.push({
	                path: '/'
	              })

              	this.showDialog = true
	            }else{
	            	this.$message({
                    type:'error',
                    message:response.msg
                })
	            	this.loading = false
	            }
            }).catch(() => {
              this.loading = false
            })*/
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    created() {

    },
    mounted() {
      this.$refs['username'].focus();
    },
    destroyed() { }
  }

</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/style/scss/mixin.scss";
.logoTitle {
  text-align: center;
  padding-top: 75px;
}

h3 {
  text-align: center;
  margin: 0 auto;
  font-family: "Courier New", Courier, monospace;
  font-size: 40px;
  text-transform: uppercase;
  color: #fff;
  // text-shadow: 0 0 20px #fefcc9, 10px -10px 30px #feec85, -20px -20px 40px #ffae34, 20px -40px 50px #ec760c, -20px -60px 60px #cd4606, 0 -80px 70px #973716, 10px -90px 80px #451b0e;
}

.tips {
  font-size: 14px;
  color: #fff;
  margin-bottom: 5px;
}

.login-container {
  @include relative;
  height: 100vh;
  min-height: 600px;
  background: url(../../assets/wisdom_images/beijing.png) no-repeat center
    center;
  background-size: 100% 100%;
  background-color: #2d3a4b;
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px #fff inset !important;
    /*-webkit-text-fill-color: #ccc !important;*/
  }
  input {
    background: transparent;
    border: 1px solid #ccc !important;
    -webkit-appearance: none;
    border-radius: 5;
    padding: 12px 5px 12px 15px;
    color: #000;
    width: 100%;
    height: 47px;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 100%;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #889aa4;
  }
  .title {
    font-size: 26px;
    color: #555;
    margin: 0 auto 20px;
    text-align: left;
    font-weight: normal;
  }
  .login-form {
    position: absolute;
    left: 56%;
    width: 390px;
    padding: 20px 45px 15px 45px;
    margin: 120px auto;
    background-color: #fff;
  }
  .el-form-item {
    border-radius: 5px;
    color: #454545;
  }
  .forget-pwd {
    color: #fff;
  }
}

.login_main {
  position: absolute;
  top: 42%;
  left: 50%;
  margin-top: -160px;
  margin-left: -500px;
  width: 1000px;
  height: 500px;
  background-size: 50%;
  color: #fff;
  overflow: hidden;
}

.login-container .el-form-item {
  margin-bottom: 24px;
}

.login_box_left{
  position: relative;
  width: 50%;
  margin-top: 5%;
  float: left;
  height:450px;
  background: url(../../assets/wisdom_images/cicle.svg) top left
    no-repeat;
}

.login_box {
  width: 45%;
  margin-top: 10%;
  float: right;
}

.box-card {
  margin-left: 20px;
  background: url(../../assets/wisdom_images/loginbg.png) top  no-repeat;
  border: none;
  box-shadow: none;
}
.wisdomBox {
  width: 100%;
  min-width: 1200px;
  height: 100%;
  /*background: url(../../assets/wisdom_images/loginbag.png) repeat-x left bottom;*/
  /* background-size: 100% 100%;   */
}
.wisdomInput {
  margin-top:80px;
}

.wisdomInput > div > div > div > input {
  // background: #eeeeee;
  background: transparent;
  font-size: 14px;
  height: 40px;
}

.wisdomInput > div > span > i {
  color: white;
}

.wisdomInput .el-input__inner {
  padding-left: 40px;
}

.wisdomInput > div > span > i {
  color: #000;
  border-right: 1px solid #ccc;
}

.el-card__body {
  padding: 40px;
}

.login-container .el-form-item {
  margin-bottom: 16px;
}
</style>
