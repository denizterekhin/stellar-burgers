import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeedOrders, getLoading } from '../../services/slices/feedSlice';
import { getFeedData } from '../../services/actions/feedAction';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);

  //при первом рендере и изменеии листа заказов диспатчим данные заказов
  useEffect(() => {
    dispatch(getFeedData()).then((result) => {});
  }, [dispatch]);

  const orders: TOrder[] = useSelector(getFeedOrders);

  if (!orders.length || loading) {
    return <Preloader />;
  }

  const handleGetAllOrders = () => {
    dispatch(getFeedData());
  };

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        handleGetAllOrders;
      }}
    />
  );
};
