import { useState } from "react";
import { rougeColors } from "../constants/constants";
import { useDispatch } from "react-redux";
import { changeColor } from "../reducer/colorSlice";

const ColorPicker = () => {
    const [selectedColor, setSelectedColor] = useState(null);
    const dispatch = useDispatch();

    const handleColorButton = (color) => {
        setSelectedColor(color);
        dispatch(changeColor(color));
    }
    return (
        <ul className='inline-flex gap-x-8 gap-y-4 p-12'>
          {rougeColors.map(color => 
            (
              <li key={color}>
                <button className={`w-16 h-16 rounded-full ${selectedColor === color && `outline outline-offset-4 outline-[#be123c]`}`} style={{background: color}} onClick={(e) => {
                  e.preventDefault();
                  handleColorButton(color);
                }}></button>
              </li>
            )
          )}
        </ul>    )
}

export default ColorPicker;