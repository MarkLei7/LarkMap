import type { HexbinLayerStyleAttributeValue, HeatmapLayerProps } from '@antv/larkmap';
import { LarkMap, HeatmapLayer, CustomControl, HexbinLayerStyleAttribute } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';

const FieldList = [
  { type: 'number', lable: 'SiteOrder', value: 'SiteOrder', typeColor: 'green', typeName: '数值' },
  { type: 'number', lable: 'DBH', value: 'DBH', typeColor: 'green', typeName: '数值' },
];

const mapConfig = {
  style: 'dark',
  center: [-122.46, 37.74],
  zoom: 12,
  pitch: 0,
};

const DefaultHexbinLayerStyle = {
  transforms: [
    {
      type: 'hexagon',
      size: 100,
      field: 'SiteOrder',
      method: 'sum',
    },
  ],
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
  style: {
    opacity: 0.9,
  },
};

const hexbinLayerOptions: Omit<HeatmapLayerProps, 'source'> = {
  shape: 'hexagonColumn',
  size: {
    field: 'sum',
    value: ({ sum }) => {
      return sum * 100;
    },
  },
  ...DefaultHexbinLayerStyle,
};

export default () => {
  const [layerOptions, setLayerOptions] = useState(hexbinLayerOptions);
  const [source, setSource] = useState({
    data: '',
    parser: { type: 'csv', x: 'longitude', y: 'latitude' },
  });

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/44884a0c-b82b-4352-a15d-7c8ba6e44c54.csv')
      .then((response) => response.text())
      .then((data: any) => {
        setSource((prevState) => ({ ...prevState, data }));
      });
  }, []);

  return (
    <LarkMap mapType="GaodeV1" style={{ height: '400px', overflow: 'hidden' }} mapOptions={mapConfig}>
      <CustomControl position="topleft" style={{ width: '300px', background: '#fff', padding: '10px' }}>
        <h3>属性配置</h3>
        <HexbinLayerStyleAttribute
          style={{ overflowX: 'hidden', overflowY: 'auto', maxHeight: '300px' }}
          initialValues={DefaultHexbinLayerStyle}
          fieldList={FieldList}
          onChange={(values: HexbinLayerStyleAttributeValue) => {
            console.log('values: ', values);
            setLayerOptions(values);
          }}
        />
      </CustomControl>
      <HeatmapLayer {...layerOptions} source={{ ...source, transforms: layerOptions?.transforms }} />
    </LarkMap>
  );
};
