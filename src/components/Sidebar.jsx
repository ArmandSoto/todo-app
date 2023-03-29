import { useEffect } from "react";

export default function Sidebar(props) {
    let listItemStyle= `${
        props.isOpen
          ? "cursor-pointer p-2 translate-x-1"
          : "-translate-x-72"
      } p-2 transition delay-100 duration-500`
    

  return (
    <nav
      className={` ${
        props.isOpen ? "w-1/6 px-8" : "w-0"
      } duration-700`}
    >
      <ul
        // className={`${
        //   props.isOpen ? "visible" : "hidden"
        // } duration-1000`}
      >
        <li
          className={listItemStyle}
          onClick={(event) => {
            props.changePage(event.target.innerHTML);
          }}
        >
          Inbox
        </li>
        <li
          className={listItemStyle + ' delay-300'}
          onClick={(event) => {
            props.changePage(event.target.innerHTML);
          }}
        >
          Important
        </li>
      </ul>
    </nav>
  );
}
