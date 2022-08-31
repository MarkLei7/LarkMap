import type { HexbinLayerStyleAttributeValue } from './types';

/**
 * 平铺数据转图层样式数据
 * 将表单的平铺数据转为图层样式的数据结构
 * */
export const hexbinLayerStyleFlatToConfig = (style: Record<string, any>) => {
  const styleConfig: HexbinLayerStyleAttributeValue = {
    transforms: [
      {
        type: 'hexagon',
        size: 100,
        field: style.fillColorField,
        method: 'sum',
      },
    ],

    color: style.fillColorField
      ? {
          field: 'sum',
          value: style.fillColorRibbon,
        }
      : style.fillColor,

    // size: style.sizeField
    //   ? {
    //       field: style.sizeField,
    //       value: style.size,
    //     }
    //   : style.size,

    style: {
      opacity: style.fillColorOpacity,
    },
  };

  return styleConfig;
};

/**
 * 图层样式数据转平铺数据
 * 将图层样式的数据结构转为表单的平铺数据
 * */
export const hexbinLayerStyleConfigToFlat = (styleConfig: HexbinLayerStyleAttributeValue) => {
  const { size, style, color, transforms } = styleConfig;
  const config = {
    fillColorField: typeof color === 'object' ? transforms[0]?.field : undefined,
    fillColorRibbon: typeof color === 'object' ? color?.value : undefined,
    fillColor: typeof color !== 'object' ? color : undefined,
    fillColorOpacity: style.opacity,
  };

  return config;
};
