import React from 'react';
import PropTypes from 'prop-types';
import {useIsMobileEnv} from '@/common';
import { ButtonWhite } from '@/component/ui-components';
import icArrow from '@/images/dropdown-arrow.svg';
import { MobileSelect, DropdownWrapper, DropdownList, DropdownListItem } from './style';

const StyledSelect = ({defaultValue, options, onSelect}) => {
  const isMobileEnv = useIsMobileEnv();
  const [showDropdown, setShowDropdown] = React.useState(false);
  const onListSelect = (val) => {
    onSelect(val);
    setShowDropdown(false);
  };
  const onDefaultSelect = (e) => {
    onSelect(e.target.value);
  };
  const findMatch = options.find((n) => n.value === defaultValue);
  const currentValue = findMatch ? findMatch.label : defaultValue;

  return (
    isMobileEnv ? (
      <MobileSelect onChange={onDefaultSelect} value={defaultValue}>
        {options.map((opt) => <option value={opt.value} key={opt.value}>{opt.label}</option>)}
      </MobileSelect>
    ) : (
      <DropdownWrapper>
        <ButtonWhite onClick={() => setShowDropdown((prev) => !prev)}>
          {currentValue}
          <img src={icArrow} />
        </ButtonWhite>
        <input type="hidden" />
        {showDropdown && (
          <DropdownList>
            {options.map((opt) => <DropdownListItem key={opt.label} onClick={() => onListSelect(opt.value)}>{opt.label}</DropdownListItem>)}
          </DropdownList>
        )}
      </DropdownWrapper>
    )
  );
};

export default StyledSelect;

StyledSelect.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
};