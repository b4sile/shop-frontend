export const findImage = ({ images, isNeedTitleImage }) => {
  const titleImage = images.find((image) => image.isTitleImage);
  if (titleImage || isNeedTitleImage) {
    return titleImage;
  }
  return images.find((image) => image);
};
