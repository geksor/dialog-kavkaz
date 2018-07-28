function AgreBse() {
    this.head = 'Согласие на обработку персональных данных:';
    this.mail = '';
    this.orgName = '';
    this.ogrninn = '';
    this.adres = '';
    this.third = '';
}

AgreBse.prototype.render = function (lable_id) {
    this.text = 'Согласие на обработку персональных данных\n' +
        '\n' +
        'Настоящим в соответствии с Федеральным законом № 152-ФЗ «О персональных данных» от 27.07.2006 года свободно, ' +
        'своей волей и в своем интересе выражаю свое безусловное согласие на обработку моих персональных данных , ' +
        this.orgName + this.ogrninn +
        ' зарегистрированным в соответствии с законодательством РФ по адресу:\n' +
        this.adres + '(далее по тексту - Оператор).\n' +
        'Персональные данные - любая информация, относящаяся к определенному или определяемому на основании такой ' +
        'информации физическому лицу.\n' +
        'Настоящее Согласие выдано мною на обработку следующих персональных данных:\n' +
        '- Имя;\n' +
        '- Телефон;\n' +
        '- Дополнительная информация.\n' +
        '\n' +
        'Согласие дано Оператору для совершения следующих действий с моими персональными данными с использованием средств ' +
        'автоматизации и/или без использования таких средств: сбор, систематизация, накопление, хранение, уточнение ' +
        '(обновление, изменение), использование, обезличивание, а также осуществление любых иных действий, предусмотренных ' +
        'действующим законодательством РФ как неавтоматизированными, так и автоматизированными способами.\n' +
        'Данное согласие дается Оператору' + this.third + 'для обработки моих персональных данных в следующих целях:\n' +
        '- предоставление мне услуг/работ;\n' +
        '- направление в мой адрес уведомлений, касающихся предоставляемых услуг/работ;\n' +
        '- подготовка и направление ответов на мои запросы;\n' +
        '- направление в мой адрес информации, в том числе рекламной, о мероприятиях/товарах/услугах/работах Оператора.\n' +
        '\n' +
        'Настоящее согласие действует до момента его отзыва путем направления соответствующего уведомления на электронный ' +
        'адрес ' + this.mail + ' В случае отзыва мною согласия на обработку персональных данных Оператор вправе ' +
        'продолжить обработку персональных данных без моего согласия при наличии оснований, указанных в пунктах 2 – 11 ' +
        'части 1 статьи 6, части 2 статьи 10 и части 2 статьи 11 Федерального закона №152-ФЗ «О персональных данных» ' +
        'от 27.06.2006 г.';
    this.agre = '<div id="agre" class="agre_text">'+
            '<h2 class="h">'+this.head+'</h2>'+
            '<textarea disabled="disabled" class="text">'+this.text+'</textarea>'+
            '<div class="but_block row">'+
            '<div class="col-12 col-sm-6"><button id="agre_ok" class="button btn_form btn_agre">Принимаю</button></div>'+
            '<div class="col-12 col-sm-6"><button id="agre_no" class="button button_none btn_form btn_agre">Не принимаю</button></div>'+
        '</div>'+
        '</div>';
    jQuery(lable_id).after(this.agre);
};


function AgreAddCompInfo(name, email) {
    AgreBse.call(this);
    this.mail = email;
    this.orgName = name + ' ';
    this.ogrninn = '';
}

AgreAddCompInfo.prototype = Object.create(AgreBse.prototype);
AgreAddCompInfo.prototype.constructor = AgreAddCompInfo;
AgreAddCompInfo.prototype.addInnOgrn = function (my_inn, my_ogrn) {
    if (my_inn) {
        this.ogrninn = '(' + my_inn;
        (my_ogrn) ? this.ogrninn += ' ,' + my_ogrn + ')' : this.ogrninn += ')';
    }
};
AgreAddCompInfo.prototype.addAdres = function (my_adres) {
    this.adres = my_adres;
};
AgreAddCompInfo.prototype.addThird = function (a, b, c, d, e, f, g, h) {
    third = [
        a, b, c, d, e, f, g, h
    ];
    this.third = 'и третьему лицу(-ам)';
    for (var i = 0; i < third.length; i++) {
        if (third[i]) {
            if (third[i + 1]) {
                this.third += ' ' + third[i] + ',';
            }
            else {
                this.third += ' ' + third[i] + ' ';
            }
        }
    }
};

// agre = new AgreAddCompInfo('OOO Company', 'Company@comp.ru');
// agre.addInnOgrn('INN 000000000', 'OGRN 000000000');
// agre.addAdres('Stav city Ulica st. 00');
// agre.addThird('IP Ipeshnik', 'OOO OOOshnik', 'Roga i copita');

