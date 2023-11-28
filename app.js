const profileMenu = document.querySelector(".DC");
const sidebar = document.querySelector(".sidebar");
const notification = document.querySelector(".notification-icon");
const alertModal = document.querySelector(".alert-modal");
const notificationStatus = document.getElementById("notification-Status");
const notificationText = document.getElementById("notification-text");
const sidebarStatus = document.getElementById("sidebar-Status");
const firstLink = sidebar.querySelector("ul > a");

profileMenu.addEventListener("click", (e) => {
  alertModal.classList.remove("active");
  sidebar.classList.toggle("active");
  escapeFunction(sidebar, profileMenu, sidebarStatus);
  alertScreenReader(profileMenu, sidebarStatus, "profile Menu");
  firstLink.focus();
});

notification.addEventListener("click", (e) => {
  sidebar.classList.remove("active");
  alertModal.classList.toggle("active");
  escapeFunction(alertModal, notification, notificationStatus);
  alertScreenReader(notification, notificationStatus, "Notification");
});

function alertScreenReader(triggerButton, buttonStatus, text = "button") {
  const checkAriaValueStatus =
    triggerButton.attributes["aria-expanded"].value === "true";

  if (checkAriaValueStatus) {
    buttonStatus.ariaLabel = `${text} closed`;
    triggerButton.setAttribute("aria-expanded", "false");
  } else {
    triggerButton.setAttribute("aria-expanded", "true");
    buttonStatus.ariaLabel = `${text} opened`;
  }
}

const escapeFunction = (elementClass, triggerButton, buttonStatus) => {
  const handleEscape = (e) => {
    if (e.key === "Escape") {
      elementClass.classList.remove("active");
      triggerButton.setAttribute("aria-expanded", "false");
      buttonStatus.ariaLabel = "Notification closed";
      triggerButton.focus();
      document.removeEventListener("keydown", handleEscape);
    }
  };
  document.addEventListener("keydown", handleEscape);
};

// Add a keydown event listener to the sidebar for navigation.
const handleSidebarNavigation = (event) => {
  const items = sidebar.querySelectorAll("ul > a");
  const currentIndex = Array.from(items).indexOf(document.activeElement);

  if (event.key === "ArrowUp" && currentIndex > 0) {
    items[currentIndex - 1].focus();
  } else if (event.key === "ArrowDown" && currentIndex < items.length - 1) {
    items[currentIndex + 1].focus();
  }
};

sidebar.addEventListener("keydown", handleSidebarNavigation);

//Setup Guide toggle btn
const progressBtn = document.querySelector(".progress-btn");
const selectionItems = document.querySelector(".selection-container");
const setupGuideAriaStatus = document.getElementById("setup-guide-text");
const firstSvgAnimation = document.querySelector(".svg-animation");
progressBtn.addEventListener("click", () => {
  selectionItems.classList.toggle("open");
  progressBtn.classList.toggle("open");
  firstSvgAnimation.focus();
  alertScreenReader(progressBtn, setupGuideAriaStatus, "Setup Guide");
});

// select plan
const selectPlan = document.querySelector(".select-plan");
const selectPlanBtn = document.querySelector(".select-plan-closebtn");
selectPlanBtn.addEventListener("click", () => {
  selectPlan.classList.add("active");
  selectPlan.ariaLabel = "select your plan removed";
});

//single article
const allheading = document.querySelectorAll(".h3-heading");
const singleArticles = document.querySelectorAll(".single-article");

allheading.forEach((heading) => {
  heading.addEventListener("click", (e) => {
    // before toggle close existing show class on other element
    singleArticles.forEach((singleArticle) => {
      singleArticle.classList.remove("show");
    });
    e.currentTarget.parentElement.parentElement.classList.add("show");
  });
});

//svg animation
const svgAnimation = document.querySelectorAll(".svg-animation");

svgAnimation.forEach((svg) => {
  svg.addEventListener("click", (e) => {
    const svgContainer = e.currentTarget;

    gettingDomElement(svgContainer, e);
    const checkboxButtonStatus = gettingDomElement(svgContainer, e);
    animation(svgContainer, checkboxButtonStatus, e);
    progressBar();
  });
});

function gettingDomElement(svgContainer, e) {
  const currentSingleArticle =
    e.currentTarget.parentElement.parentElement.parentElement; //getting the root parent element
  const checkboxButtonStatus =
    currentSingleArticle.querySelector("#item-status"); //getting the span element with aria-label that tell user if section is marked

  singleArticles.forEach((singleArticle) => {
    //remove the show class on the current target so as to  add show class to next
    singleArticle.classList.remove("show");
  });
  /*----------------------------------------------------*/
  if (
    currentSingleArticle.nextElementSibling !== null && //checking if it is the last article
    !svgContainer.classList.contains("animate") && //checking if the current article contain animate (checked)
    !currentSingleArticle.nextElementSibling // checking if the next article does not contain animate (checked)
      .querySelector(".svg-animation")
      .classList.contains("animate")
  ) {
    currentSingleArticle.nextElementSibling.classList.add("show"); //toggle the show class on the next article
  }
  return checkboxButtonStatus;
}

/*----------------------------------------------------*/
function animation(svgContainer, checkboxButtonStatus, e) {
  const halfCircle = svgContainer.querySelector(".half-circle");
  const smallCompleted = svgContainer.querySelector(".small-completed");
  const fullCompleted = svgContainer.querySelector(".full-completed");
  const currentSingleArticle =
    e.currentTarget.parentElement.parentElement.parentElement; //getting the root parent element
  checkboxButtonStatus.ariaLabel = "Loading..."; //for screen reader to know whether the button is checked

  if (!svgContainer.classList.contains("animate")) {
    svgContainer.classList.add("animate");

    halfCircle.style.display = "block";

    setTimeout(function () {
      halfCircle.style.transform = "rotate(360deg)";
    }, 100);

    setTimeout(function () {
      halfCircle.style.display = "none";
    }, 400);

    setTimeout(function () {
      smallCompleted.style.display = "block";
    }, 400);

    setTimeout(function () {
      smallCompleted.style.display = "none";
    }, 500);

    setTimeout(function () {
      fullCompleted.style.display = "block";
      svgContainer.ariaLabel = `${svgContainer.ariaLabel.replace(
        "as done",
        "as not done"
      )}`;

      checkboxButtonStatus.ariaLabel = "successfuly marked"; //for screen reader to know when the animation completed
    }, 500);
  } else {
    svgContainer.classList.remove("animate");
    currentSingleArticle.classList.add("show");
    halfCircle.style.transform = "rotate(-260deg)";
    smallCompleted.style.display = "none";
    fullCompleted.style.display = "none";
    svgContainer.ariaLabel = `${svgContainer.ariaLabel.replace(
      "as not done",
      "as done"
    )}`;
    checkboxButtonStatus.ariaLabel = "successfuly unmarked"; //for screen reader to know when the animation completed
  }
}

/*----------------------------------------------------*/

function progressBar() {
  const progressBar = document.querySelector(".progressbar");
  const progressBarCount = document.querySelector(".count");

  let lenght = document.querySelectorAll(".animate").length;
  progressBarCount.innerHTML = lenght;
  progressBar.style.width = `${lenght * 20}%`;
}

const setUpGuide = document.querySelector(".setup-guide");
const handleSetupGuideNavigation = (event) => {
  const items = setUpGuide.querySelectorAll(".tabIndex");
  const currentIndex = Array.from(items).indexOf(document.activeElement);

  if (
    event.key === "ArrowUp" ||
    (event.key === "ArrowLeft" && currentIndex > 0)
  ) {
    items[currentIndex - 1].focus();
  } else if (
    event.key === "ArrowDown" ||
    (event.key === "ArrowRight" && currentIndex < items.length - 1)
  ) {
    items[currentIndex + 1].focus();
  }
};

setUpGuide.addEventListener("keydown", handleSetupGuideNavigation);
