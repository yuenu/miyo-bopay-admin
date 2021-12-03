let orderInfoDefault = {
  status: "unpaid",
  order_id: "OvDbxaEjPNB05kQzyWeQJYlwMR1md3",
  order_no: "12110171706150227065237",
  userid: "1343",
  amount: 45600,
  currency: "RMB",
  expired_at: "2021-10-18T01:21:15+08:00",
  credential: {
    v: 2,
    data: {
      name: "李欣欣",
      account: "6228488888888888888",
      sub_bank: "琼海支行",
      bank_code: "ABC",
      open_bank: "中国农业银行",
    },
    meta: {},
    type: "card",
  },
};
async function handleGetInfo() {
  const order_no = new URL(window.location).searchParams.get("order_no");
  const res = await fetch("/payments/orders?order_no=" + order_no);
  console.log(res);
  return res.json();
}
async function init() {
  const orderInfo = handleGetInfo() || orderInfoDefault;
  document.getElementById("bank-amount").innerHTML = orderInfo.amount;
  document.getElementById("bank-order_no").innerHTML = orderInfo.order_no;
  document.getElementById("bank-name").innerHTML =
    orderInfo.credential.data.name;
  document.getElementById("bank-account").innerHTML =
    orderInfo.credential.data.account;
  document.getElementById("bank-open_bank").innerHTML =
    orderInfo.credential.data.open_bank;
  document.getElementById("bank-sub_bank").innerHTML =
    orderInfo.credential.data.sub_bank;
  document.getElementById("bank-expired_at").innerHTML = new Date(
    orderInfo.expired_at,
  ).toLocaleDateString("zh-TW");
}
init();

function copyText(id) {
  const elm = document.getElementById(id);
  navigator.clipboard.writeText(elm.innerHTML);
  document.querySelector(".alert").classList.toggle("active");
  setTimeout(() => {
    document.querySelector(".alert").classList.toggle("active");
  }, 2000);
}
