import type { FormFields, ValidationErrors } from '../types/form'

export function validate(fields: FormFields): ValidationErrors {
  const patternName: RegExp = /[a-zA-Zа-яА-Я ]+$/
  const patternEmail: RegExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/

  const errors: ValidationErrors = {}
  const check = (key: keyof FormFields): boolean => {
    return key in fields
  }

  if (check('email')) {
    const value: string = (fields.email ?? '').trim()

    if (!value) {
      errors.email = 'Введите электронную почту'
    } else if (!patternEmail.test(value)) {
      errors.email = 'Введите корректный e-mail'
    }
  }

  if (check('password')) {
    const value: string = (fields.password ?? '').trim()

    if (!value) {
      errors.password = 'Введите пароль'
    }
  }

  if (check('name')) {
    const value: string = (fields.name ?? '').trim()

    if (!value) {
      errors.name = 'Введите имя'
    } else if (!patternName.test(fields.name ?? '')) {
      errors.name = 'Имя может содержать только буквы и пробелы'
    }
  }

  if (check('surname')) {
    const value: string = (fields.surname ?? '').trim()

    if (!value) {
      errors.surname = 'Введите фамилию'
    } else if (!patternName.test(fields.surname ?? '')) {
      errors.surname = 'Фамилия может содержать только буквы и пробелы'
    }
  }

  if (check('parole')) {
    const value: string = (fields.parole ?? '').trim()
    const password: string = (fields.password ?? '').trim()

    if (!value) {
      errors.parole = 'Введите пароль подтверждения'
    } else if (password && value !== password) {
      errors.parole = 'Пароли не совпадают'
    }
  }

  return errors
}
