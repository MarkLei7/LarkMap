import type { HexbinLayerStyleAttributeValue } from './types';

/** 组件名称, 前缀 */
export const CLS_PREFIX = 'larkmap-hexbin-layer-style-attribute';

/** 默认值样式属性 */
export const DefaultHexbinLayerStyle: HexbinLayerStyleAttributeValue = {
  color: {
    field: 'sum',
    value: [
      'rgb(255, 247, 236)',
      'rgb(254, 232, 200)',
      'rgb(253, 212, 158)',
      'rgb(253, 187, 132)',
      'rgb(252, 141, 89)',
      'rgb(239, 101, 72)',
      'rgb(215, 48, 31)',
      'rgb(179, 0, 0)',
      'rgb(127, 0, 0)',
    ],
    scale: {
      type: 'sequential',
    },
  },
  size: { field: 'sum', value: (v) => v.sum },
  style: {
    opacity: 1,
    coverage: 1,
  },
};
