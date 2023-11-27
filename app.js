const dcBtn = document.querySelector(".DC");
const sidebar = document.querySelector(".sidebar");
const notificationIcon = document.querySelector(".notification-icon");
const alertModal = document.querySelector(".alert-modal");

dcBtn.addEventListener("click", () => {
  alertModal.classList.remove("active");
  sidebar.classList.toggle("active");
  escapeFunction(sidebar);
});

notificationIcon.addEventListener("click", (e) => {
  sidebar.classList.remove("active");
  alertModal.classList.toggle("active");

  e.preventDefault(); // Prevents the default behavior of the notification icon, if any.

  // Add a global keydown event listener to capture the "Escape" key press.
  escapeFunction(alertModal);
});

// Add a global keydown event listener to capture the "Escape" key press.
const escapeFunction = (sidebar) => {
  const handleEscape = (e) => {
    if (e.key === "Escape") {
      sidebar.classList.remove("active");
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

document.addEventListener("keydown", handleSidebarNavigation);
const firstLink = sidebar.querySelector("ul a");
if (firstLink) {
  firstLink.focus();
}

//progress btn toggle
const progressBtn = document.querySelector(".progress-btn");
const selectionItems = document.querySelector(".selection-container");
progressBtn.addEventListener("click", () => {
  selectionItems.classList.toggle("open");
  progressBtn.classList.toggle("open");
});

// select plan
const selectPlan = document.querySelector(".select-plan");
const selectPlanBtn = document.querySelector(".select-plan-closebtn");
selectPlanBtn.addEventListener("click", () =>
  selectPlan.classList.add("active")
);

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
    animation(svgContainer, checkboxButtonStatus);
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
function animation(svgContainer, checkboxButtonStatus) {
  const halfCircle = svgContainer.querySelector(".half-circle");
  const smallCompleted = svgContainer.querySelector(".small-completed");
  const fullCompleted = svgContainer.querySelector(".full-completed");
  checkboxButtonStatus.ariaLabel = "Loading, please wait..."; //for screen reader to know whether the button is checked

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

const elements = document.querySelectorAll("#navigate");

let currentElementIndex = 0;

const setActiveElement = () => {
  elements.forEach((element, index) => {
    element.classList.toggle("active", index === currentElementIndex);
  });
};

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      currentElementIndex =
        (currentElementIndex - 1 + elements.length) % elements.length;
      setActiveElement();
      break;
    case "ArrowDown":
      currentElementIndex = (currentElementIndex + 1) % elements.length;
      setActiveElement();
      break;
  }
});

// Add click event to handle focus on click
elements.forEach((element, index) => {
  element.addEventListener("click", () => {
    currentElementIndex = index;
    setActiveElement();
  });
});

const handleKeyDownEvent = (event) => {
  const tabIndex = document.querySelectorAll(".tabIndex");

  const currentIndex = Array.from(tabIndex).indexOf(document.activeElement);

  if (
    event.key === "ArrowUp" ||
    (event.key === "ArrowLeft" && currentIndex > 0)
  ) {
    tabIndex[currentIndex - 1].focus();
  } else if (
    event.key === "ArrowDown" ||
    (event.key === "ArrowRight" && currentIndex < tabIndex.length - 1)
  ) {
    tabIndex[currentIndex + 1].focus();
  }
};

document.addEventListener("keydown", handleKeyDownEvent);
