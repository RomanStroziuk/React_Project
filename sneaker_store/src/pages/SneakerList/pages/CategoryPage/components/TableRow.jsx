import React, { memo, useCallback, useState } from "react";
import RemoveButton from "../../../../../common/components/Buttons/RemoveButton";
import EditButton from "../../../../../common/components/Buttons/EditButton";
import SaveButton from "../../../../../common/components/Buttons/SaveButton";
import CancelButton from "../../../../../common/components/Buttons/CancelButton";

const TableRowComponent = ({
  category,
  onRemove,
  updateCategory,
  onValidationError,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [nameEdit, setNameEdit] = useState(category.name);

  const toggleEditMode = useCallback(() => {
    setIsEditMode((prev) => !prev);
    setNameEdit(category.name);
  }, [category.name]);

  const handleSave = useCallback(async () => {
    if (!nameEdit.trim()) {
      onValidationError("Category name cannot be empty.");
      return;
    }
    if (nameEdit.trim().length < 3) {
      onValidationError("Category name must be at least 3 characters long.");
      return;
    }

    const isValid = await updateCategory(category.id, nameEdit);
    if (isValid) {
      toggleEditMode();
    }
  }, [nameEdit, updateCategory, category.id, toggleEditMode, onValidationError]);

  return (
    <tr>
      <td>{category.id}</td>
      <td>
        {isEditMode ? (
          <input
            value={nameEdit}
            onChange={(e) => setNameEdit(e.target.value)}
          />
        ) : (
          category.name
        )}
      </td>
      <td>
        <div style={{ display: "flex", gap: "1em" }}>
          {isEditMode ? (
            <>
              <SaveButton onSubmit={handleSave} />
              <CancelButton onSubmit={toggleEditMode} />
            </>
          ) : (
            <>
              <EditButton onSubmit={toggleEditMode} />
              <RemoveButton onSubmit={() => onRemove(category.id)} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

const TableRow = memo(TableRowComponent);

export default TableRow;