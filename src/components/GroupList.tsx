import React, { FC } from "react";
import { IProfession, IProfessions } from "../api/fake.api/professions.api";
import { onItemsSelectCallback } from "../types/callbacks";

interface IGroupListProps {
  items: IProfessions | IProfession[];
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
  if (Array.isArray(items)) {
    return (
      <ul className="list-group">
        {items.map((item) => (
          <li
            className={
              "list-group-item" + (item === selectedItem ? " active" : "")
            }
            key={item[valueProperty]}
            onClick={() => onItemsSelect(item)}
            role={"button"}
          >
            {item[contentProperty]}
          </li>
        ))}
      </ul>
    );
  }
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
