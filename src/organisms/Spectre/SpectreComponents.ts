import styled from '@emotion/styled';

export const ClipboardInput = styled.textarea`
  position: fixed;
  top: -100px;
  left: -100px;
  width: 1px;
  height: 1px;
`;

interface SpectreCellProps {
  color: string;
  hasBorderRadius: boolean;
}

export const SpectreCell = styled.button<SpectreCellProps>`
  border: 0;
  cursor: pointer;
  background-color: ${({color}) => color};
  width: 48px;
  height: 48px;
  border-radius: ${({hasBorderRadius}) => hasBorderRadius ? '4px' : 0};
`;
