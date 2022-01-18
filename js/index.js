const productArr={
    "donut1" : {'name':"소금우유",'count':0,'price':2810 },
    "donut2" : {'name':'초코후로스티드','count':0,'price':2930 },
    "donut3" : {'name':'글레이즈드','count':0,'price':3270 },
    "donut4" : {'name':'초코바나나','count':0,'price':2250 },
    "donut5" : {'name':'바바리안필드','count':0,'price':3340 },
    "donut6" : {'name':'사빠딸','count':0,'price':2510 },
    "donut7" : {'name':'먼치킨','count':0,'price':4890 },
    "donut8" : {'name':'초코칩머핀','count':0,'price':4150 },
    "donut9" : {'name':'솔티카라멜','count':0,'price':3010 } 
};

function orderList(productName,productPrice){
    $.each(productArr, function(index, item){
            if(productName == item.name){
                //누른 것과 productArr의 index(ex도넛1) 둘이 매치가 될 경우
                if(item.count == 0){
                    item.count = countPlus(item.count);
                    let tempStringS = `
                        <section>
                                <span class="product_name">${productName}</span>
                                <div class="list_count_btn" id="${index}">
                                    <span id="minus_btn" class="${index}_minus_btn">-</span>
                                    <span class="product_count">${item.count}</span>
                                    <span id="plus_btn" class="${index}_plus_btn">+</span>
                                </div>
                                <div class="product_price_wrap" id="${index}">
                    `;
                    tempStringS+=`<span class="product_total_price">`;
                    tempStringS+=commaFunc(productPrice)+'</span>';

                    tempStringS+=`
                    
                                    <span>원</span>
                                    <span id="del_btn" class="${index}_del_btn">X</span>
                                </div>
                        </section>
                    `;
                    $('.list_product').append(tempStringS);

                }else if(item.count>0){
                    //카운트증가
                    this.count = countPlus(this.count);

                    //겨산한걸 담기
                    let productPriceT = orderPrice(item.count, item.price);
                    
                    //증가한걸넣기
                    $('#'+index+'>.product_count').html(this.count);
                    $('#'+index+'+ div > .product_total_price').html(commaFunc(productPriceT));
                }
            }             
    });
    totalCountFunc();
    totalPriceFunc();
}

//더하기 빼기 함수
function plusMinusFunc(eID, thisId, targetCN){
    switch(eID){
        case 'plus_btn':
            // e.target id 가 플러스인 경아
            $.each(productArr, function(index, item){
                if(index == thisId){
                    // index == donut1 과 방금 누른 아이디가 donut1이 같은경우
                    // count를 증가시킴
                    // 개수와 가격을 productPriceT 담음
                    this.count = countPlus(this.count);
                    let productPriceT = orderPrice(item.count, item.price);
                    $('#'+index+'>.product_count').html(this.count);
                    $('#'+index+'+ div > .product_total_price').html(commaFunc(productPriceT));
                }
            });
        break;

        case 'minus_btn':
            $.each(productArr, function(index, item){
                if(index == thisId){
                    if(this.count > 1){
                        this.count = countMinu(this.count);
                        let productPriceT = orderPrice(item.count, item.price);

                        $('#'+index+'>.product_count').html(this.count);
                        $('#'+index+'+ div > .product_total_price').html(commaFunc(productPriceT));
                    }else{
                        // 0이되니까 삭제해야됨
                        this.count = countMinu(this.count);
                        // console.log(this.count);
                        $('.'+targetCN).parent().parent().remove();
                    }
                }
            });
        break;

        case 'del_btn':
            $.each(productArr, function(index, item){
                if(index == thisId){
                    this.count = delCount(this.count);
                    let productPriceT = orderPrice(item.count, item.price);
                    console.log(targetCN);
                    $('.'+targetCN).parent().parent().remove();
                }
            });
        break;

    }
    totalCountFunc();
    totalPriceFunc();
}

// --------------------------------------------------------------------------->   함수 모음 Start
//카운트 올려주는 함수
function countPlus(count){
    count++;
    return count;
}
// 카운트 내리는 함수
function countMinu(count){
    count--;
    return count;
}
//카운터 0으로 만들어주는 함수 삭제 버튼
function delCount(count){
    count = 0;
    return count;
}

// 개별 가격 겨산하는 함수
function orderPrice(count, price){
    orderpay = count*price
    return orderpay
}


// 뒤에서 세번째에 , 붙히는 정규식
function commaFunc(target_number){
    let temp_target = String(target_number);
    let comma_regex = /\B(?=(\d{3})+(?!\d))/g;
    return temp_target.replace(comma_regex,",");
}
//콤마 숫자로 변환 ㅠㅠ
function stringNumberToInt(stringNumber){
    return parseInt(stringNumber.replace(/,/g , ''));
}

// 전체 카운터 계산하는 함수
function totalCountFunc(){
    let productCountClass = document.getElementsByClassName('product_count');
    let tempF =[];
    for(let i =0; i<productCountClass.length;i++){
        tempF.push(parseInt(productCountClass[i].innerHTML));
        // console.log(tempF);
    }
    if(tempF != 0){
        const totalCount = tempF.reduce((a,b) => (a+b));
        $('.total_count').html(totalCount);    
    }else if(tempF == 0){
        $('.total_count').html(0);
    }
}
// 전체 금액 계산하는 함수
function totalPriceFunc(){
    let productTotalPriceClass = document.getElementsByClassName('product_total_price');
    let tempF =[];
    for(let i =0; i<productTotalPriceClass.length;i++){
        tempF.push(stringNumberToInt(productTotalPriceClass[i].innerHTML));
    }
    if(tempF != 0){
        const totalPrice = tempF.reduce((a,b) => (a+b));
        $('.total_price').html(commaFunc(totalPrice));
    }else if(tempF == 0){
        $('.total_price').html(0);
    }
    $('.totalAmount').val(stringNumberToInt($('.total_price').html())); //지불 할 금액
}


//지불 금액한 넣어주는 함수
function moneyPayment(moneyKind){
    $('.total_money').text(commaFunc(stringNumberToInt($('.total_money').text()) + stringNumberToInt(moneyKind)));
}

function changeCalculator(totalAmount,totalPay){
    let change = totalPay-totalAmount;

    let moneyArray = document.getElementsByClassName('moneyChange');
    let moneyKindArray = [50000,10000,5000,1000,500,100,50,10];

    for(let i =0; i<moneyKindArray.length;i++){
        moneyArray[i].innerHTML= moneykindFunc(moneyKindArray[i]);
    }

    function moneykindFunc(moneyKind){
        tempMoney=Math.floor(change/moneyKind);
        change = change-moneyKind*tempMoney;
        
        return tempMoney
    }
}
//팝업 function
function popupFunc(result, htmlText){
    switch(result){
        case 'success':
            $('.popupbg').css('display','block');
            $('.change_popup_wrap').css('display','block');
        break;
        case 'fail':
            $('.popupbg').css('display','block');
            $('.popup_text').css('display','block');
            $('.popup_text > span').html(htmlText);
        break;
        case 'overMoney':
            $('.popupbg').css('display','block');
            $('.popup_text').css('display','block');
            $('.popup_text > span').html(htmlText);
            $('.popup_text > .close_btn').addClass(result);
        break;
    }

}

// --------------------------------------------------------------------------->  함수 모음 END



// --------------------------------------------------------------------------->  바로 실행 Start
$(function(){ 
    $('.clickEventClass').on('click',function(){
        let productName = $(this).children('.img_wrap + li').children('span').html();
        let productPrice = $(this).children('.img_wrap + li').next('li').children('span').html();
        
        // 부모의 아이디 읽어옴 orderlist에서 ${index}넣은 이유
        orderList(productName,productPrice);
    });

    // 돈 눌렀을 때
    $('.moneyKind').on('click',function(){
        moneyPayment($(this).html());
        $('.totalPay').val(stringNumberToInt($('.total_money').text())); // 지불 한 금액
    });

    // 지불 버튼 눌렀을 때 유효성
    $('.payment_btn').on("click",function(){
        let totalAmount = parseInt($('.totalAmount').val());
        let totalPay =  parseInt($('.totalPay').val());
        let changeMoney = commaFunc(totalPay-totalAmount);
        $('.changeMoneySpan').html(changeMoney);

        if(isNaN(totalAmount) || totalAmount ==0){
            popupFunc('fail','물건을 선택해주세요.');
        }else if(isNaN(totalPay) || totalPay ==0){
            popupFunc('fail','돈을 지불해주세요.');
        }else if(totalAmount > totalPay){
            popupFunc('fail','지불 가격이 부족합니다.'); //물건 값 보다 적게 줬을 때
        }else if(totalPay-totalAmount > 50000){
            popupFunc('overMoney','지불한 금액이 너무 많습니다.'); // 물건 값 보다 50000원 더 줬을 때
        }else if(totalAmount < totalPay){
            changeCalculator(totalAmount,totalPay);
            popupFunc('success');
        }else if(totalAmount == totalPay){
            changeCalculator(totalAmount,totalPay);
            popupFunc('success');
        }
    });
    // 초기화 버튼
    $('.clear_btn').on('click',function(){
        $.each(productArr, function(index,item){
            item.count=0;
        });
        $('.list_product').html('');
        $('.total_count').html(0);
        $('.total_price').html(0);
        $('.total_money').html(0);
        $('.totalAmount').val(0);
        $('.totalPay').val(0);
        $('.close_btn').removeClass("overMoney");

    });

    // 플러스 마이너스 버튼 눌렀을 때
    $(document).on('click',function(e){
        if (e.target.id =='plus_btn' || e.target.id =='minus_btn' ||  e.target.id =='del_btn'){
            // 누른거의 클래스 네임을 읽어옴
            // 부모의 아이디 읽어옴 orderlist에서 ${index}넣은 이유
            let targetCN = e.target.className;
            let thisId = $('.'+targetCN).parent().attr('id');
            plusMinusFunc(e.target.id,thisId,targetCN); //플마 계산 함수 호출
        }
    });
    
    $('.close_btn').on("click",function(){
        if($(this).hasClass("overMoney")){
            $('.total_money').html(0);
            $('.totalPay').val(0);
        };
        $(this).parent().css("display","none");
        $(this).parent().next().css("display","none");
        $('.popupbg').css('display','none');
        
    });
    $('.reset_btn').on('click',function(){
        location.href="./index.html";
    });

    // 물건 이미지
    function imgBGFuc(){
        const imgArr=['donut1','donut2','donut3','donut4','donut5','donut6','donut7','donut8','donut9'];
        let imgDiv = document.getElementsByClassName('img_wrap');
        imgArr.forEach(function(imgName,index){
            // console.log(imgName);
            // console.log(index);
            imgDiv[index].style.backgroundImage= "url('./img/"+imgName+".png')";
            
        });
    }imgBGFuc();
});
// --------------------------------------------------------------------------->  바로 실행 END