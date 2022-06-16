(async function() {
    var orderNum = document.getElementById("orderId");
    orderNum.textContent = new URL(location.href).searchParams.get("orderId");
})()