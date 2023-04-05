import { InboxIcon, StarIcon } from "@heroicons/react/24/outline";

export default function Sidebar(props) {
  let listItemStyle = `${
    props.isOpen ? "cursor-pointer p-2 translate-x-1" : "-translate-x-72"
  } p-2 transition delay-100 ease-in-out text-xl flex justify-around items-center`;

  const themeColorItems = props.themeColors.map((item, index) => (
    <button
      key={item.key}
      onClick={() => props.changeTheme(index)}
      className={`${item.color} border-2 rounded-full w-6 h-6 `}
    ></button>
  ));

  return (
    <nav
      className={` ${
        props.isOpen ? "w-1/6 px-8" : "w-0"
      } duration-100 flex-col`}
    >
      <ul>
        <li
          className={listItemStyle}
          onClick={(event) => {
            props.changePage(event.target.textContent);
          }}
        >
          Inbox
          <InboxIcon className="ml-auto align-bottom stroke-slate-400 h-6 w-6" />
        </li>
        <li
          className={`${listItemStyle}`}
          onClick={(event) => {
            props.changePage(event.target.textContent);
          }}
        >
          Important
          <StarIcon className="ml-auto align-bottom stroke-slate-400 h-6 w-6" />
        </li>
      </ul>
      <div
        className={`${
          props.isOpen ? "translate-x-1" : "-translate-x-72"
        } transition ease-in-out flex-col mt-6`}
      >
        <div
          className={`rounded-full border-2 bg-gradient-to-r from-purple-500 to-pink-500 opacity-75 mt-6 flex-col`}
        >
          <p className={` font-extrabold text-white text-center p-2`}>Themes</p>
        </div>
        {themeColorItems}
      </div>
    </nav>
  );
}
