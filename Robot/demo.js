var md5 = require('md5')
var request = require('request')

// accountid = 1005601  【子公司编号】
// userid    = 221070	【调用者编号】
// appid     = 365webcall  【总公司标识】
// appkey    = adef2244abc12qwrttaggkghh 【加密密匙】

// timestamp = 1527751975 => 2018/5/31 15:32:55 【时间戳】
// signature = md5 url串【appid=365webcall&accountid=1005601&userid=221070&timestamp=1527751975】+appkey【adef2244abc12qwrttaggkghh】
//           = md5("appid=365webcall&accountid=1005601&userid=221070&timestamp=1527751975adef2244abc12qwrttaggkghh")
//           = d0bbb38838f71436 【检验串】

var data = {
    accountid: 1005601,
    userid: 221070,
    appid: '365webcall',
    appkey: 'adef2244abc12qwrttaggkghh',
    timestamp: (Number(new Date()) + '').substr(0, 10),
    signature: ''
}

let str = `appid=${data.appid}&accountid=${data.accountid}&userid=${data.userid}&timestamp=${data.timestamp}${data.appkey}`
data.signature = md5(str).substr(8,16)
console.log(`[ ${str} ] \n----------------------------------------------------\nmd5后为 =>`, data.signature)

let query = []
for (var key in data) {
    if(key=='appkey') continue
    query.push(`${key}=${data[key]}`)
}


// let url = 'http://192.168.129.21:4016/api/ixSetting/v1/getCallRouteGroups'
let url = `http://robot.online000.com/robot/RobotOpenSession.aspx?${query.join('&')}`
console.log(`\n[ visit "${url}" ... ]\n----------------------------------------------------\n`)

request.get(url, null, function (err, result) {
    if(err){
        console.log('[ ERROR ]', err)
        return
    }
    console.log(`[ RESULT ]`, result)
})