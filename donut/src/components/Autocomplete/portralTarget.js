const getPortalTarget = () => {
  let portalRoot = document.querySelector(".js-donut-menu-portal");

  if (!portalRoot) {
    portalRoot = document.createElement("div");
    portalRoot.classList.add("js-donut-menu-portal");
    portalRoot.style.zIndex = 2000;
    portalRoot.style.position = "absolute";
    document.body.insertBefore(portalRoot, document.body.firstChild);
  }

  return portalRoot;
};

export default getPortalTarget;
