import type { BubbleLayerStyleAttributeValue, BubbleLayerProps } from '@antv/larkmap';
import { LarkMap, BubbleLayer, CustomControl, BubbleLayerStyleAttribute } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';

const FieldList = [
  { type: 'string', lable: '城市', value: 'name', typeColor: 'green', typeName: '文本' },
  { type: 'number', lable: '温度', value: 'temperature', typeColor: 'gold', typeName: '数值' },
];

const DefaultBubbleLayerStyle = {
  radius: 40,
  fillColor: '#0f9960',
  opacity: 0.4,
  strokeColor: 'blue',
  lineWidth: 2,
  lineOpacity: 1,
  label: {
    field: 'temperature',
    visible: true,
    style: { fill: '#454d64', fontSize: 18, textAnchor: 'center' as const },
  },
};

const bubbleLayerOptions: Omit<BubbleLayerProps, 'source'> = {
  autoFit: true,
  state: {
    active: { strokeColor: 'red', lineWidth: 2, lineOpacity: 1 },
  },
  ...DefaultBubbleLayerStyle,
};

export default () => {
  const [layerOptions, setLayerOptions] = useState(bubbleLayerOptions);
  const [source, setSource] = useState({
    data: [],
    parser: { type: 'json', x: 'lng', y: 'lat' },
  });

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/antfincdn/Lx96%24Pnwhw/city-weather.json')
      .then((response) => response.json())
      .then((data: any) => {
        setSource((prevState) => ({ ...prevState, data }));
      });
  }, []);

  return (
    <LarkMap mapType="GaodeV1" style={{ height: '400px', overflow: 'hidden' }}>
      <CustomControl position="topleft" style={{ width: '300px', background: '#fff', padding: '10px' }}>
        <h3>属性配置</h3>
        <BubbleLayerStyleAttribute
          style={{ overflowX: 'hidden', overflowY: 'auto', maxHeight: '300px' }}
          initialValues={DefaultBubbleLayerStyle}
          fieldList={FieldList}
          onChange={(values: BubbleLayerStyleAttributeValue) => {
            // console.log('values: ', values);
            setLayerOptions(values);
          }}
        />
      </CustomControl>
      <BubbleLayer {...layerOptions} source={source} />
    </LarkMap>
  );
};
