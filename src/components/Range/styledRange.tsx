import React, { forwardRef, InputHTMLAttributes } from 'react';

import styled from '@emotion/styled';

const StyledInput = styled.input`
& {
  --thumbSize: 18px;
  --trackSize: 8px;
  --thumbBg: #fff;
  --trackBg: #f2f2f2;
  --progressBg: #262626;

  /* webkit progress workaround */
  --webkitProgressPercent: 0%;
}

&[name="red"] {
  --progressBg: #f00;
  --thumbBg: #f00;
}

&[name="green"] {
  --progressBg: #0f0;
  --thumbBg: #0f0;
}

&[name="blue"] {
  --progressBg: #00f;
  --thumbBg: #00f;
}

& {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  height: var(--thumbSize);
  width: 100%;
  margin: 0;
  padding: 0;
}
&:focus {
  outline: none;
}

/* Thumb */
&::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: var(--thumbSize);
  height: var(--thumbSize);
  background-color: var(--thumbBg);
  border-radius: calc(var(--thumbSize) / 2);
  border: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  margin-top: calc(((var(--thumbSize) - var(--trackSize)) / 2) * -1);
  cursor: pointer;
}
&::-moz-range-thumb {
  -moz-appearance: none;
  appearance: none;
  width: var(--thumbSize);
  height: var(--thumbSize);
  background-color: var(--thumbBg);
  border-radius: calc(var(--thumbSize) / 2);
  border: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  margin-top: calc(((var(--thumbSize) - var(--trackSize)) / 2) * -1);
  cursor: pointer;
}
&::-ms-thumb {
  -ms-appearance: none;
  appearance: none;
  width: var(--thumbSize);
  height: var(--thumbSize);
  background-color: var(--thumbBg);
  border-radius: calc(var(--thumbSize) / 2);
  border: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  margin-top: calc(((var(--thumbSize) - var(--trackSize)) / 2) * -1);
  cursor: pointer;
}

/* Track */
&::-webkit-slider-runnable-track {
  height: var(--trackSize);
  background-image: linear-gradient(
    90deg,
    var(--progressBg) var(--webkitProgressPercent),
    var(--trackBg) var(--webkitProgressPercent)
  );
  border-radius: calc(var(--trackSize) / 2);
}
&::-moz-range-track {
  height: var(--trackSize);
  background-color: var(--trackBg);
  border-radius: calc(var(--trackSize) / 2);
}
&::-ms-track {
  height: var(--trackSize);
  background-color: var(--trackBg);
  border-radius: calc(var(--trackSize) / 2);
}

/* Progress */
&::-moz-range-progress {
  height: var(--trackSize);
  background-color: var(--progressBg);
  border-radius: calc(var(--trackSize) / 2) 0 0 calc(var(--trackSize) / 2);
}
&::-ms-fill-lower {
  height: var(--trackSize);
  background-color: var(--progressBg);
  border-radius: calc(var(--trackSize) / 2) 0 0 calc(var(--trackSize) / 2);
}
`;

const Range = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({...props}, ref) => (
  <StyledInput {...props} ref={ref} type="range" />
));

Range.displayName = 'Range';

export default Range;
