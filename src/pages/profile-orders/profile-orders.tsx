import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getUserOrdersHistory,
  getUserOrdersLoading
} from '../../services/slices/ordersUserHistorySlice';
import { useEffect } from 'react';
import { ordersHistory } from '../../services/actions/ordersUserHistoryAction';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(getUserOrdersHistory);
  const dispatch = useDispatch();
  const loading = useSelector(getUserOrdersLoading);

  useEffect(() => {
    dispatch(ordersHistory());
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
