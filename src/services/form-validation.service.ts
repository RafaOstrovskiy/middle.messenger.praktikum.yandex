import { FormInput } from '../components/form-input';
import { Form } from '../components/form';
import Block from '../core/block';

type FormFieldBackend = {
  error: string;
  regExp: RegExp;
};

const rules: Record<string, FormFieldBackend> = {
  first_name: {
    error:
      'латиница или кириллица, первая буква должна быть заглавной, ' +
        'без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
    regExp: /^[A-ZА-Я][A-Za-zА-Яа-яЁё-]*$/,
  },
  second_name: {
    error:
      'латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр,' +
        ' нет спецсимволов (допустим только дефис)',
    regExp: /^[A-ZА-Я][A-Za-zА-Яа-яЁё-]*$/,
  },
  login: {
    error:
      ' от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, ' +
        'без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание) ',
    regExp: /^[a-zA-Z][a-zA-Z0-9-_.]{3,20}$/,
  },
  email: {
    error:
      'латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть ' +
        '«собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы',
    regExp: /.+@.+\..+/i,
  },
  password: {
    error: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
    regExp: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,40})$/,
  },
  confirm_password: {
    error: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
    regExp: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,40})$/,
  },
  phone: {
    error: 'от 10 до 15 символов, состоит из цифр, может начинается с плюса',
    regExp: /^[+]?[0-9]{10,15}$/,
  },
  message: {
    error: 'не может быть пустым',
    regExp: /^.+$/,
  },
};

export class FormValidationService {
  fields: Record<string, FormInput> = {};
  form: Form;

  constructor(form: Form) {
    this.form = form;
    this.init();
  }

  init() {
    (this.form.children.inputs as Block[]).forEach((item: FormInput) => {
      const input = item.children.input;
      const name = (input as Block).props.name;

      (input as Block).setProps({
        events: {
          focus: () => this.isFormFieldValid(name),
          blur: () => this.isFormFieldValid(name),
        },
      });

      this.fields[name] = item;
    });
  }

  isFormFieldValid(fieldName: string): boolean {
    const { input, errorMessage } = this.fields[fieldName].children;
    const { error, regExp } = rules[fieldName] || {};
    const value = ((input as Block).getContent() as HTMLInputElement).value;

    if (!regExp) {
      return true;
    }
    if (!regExp.test(value!)) {
      (errorMessage as Block).setProps({ text: error });
      return false;
    }
    (errorMessage as Block).setProps({ text: '' });
    return true;
  }

  // isPasswordsMatch(): boolean {
  //   return this.fields['confirm_password'].props.value === this.fields['password'].props.value;
  // }

  isFormValid = (): boolean => {
    let isValid: boolean = true;

    Object.keys(this.fields).forEach((field) => {
      if (!this.isFormFieldValid(field)) {
        isValid = false;
      }
    });
    return isValid;
  };
}
