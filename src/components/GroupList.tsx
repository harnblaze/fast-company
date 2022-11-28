import React, { FC } from "react";
import { IProfession, IProfessions } from "../api/fake.api/professions.api";
import { onItemsSelectCallback } from "../App";

interface IGroupListProps {
  items: IProfessions;
  valueProperty?: string;
  contentProperty?: string;
  onItemsSelect: onItemsSelectCallback;
  selectedItem: IProfession | undefined;
}

const GroupList: FC<IGroupListProps> = ({
  items,
  valueProperty = "_id",
  contentProperty = "name",
  onItemsSelect,
  selectedItem,
}) => {
  return (
    <ul className="list-group">
      {Object.keys(items).map((item) => (
        <li
          className={
            "list-group-item" + (items[item] === selectedItem ? " active" : "")
          }
          key={items[item][valueProperty]}
          onClick={() => onItemsSelect(items[item])}
          role={"button"}
        >
          {items[item][contentProperty]}
        </li>
      ))}
    </ul>
  );
};
GroupList.defaultProps = {
  valueProperty: "_id",
  contentProperty: "name",
};
export default GroupList;
