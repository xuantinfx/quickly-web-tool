console.log('lich_su_dat_mon_now.js');

const getToken = () => {
  return new Promise((resolve) => {
    const DB_NAME = 'localforage';
    const DB_VERSION = 2; // Use a long long for this value (don't use a float)
    const DB_STORE_NAME = 'keyvaluepairs';

    console.log("openDb ...");
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onsuccess = function (evt) {
      // Equal to: db = req.result;
      const db = this.result;
      console.log("openDb DONE");
      const tx = db.transaction(DB_STORE_NAME, 'readonly');
      const store = tx.objectStore(DB_STORE_NAME);
      const req2 = store.get('reduxPersist:auth');
      req2.onsuccess = function(evt) {
        const value = evt.target.result;
        if (value) {
          resolve(JSON.parse(value).token);
        }
      };
      req2.onerror = function (evt) {
        console.error("openDb:", evt.target.errorCode);
      };
    };
    req.onerror = function (evt) {
      console.error("openDb:", evt.target.errorCode);
    };
  });
};

const displayMoney = async () => {
  console.log('displayMoney');
  const allRows = document.querySelectorAll('.history-table-row');
  const currentUserName = document.querySelector('#user-dropdown > span').innerText;
  const token = await getToken();
  for (let i = 1; i < allRows.length; i++) {
    const row = allRows[i];
    const rowId = row.querySelector('.history-table-cell strong').innerText;
    const res = await fetch(`https://gappapi.deliverynow.vn/api/order/get_single_group_detail?order_code=${rowId}`, {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9,vi-VN;q=0.8,vi;q=0.7",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "x-foody-access-token": token,
        "x-foody-api-version": "1",
        "x-foody-app-type": "1004",
        "x-foody-client-id": "",
        "x-foody-client-language": "vi",
        "x-foody-client-type": "1",
        "x-foody-client-version": "3.0.0"
      },
      "referrer": "https://www.now.vn/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": null,
      "method": "GET",
      "mode": "cors",
      "credentials": "omit"
    });
    const resJson = await res.json();
    const userOrders = resJson.reply.order_items[0].orders.user_order;
    const currentUserMoney = userOrders.find(userOrder => userOrder.user.name === currentUserName);
    const mustPay = currentUserMoney.must_pay_amount.text;

    const newNode = document.createElement('div');
    newNode.className = 'history-table-celclassNametory-table-col8';
    newNode.id = `${rowId}-current-user-money`;
    newNode.innerText = mustPay;

    const oldObj = document.getElementById(newNode.id);
    if (oldObj) {
      oldObj.remove();
    }
    row.appendChild(newNode)
  }
};

let searchButton;
let pagination;

const clickFunction = () => {
  console.log('click');
  setTimeout(() => {
    displayMoney();
    registerEvent();
  }, 2000)
};

const registerEvent = function () {
  const oldListElement = [searchButton, ...pagination];
  oldListElement.map(element => {
    if (element) {
      console.log('remove event click', element);
      element.removeEventListener("click", clickFunction);
    }
  });
  searchButton = document.querySelector('#app > div > div.block-section > div > div.history-table-container > div.filter-table > div:nth-child(4) > button');
  pagination = document.querySelectorAll('#app > div > div.block-section > div > div.history-table-container > ul > li');
  const newListElement = [searchButton, ...pagination];
  newListElement.map((element) => {
    if (element) {
      console.log('add event click', element);
      element.addEventListener('click', clickFunction);
    }
  });
};

const main = () => {
  displayMoney();
  searchButton = document.querySelector('#app > div > div.block-section > div > div.history-table-container > div.filter-table > div:nth-child(4) > button');
  pagination = document.querySelectorAll('#app > div > div.block-section > div > div.history-table-container > ul > li');
  registerEvent();
};

setTimeout(main, 2000);
