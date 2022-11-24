import { Divider } from "./adminSideBarComponents/divider.js";
import { Header } from "./adminSideBarComponents/header.js";
import { NavigationList } from "./adminSideBarComponents/mainNavigationList.js";
import { MenuWrapper } from "./adminSideBarComponents/menuWrapper.js";

const mainNavigation = document.querySelector('.main-navigation-inner');
const header = new Header();
const createMenuWrapper = new MenuWrapper();
const divider = new Divider();
const navigationList = new NavigationList()

function renderSideBar() {
    mainNavigation.appendChild(header.render());
    mainNavigation.appendChild(createMenuWrapper.render());
    mainNavigation.appendChild(divider.render());
    mainNavigation.appendChild(navigationList.render());
}

export default renderSideBar;
