

export default function Sidebar(props) {
  let listItemStyle = `${
    props.isOpen ? "cursor-pointer p-2 translate-x-1" : "-translate-x-72"
  } p-2 transition delay-100 duration-600`;



  const themeColorItems = props.themeColors.map((item, index) => (
    <button key={item.key} onClick={()=> props.changeTheme(index)} className={`${item.color} border-2 rounded-full w-6 h-6 `}></button>
  ));

  return (
    <nav className={` ${props.isOpen ? "w-1/6 px-8" : "w-0"} duration-700`}>
      <ul>
        <li
          className={listItemStyle}
          onClick={(event) => {
            props.changePage(event.target.innerHTML);
          }}
        >
          Inbox
        </li>
        <li
          className={listItemStyle + " delay-200"}
          onClick={(event) => {
            props.changePage(event.target.innerHTML);
          }}
        >
          Important
        </li>
      </ul>
      <div className={`${ props.isOpen ? 'translate-x-1' :  '-translate-x-72' } transition delay-200 duration-600 w-fit`}>
      { themeColorItems }
      </div>
    </nav>
  );
}
