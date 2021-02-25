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
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

export const Product = () => {
  const [productMeta, setProductMeta] = React.useState(null);
  const [count, setCount] = React.useState(0);
  const [product, setProduct] = React.useState(null);
  const { id } = useParams();
  const history = useHistory();

  React.useEffect(() => {
    productsApi
      .getProduct(id)
      .then(({ data }) => setProduct(data))
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const onAdd = () => {
    setCount((count) => count + 1);
  };

  const onRemove = () => {
    if (count > 1) {
      setCount((count) => count - 1);
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
    console.log('submit');
  };

  console.log(productMeta);
  const { title, description, price, discount, product_meta, images } =
    product || {};

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
                    <Fab disabled={count <= 1} onClick={onRemove} size="small">
                      <RemoveIcon />
                    </Fab>
                    <div>{count}</div>
                    <Fab
                      disabled={!productMeta || productMeta.quantity === count}
                      onClick={onAdd}
                      size="small"
                    >
                      <AddIcon />
                    </Fab>
                  </div>
                  <Button type="submit" className={s.button}>
                    Добавить в корзину
                  </Button>
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
};
