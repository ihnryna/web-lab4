import pizza_info from './Pizza_List.js';

let chosenFilter = document.getElementsByClassName("category-name chosen")[0];
const mapPizzas = new Map();
let a = 0;
pizza_info.forEach(pizza => {
    if (pizza.small_size) {
        a++;
        mapPizzas.set(a.toString(), pizza.small_size);
    }
    if (pizza.big_size) {
        a++;
        mapPizzas.set(a.toString(), pizza.big_size);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    uploadMenu();
    updateCart();
});

let n = 0;
window.uploadMenu = function uploadMenu() {
    pizza_info.forEach(pizza => {
        let newPizzaCard = document.createElement('div');
        newPizzaCard.className = "pizza-card";
        let newPizzaIcon = document.createElement('img');
        newPizzaIcon.src = pizza.icon;
        newPizzaIcon.alt = "Pizza";
        newPizzaIcon.className = "pizza-icon";
        newPizzaCard.append(newPizzaIcon);
        if (pizza.is_new) {
            let newLabel = document.createElement('span');
            newLabel.className = "label label-danger";
            newLabel.innerHTML = "Нова";
            newPizzaCard.append(newLabel);
        } else if (pizza.is_popular) {
            let newLabel = document.createElement('span');
            newLabel.className = "label label-popular";
            newLabel.innerHTML = "Популярна";
            newPizzaCard.append(newLabel);
        }

        let newCaption = document.createElement('div');
        newCaption.className = "caption";

        let title = document.createElement('span');
        title.className = "title";
        title.innerHTML = pizza.title;
        newCaption.append(title);

        let type = document.createElement('div');
        type.className = "type";
        type.innerHTML = pizza.type;
        newCaption.append(type);

        let description = document.createElement('div');
        description.className = "description";
        let isFirst = 1;
        for (let ingredientType in pizza.content) {
            let i = 0;
            while (i < pizza.content[ingredientType].length) {
                if (isFirst !== 1) {
                    description.append(", ");
                }
                description.append(pizza.content[ingredientType][i]);
                isFirst = 0;
                i++;
            }
        }
        newCaption.append(description);

        let sizes = document.createElement('div');
        sizes.className = "sizes";
        if (pizza.small_size && pizza.big_size) {
            let smallDescription = document.createElement('div');
            smallDescription.className = "small-description";
            createSmallDescription(pizza, smallDescription);
            sizes.append(smallDescription);

            let bigDescription = document.createElement('div');
            bigDescription.className = "big-description";
            createBigDescription(pizza, bigDescription);
            sizes.append(bigDescription);
        } else if (pizza.small_size) {
            let smallDescription = document.createElement('div');
            smallDescription.className = "small-description single";
            createSmallDescription(pizza, smallDescription);
            sizes.append(smallDescription);
        } else if (pizza.big_size) {
            let bigDescription = document.createElement('div');
            bigDescription.className = "big-description single";
            createBigDescription(pizza, bigDescription);
            sizes.append(bigDescription);
        }
        newCaption.append(sizes);
        newPizzaCard.append(newCaption);

        document.getElementById("pizza_list").append(newPizzaCard);
    })

}


function createSmallDescription(pizza, smallDescription) {
    let data = document.createElement('div');
    data.className = "data";

    let size = document.createElement('div');
    size.className = "size";
    let sizeIcon = document.createElement('img');
    sizeIcon.src = "assets/size-icon.svg";
    sizeIcon.alt = "Size icon";
    sizeIcon.className = "size-icon";
    size.append(sizeIcon);
    size.append(" ");
    size.append(pizza.small_size.size);
    data.append(size);

    let weight = document.createElement('div');
    weight.className = "weight";
    let weightIcon = document.createElement('img');
    weightIcon.src = "assets/weight.svg";
    weightIcon.alt = "Weight icon";
    weightIcon.className = "weight-icon";
    weight.append(weightIcon);
    weight.append(" ");
    weight.append(pizza.small_size.weight);
    data.append(weight);

    smallDescription.append(data);

    let prise = document.createElement('div');
    prise.className = "prise";
    let sum = document.createElement('div');
    sum.className = "sum";
    prise.append(sum);
    sum.append(pizza.small_size.price);
    let currency = document.createElement('div');
    currency.className = "currency";
    currency.innerHTML = "грн."
    prise.append(currency);

    smallDescription.append(prise);

    n++;
    let buttonBuy = document.createElement('button');
    buttonBuy.className = "btn btn-primary buy-small";
    buttonBuy.innerHTML = "Купити";
    buttonBuy.setAttribute("pizza-number-tooltip", n.toString());
    buttonBuy.setAttribute("onclick", "buy(this)");

    smallDescription.append(buttonBuy);
}

function createBigDescription(pizza, bigDescription) {
    let data = document.createElement('div');
    data.className = "data";

    let size = document.createElement('div');
    size.className = "size";
    let sizeIcon = document.createElement('img');
    sizeIcon.src = "assets/size-icon.svg";
    sizeIcon.alt = "Size icon";
    sizeIcon.className = "size-icon";
    size.append(sizeIcon);
    size.append(" ");
    size.append(pizza.big_size.size);
    data.append(size);

    let weight = document.createElement('div');
    weight.className = "weight";
    let weightIcon = document.createElement('img');
    weightIcon.src = "assets/weight.svg";
    weightIcon.alt = "Weight icon";
    weightIcon.className = "weight-icon";
    weight.append(weightIcon);
    weight.append(" ");
    weight.append(pizza.big_size.weight);
    data.append(weight);

    bigDescription.append(data);

    let prise = document.createElement('div');
    prise.className = "prise";
    let sum = document.createElement('div');
    sum.className = "sum";
    prise.append(sum);
    sum.append(pizza.big_size.price);
    let currency = document.createElement('div');
    currency.className = "currency";
    currency.innerHTML = "грн."
    prise.append(currency);

    bigDescription.append(prise);

    n++;
    let buttonBuy = document.createElement('button');
    buttonBuy.className = "btn btn-primary buy-big";
    buttonBuy.innerHTML = "Купити";
    buttonBuy.setAttribute("pizza-number-tooltip", n.toString());
    buttonBuy.setAttribute("onclick", "buy(this)");

    bigDescription.append(buttonBuy);
}

window.buy = function buy(source) {
    alert(source.getAttribute("pizza-number-tooltip"));
    if (localStorage.getItem(source.getAttribute("pizza-number-tooltip")) == null) {
        let pizzaSized = mapPizzas.get(source.getAttribute("pizza-number-tooltip"));
        let cartCell = document.createElement('div');
        cartCell.className = "cart-cell";
        cartCell.setAttribute("pizza-number", source.getAttribute("pizza-number-tooltip"));

        let info = document.createElement('div');
        info.className = "info";

        let pizzaName = document.createElement('div');
        pizzaName.className = "pizza-name";
        let pizzaType = document.createElement('div');
        pizzaType.className = "pizza-type";
        let pizzaIconSmall = document.createElement('img');
        pizzaIconSmall.className = "pizza-icon-small";
        let a = 0;
        pizza_info.forEach(pizza => {
            if (pizza.small_size) {
                a++;
                if (a.toString() === source.getAttribute("pizza-number-tooltip")) {
                    pizzaName.innerHTML = pizza.title + " ";
                    pizzaType.innerHTML = "(Мала)";
                    pizzaIconSmall.src = pizza.icon;
                }
            }
            if (pizza.big_size) {
                a++;
                if (a.toString() === source.getAttribute("pizza-number-tooltip")) {
                    pizzaName.innerHTML = pizza.title + " ";
                    pizzaType.innerHTML = "(Велика)";
                    pizzaIconSmall.src = pizza.icon;
                }
            }
        });
        pizzaName.append(pizzaType);
        info.append(pizzaName);

        let pizzaProperties = document.createElement('div');
        pizzaProperties.className = "pizza-properties";

        let sizeIcon = document.createElement('img');
        sizeIcon.className = "size-icon";
        sizeIcon.src = "assets/size-icon.svg";
        sizeIcon.alt = "Size icon";
        pizzaProperties.append(sizeIcon);

        let pizzaSize = document.createElement('span');
        pizzaSize.className = "pizza-size";
        pizzaSize.innerHTML = pizzaSized.size;

        pizzaProperties.append(" ");
        pizzaProperties.append(pizzaSize);

        let pizzaWeight = document.createElement('span');
        pizzaWeight.className = "pizza-weight";

        let weightIcon = document.createElement('img');
        weightIcon.className = "size-icon";
        weightIcon.src = "assets/weight.svg";
        weightIcon.alt = "Weight icon";
        pizzaWeight.append(weightIcon);
        pizzaWeight.append(" " + pizzaSized.weight);
        pizzaProperties.append(pizzaWeight);
        info.append(pizzaProperties);


        let result = document.createElement('div');
        result.className = "result";

        let total = document.createElement('div');
        total.className = "total";
        let totalCount = document.createElement('span');
        totalCount.className = "total-count";
        totalCount.innerHTML = pizzaSized.price;
        document.getElementsByClassName("bottom-sum")[0].innerHTML = parseInt(document.getElementsByClassName("bottom-sum")[0].innerHTML) + pizzaSized.price;

        total.append(totalCount);
        total.append("грн");
        result.append(total);

        let buttonMinus = document.createElement('button');
        buttonMinus.className = "minus-button";
        buttonMinus.innerHTML = "-";
        buttonMinus.setAttribute("pizza-number", source.getAttribute("pizza-number-tooltip"));
        buttonMinus.setAttribute("onclick", "minus(this)");
        result.append(buttonMinus);

        let productAmount = document.createElement('span');
        productAmount.className = "product-amount";
        productAmount.innerHTML = "1";
        result.append(productAmount);

        let buttonPlus = document.createElement('button');
        buttonPlus.className = "plus-button";
        buttonPlus.innerHTML = "+";
        buttonPlus.setAttribute("pizza-number", source.getAttribute("pizza-number-tooltip"));
        buttonPlus.setAttribute("onclick", "plus(this)");
        result.append(buttonPlus);

        let buttonDelete = document.createElement('button');
        buttonDelete.className = "delete-button";
        buttonDelete.innerHTML = "&#215";
        buttonDelete.setAttribute("pizza-number", source.getAttribute("pizza-number-tooltip"));
        buttonDelete.setAttribute("onclick", "deletePizza(this)");
        result.append(buttonDelete);
        info.append(result);
        cartCell.append(info);


        pizzaIconSmall.alt = "Pizza";
        cartCell.append(pizzaIconSmall);

        localStorage.setItem(source.getAttribute("pizza-number-tooltip"), 1);
        document.getElementsByClassName("cells")[0].append(cartCell);

    } else {
        let number = source.getAttribute("pizza-number-tooltip");
        let pizzaSized = mapPizzas.get(number);

        for (let cell of document.getElementsByClassName("cells")[0].children) {
            if (cell.className === "cart-cell" && cell.getAttribute("pizza-number") === number) {
                let amount = cell.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling;
                amount.innerHTML = (parseInt(amount.innerHTML) + parseInt("1")).toString();
                document.getElementsByClassName("bottom-sum")[0].innerHTML = parseInt(document.getElementsByClassName("bottom-sum")[0].innerHTML) + pizzaSized.price;
                cell.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.firstElementChild.innerHTML = ((parseInt(amount.innerHTML) * pizzaSized.price)).toString();
                localStorage.setItem(cell.getAttribute("pizza-number"), parseInt(localStorage.getItem(cell.getAttribute("pizza-number"))) + 1);
            }
        }
    }
    document.getElementsByClassName("amount")[0].innerHTML = (parseInt(document.getElementsByClassName("amount")[0].innerHTML) + parseInt("1")).toString();
}

window.minus = function minus(s) {
    if (s.nextElementSibling.innerHTML !== "1") {
        s.nextElementSibling.innerHTML = (parseInt(s.nextElementSibling.innerHTML) - parseInt("1")).toString();
        s.previousElementSibling.firstElementChild.innerHTML = (parseInt(s.previousElementSibling.firstElementChild.innerHTML) - parseInt(mapPizzas.get(s.getAttribute("pizza-number")).price)).toString();
        localStorage.setItem(s.getAttribute("pizza-number"), (parseInt(localStorage.getItem(s.getAttribute("pizza-number"))) - 1).toString());
    } else if (s.nextElementSibling.innerHTML === "1") {
        s.parentNode.parentNode.parentNode.parentNode.removeChild(s.parentNode.parentNode.parentNode);
        localStorage.removeItem(s.getAttribute("pizza-number"));
    }
    document.getElementsByClassName("bottom-sum")[0].innerHTML = parseInt(document.getElementsByClassName("bottom-sum")[0].innerHTML) - parseInt(mapPizzas.get(s.getAttribute("pizza-number")).price);
    document.getElementsByClassName("amount")[0].innerHTML = parseInt(document.getElementsByClassName("amount")[0].innerHTML) - parseInt("1");
}

window.plus = function plus(s) {
    s.previousElementSibling.innerHTML = parseInt(s.previousElementSibling.innerHTML) + parseInt("1");
    s.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.innerHTML = parseInt(s.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.innerHTML) + parseInt(mapPizzas.get(s.getAttribute("pizza-number")).price);
    localStorage.setItem(s.getAttribute("pizza-number"), parseInt(localStorage.getItem(s.getAttribute("pizza-number"))) + 1);
    document.getElementsByClassName("bottom-sum")[0].innerHTML = parseInt(document.getElementsByClassName("bottom-sum")[0].innerHTML) + parseInt(mapPizzas.get(s.getAttribute("pizza-number")).price);
    document.getElementsByClassName("amount")[0].innerHTML = parseInt(document.getElementsByClassName("amount")[0].innerHTML) + parseInt("1");
}

window.deletePizza = function deletePizza(s) {
    document.getElementsByClassName("bottom-sum")[0].innerHTML = parseInt(document.getElementsByClassName("bottom-sum")[0].innerHTML) - parseInt(mapPizzas.get(s.getAttribute("pizza-number")).price) * parseInt(s.previousElementSibling.previousElementSibling.innerHTML);
    document.getElementsByClassName("amount")[0].innerHTML = parseInt(document.getElementsByClassName("amount")[0].innerHTML) - parseInt(s.previousElementSibling.previousElementSibling.innerHTML);
    s.parentNode.parentNode.parentNode.parentNode.removeChild(s.parentNode.parentNode.parentNode);
    localStorage.removeItem(s.getAttribute("pizza-number"));
}

window.filter = function filter(property, s) {
    chosenFilter.className = "category-name";
    s.className = "category-name chosen";
    chosenFilter = s;
    //document.getElementById("pizza_list").innerHTML = "";
    let current = 0;
    let shownPizzas = 0;

    pizza_info.forEach(pizza => {
        let condition;
        switch (property) {
            case "all" : condition = true; break;
            case "meat" : condition = pizza.content.meat; break;
            case "pineapple" : condition = pizza.content.pineapple; break;
            case "mushroom" : condition = pizza.content.mushroom; break;
            case "ocean" : condition = pizza.content.ocean; break;
            case "vega" : condition = !pizza.content.meat && !pizza.content.ocean; break;
        }
        if (condition) {
            document.getElementsByClassName("pizza-card")[current].style.display = 'inline-block';
            shownPizzas ++;
        } else {
            document.getElementsByClassName("pizza-card")[current].style.display = 'none';
        }
        document.getElementsByClassName("amount-menu")[0].innerHTML=shownPizzas.toString();
        current++;
    })
}


window.clean = function clean() {
    localStorage.clear();
    updateCart();
}

window.updateCart = function updateCart() {
    document.getElementsByClassName("cells")[0].innerHTML = "";
    document.getElementsByClassName("bottom-sum")[0].innerHTML = "0";
    document.getElementsByClassName("amount")[0].innerHTML = "0";
    for (let item in localStorage) {
        let a = 0;
        pizza_info.forEach(pizza => {
            if (pizza.small_size) {
                a++;
                if (item === a.toString()) {

                    let cartCell = document.createElement('div');
                    cartCell.className = "cart-cell";
                    cartCell.setAttribute("pizza-number", item);

                    let info = document.createElement('div');
                    info.className = "info";

                    let pizzaName = document.createElement('div');
                    pizzaName.className = "pizza-name";
                    pizzaName.innerHTML = pizza.title + " ";
                    let pizzaType = document.createElement('div');
                    pizzaType.className = "pizza-type";
                    pizzaType.innerHTML = "(Мала)";
                    let pizzaIconSmall = document.createElement('img');
                    pizzaIconSmall.className = "pizza-icon-small";
                    pizzaIconSmall.src = pizza.icon;
                    pizzaName.append(pizzaType);
                    info.append(pizzaName);

                    let pizzaProperties = document.createElement('div');
                    pizzaProperties.className = "pizza-properties";

                    let sizeIcon = document.createElement('img');
                    sizeIcon.className = "size-icon";
                    sizeIcon.src = "assets/size-icon.svg";
                    sizeIcon.alt = "Size icon";
                    pizzaProperties.append(sizeIcon);

                    let pizzaSize = document.createElement('span');
                    pizzaSize.className = "pizza-size";
                    pizzaSize.innerHTML = pizza.small_size.size;

                    pizzaProperties.append(" ");
                    pizzaProperties.append(pizzaSize);

                    let pizzaWeight = document.createElement('span');
                    pizzaWeight.className = "pizza-weight";

                    let weightIcon = document.createElement('img');
                    weightIcon.className = "size-icon";
                    weightIcon.src = "assets/weight.svg";
                    weightIcon.alt = "Weight icon";
                    pizzaWeight.append(weightIcon);
                    pizzaWeight.append(" " + pizza.small_size.weight);
                    pizzaProperties.append(pizzaWeight);
                    info.append(pizzaProperties);


                    let result = document.createElement('div');
                    result.className = "result";

                    let total = document.createElement('div');
                    total.className = "total";
                    let totalCount = document.createElement('span');
                    totalCount.className = "total-count";
                    totalCount.innerHTML = pizza.small_size.price * parseInt(localStorage.getItem(item));
                    document.getElementsByClassName("bottom-sum")[0].innerHTML = parseInt(document.getElementsByClassName("bottom-sum")[0].innerHTML) + pizza.small_size.price * parseInt(localStorage.getItem(item));

                    total.append(totalCount);
                    total.append("грн");
                    result.append(total);

                    let buttonMinus = document.createElement('button');
                    buttonMinus.className = "minus-button";
                    buttonMinus.innerHTML = "-";
                    buttonMinus.setAttribute("pizza-number", item);
                    buttonMinus.setAttribute("onclick", "minus(this)");
                    result.append(buttonMinus);

                    let productAmount = document.createElement('span');
                    productAmount.className = "product-amount";
                    productAmount.innerHTML = parseInt(localStorage.getItem(item));
                    result.append(productAmount);

                    let buttonPlus = document.createElement('button');
                    buttonPlus.className = "plus-button";
                    buttonPlus.innerHTML = "+";
                    buttonPlus.setAttribute("pizza-number", item);
                    buttonPlus.setAttribute("onclick", "plus(this)");
                    result.append(buttonPlus);

                    let buttonDelete = document.createElement('button');
                    buttonDelete.className = "delete-button";
                    buttonDelete.innerHTML = "&#215";
                    buttonDelete.setAttribute("pizza-number", item);
                    buttonDelete.setAttribute("onclick", "deletePizza(this)");
                    result.append(buttonDelete);
                    info.append(result);
                    cartCell.append(info);


                    pizzaIconSmall.alt = "Pizza";
                    cartCell.append(pizzaIconSmall);

                    document.getElementsByClassName("cells")[0].append(cartCell);
                    document.getElementsByClassName("amount")[0].innerHTML = (parseInt(document.getElementsByClassName("amount")[0].innerHTML) + parseInt(localStorage.getItem(item))).toString();

                }
            }
            if (pizza.big_size) {
                a++;
                if (item === a.toString()) {

                    let cartCell = document.createElement('div');
                    cartCell.className = "cart-cell";
                    cartCell.setAttribute("pizza-number", item);

                    let info = document.createElement('div');
                    info.className = "info";

                    let pizzaName = document.createElement('div');
                    pizzaName.className = "pizza-name";
                    pizzaName.innerHTML = pizza.title + " ";
                    let pizzaType = document.createElement('div');
                    pizzaType.className = "pizza-type";
                    pizzaType.innerHTML = "(Велика)";
                    let pizzaIconSmall = document.createElement('img');
                    pizzaIconSmall.className = "pizza-icon-small";
                    pizzaIconSmall.src = pizza.icon;
                    pizzaName.append(pizzaType);
                    info.append(pizzaName);

                    let pizzaProperties = document.createElement('div');
                    pizzaProperties.className = "pizza-properties";

                    let sizeIcon = document.createElement('img');
                    sizeIcon.className = "size-icon";
                    sizeIcon.src = "assets/size-icon.svg";
                    sizeIcon.alt = "Size icon";
                    pizzaProperties.append(sizeIcon);

                    let pizzaSize = document.createElement('span');
                    pizzaSize.className = "pizza-size";
                    pizzaSize.innerHTML = pizza.big_size.size;

                    pizzaProperties.append(" ");
                    pizzaProperties.append(pizzaSize);

                    let pizzaWeight = document.createElement('span');
                    pizzaWeight.className = "pizza-weight";

                    let weightIcon = document.createElement('img');
                    weightIcon.className = "size-icon";
                    weightIcon.src = "assets/weight.svg";
                    weightIcon.alt = "Weight icon";
                    pizzaWeight.append(weightIcon);
                    pizzaWeight.append(" " + pizza.big_size.weight);
                    pizzaProperties.append(pizzaWeight);
                    info.append(pizzaProperties);


                    let result = document.createElement('div');
                    result.className = "result";

                    let total = document.createElement('div');
                    total.className = "total";
                    let totalCount = document.createElement('span');
                    totalCount.className = "total-count";
                    totalCount.innerHTML = (pizza.big_size.price * parseInt(localStorage.getItem(item))).toString();
                    document.getElementsByClassName("bottom-sum")[0].innerHTML = parseInt(document.getElementsByClassName("bottom-sum")[0].innerHTML) + pizza.big_size.price * parseInt(localStorage.getItem(item));

                    total.append(totalCount);
                    total.append("грн");
                    result.append(total);

                    let buttonMinus = document.createElement('button');
                    buttonMinus.className = "minus-button";
                    buttonMinus.innerHTML = "-";
                    buttonMinus.setAttribute("pizza-number", item);
                    buttonMinus.setAttribute("onclick", "minus(this)");
                    result.append(buttonMinus);

                    let productAmount = document.createElement('span');
                    productAmount.className = "product-amount";
                    productAmount.innerHTML = localStorage.getItem(item);
                    result.append(productAmount);

                    let buttonPlus = document.createElement('button');
                    buttonPlus.className = "plus-button";
                    buttonPlus.innerHTML = "+";
                    buttonPlus.setAttribute("pizza-number", item);
                    buttonPlus.setAttribute("onclick", "plus(this)");
                    result.append(buttonPlus);

                    let buttonDelete = document.createElement('button');
                    buttonDelete.className = "delete-button";
                    buttonDelete.innerHTML = "&#215";
                    buttonDelete.setAttribute("pizza-number", item);
                    buttonDelete.setAttribute("onclick", "deletePizza(this)");
                    result.append(buttonDelete);
                    info.append(result);
                    cartCell.append(info);


                    pizzaIconSmall.alt = "Pizza";
                    cartCell.append(pizzaIconSmall);

                    document.getElementsByClassName("cells")[0].append(cartCell);
                    document.getElementsByClassName("amount")[0].innerHTML = (parseInt(document.getElementsByClassName("amount")[0].innerHTML) + parseInt(localStorage.getItem(item))).toString();

                }
            }

        });
    }
}


