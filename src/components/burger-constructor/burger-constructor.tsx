import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import burgerConstructorSlice, {
  getConstructorItems,
  getOrderModalData,
  getOrderRequest,
  closeModalData
} from '../../services/slices/burgerConstructorSlice';
import { createOrder } from '../../services/actions/burgerConstructorAction';
import { selectIsAuthenticated } from '../../services/slices/userSlice';

//Конструктор бургера
export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(getConstructorItems); // получение ингредиентов

  const orderRequest = useSelector(getOrderRequest); // получение статуса запроса заказа

  const orderModalData = useSelector(getOrderModalData); // получение данных для модального окна заказа

  const authorization = useSelector(selectIsAuthenticated); //проверка авторизации пользователя

  const onOrderClick = () => {
    if (!authorization) {
      return navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;

    // формирование ингридиентов для заказа и фильтр от undefinited значений
    const order = [
      constructorItems.bun?._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun?._id
    ].filter(Boolean);

    dispatch(createOrder(order));
  };

  // обработка закрытия модального окна заказа
  const closeOrderModal = () => {
    dispatch(closeModalData());
    //dispatch(clearOrder());
    navigate('/');
  };

  // считаеться общая стоимость заказа
  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems] //счёт общей стоимости заново считает при изменении итемов в заказе (конструкторе)
  );

  //return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
