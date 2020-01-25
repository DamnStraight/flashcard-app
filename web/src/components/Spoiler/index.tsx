import React from 'react';
import './Spoiler.scss';
import styled from 'styled-components';

type Props = {
  children: React.ReactNode;
}

const CodeBlock = styled.div`
  filter: blur(3px);
  &:hover {
    filter: blur(0px);
  }
`;

const Spoiler: React.FC = ({ children }) => {
  return (
    <div className="spoiler-wrapper" style={{ position: 'relative', overflow: 'hidden' }}>
      <CodeBlock>
        {children}
      </CodeBlock>
    </div>
  )
}

export default Spoiler;
