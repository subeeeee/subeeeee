




// 检测是不是IE  给IE添加toBlob方法


if (!HTMLCanvasElement.prototype.toBlob) {
  Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
    value: function (callback, type, quality) {
      var canvas = this;
      setTimeout(function() {
        var binStr = atob(canvas.toDataURL(type, quality).split(',')[1]);
        var len = binStr.length, arr = new Uint8Array(len);

        for (var i = 0; i < len; i++ ) {
          arr[i] = binStr.charCodeAt(i);
        }

        callback(new Blob([arr], {type: type || 'image/png'}));
      });
    }
  });
}








/** 身份证号校验 **/
function checkID(ID) {
    if (typeof ID !== 'string') return false;
    var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };
    var birthday = ID.substr(6, 4) + '/' + Number(ID.substr(10, 2)) + '/' + Number(ID.substr(12, 2));
    var d = new Date(birthday);
    var newBirthday = d.getFullYear() + '/' + Number(d.getMonth() + 1) + '/' + Number(d.getDate());
    var currentTime = new Date().getTime();
    var time = d.getTime();
    var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    var sum = 0, i, residue;

    if (!/^\d{17}(\d|x)$/i.test(ID)) return false;
    if (city[ID.substr(0, 2)] === undefined) return false;
    if (time >= currentTime || birthday !== newBirthday) return false;
    for (i = 0; i < 17; i++) {
        sum += ID.substr(i, 1) * arrInt[i];
    }
    residue = arrCh[sum % 11];
    if (residue !== ID.substr(17, 1)) return false;

    return true;
}
function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
function isMobile(mobile) {
    return /^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(mobile);
}
function isEmptyObj(o) {
    var p;
    for (p in o)
        return !1;
    return !0;
}
function rand(len) {
    var s = "",
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for (var i = 0; i < len; i++) {
        pos = Math.round(Math.random() * (arr.length - 1));
        s += arr[pos];
    }
    return s;
}
/** 汉子校验 */
function isHanzi(str) {
    var han = /^[\u4e00-\u9fa5]+$/;
    if (!han.test(str)) {
        return false;
    };
    return true;
};
// 数字校验
function isNumber(str) {
    var reg = /^[0-9]+$/;
    if (!reg.test(str)) {
        return false;
    }
    return true
}
// 含小数点的数字校验
function isDianNumber(str) {
    var reg = /^\d{1,}\.?\d{0,}$/;
    if(!reg.test(str)){
        return false;
    }
    return true
}

function isDecimals (str) {
    var reg = /^\d+(\.\d+)?$/;
    if (!reg.test(str)) {
        return false;
    }
    return true
}
// 验证非特殊字符
function isSpecial(str) {
    var reg = /^([\u4e00-\u9fa5]|[a-zA-Z0-9]|\#|\@|\$|\%)+$/
    if (!reg.test(str)) {
        return false
    }
    return true
}
// 名字
function isName(str) {
    var han = /^([\u4e00-\u9fa5]){2,20}$/;
    if (!han.test(str)) {
        return false;
    };
    return true;
}
// //去掉字符串头尾空格
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
//身份证男女
function discriCard(idCard) {
    idCard = trim(idCard.replace(/ /g, ""));// 对身份证号码做处理。包括字符间有空格。
    if (idCard.length == 15) {
        if (idCard.substring(14, 15) % 2 == 0) {
            return '2';
        } else {
            return '1';
        }
    } else if (idCard.length == 18) {
        if (idCard.substring(14, 17) % 2 == 0) {
            return '2';
        } else {
            return '1';
        }
    } else {
        return '';
    }
}




function discriCardAge(str) {
    //获取年龄
    var myDate = new Date();
    var month = myDate.getMonth() + 1;
    var day = myDate.getDate();
    var age = myDate.getFullYear() - str.substring(6, 10) - 1;
    if (str.substring(10, 12) < month || str.substring(10, 12) == month && str.substring(12, 14) <= day) {
        age++;
    }
    return age
}

//不含空格
function isNbsp(str) {
    var reg = /\s+/g
    if (!reg.test(str)) {
        return false
    }
    return true;
}

function formatnumber(value, num) {
    var a, b, c, i;
    a = value.toString();
    b = a.indexOf(".");
    c = a.length;
    if (num == 0) {
        if (b != -1) {
            a = a.substring(0, b);
        }
    } else {//如果没有小数点
        if (b == -1) {
            a = a + ".";
            for (i = 1; i <= num; i++) {
                a = a + "0";
            }
        } else {//有小数点，超出位数自动截取，否则补0
            a = a.substring(0, b + num + 1);
            for (i = c; i <= b + num; i++) {
                a = a + "0";
            }
        }
    }
    return a;
}
function clearSpeace(str) {
    return str.replace(/\s/g, '')
}
function clearNum(str){
    return str.replace(/\D/g,'')
}
function clearTwoNum(str,num){
    return str.replace(/[\u4e00-\u9fa5]/,'').replace(/[^(\d+\.?\d?)]/, '')
}
function format(str, type) {
    switch (type) {
        case 'money':
            str = str.replace(/[\u4e00-\u9fa5]/,'').replace(/[^(\d+\.?\d?)]/, '');
            str = '' + (str * 1).toFixed(4)
            break
        case 'month':
            str = str.replace(/[^\d]/g, '');
            str = (str * 1).toFixed(0)
            break;
        case 'rate':
            str = str.replace(/[^\d^\.]+/g, '');
            str = (str * 1).toFixed(2)
            break
    }
    return str
}
//乘法的浮点数
function floatRide(a,b)   {
  var m=0,s1=a.toString(),s2=b.toString();
  try{m+=s1.split(".")[1].length}catch(e){}
  try{m+=s2.split(".")[1].length}catch(e){}
  return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}
//加法的浮点数精度
function accAdd(arg1, arg2) {
  var r1, r2, m, c;
  try {
    r1 = arg1.toString().split(".")[1].length;
  }
  catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  }
  catch (e) {
    r2 = 0;
  }
  c = Math.abs(r1 - r2);
  m = Math.pow(10, Math.max(r1, r2));
  if (c > 0) {
    var cm = Math.pow(10, c);
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace(".", ""));
      arg2 = Number(arg2.toString().replace(".", "")) * cm;
    } else {
      arg1 = Number(arg1.toString().replace(".", "")) * cm;
      arg2 = Number(arg2.toString().replace(".", ""));
    }
  } else {
    arg1 = Number(arg1.toString().replace(".", ""));
    arg2 = Number(arg2.toString().replace(".", ""));
  }
  return (arg1 + arg2) / m;
}

//减法的浮点数精度
function subtraction(arg1, arg2) {
  var r1, r2, m, c;
  try {
    r1 = arg1.toString().split(".")[1].length;
  }
  catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  }
  catch (e) {
    r2 = 0;
  }
  c = Math.abs(r1 - r2);
  m = Math.pow(10, Math.max(r1, r2));
  if (c > 0) {
    var cm = Math.pow(10, c);
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace(".", ""));
      arg2 = Number(arg2.toString().replace(".", "")) * cm;
    } else {
      arg1 = Number(arg1.toString().replace(".", "")) * cm;
      arg2 = Number(arg2.toString().replace(".", ""));
    }
  } else {
    arg1 = Number(arg1.toString().replace(".", ""));
    arg2 = Number(arg2.toString().replace(".", ""));
  }
  return (arg1 - arg2) / m;
}
//除法的浮点数
function accDiv(num1, num2) {
  var t1,t2,r1,r2;
  try{
    t1 = num1.toString().split('.')[1].length;
  }catch(e){
    t1 = 0;
  }
  try{
    t2=num2.toString().split(".")[1].length;
  }catch(e){
    t2=0;
  }
  r1=Number(num1.toString().replace(".",""));
  r2=Number(num2.toString().replace(".",""));
  return (r1/r2)*Math.pow(10,t2-t1);
}

let propertyRightList = [
  {typeName:'商品房',typeCode:'01'},
  {typeName:'经济适用房',typeCode:'02'},
  {typeName:'按经济适用房管理',typeCode:'03'},
  {typeName:'成本价销售住宅',typeCode:'04'},
  {typeName:'标准价销售住宅',typeCode:'05'},
];
// 出让、划拨、转让、其他
let landSourceList = [
  {name:'出让',code:'01'},
  {name:'划拨',code:'02'},
  {name:'转让',code:'03'},
  {name:'其他',code:'04'},
]
//居住、办公、毛坯、空置
let practicalApplicationList = [
  {name:'居住',code:'01'},
  {name:'办公',code:'02'},
  {name:'毛坯',code:'03'},
  {name:'空置',code:'04'}
];
let healthStatusList = [
  {name:'健康',code:'01'},
  {name:'良好',code:'02'},
  {name:'较差',code:'03'},
  {name:'有重大疾病或伤残',code:'04'}
];

//借款人部分公用的list数组信息
let natian =  [{ "code": "01", label: '汉族' }, { "code": "02", label: '蒙古族' }, { "code": "03", label: '回族' }, { "code": "04", label: '藏族' }, { "code": "05", label: '维吾尔族' }, { "code": "06", label: '苗族' }
  , { "code": "07", label: '彝族' }, { "code": "08", label: '壮族' }, { "code": "09", label: '布依族' }, { "code": "10", label: '朝鲜族' }, { "code": "11", label: '满族' }, { "code": "12", label: '侗族' }
  , { "code": "13", label: '瑶族' }, { "code": "14", label: '白族' }, { "code": "15", label: '土家族' }, { "code": "16", label: '哈尼族' }, { "code": "17", label: '哈萨克族' }
  , { "code": "18", label: '傣族' }, { "code": "19", label: '黎族' }, { "code": "20", label: '傈僳族' }, { "code": "21", label: '佤族' }, { "code": "22", label: '畲族' }, { "code": "23", label: '高山族' }
  , { "code": "24", label: '拉祜族' }, { "code": "25", label: '水族' }, { "code": "26", label: '东乡族' }, { "code": "27", label: '纳西族' }, { "code": "28", label: '景颇族' }, { "code": "29", label: '柯尔克孜族' }
  , { "code": "30", label: '土族' }, { "code": "31", label: '达斡尔族' }, { "code": "32", label: '仫佬族' }, { "code": "33", label: '羌族' }, { "code": "34", label: '布朗族' }, { "code": "35", label: '撒拉族' }, { "code": "36", label: '毛南族' }
  , { "code": "37", label: '仡佬族' }, { "code": "38", label: '锡伯族' }, { "code": "39", label: '阿昌族' }, { "code": "40", label: '普米族' }, { "code": "41", label: '塔吉克族' }, { "code": "42", label: '怒族' }, { "code": "43", label: '乌孜别克族' }
  , { "code": "44", label: '俄罗斯族' }, { "code": "45", label: '鄂温克族' }, { "code": "46", label: '德昂族' }, { "code": "47", label: '保安族' }, { "code": "48", label: '裕固族' }
  , { "code": "49", label: '京族' }, { "code": "50", label: '塔塔尔族' }, { "code": "51", label: '独龙族' }, { "code": "52", label: '鄂伦春族' }, { "code": "53", label: '赫哲族' }
  , { "code": "54", label: '门巴族' }, { "code": "55", label: '珞巴族' }, { "code": "56", label: '基诺族' }, { "code": "97", label: '其他' }, { "code": "98", label: '外国血统中国籍人士' }];

let abrList = [
  { code: '1', label: '配偶' }, { code: '2', label: '父母' }, { code: '3', label: '子女' }, { code: '4', label: '兄弟姐妹' }, { code: '5', label: '朋友' }
];

let data = [
  { label: "农、林、牧、渔业", code: "A" }, { label: "采矿业", code: "B" }, { label: "制造业", code: "C" }, { label: "电力、热力、燃气及水生产和供应业", code: "D" },
  { label: "建筑业", code: "E" }, { label: "批发和零售业", code: "F" }, { label: "交通运输、仓储和邮政业", code: "G" }, { label: '住宿和餐饮业', code: 'H' },
  { label: '信息传输、软件和信息技术服务业', code: 'I' }, { code: 'J', label: '金融业' }, { code: 'K', label: '房地产业' }, { code: 'L', label: '租赁和商务服务业' }, { code: 'M', label: '科学研究和技术服务业' }
  , { code: 'N', label: '水利、环境和公共设施管理业' }, { code: 'O', label: '居民服务、修理和其他服务业' }, { code: 'P', label: '教育' }, { code: 'Q', label: '卫生和社会工作' }
  , { code: 'R', label: '文化、体育和娱乐业' }, { code: 'S', label: '公共管理、社会保障和社会组织' }, { code: 'T', label: '国际组织' }, { code: '99', label: '其他' }
];
 let unit =  [
  { code: '100', label: '内资企业' },
  { code: '200', label: '港、澳、台商投资企业' },
  { code: '300', label: '外商投资企业' },
  { code: '400', label: '个体经营' },
  { code: '500', label: '其他' }
];
let ulitList = [
  { code: '500', label: '其他' },
  { code: '400410', label: '个体经营户' }, { code: '400420', label: '个人合伙' },
  { code: '300310', label: '中外合资经营企业' }, { code: '300320', label: '中外合作经营企业' }, { code: '300330', label: '外资(独资)企业' },
  { code: '300340', label: '外商投资股份有限公司' },
  { code: '200210', label: '合资经营企业(港或澳、台资)' }, { code: '200210211', label: '港、澳与内地合资企业' }, { code: '200210212', label: '台湾与内地合资企业' },
  { code: '200220', label: '合作经营企业(港或澳、台资)' }, { code: '200220221', label: '港、澳与内地合作企业' }, { code: '200220222', label: '台湾与内地合作企业' },
  { code: '200230', label: '港、澳、台商独资经营企业' }, { code: '200230231', label: '港、澳独资经营企业' }, { code: '200230232', label: '台湾独资经营企业' },
  { code: '200240', label: '港、澳、台商投资股份有限公司' }, { code: '200240241', label: '港、澳投资股份有限公司' }, { code: '200240242', label: '台商投资股份有限公司' },
  { code: '100110', label: '国有企业' }, { code: '100120', label: '集体企业' }, { code: '100130', label: '股份合作企业' },
  { code: '100140', label: '联营企业' }, { code: '100150', label: '有限责任公司' }, { code: '100160', label: '股份有限公司' },
  { code: '100170', label: '私营企业' }, { code: '100170171', label: '私营独资企业' }, { code: '100170174', label: '私营有限责任公司' },
  { code: '100190', label: '其他企业' }
];

let occupa = [
  { code: '0', label: '国家机关、党群组织、企业、事业单位负责人' },
  { code: '01', label: '国家机关、党群组织、国有企业、事业单位、金融机构管理人员' },
  { code: '02', label: '国家机关、党群组织、国有企业、事业单位、金融机构一般员工' },
  { code: '1', label: '专业技术人员' },
  { code: '3', label: '办事人员和有关人员' },
  { code: '4', label: '商业、服务业人员' },
  { code: '5', label: '农、林、牧、渔、水利业生产人员' },
  { code: '6', label: '生产、运输设备操作人员及有关人员' },
  { code: '7', label: 'IT从业人员' },
  { code: 'X', label: '军人' },
  { code: 'Y', label: '不便分类的其他从业人员' },
  { code: 'Z', label: '未知' },
];

 let occupaList = [
  { code: '01010', label: '国家机关、党群组织、企业、事业单位负责人' },
  { code: '02', label: '国家机关、党群组织、国有企业、事业单位、金融机构一般员工' },
  { code: '1010', label: '科学、工程技术人员' }, { code: '1020', label: '农业技术人员' }, { code: '1030', label: '经济、金融、法律技术人员' }, { code: '1040', label: '卫生、文化、教育、体育技术人员' },
  { code: '1050', label: '其他专业技术人员' }, { code: '3010', label: '行政办公人员' }, { code: '3020', label: '安全保卫和消防工作人员' }, { code: '3030', label: '邮政和电信业务人员' },
  { code: '3040', label: '公安局、检察院、法院机关工作人员' }, { code: '3050', label: '其他办事人员和有关人员' }, { code: '4010', label: '购销、仓储人员' }, { code: '4020', label: '餐饮、旅游、健身娱乐服务人员' },
  { code: '4030', label: '运输服务人员' }, { code: '4040', label: '运输服务人员、社会服务，居民生活服务人员' }, { code: '4050', label: '其他商业、服务人员' }, { code: '5010', label: '农、林、牧、渔、水利业生产人员' },
  { code: '6010', label: '矿物开采、冶炼人员' }, { code: '6020', label: '未知化工产品生产人员' }, { code: '6030', label: '机械制造、修理、机电装配、安装运行人员' }, { code: '6040', label: '橡胶、纺织、皮革加工人员' }, { code: '6050', label: '粮油、食品、饮料生成人员' },
  { code: '6060', label: '木材加工、人造板生产及木材制品制造人员' }, { code: '6070', label: '制浆、造纸和纸制品生产加工人员' }, { code: '6080', label: '建筑材料生产加工人员' }, { code: '6090', label: '其他生产、运输设备操作人员及有关人员' }, { code: '7', label: 'IT从业人员' }, { code: 'X', label: '军人' },
  { code: 'Y', label: '不便分类的其他从业人员' }, { code: 'Z', label: '未知' },
];

function numSix(str) {
  return str.replace(/[^\d.]/g,"").replace(/\.{2,}/g,".").replace(/^\./g,"").replace(".","$#$").replace(/\./g,"").replace("$#$",".").replace(/^(\-)*(\d+)\.(\d{0,6}).*$/,'$1$2.$3')
}

function timestampToTime(timestamp) {
  var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  var D = (date.getDate())<10?'0'+ date.getDate()+ ' ' : date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = ((date.getMinutes())*1 =='0'?date.getMinutes()+'0':date.getMinutes())+ ':';
  var s = ((date.getSeconds())*1 =='0'?date.getSeconds()+'0':date.getSeconds());
  return Y+M+D+h+m+s;
}
function forCodeName(str,name,code,list) {
  let namestr = '';
  let length = list.length;
  for(let i = 0;i<length;i++){
    if(str == list[i][code]){
      namestr = list[i][name];
      return namestr
    }
  }
  return ''
}
function sixNum2(str,num) {
  return str.replace(/[^\d.]/g,"").replace(/\.{2,}/g,".").replace(/^\./g,"").replace(".","$#$").replace(/\./g,"").replace("$#$",".").replace(/^(\-)*(\d+)\.(\d{0,2}).*$/,'$1$2.$3')
}
let loanTermList = [
  {code: '1'}, {code: '2'}, {code: '3'}, {code: '4'}, {code: '5'}, {code: '6'}, {code: '7'}, {code: '8'}, {code: '9'}, {code: '10'}, {code: '11'}, {code: '12'},
  {code: '13'}, {code: '14'}, {code: '15'}, {code: '16'}, {code: '17'}, {code: '18'}, {code: '19'}, {code: '20'}, {code: '21'}, {code: '22'}, {code: '23'}, {code: '24'}
];
//初评规则计算方式
/*
* isRules 复合配置规则 meanValue 平均值 maxValue最大 minValue 最小 coefficientValue系数
* */
function firstRules(obj) {
  switch (obj.calcType){
    case "01":
      return  meanValue;
      break;
    case "02":
      return  maxValue;
      break;
    case "03":
      return  minValue;
      break;
    case '99':
      return coefficientValue;
      break;
    default:
      console.log('请完善计算规则')
  }
}
function isRules(obj,list) {
  let bol = false;
  let objList = obj.assessOrg.split(",");
  for(let i = 0,j = objList.length;i<j;i++){
    let codeBol = false;
    for(let k = 0,l = list.length;k<l;k++){
      if(objList[i] == list[k].assessCode){
        codeBol = true;
        break
      }
    }
    if(!codeBol) return true
  }
  for(let i = 0,j = list.length;i<j;i++){
    if(obj.assessOrg.indexOf(list[i].assessCode) == -1||!list[i].assessCode) {
      if(list[i].assessValue){
        bol = true;
        break
      }
    }else{
      if(!list[i].assessValue){
        bol = true;
        break
      }
    }
  }
  return bol
}
function meanValue(obj,list) {
  if(isRules(obj,list)){
    return ''
  }
  let num = 0;
  let length = 0;
  let assessValueArr = list.map(o=>o.assessValue/1);
  for(let  i = 0,j=assessValueArr.length;i<j;i++){
    if(assessValueArr[i]){
      length++;
      num += assessValueArr[i]
    }
  }
  return accDiv(num,length)
}
function maxValue(obj,list) {
  if(isRules(obj,list)){
    return ''
  }
  let assessValueArr = list.map(o=>o.assessValue/1);
  return Math.max.apply(null, assessValueArr)
}
function minValue(obj,list) {
  if(isRules(obj,list)){
    return ''
  }
  let assessValueArr = list.map(o=>o.assessValue/1);
  return Math.min.apply(null, assessValueArr)
}
function coefficientValue(obj,list) {
  if(isRules(obj,list)){
    return ''
  }
  let num = 0;
  for(let  i = 0,j=list.length;i<j;i++){
    if(list[i].assessCode == '1'&&obj.code.indexOf(list[i].assessCode) != -1){
      num += list[i].assessValue*obj.slCoef
    }
    if(list[i].assessCode == '2'&&obj.code.indexOf(list[i].assessCode) != -1){
      num += list[i].assessValue*obj.rdCoef
    }
  }
  return num
}

export default {firstRules,loanTermList,sixNum2,subtraction,timestampToTime,forCodeName,numSix,occupa,occupaList,ulitList,unit,data,abrList,natian,healthStatusList,practicalApplicationList,landSourceList,propertyRightList,accDiv,accAdd,floatRide,clearTwoNum,clearNum,isDianNumber, formatnumber, isNbsp, discriCard, discriCardAge, isName, isSpecial, isHanzi, rand,   isMobile, isEmail, checkID, isNumber, isDecimals, clearSpeace, format }
