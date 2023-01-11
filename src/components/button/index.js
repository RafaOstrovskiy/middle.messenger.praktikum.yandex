import Handlebars from 'handlebars';
import tpl from 'bundle-text:./tpl.hbs';
import './style.css';

Handlebars.registerPartial('button', tpl);

export default (id, value) => {
	return Handlebars.compile(tpl)({ id, value });
}
