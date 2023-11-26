import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const PopupMenu = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = value => {
    setSelectedOption(value);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Menu onSelect={value => handleOptionSelect(value)}>
        <MenuTrigger>
          <TouchableOpacity
            style={{padding: 10, borderWidth: 1, borderColor: 'black'}}>
            <Text>Open Menu</Text>
          </TouchableOpacity>
        </MenuTrigger>
        <MenuOptions>
          <MenuOption value="option1" text="Option 1" />
          <MenuOption value="option2" text="Option 2" />
          <MenuOption value="option3" text="Option 3" />
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default PopupMenu;
