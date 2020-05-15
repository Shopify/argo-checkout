import React, {useCallback} from 'react';
import {SelectProps} from '@shopify/argo/components';
import {Select as PolarisSelect} from '@shopify/polaris';

export default function Select({
  error,
  label = '',
  labelInline,
  options,
  onChange,
  onBlur,
  value,
}: SelectProps) {
  const polarisOnChange = useCallback(selected => onChange(selected), [onChange]);
  const polarisOnBlur = useCallback(() => onBlur(), [onBlur]);
  return (
    <PolarisSelect
      label={label}
      labelInline={labelInline}
      options={options}
      onChange={polarisOnChange}
      onBlur={polarisOnBlur}
      value={value}
      error={error}
    />
  );
}
