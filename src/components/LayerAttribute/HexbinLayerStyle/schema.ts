import fillColorCollapse from '../common-schema/fill-color-collapse';
import lableCollapse from '../common-schema/lable-collapse';
import pointRadius from '../common-schema/point-radius-collapse';
import strokeCollapse from '../common-schema/stroke-collapse';
import type { FieldSelectOptionType } from '../types';

export default (fieldList: FieldSelectOptionType[] = [], ribbonList: string[][] = []) => {
  return {
    type: 'object',
    properties: {
      collapseItem_fillColor: fillColorCollapse(fieldList, ribbonList),

      // collapseItem_fillSize: {
      //   type: 'void',
      //   'x-component': 'FormCollapse',
      //   'x-component-props': {
      //     ghost: true,
      //     destroyInactivePanel: true,
      //     defaultActiveKey: [],
      //   },
      //   properties: {
      //     fillSize: {
      //       type: 'void',
      //       'x-component': 'FormCollapse.CollapsePanel',
      //       'x-component-props': {
      //         header: '填充大小',
      //       },

      //       properties: {
      //         sizeField: {
      //           type: 'string',
      //           title: '基于字段',
      //           'x-decorator': 'FormItem',
      //           'x-component': 'FieldSelect',
      //           'x-decorator-props': {
      //             tooltip: '选中一个数值字段作为填充大小',
      //           },
      //           'x-component-props': {
      //             allowClear: true,
      //             placeholder: '请选择字段',
      //           },
      //           enum: [...fieldList],
      //         },
      //         size: {
      //           type: 'number',
      //           title: '宽度',
      //           'x-decorator': 'FormItem',
      //           'x-component': 'Slider',
      //           'x-component-props': {
      //             dots: false,
      //             range: false,
      //           },
      //           'x-decorator-props': {},
      //         },
      //       },
      //     },
      //   },
      // },
    },
  };
};
