

/* =========================================================
   LOADER
========================================================= */

window.addEventListener(
  "load",
  () => {

    setTimeout(
      () => {

        document
          .getElementById("loader")
          .classList
          .add("hidden");

      },
      700
    );

  }
);


/* =========================================================
   CURSOR
========================================================= */

const cursor =
  document.getElementById("cursor");

const cursorRing =
  document.getElementById("cursorRing");

let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;


document.addEventListener(
  "mousemove",
  event => {

    mouseX =
      event.clientX;

    mouseY =
      event.clientY;

    cursor.style.left =
      mouseX + "px";

    cursor.style.top =
      mouseY + "px";

  }
);


function cursorAnimation() {

  ringX +=
    (mouseX - ringX) * .12;

  ringY +=
    (mouseY - ringY) * .12;

  cursorRing.style.left =
    ringX + "px";

  cursorRing.style.top =
    ringY + "px";

  requestAnimationFrame(
    cursorAnimation
  );

}

cursorAnimation();


document
  .querySelectorAll(
    "a,button,.product,.way,.variety"
  )
  .forEach(
    element => {

      element.addEventListener(
        "mouseenter",
        () => {

          document.body
            .classList
            .add("hovering");

        }
      );

      element.addEventListener(
        "mouseleave",
        () => {

          document.body
            .classList
            .remove("hovering");

        }
      );

    }
  );


/* =========================================================
   NAVBAR SCROLL
========================================================= */

const nav =
  document.getElementById("nav");

window.addEventListener(
  "scroll",
  () => {

    if (
      window.scrollY > 60
    ) {

      nav.classList.add(
        "scrolled"
      );

    } else {

      nav.classList.remove(
        "scrolled"
      );

    }

  }
);


/* =========================================================
   HAMBURGER
========================================================= */

const hamburger =
  document.getElementById(
    "hamburger"
  );

const mobileMenu =
  document.getElementById(
    "mobileMenu"
  );

const mobileLinks =
  document.querySelectorAll(
    ".mobile-links a"
  );


function openMobileMenu() {

  hamburger.classList.add(
    "active"
  );

  mobileMenu.classList.add(
    "active"
  );

  hamburger.setAttribute(
    "aria-expanded",
    "true"
  );

  document.body.classList.add(
    "menu-open"
  );

}


function closeMobileMenu() {

  hamburger.classList.remove(
    "active"
  );

  mobileMenu.classList.remove(
    "active"
  );

  hamburger.setAttribute(
    "aria-expanded",
    "false"
  );

  document.body.classList.remove(
    "menu-open"
  );

}


hamburger.addEventListener(
  "click",
  () => {

    if (
      mobileMenu.classList.contains(
        "active"
      )
    ) {

      closeMobileMenu();

    } else {

      openMobileMenu();

    }

  }
);


mobileLinks.forEach(
  link => {

    link.addEventListener(
      "click",
      () => {

        closeMobileMenu();

      }
    );

  }
);


/* =========================================================
   ESC
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      closeMobileMenu();
      closeCart();

    }

  }
);


/* =========================================================
   SCROLL REVEAL
========================================================= */

const reveals =
  document.querySelectorAll(
    ".reveal"
  );

const revealObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(
        entry => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              "visible"
            );

            revealObserver.unobserve(
              entry.target
            );

          }

        }
      );

    },
    {
      threshold: .12
    }
  );


reveals.forEach(
  element =>
    revealObserver.observe(
      element
    )
);


/* =========================================================
   PARTICLES
========================================================= */

const particleCount =
  window.innerWidth < 700
    ? 15
    : 35;


for (
  let i = 0;
  i < particleCount;
  i++
) {

  const particle =
    document.createElement(
      "div"
    );

  particle.className =
    "particle";

  particle.style.left =
    Math.random() * 100 + "%";

  particle.style.animationDuration =
    8 + Math.random() * 15 + "s";

  particle.style.animationDelay =
    Math.random() * 10 + "s";

  document.body.appendChild(
    particle
  );

}


/* =========================================================
   HERO PARALLAX
========================================================= */

const heroImage =
  document.querySelector(
    ".hero-image"
  );

window.addEventListener(
  "scroll",
  () => {

    if (
      window.innerWidth <= 700
    ) {
      return;
    }

    const scroll =
      window.scrollY;

    if (
      scroll <
      window.innerHeight
    ) {

      heroImage.style.transform =
        `scale(1.04)
         translateY(${scroll * .12}px)`;

    }

  }
);


/* =========================================================
   CART
========================================================= */

const cartOpen =
  document.getElementById(
    "cartOpen"
  );

const cartClose =
  document.getElementById(
    "cartClose"
  );

const cartPanel =
  document.getElementById(
    "cartPanel"
  );

const cartOverlay =
  document.getElementById(
    "cartOverlay"
  );

const cartItems =
  document.getElementById(
    "cartItems"
  );

const cartCount =
  document.getElementById(
    "cartCount"
  );

const cartTotal =
  document.getElementById(
    "cartTotal"
  );

let cart = [];


function openCart() {

  closeMobileMenu();

  cartPanel.classList.add(
    "active"
  );

  cartOverlay.classList.add(
    "active"
  );

  document.body.classList.add(
    "cart-open"
  );

}


function closeCart() {

  cartPanel.classList.remove(
    "active"
  );

  cartOverlay.classList.remove(
    "active"
  );

  document.body.classList.remove(
    "cart-open"
  );

}


cartOpen.addEventListener(
  "click",
  openCart
);

cartClose.addEventListener(
  "click",
  closeCart
);

cartOverlay.addEventListener(
  "click",
  closeCart
);


/* =========================================================
   UPDATE CART
========================================================= */

function updateCart() {

  cartItems.innerHTML = "";


  if (
    cart.length === 0
  ) {

    cartItems.innerHTML = `
      <div class="empty">
        Your harvest is empty.
      </div>
    `;

  } else {

    cart.forEach(
      item => {

        const element =
          document.createElement(
            "div"
          );

        element.className =
          "cart-item";

        element.innerHTML = `

          <img
            src="${item.image}"
            alt="${item.name}"
          >

          <div class="cart-item-info">

            <h4>
              ${item.name}
            </h4>

            <span>
              $${item.price}
            </span>

          </div>

          <div class="cart-quantity">
            × ${item.quantity}
          </div>

        `;

        cartItems.appendChild(
          element
        );

      }
    );

  }


  const quantity =
    cart.reduce(
      (sum,item) =>
        sum + item.quantity,
      0
    );


  const total =
    cart.reduce(
      (sum,item) =>
        sum +
        item.price *
        item.quantity,
      0
    );


  const previousQuantity =
    Number(
      cartCount.textContent
    ) || 0;


  cartCount.textContent =
    quantity;

  cartTotal.textContent =
    "$" + total;


  /* CART BADGE ANIMATION */

  if (
    quantity >
    previousQuantity
  ) {

    cartCount.classList.remove(
      "bump"
    );

    void cartCount.offsetWidth;

    cartCount.classList.add(
      "bump"
    );

  }

}


/* =========================================================
   ADD TO CART
========================================================= */

document
  .querySelectorAll(".add")
  .forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const name =
            button.dataset.name;

          const price =
            Number(
              button.dataset.price
            );

          const image =
            button.dataset.image;


          const existing =
            cart.find(
              item =>
                item.name === name
            );


          if (
            existing
          ) {

            existing.quantity++;

          } else {

            cart.push({

              name:
                name,

              price:
                price,

              image:
                image,

              quantity:
                1

            });

          }


          updateCart();

          openCart();

        }
      );

    }
  );


/* =========================================================
   CHECKOUT
========================================================= */

document
  .getElementById(
    "checkout"
  )
  .addEventListener(
    "click",
    () => {

      if (
        cart.length === 0
      ) {

        alert(
          "Your harvest is empty."
        );

        return;

      }

      alert(
        "Checkout is ready to connect to your payment system."
      );

    }
  );


/* =========================================================
   IMAGE FALLBACK
========================================================= */

document
  .querySelectorAll("img")
  .forEach(
    image => {

      image.addEventListener(
        "error",
        () => {

          if (
            !image.dataset.fallback
          ) {

            image.dataset.fallback =
              "true";

            image.src =
              "https://images.pexels.com/photos/14145330/pexels-photo-14145330.jpeg?cs=srgb&dl=pexels-matreding-14145330.jpg&fm=jpg";

          }

        }
      );

    }
  );