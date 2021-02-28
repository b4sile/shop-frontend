import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import s from './Product.module.scss';
import { CatalogNav, Price, Button, Images } from '../components';
import { productsApi } from '../api';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Button as MuiButton,
  Fab,
  Tooltip,
  CircularProgress,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { addCartItem, fetchAddCartItem } from '../slices';
import { useDispatch, useSelector } from 'react-redux';

export const Product = React.memo(() => {
  const [isSubmit, setIsSubmit] = React.useState(false);
  const [productMeta, setProductMeta] = React.useState(null);
  const [quantity, setCount] = React.useState(0);
  const [product, setProduct] = React.useState(null);
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const currentCartQuantity = useSelector(
    ({ cart: { items } }) =>
      productMeta && items[productMeta.id] && items[productMeta.id].quantity
  );
  const cartId = useSelector(({ cart: { cart } }) => cart && cart.id);

  React.useEffect(() => {
    productsApi
      .getProduct(id)
      .then(({ data }) => setProduct(data))
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const onAdd = () => {
    setCount((quantity) => quantity + 1);
  };

  const onRemove = () => {
    if (quantity > 1) {
      setCount((quantity) => quantity - 1);
    }
  };

  const handleChangeSize = (e) => {
    const value = e.target.value;
    setProductMeta(value);
    if (value.quantity !== 0) {
      setCount(1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartId) {
      setIsSubmit(true);
      dispatch(fetchAddCartItem(productMeta.id, quantity, cartId))
        .then(() => setIsSubmit(false))
        .catch((err) => {
          console.log(err);
          setIsSubmit(false);
        });
    } else {
      dispatch(
        addCartItem({
          id: productMeta.id,
          quantity,
        })
      );
    }
  };

  const { title, description, price, discount, product_meta, images } =
    product || {};

  const disabledSubmit =
    isSubmit ||
    !productMeta ||
    !quantity ||
    (productMeta && productMeta.quantity === currentCartQuantity) ||
    quantity + currentCartQuantity > productMeta.quantity;

  const tooltipTitle = !productMeta
    ? 'Пожалуйста, выберите размер.'
    : isSubmit
    ? 'Товар добавляется'
    : disabledSubmit && !isSubmit
    ? 'Вы уже добавили максимальное количество данного товара!'
    : '';

  return (
    <div className={s.wrapper}>
      {product && (
        <>
          <Images images={images} className={s.images} />
          <div className={s.info}>
            <div>
              <h2>{title}</h2>
              <Price
                isVertical
                price={price}
                discount={discount}
                className={s.price}
              />
              <p className={s.description}>{description}</p>
            </div>
            {product_meta.length > 0 ? (
              <form onSubmit={handleSubmit}>
                <FormControl className={s.group}>
                  <InputLabel id="age-native-simple">
                    Выберите размер:
                  </InputLabel>
                  <Select
                    className={s.select}
                    value={productMeta || ''}
                    onChange={handleChangeSize}
                    id="size"
                    labelId="age-native-simple"
                  >
                    {product_meta.map((meta) => (
                      <MenuItem value={meta} key={meta.id}>
                        {meta.size}
                      </MenuItem>
                    ))}
                  </Select>
                  {productMeta && (
                    <FormHelperText className={s.help}>
                      В наличии: {productMeta.quantity}
                    </FormHelperText>
                  )}
                  <div className={s.count}>
                    <Fab
                      disabled={quantity <= 1}
                      onClick={onRemove}
                      size="small"
                    >
                      <RemoveIcon />
                    </Fab>
                    <div>{quantity}</div>
                    <Fab
                      disabled={
                        !productMeta || productMeta.quantity === quantity
                      }
                      onClick={onAdd}
                      size="small"
                    >
                      <AddIcon />
                    </Fab>
                  </div>
                  <Tooltip title={tooltipTitle} arrow>
                    <span className={s.submitBtn}>
                      <Button
                        disabled={disabledSubmit}
                        type="submit"
                        className={s.button}
                      >
                        Добавить в корзину
                      </Button>
                      {isSubmit && (
                        <CircularProgress size={24} className={s.progress} />
                      )}
                    </span>
                  </Tooltip>
                </FormControl>
              </form>
            ) : (
              <div className={s.out}>Информации о данном товаре еще нет.</div>
            )}
          </div>
        </>
      )}
      <div className={s.right}>
        <CatalogNav />
        <MuiButton className={s.back} onClick={() => history.goBack()}>
          Назад
        </MuiButton>
      </div>
    </div>
  );
});
