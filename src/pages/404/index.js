import Handlebars from 'handlebars';
import tpl from 'bundle-text:./tpl.hbs';
import './style.css';

Handlebars.registerPartial('404', tpl);

export default (props = {}) => {
	return Handlebars.compile(tpl)(props);
}
