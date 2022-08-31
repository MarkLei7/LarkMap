import classNames from 'classnames';
import React, { memo, useMemo } from 'react';
import { Form, FormItem, Input, NumberPicker, Select, Switch } from '@formily/antd';
import { createSchemaField } from '@formily/react';
import type { Form as FormInstance } from '@formily/core';
import { createForm, onFormValuesChange } from '@formily/core';
import { debounce } from 'lodash-es';
import { FormCollapse, FieldSelect, ColorPicker, RibbonSelect, Slider, SliderRange } from '../components';
import type { HexbinLayerStyleAttributeProps } from './types';
import schema from './schema';
import { hexbinLayerStyleConfigToFlat, hexbinLayerStyleFlatToConfig } from './helper';
import { CLS_PREFIX } from './constant';

export const HexbinLayerStyleAttributeSchemaField: React.FC<
  Pick<HexbinLayerStyleAttributeProps, 'fieldList' | 'ribbonList'>
> = (props) => {
  const SchemaField = useMemo(
    () =>
      createSchemaField({
        components: {
          FormItem,
          Input,
          Select,
          FormCollapse,
          NumberPicker,
          Switch,
          Slider,
          RibbonSelect,
          ColorPicker,
          FieldSelect,
          SliderRange,
        },
      }),
    [],
  );

  const _schema = useMemo(() => schema(props.fieldList, props.ribbonList), [props.fieldList, props.ribbonList]);

  return <SchemaField schema={_schema} />;
};

export const HexbinLayerStyleAttribute: React.FC<HexbinLayerStyleAttributeProps> = memo(
  function GridLayerStyleAttribute(props) {
    const form = useMemo(() => {
      const initialValues = hexbinLayerStyleConfigToFlat(props.initialValues);
      const _form = createForm({
        initialValues,
        effects() {
          onFormValuesChange(
            debounce((formIns: FormInstance<any>) => {
              props.onChange(hexbinLayerStyleFlatToConfig(formIns.values));
            }, 150),
          );
        },
      });

      return _form;
    }, []);

    return (
      <Form
        className={classNames(`${CLS_PREFIX}`, props.className)}
        style={props.style}
        form={form}
        labelCol={8}
        wrapperCol={16}
        colon={false}
        layout="horizontal"
        labelAlign="left"
        wrapperAlign="right"
        feedbackLayout="terse"
      >
        <HexbinLayerStyleAttributeSchemaField fieldList={props.fieldList} />
      </Form>
    );
  },
);
