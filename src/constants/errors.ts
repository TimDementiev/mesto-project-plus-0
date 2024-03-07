export const BAD_REQUEST = {
  code: 400,
  message: 'переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля',
};

export const NOT_FOUND = {
  code: 404,
  message: 'карточка или пользователь не найден',
};

export const INTERNAL_SERVER_ERROR = {
  code: 500,
  message: 'ошибка по умолчанию',
};