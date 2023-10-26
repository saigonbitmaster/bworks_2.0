import * as React from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useListSortContext, useTranslate } from "react-admin";

const SortButton = ({ fields }) => {
  // sort is an object { field, order } containing the current sort
  // setSort is a callback ({ field, order }) => void allowing to change the sort field and order
  const { sort, setSort } = useListSortContext();
  // rely on the translations to display labels like 'Sort by sales descending'
  const translate = useTranslate();
  // open/closed state for dropdown
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  // mouse handlers
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChangeSort: React.MouseEventHandler<HTMLLIElement> = (event) => {
    const field = event.currentTarget.dataset.sort;
    if (field) {
      setSort({
        field,
        order: field === sort.field ? inverseOrder(sort.order) : "ASC",
      });
    }
    setAnchorEl(null);
  };

  // English stranslation is 'Sort by %{field} %{order}'
  const buttonLabel = translate("ra.sort.sort_by", {
    field: translate(`resources.products.fields.${sort.field}`),
    order: translate(`ra.sort.${sort.order}`),
  });

  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        color="primary"
        onClick={handleClick}
        startIcon={<SortIcon />}
        endIcon={<ArrowDropDownIcon />}
        size="small"
      >
        {buttonLabel}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {fields.map((field) => (
          <MenuItem
            onClick={handleChangeSort}
            // store the sort field in the element dataset to avoid creating a new click handler for each item (better for performance)
            data-sort={field}
            key={field}
          >
            {translate(`resources.products.fields.${field}`)}{" "}
            {translate(
              `ra.sort.${
                sort.field === field ? inverseOrder(sort.order) : "ASC"
              }`
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const inverseOrder = (sort: string) => (sort === "ASC" ? "DESC" : "ASC");

export default SortButton;
