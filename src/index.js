import Handlebars from "handlebars";
import tpl from 'bundle-text:./index.hbs';
import button from './components/button';

console.log(tpl);


const comp = Handlebars.compile(tpl);
const res = comp({
	fname: 'students',
	btn: button('btn1','Click this', )
});

document.getElementById('root').innerHTML = res;
