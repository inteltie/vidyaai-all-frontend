import React, { useState, useRef, useEffect } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

const HindiVirtualKeyboard = ({ onChange }) => {
  const [input, setInput] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(false);
  const keyboardRef = useRef(null);
  const inputRef = useRef(null);

  const layout = {
    default: [
      "क ख ग घ ङ च छ ज झ ञ",
      "ट ठ ड ढ ण त थ द ध न",
      "प फ ब भ म य र ल व श",
      "ष स ह क्ष त्र ज्ञ अ आ इ ई",
      "उ ऊ ऋ ए ऐ ओ औ ा ि ी",
      "ु ू ृ े ै ो ौ ं : {bksp}",
      "{space}",
    ],
  };

  // const handleChange = (input) => {
  //   setInput(input);
  //   if (onChange) {
  //     onChange(input);
  //   }
  // };

  const handleKeyPress = (button) => {
    setInput((prev) => {
      let newInput;
      if (button === "{bksp}") {
        newInput = prev.slice(0, -1);
      } else if (button === "{space}") {
        newInput = prev + " ";
      } else {
        newInput = prev + button;
      }
  
      // Call onChange with the updated input
      if (onChange) {
        onChange(newInput);
      }
  
      return newInput;
    });
  
    // Re-focus the input field after virtual key press
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  

  // Handle manual keyboard input
  const handleManualChange = (event) => {
    setInput(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  // Detect clicks outside input and keyboard
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        keyboardRef?.current &&
        !keyboardRef?.current?.contains(event?.target) &&
        inputRef?.current &&
        !inputRef?.current?.contains(event?.target)
      ) {
        setShowKeyboard(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      style={{ position: "relative", textAlign: "center", marginTop: "20px" }}
    >
      {/* Input Field */}
      <input
        ref={inputRef}
        value={input}
        // readOnly
        onChange={handleManualChange} // Allow manual typing
        placeholder="यहाँ टाइप करें..."
        onFocus={() => setShowKeyboard(true)}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "18px",
          textAlign: "center",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />

      {/* Keyboard - Will Show Only if showKeyboard is True */}
      {showKeyboard && (
        <div
          ref={keyboardRef}
          style={{
            position: "absolute",
            bottom: "80%", // Position above the input field
            // transform: "translateX(-20%)",
            transform: "translateY(10%)",
            zIndex: 1000, // Ensure it's on top
            height: "400px",
            // marginBottom: "10px", // Add some space between the keyboard and the input
          }}
        >
          <Keyboard
            layout={layout}
            // onChange={handleChange}
            onKeyPress={handleKeyPress}
            theme="hg-theme-default hg-layout-default"
            buttonTheme={[
              {
                class: "hg-red",
                buttons: "{bksp}",
              },
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default HindiVirtualKeyboard;
