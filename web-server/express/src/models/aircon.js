
/**
 * 運転モードセット
 * 
 * @param {str} v 
 */
const setMode = function(v){
    switch(v){
        case 'cool':
            return '1a';
            break;
        case 'warm':
            return '12';
            break;
        case 'dry':
            return '0a';
            break;
        case 'blast':
            return '1c';
            break;
    }
}


/**
 * 設定温度セット
 * 
 * 設定したい温度から16引いて2進数に変換した値を前後反転し16進数にしたもの
 * 
 * @param {int} n 
 */
const setTemp = function(n){
    return parseInt(('0000000'+n.toString(2)).slice(-8).split('').reverse().join(''),2).toString(16);
}

/**
 * data6
 * 
 * @param {str} v 
 */
const setData6 = function(v){
    switch(v){
        case 'cool':
            return '6c';
            break;
        case 'dry':
            return '4c';
            break;
        case 'warm':
        case 'blast':
            return '0c';
            break;
    }
}



/**
 * 風向風量
 * 
 * @param {str} v 
 */
const setWind = function(v){
    var initial_arr;
    if(v.windpower == 0){
        initial_arr = ['9','8'];
    }else if(v.windpower == 1){
        initial_arr = ['5','4'];
    }else if(v.windpower == 2){
        initial_arr = ['d','c'];
    }else if(v.windpower == 3){
        initial_arr = ['1','0'];
    }

    if(v.windpower == 0){
        return initial_arr[v.windpower%2]+'2';
    }else if(v.windpower <= 2){
        return initial_arr[v.windpower%2]+'a';
    }else if(v.windpower <= 4){
        return initial_arr[v.windpower%2]+'6';
    }else if(v.windpower == 5){
        return initial_arr[v.windpower%2]+'1';
    }else if(v.windpower == 4){
        return initial_arr[v.windpower%2]+'e';
    }

}



/**
 * check digit 解析用
 * 
 * customercode,parity, n ndata0~14までのビット列を反転して、そこからチェックサムの部分を除いたビット列を8ビットごとに区切った総和の下8bitを再反転させた値がチェックサム
 * 
 * @param {object} arr 
 */
const analyzeCD = function(arr){
    var binary_strings = '';
    for(v of arr){
        binary_strings += ('00000000'+parseInt(v,16).toString(2)).slice(-1*v.length*4);
    }

    var sum = 0;
    for(v of binary_strings.split('').reverse().join('').match(/.{8}/g)){
        sum += parseInt(v,2);
    }

    var x_sum = sum.toString(2).split('').reverse().join('').slice(0,8);

    return ('00'+parseInt(x_sum,2).toString(16)).slice(-2);
}



exports.convertToIRData = function(status){
    var ircode_arr = ['c4d3','6','4','80','00'];          // customercode, customercode(parity), data0 ~ 2
    ircode_arr.push(status.power ? '04' : '00');            // data3 電源
    ircode_arr.push(setMode(status.mode));                // data4 運転モード
    ircode_arr.push(setTemp(status.temp - 16));           // data5 設定温度
    ircode_arr.push(setData6(status.mode));               // data6 運転モードで変わる値
    ircode_arr.push(setWind(status.wind));                // data7 風量風向
    ircode_arr = ircode_arr.concat(Array(7).fill('00'));  // data8 ~ 14 (タイマーは別途使用)
    console.log(ircode_arr)
    ircode_arr.push(analyzeCD(ircode_arr));

    var ircode = '';
    for(v of ircode_arr){
        ircode += v;
    }
    console.log(ircode)


    return {"base_time": 435, "signal": [[8, 4], ircode, [1, 30], [8, 4], ircode, [1, 30]]};

};