const init = function () {
  if (document.forms.length === 0) return;

  document.getElementById("submit").addEventListener("click", submit);
};

const submit = function (e) {
  let contactName = document.getElementById("contactName").value;
  let contactNumber = document.getElementById("contactNumber").value;
  let vehicleModel = document.getElementById("vehicleModel").value;
  let vehicleReg = document.getElementById("vehicleReg").value;
  let mileage = document.getElementById("mileage").value;
  let extraInfo = document.getElementById("extraInfo").value;
  let postalCode = document.getElementById("postalCode").value;

  if (!contactName || !contactNumber || !vehicleModel || !vehicleReg || !mileage || !postalCode) return;

  let body = JSON.stringify({
    subject: "Quote",
    contactName,
    contactNumber,
    vehicleModel,
    vehicleReg,
    mileage,
    extraInfo,
    postalCode
  });

  e.preventDefault();
  e.stopPropagation();

  let info = document.getElementById("info");
  info.textContent = "Submitting, please stand by...";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body
  };

  fetch(`https://autocashier.herokuapp.com/api/v1/mail/quote`, options)
    .then(res => res.json() || res)
    .then(data => {
      if (data.success) {
        info.style = "color:green";
        info.textContent = "Your request was submited successfully";
        document.getElementById(document.forms[0].id).reset();
        return;
      }

      info.style = "color:red";
      info.textContent = "An error occured while trying to submit. Try again later.";
    });
};

document.addEventListener("DOMContentLoaded", init);
