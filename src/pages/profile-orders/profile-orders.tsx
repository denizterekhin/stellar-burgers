import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { feeds } from '../../services/slices/orderSlice';
import { getFeeds } from '../../services/actions/orderAction';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeeds());
  }, []);
  const orders: TOrder[] = useSelector(feeds);

  if (!orders.length) {
    return <ProfileOrdersUI orders={[]} />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
