import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../features/cart/cartSlice";
import toast from "react-hot-toast";

export function useQuantity(
  item = { quantity: 0, stock: 0 },
  isAddToCart = false
) {
  const dispatch = useDispatch();

  const [currentQuantity, setCurrentQuantity] = useState(item?.quantity || 1);

  const updateQuantity = useCallback(
    (newQuantity) => {
      const itemQuantity = item?.quantity || 0;
      if (newQuantity >= 1 && newQuantity <= item.stock) {
        setCurrentQuantity(newQuantity);
        dispatch(
          addItem({ product: item, quantity: newQuantity - itemQuantity })
        );
      }
    },
    [dispatch, item]
  );

  useEffect(() => {
    if (item?.stock < currentQuantity) {
      updateQuantity(item.stock);
    }
  }, [item?.stock, setCurrentQuantity, currentQuantity, updateQuantity]);

  function handleButtonClick(e, delta) {
    e.preventDefault();
    e.stopPropagation();

    const newQuantity = currentQuantity + delta;

    if (newQuantity >= 1 && newQuantity <= item.stock) {
      setCurrentQuantity(newQuantity);
    }

    if (newQuantity === 0 && isAddToCart) {
      handleRemoveItem(e);
    }

    if (newQuantity <= item.stock && isAddToCart)
      updateQuantity(currentQuantity + delta);

    if (newQuantity >= item.stock) toast("No sufficent stock!");
  }

  function handleInputChange(e) {
    const value = parseInt(e.target.value, 10);

    if (value >= 1 && value <= item.stock) setCurrentQuantity(value);

    if (!isNaN(value) && isAddToCart) {
      updateQuantity(value);
    }
  }

  function handleRemoveItem(e) {
    e.preventDefault();
    dispatch(removeItem(item.id));
  }

  return {
    handleButtonClick,
    handleInputChange,
    handleRemoveItem,
    currentQuantity,
    setCurrentQuantity,
  };
}
