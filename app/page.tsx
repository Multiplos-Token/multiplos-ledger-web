"use client";

import { Button } from '@fluentui/react-components';
import { Button as AButton, Space } from 'antd';

export default function Home() {
  return (
    <div>
    <Button>Teste de Botão</Button>
    <hr/>
    <button className="border-3">Teste de outro botão</button>
    <Space wrap>
      <AButton type="primary">Primary Button</AButton>
      <AButton type="default">Default Button</AButton>
      <AButton type="dashed">Dashed Button</AButton>
      <AButton type="text">Text Button</AButton>
      <AButton type="link">Link Button</AButton>
    </Space>
    </div>
  );
}
