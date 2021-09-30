
var trainPower = 0,
    train_elm = '',
    buni_element = '',
    buni_star = 1,
    // bunicornPowerMultiplier = 1 + SUM(attribute * factor) / attributeBaseline
    // attributeBaseline = 500. This is the average attribute value of a Bunicorn.
    bunicornPowerMultiplier = 0,
    // playerBasePower=trainerPower∗bunicornPowerMultiplier
    playerBasePower = 0,
    attributeBaseline = 500;
// V2: https://forum.buni.finance/t/update-bunicorn-game-version-2/234
// update 29/09 
// https://forum.buni.finance/t/bunicorn-game-update-18-00-vnt-ngay-29-9-2021/267?fbclid=IwAR1ZmdmnTfVdE8R15B07N3CoC0ZQxb8W1fzS4i0AX8Eifqd8N7TvBRVArtA
var factor_Duplicate = 1.15,     // trainer same element with pet. Old val : 1.1
    factor_neutral = 1.07,      // old val: 1.05
    bonus_factor = 1.07,        // old val: 1.05
    factor_all = 1,             // old val 1 
    elementalBonus = 1
    ;

$(document).on('click', 'div.enemy-container', function () {
    // console.log('enemy-container clicked');
    calculatorWinRate();
})

// $('body').on('DOMSubtreeModified', 'div.list-enemies', function () {
//     console.log('div.list-enemies changed');
// });

function trainerSelected() {
    var _trainPower = 0;
    try {
        var trainPower_html_element = $("div.power-selected-trainer");
        if (trainPower_html_element.length > 1) {
            var _trainPower_Text = trainPower_html_element.last().text();
            _trainPower = _trainPower_Text.replace('Power: ', '');
            // console.log('trainPower: ' + _trainPower);
        } else {
            console.log("please choice Trainer!!!");
        }
    } catch (error) {
        console.log('trainerSelected error:' + error)
    }
    return _trainPower;
}

function getTrainerElement() {
    var t_elm = 'train_elm';
    var imgTag = $("img.selected-trainner-image");
    try {
        var imgLink = imgTag.first().attr('src');

        var imgStr = imgLink.split('/');
        if (imgStr.length > 0) {
            imgStr = imgStr[imgStr.length - 1];
        }
        // console.log('trainer imgStr:' + imgStr);
        if (imgStr.indexOf('fire') != -1) {
            t_elm = 'fire';
        }
        if (imgStr.indexOf('air') != -1) {
            t_elm = 'air';
        }
        if (imgStr.indexOf('water') != -1) {
            t_elm = 'water';
        }
        if (imgStr.indexOf('earth') != -1) {
            t_elm = 'earth';
        }
    } catch (error) {
        console.log('getTrainerElement error:' + error)
    }
    // console.log('trainer element:' + t_elm);
    return t_elm;
}

function getEnemyElement(src) {
    var t_elm = 'emy_elm';
    try {
        var imgStr = src.split('/');
        if (imgStr.length > 0) {
            imgStr = imgStr[imgStr.length - 1];
        }
        // console.log('trainer imgStr:' + imgStr);
        if (imgStr.indexOf('fire') != -1) {
            t_elm = 'fire';
        }
        if (imgStr.indexOf('air') != -1) {
            t_elm = 'air';
        }
        if (imgStr.indexOf('water') != -1) {
            t_elm = 'water';
        }
        if (imgStr.indexOf('earth') != -1) {
            t_elm = 'earth';
        }
    } catch (error) {
        console.log('getTrainerElement error:' + error)
    }
    // console.log('trainer element:' + t_elm);
    return t_elm;
}

function getBuniElement() {
    var b_elm = 'pet_elm';
    var buni_html_elm = $("img.selected-trainner-image");
    // console.log(buni_html_elm.last().attr('src'));
    try {
        var imgLink = buni_html_elm.last().attr('src');
        var imgStr = imgLink.split('/');
        if (imgStr.length > 0) {
            imgStr = imgStr[imgStr.length - 1];
        }
        imgStr = imgStr.split('_');
        if (imgStr.length >= 3) {
            buni_star = imgStr[2];
        }
        // console.log('buni_star ' + buni_star);
        imgLink = imgLink.toLowerCase();
        if (imgLink.indexOf('fire') != -1) {
            b_elm = 'fire';
        } if (imgLink.indexOf('earth') != -1) {
            b_elm = 'earth';
        }
        if (imgLink.indexOf('air') != -1) {
            b_elm = 'air';
        }
        if (imgLink.indexOf('water') != -1) {
            b_elm = 'water';
        }

        // console.log('buni_element: ' + _buni_element);
    } catch (error) {
        console.log("getBuniElement error:" + error)
    }
    return b_elm;
}

function calTrainerElementBonus(emy_elm) {
    var result = 0;
    if (train_elm == buni_element) {
        result = elementalBonus + 0.052;
    } else {
        result = elementalBonus;
    }
    // console.log('playElementBonus 1=' + result);
    emy_elm = emy_elm.toLowerCase();
    // console.log(train_elm + '-' + buni_element + '-' + emy_elm);
    switch (train_elm) {
        case 'fire':
            if (emy_elm == 'earth') { result += 0.052; }
            if (emy_elm == 'water') { result -= 0.052; }
            break;
        case 'earth':
            if (emy_elm == 'air') { result += 0.052; }
            if (emy_elm == 'fire') { result -= 0.052; }
            break;
        case 'air':
            if (emy_elm == 'water') { result += 0.052; }
            if (emy_elm == 'earth') { result -= 0.052; }
            break;
        case 'water':
            if (emy_elm == 'fire') { result + 0.052; }
            if (emy_elm == 'air') { result - 0.052; }
            break;
    }
    return result;
}

function calculatorWinRate() {
    try {
        trainPower = trainerSelected();
        train_elm = getTrainerElement();
        var buni_html_elm = $("img.selected-trainner-image");
        if (buni_html_elm.length > 1) {
            buni_element = getBuniElement();
            var buni_html_info_right = $("div.info-selected-bunicorn .right-info");
            // console.log(buni_html_info_right.html());
            // for one Element
            var buni_css_info_right_elm = buni_html_info_right.children().attr('class');
            var att_right_val_text = buni_html_info_right.last().text();
            att_right_val_text = att_right_val_text.toLowerCase().trim();

            // console.log('buni_css_info_right_elm: ' + buni_css_info_right_elm);
            // console.log('att_right_val_text: ' + att_right_val_text);
            // If Bunicorn has more Attribute us for Element of html for calculator
            var one_attr_elm = '', one_attr_val = 0, sum_pw = 0;

            if (buni_css_info_right_elm.indexOf('fire') != -1) {
                one_attr_elm = 'fire';
                att_right_val_text = att_right_val_text.toLowerCase();  // lowercase for replace
                one_attr_val = att_right_val_text.replace('fire +', '');
            }
            if (buni_css_info_right_elm.indexOf('air') != -1) {
                one_attr_elm = 'air';
                one_attr_val = att_right_val_text.replace('air +', '');
            }
            if (buni_css_info_right_elm.indexOf('water') != -1) {
                one_attr_elm = 'water';
                one_attr_val = att_right_val_text.replace('water +', '');
            }
            if (buni_css_info_right_elm.indexOf('earth') != -1) {
                one_attr_elm = 'earth';
                one_attr_val = att_right_val_text.replace('earth +', '');
            }
            if (buni_css_info_right_elm.indexOf('neutral') != -1) {
                one_attr_elm = 'neutral';
                one_attr_val = att_right_val_text.replace('neutral +', '');
            }
            //////////////// one_attr_val
            // console.log('buni_one_element_val: ' + one_attr_val);
            if (one_attr_elm == buni_element) {
                sum_pw += one_attr_val * factor_Duplicate;
            } else if (one_attr_elm == 'neutral') {
                sum_pw += one_attr_val * factor_neutral;
            } else {
                sum_pw += one_attr_val * factor_all;
            }
            // console.log('sum_pw= ' + sum_pw);
            /// bunicornPowerMultiplier
            bunicornPowerMultiplier = 1 + sum_pw / attributeBaseline;
            // console.log('bunicornPowerMultiplier: ' + bunicornPowerMultiplier);

            // playerBasePower
            playerBasePower = trainPower * bunicornPowerMultiplier;
            // console.log('playerBasePower:' + playerBasePower);

            // Get list Enemy
            var list_enemy = $('div.enemy');
            // console.log('------------Start------------------')
            if (!$('#info-win-lose-ext').length) {
                // if element not exits
                $('<div id="info-win-lose-ext" class="elements info-win-lose-ext"></div>').insertBefore('div.list-enemies');
            }
            $(list_enemy).each(function (idx) {
                // console.log(idx + ": " + $(this).html());
                // Enemy Element
                var emy_elm_link = $(this).find("div.enemy-img").find('img');
                emy_elm_link = emy_elm_link.attr('src');
                // console.log('elm_link: ' + emy_elm_link);
                emy_elm = getEnemyElement(emy_elm_link);
                // console.log('getEnemyElement: ' + emy_elm);

                var playElementBonus = calTrainerElementBonus(emy_elm);
                // console.log('playElementBonus: ' + playElementBonus);
                var playerBasePower_final = playerBasePower * playElementBonus;

                // var buni_html_info_left = $("div.info-selected-bunicorn .left-info");   // I not hava more Attribute
                var playPower_min = playerBasePower_final * 0.9;
                playPower_min = Math.round(playPower_min);
                var playPower_max = playerBasePower_final * 1.1;
                playPower_max = Math.round(playPower_max);
                // console.log('playPower_min: ' + playPower_min);
                // console.log('playPower_max: ' + playPower_max);

                var emy_power = $(this).find("div.encounter-power").text();
                emy_power = emy_power.toLowerCase();
                emy_power = emy_power.replace('power: ', '');
                // console.log('emy_power: ' + emy_power);

                var emy_Power_min = Math.round(emy_power * 0.9);
                var emy_Power_max = Math.round(emy_power * 1.1);

                var xp = $(this).find("div.xp-gain").text();
                // console.log("[" + index + "] " + emy_Power_min + " - " + emy_Power_max);

                var w = 0, l = 0;
                for (let pPow = playPower_min; pPow <= playPower_max; pPow++) {
                    for (let ePow = emy_Power_min; ePow <= emy_Power_max; ePow++) {
                        if (pPow > ePow) { w++ } else { l++ };
                    }
                }
                // var totalBattle = (playPower_max - playPower_min + 1) * (emy_Power_max - emy_Power_min + 1);    // totalBattle = win + lose
                // console.log('totalWar: ' + totalWar);
                // console.log('Win: ' + w);
                // console.log('lose: ' + l);
                var winRate = Math.round(w / (w + l) * 100);
                // console.log('Rate: ' + winRate + "%");
                // console.log('---------End-----------');
                // console.log("index [" + index + "] xp: " + xp);
                if (!$('#info-win-lose-ext-' + idx + '').length) {
                    $('div#info-win-lose-ext').append('<div id="info-win-lose-ext-' + idx + '" class="one-info"></div>');
                }
                $('div#info-win-lose-ext-' + idx + '').html('');  // Remove old calculator Rate
                var css_rate = 'low-win'
                if (winRate >= 90) {
                    css_rate = 'height-win'
                }
                $('div#info-win-lose-ext-' + idx + '').append('<span><b>You Pow: </b>' + playPower_min + ' -> ' + playPower_max + '</span>');
                $('div#info-win-lose-ext-' + idx + '').append('<span><b>Enemy Pow: </b>' + emy_Power_min + ' -> ' + emy_Power_max + '</span>');
                $('div#info-win-lose-ext-' + idx + '').append('<span><b>Win Rate: </b><el class="' + css_rate + '">' + winRate + '%</el> <el style="color:#28aafd">' + xp + '</el></span>');
                if (buni_star != undefined && buni_star > 0) {
                    var rewardGasOffset = 0.5, rewardBaseline = 0.4;
                    var rewardMultiplier = Math.sqrt(emy_power / 1000 * buni_star);
                    var reward = rewardGasOffset + rewardBaseline * rewardMultiplier;
                    reward = reward.toFixed(2);
                    $('div#info-win-lose-ext-' + idx + '').append('<span><b>Reward: ~</b>' + reward + '$</el> <el style="color:gold">(' + buni_star + '&#x2606)</el></span>');
                }
            });

        } else {
            console.log('you haven\'t selected bunicorn');
        }
    } catch (error) {
        console.log("calculator Rate error:" + error);
    }
}

