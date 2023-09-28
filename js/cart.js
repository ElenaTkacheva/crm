'use strict';

import { goods } from './goods.js';

const productModal = document.querySelector('.overlay');
const cartTableBody = document.querySelector('.table__body');

productModal.remove('active');

const clearTable = (cartTableBody) => {
  while (cartTableBody.firstChild) {
    cartTableBody.firstChild.remove();
  }
};

clearTable(cartTableBody);

const setAttributes = (el, obj) => {
  const possibleAttributes = [
    "className",
    "textContent",
    "type",
    "name",
    "id",
    "href"
  ];
  const attributeKeys = Object.keys(obj);

  for (const key of attributeKeys) {

    if (possibleAttributes.includes(key)) {
      el[key] = obj[key];
    }

    if (key === "innerHTML") {
        el.innerHTML = obj[key];
    }

  }
};

const setRelatives = (el, obj) => {
  const relativesKeys = Object.keys(obj);

  for (const key of relativesKeys) {

    if (key === "parrent") {
      obj[key].append(el);
    }

    if (key === "appends") {
      obj[key].forEach((item) => el.append(item));
    }

  }
};

const createElement = (elem, attributes, relatives) => {
  const el = document.createElement(elem);

  if (attributes) {
    setAttributes(el, attributes);
  }

  if (relatives) {
    setRelatives(el, relatives);
  }

  return el;
};

window.createElement = createElement;

const createRow = (obj, count) => {

  const tableRow = createElement(
    "tr",
    {},
    {
      appends: [
        createElement("td", {
          className: "table__cell",
          textContent: count,
        }),
        createElement("td", {
          className: "table__cell table__cell_left table__cell_name",
          dataset: ["id", obj.id],
          innerHTML: `<span class="table__cell-id">id: ${obj.id}</span>${obj.title}`,
        }),
        createElement("td", {
          className: "table__cell table__cell_left",
          textContent: obj.category,
        }),
        createElement("td", {
          classList: "table__cell",
          textContent: obj.units,
        }),
        createElement("td", {
          className: "table__cell",
          textContent: obj.count,
        }),
        createElement("td", {
          className: "table__cell",
          textContent: `$${obj.price}`,
        }),
        createElement("td", {
          className: "table__cell",
          textContent: `$${obj.count * obj.price}`,
        }),
        createElement(
          "td",
          {
            className: "table__cell table__cell_btn-wrapper",
          },
          {
            appends: [
              createElement("button", {
                className: "table__btn table__btn_pic",
              }),
              createElement("button", {
                className: "table__btn table__btn_edit",
              }),
              createElement("button", {
                className: "table__btn table__btn_del",
              }),
            ],
          }
        ),
      ],
    }
  );

  return tableRow;
};

const renderGoods = (goods, cartTableBody) => {
  goods.forEach((item, i) => {
    cartTableBody.insertAdjacentElement("beforeend", createRow(item, i + 1 ));
  });
};

renderGoods(goods, cartTableBody);