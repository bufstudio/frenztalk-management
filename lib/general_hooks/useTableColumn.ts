import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TableOrderEnum } from "../enums/TableOrderEnum";

//TODO : Make sure this is type safe : kyang
export const useTableColumn = (
  data: any[],
  columns: any[],
  setColumns: Dispatch<SetStateAction<any[]>>
) => {
  const [sortedData, setSortedData] = useState<any[]>(data);

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  const sortColumn = (columnLabel: string | null, columns: any) => {
    if (!columnLabel) return sortedData;

    const column = columns.find((col: any) => col.label === columnLabel);

    let sortedDataTemp = [...data];

    setColumnOrder(column.key);

    if (column.order === TableOrderEnum.ASC) {
      sortedDataTemp.sort((a: any, b: any) => {
        if (a[column.key] === undefined) {
          return 1;
        }
        if (b[column.key] === undefined) {
          return -1;
        }

        if (a[column.key] < b[column.key]) return -1;
        if (a[column.key] > b[column.key]) return 1;
        return 0;
      });
    } else if (column.order === TableOrderEnum.DESC) {
      sortedDataTemp.sort((a: any, b: any) => {
        if (a[column.key] === undefined) {
          return -1;
        }
        if (b[column.key] === undefined) {
          return 1;
        }

        if (a[column.key] > b[column.key]) return -1;
        if (a[column.key] < b[column.key]) return 1;
        return 0;
      });
    } else {
      sortedDataTemp = JSON.parse(JSON.stringify(data));
    }

    console.log("haha");
    console.log(sortedDataTemp);

    setSortedData(sortedDataTemp);
  };

  const setColumnOrder = (columnKey: any) => {
    const updatedColumns = columns.map((column) => {
      if (column.key === columnKey) {
        switch (column.order) {
          case TableOrderEnum.NONE:
            column.order = TableOrderEnum.ASC;
            break;
          case TableOrderEnum.ASC:
            column.order = TableOrderEnum.DESC;
            break;
          default:
            column.order = TableOrderEnum.NONE;
            break;
        }
      } else {
        column.order = TableOrderEnum.NONE;
      }
      return column;
    });

    setColumns(updatedColumns);
  };

  return { sortedData, columns, sortColumn };
};
