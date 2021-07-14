import "./basic-menubar.css"

function Menubar(oProps) {
  const menuList = oProps.menuList;
  let sClassName = oProps.wrapperClassName ? oProps.wrapperClassName + " menubarWrapper" : " menubarWrapper";
  return (
    <div className={sClassName}>
      {menuList.map((oMenu) => <div className={oProps.activeMenuId === oMenu.id ? "menu selected" : "menu "}
                                    onClick={() => {oProps.onMenuClick(oMenu.id)}}>{oMenu.label}</div>)}
    </div>
  );
}

export default Menubar;
