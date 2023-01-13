let qr_code_element = document.querySelector(".qr-code");
function generate(id,ctr) {
  qr_code_element.innerHTML = ""
  qr_code_element.style = "";
  var qrcode = new QRCode(qr_code_element, {
    text: `${id}`,
    width: 150, //128
    height: 150,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
  let download_link = document.createElement("a");
  if(ctr == 1){
    download_link.setAttribute("class", "qr_btn btn btn-add btn-primary d-none");
  }else{
    download_link.setAttribute("class", "qr_btn btn btn-add btn-primary");
  }
  download_link.setAttribute("download", "qr_code.png");
  download_link.setAttribute("id", "qr-download");
  download_link.innerHTML = `Download qr code`;

  qr_code_element.appendChild(download_link);

  let qr_code_img = document.querySelector(".qr-code img");
  let qr_code_canvas = document.querySelector("canvas");

  if (qr_code_img.getAttribute("src") == null) {
    setTimeout(() => {
      download_link.setAttribute("href", `${qr_code_canvas.toDataURL()}`);
    }, 300);
  } else {
    setTimeout(() => {
      download_link.setAttribute("href", `${qr_code_img.getAttribute("src")}`);
    }, 300);
  }
}

