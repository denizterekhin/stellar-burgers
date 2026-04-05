import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import {
  currentIngredient,
  burgerActions
} from '../../services/slices/ingredientsSlice';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  const params = useParams();
  const ingredientId = params.id;

  if (!ingredientId) {
    return <Preloader />;
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(burgerActions.selectIngredient(ingredientId));
  }, [ingredientId]);
  const ingredientData = useSelector(currentIngredient);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
