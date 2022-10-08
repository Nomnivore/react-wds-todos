import React from "react";
import { Swap, useTheme } from "react-daisyui";
import { useRef, useState } from "react";

const classes = "material-symbols-rounded text-3xl";

function ThemeToggle() {
  const swapEle = useRef();
  const [active, setActive] = useState(true);
  const { theme, setTheme } = useTheme();

  function LightIcon() {
    return <span className={classes}>light_mode</span>;
  }

  function DarkIcon() {
    return <span className={classes}>dark_mode</span>;
  }

  function clickHandler(ev) {
    ev.preventDefault();

    console.log(theme);
    console.log(active);
    setActive(!active);
    const newTheme = active ? "light" : "dark";

    document
      .getElementsByTagName("html")[0]
      .setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  }

  return (
    <Swap
      offElement={LightIcon()}
      onElement={DarkIcon()}
      rotate={true}
      className={"p-2" + (active ? " swap-active" : "")}
      onClick={clickHandler}
      ref={swapEle}
    />
  );
}

export default ThemeToggle;
