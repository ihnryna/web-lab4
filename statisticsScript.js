import pizza_info from './Pizza_List.js';

let pizzasInfo = [];

for (let item in localStorage) {
    let name;
    let num = localStorage.getItem(item);
    let price;
    let a = 0;
    pizza_info.forEach(pizza => {
        if (pizza.small_size) {
            a++;
            if (a.toString()===item){
                name = pizza.title + " (Мала)";
                price = pizza.small_size.price;
            }
        }
        if (pizza.big_size) {
            a++;
            if (a.toString()===item){
                name = pizza.title + " (Велика)";
                price = pizza.big_size.price;
            }
        }
    });
    pizzasInfo.push({
        "Піца": name,
        "Кількість": parseInt(num),
        "Ціна": parseInt(price),
    });
    console.log(pizzasInfo);
}

const pivot = new WebDataRocks({
    container: "#wdr-component",
    toolbar: true,
    report: {
        dataSource: {
            data:pizzasInfo
        },
        "slice": {
            "rows": [
                {
                    "uniqueName": "Піца"
                }
            ],
            "columns": [
                {
                    "uniqueName": "Measures"
                }
            ],
            "measures": [
                {
                    "uniqueName": "Ціна",
                    "formula": "sum(\"Ціна\")",
                    "caption": "Ціна",
                    "format": "60v4i51g"
                },
                {
                    "uniqueName": "Кількість",
                    "formula": "sum(\"Кількість\")",
                    "caption": "Кількість"
                },
                {
                    "uniqueName": "Сума замовлення",
                    "formula": "sum(\"Кількість\") * sum(\"Ціна\") ",
                    "individual": true,
                    "caption": "Сума замовлення",
                    "format": "60v4iq3f"
                }
            ]
        },
        "formats": [
            {
                "name": "60v4i51g",
                "thousandsSeparator": " ",
                "decimalSeparator": ".",
                "currencySymbol": " грн",
                "currencySymbolAlign": "right",
                "nullValue": "",
                "textAlign": "right",
                "isPercent": false
            },
            {
                "name": "60v4iq3f",
                "thousandsSeparator": " ",
                "decimalSeparator": ".",
                "currencySymbol": " грн",
                "currencySymbolAlign": "right",
                "nullValue": "",
                "textAlign": "right",
                "isPercent": false
            }
        ]
    }
});