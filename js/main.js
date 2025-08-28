function setFullHeight() {
  // This has to be used to adjust height for WebView in android app
  document.documentElement.style.height = window.innerHeight + "px";
  document.body.style.height = window.innerHeight + "px";
  var container = document.querySelector(".feedback-container");
  var wrap = document.querySelector(".feedback-wrap");
  container.style.height = window.innerHeight + "px";
  wrap.style.height = window.innerHeight + "px";
}
window.addEventListener("resize", setFullHeight);
window.addEventListener("load", setFullHeight);

$(document).ready(function () {
  // Only allow numbers in contact number input
  $("#contact-number").on("input", function () {
    // Replace any character that is not a digit, +, or - with nothing
    this.value = this.value.replace(/[^0-9+\-]/g, "");
  });

  // Initialise Select2
  $(".js-select2").select2({
    minimumResultsForSearch: 20,
    dropdownParent: $(".js-select2").parent().find(".dropDownSelect2"),
  });

  // Form validation on submit
  $(".resident-preface-form").on("submit", function (e) {
    let isValid = true;
    $(".resident-input, .js-select2").removeClass("is-invalid");
    $("#full-name-error, #contact-number-error, #property-error").remove();

    const fullName = $("#full-name").val().trim();
    if (fullName === "") {
      $("#full-name").addClass("is-invalid");
      if ($("#full-name-error").length === 0) {
        $("<div id='full-name-error' style='color:#d8000c;margin-top:5px;padding-left:26px;'>Please enter your full name.</div>").insertAfter($("#full-name"));
      }
      isValid = false;
    }

    const contactNumber = $("#contact-number").val().trim();

    if (contactNumber === "") {
      $("#contact-number").addClass("is-invalid");
      if ($("#contact-number-error").length === 0) {
        $("<div id='contact-number-error' style='color:#d8000c;margin-top:5px;padding-left:26px;'>Please enter your contact number.</div>").insertAfter($("#contact-number"));
      }
      isValid = false;
    }

    // const property = $("#property-select").val();
    // if (!property || property === "Please Select") {
    //   $(".js-select2").addClass("is-invalid");
    //   if ($("#property-error").length === 0) {
    //     $("<div id='property-error' style='color:#d8000c;margin-top:5px;padding-left:26px;'>Please select a property.</div>").insertAfter($(".js-select2").next(".select2"));
    //   }
    //   isValid = false;
    // } else {
    //   $("#property-error").remove();
    // }

    const property = $("#property").val().trim();
    if (property === "") {
      $("#property").addClass("is-invalid");
      if ($("#property-error").length === 0) {
        $("<div id='property-error' style='color:#d8000c;margin-top:5px;padding-left:26px;'>Please enter the property name.</div>").insertAfter($("#property"));
      }
      isValid = false;
    }

    if (!isValid) {
      e.preventDefault();
      return;
    }

    // Success: animate overlay
    e.preventDefault(); // Remove if you want to really submit the form
    $(".contact100-overlay").addClass("active");
    $(".resident-preface-form").fadeOut(750, function () {
      $(".resident-feedback-form").fadeIn(750);
    });
    $(".contact100-more").fadeOut(750);
  });

  // Remove error state when user changes input
  $("#full-name, #contact-number, #property").on("input", function () {
    $(this).removeClass("is-invalid");
    $("#property-error").remove();
  });
  $("#property-select").on("change", function () {
    $(".js-select2").removeClass("is-invalid");
    $("#property-error").remove();
  });

  const canvas = document.querySelector("canvas");
  const clearButton = document.querySelector(".clear-button");

  const ctx = canvas.getContext("2d");
  let writingMode = false;

  const handlePointerDown = (event) => {
    event.preventDefault();
    writingMode = true;
    ctx.beginPath();
    const [positionX, positionY] = getCursorPosition(event);
    ctx.moveTo(positionX, positionY);
  };

  const handlePointerUp = () => {
    writingMode = false;
  };

  const handlePointerMove = (event) => {
    if (!writingMode) return;
    event.preventDefault();
    const [positionX, positionY] = getCursorPosition(event);
    ctx.lineTo(positionX, positionY);
    ctx.stroke();
  };

  const getCursorPosition = (event) => {
    positionX = event.clientX - event.target.getBoundingClientRect().x;
    positionY = event.clientY - event.target.getBoundingClientRect().y;
    return [positionX, positionY];
  };

  canvas.addEventListener("pointerdown", handlePointerDown, {passive: false});
  canvas.addEventListener("pointermove", handlePointerMove, {passive: false});
  canvas.addEventListener("pointerup", handlePointerUp);
  canvas.addEventListener("pointerleave", handlePointerUp);

  ctx.lineWidth = 3;
  ctx.lineJoin = ctx.lineCap = "round";

  const clearPad = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  clearButton.addEventListener("click", (event) => {
    event.preventDefault();
    clearPad();
  });
});

