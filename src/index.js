import index from "./index.hbs";
import signUp from "./pages/sign-up"
import signIn from "./pages/sign-in";
import baseLayout from "./layout/base-layout";
import error from "./pages/error";
import chats from "./pages/chats";
import profile from "./pages/profile";

import "./styles/styles.scss";


const root = document.getElementById("root");
const routes = {
	"/" : index,
	"/login": signUp,
	"/signin": signIn,
	"/chats": chats,
	"/profile": profile,
	"/profile-edit": () => profile({ editMode: true }),
	"/password-update": passwordUpdate,
	"/404": () => error({ title: "404", description: "Не туда попали" }),
	"/500": () => error({ title: "500", description: "Мы уже фиксим" }),
}

function resolveRoute(route) {
	try {
		return routes[route];
	} catch (e) {
		throw new Error(`Route ${route} not found`);
	};
};

function router() {
	let url = window.location.hash.slice(1) || '/';
	let route = resolveRoute(url);

	route();
};

window.addEventListener("load", router);
window.addEventListener("hashchange", router);