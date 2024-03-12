import React, { useState } from 'react'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from 'reactstrap'

const SelectPicker = ({ items, defaultSelected, onChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggle = () => setDropdownOpen((prevState) => !prevState)

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>{defaultSelected}</DropdownToggle>
      <DropdownMenu>
        {items.map((item) => {
          return (
            <DropdownItem
              key={item}
              onClick={() => {
                onChange(item)
              }}
              value={item}
            >
              {item}
            </DropdownItem>
          )
        })}
      </DropdownMenu>
    </Dropdown>
  )
}

export default SelectPicker
