import './App.css';
import MenuBar from "../Menubar/Menubar";
import MenuList from "../../mock-data/menu-list/menu-list";
import VerticalMenuList from "../../mock-data/vertical-menu-list/vertical-menu-list";
import ItemDetails from "../../mock-data/item-details/item-details";
import {AgGridColumn, AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import {useState} from "react";
import InfoSection from "../Sections/info-section";

function App() {
  let [sActiveManuId, setActiveMenuId] = useState(MenuList[0].id);
  let [sActiveVerticalManuId, setActiveVerticalMenuId] = useState(VerticalMenuList[sActiveManuId][0].id);

  const onHorizontalBarClick = (sMenuId) => {
    setActiveMenuId(sMenuId);
    setActiveVerticalMenuId(VerticalMenuList[sMenuId][0].id);
  };
  const onVerticalHorizontalBarClick = (sMenuId) => {
    setActiveVerticalMenuId(sMenuId);
  };

  let prepareDataFroGrid = () => {
    const aRowData = [];
    VerticalMenuList[sActiveManuId].forEach((oItem)=> {
      if (oItem.id !== "grid") {
        aRowData.push({
          label: oItem.label,
          information: ItemDetails[oItem.id].text
        })
      }
    })
    return aRowData;
  };

  let getInfoSection = () => {
    if(sActiveVerticalManuId === "grid") {
      const columnDefs = [
        { field: "label", filter: true,},
        { field: "information", suppressSizeToFit: true}
      ];
      let defaultColDef = {
        flex: 1,
            minWidth: 100,
            resizable: true,
            floatingFilter: true,
      }
      return (
          <div className="ag-theme-alpine" style={{height: "100%", width: "100%"}}>
            <AgGridReact
                defaultColDef = {defaultColDef}
                columnDefs={columnDefs}
                onFirstDataRendered={(p) => {
                  var allColumnIds = [];
                  p.columnApi.getAllColumns().forEach(function (column) {
                    allColumnIds.push(column.colId);
                  });

                  p.columnApi.autoSizeColumns(allColumnIds, false);
                }}
                rowData={prepareDataFroGrid()}>
              <AgGridColumn field="label" ></AgGridColumn>
              <AgGridColumn resizable={true} field="information"></AgGridColumn>
            </AgGridReact>
          </div>
      );
    }
    else {
      return <InfoSection info={ItemDetails[sActiveVerticalManuId]}/>
    }
  };

  return (
      <div className="App">
        <MenuBar
            key={"horizontal"}
            menuList={MenuList}
            className={""}
            onMenuClick={onHorizontalBarClick}
            activeMenuId={sActiveManuId}
        />
        <div className={"sidebarSectionWrapper"}>
          <MenuBar
              key={"vertical"}
              menuList={VerticalMenuList[sActiveManuId]}
              wrapperClassName={"vertical"}
              onMenuClick={onVerticalHorizontalBarClick}
              activeMenuId={sActiveVerticalManuId}
          />
          {getInfoSection()}
        </div>
      </div>
  );
}

export default App;
