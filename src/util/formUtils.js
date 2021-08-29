export function createPanelFooterTemplate(selectedNotes, notes, emptyMessage, itemName) {
    const selectedItems = selectedNotes;
    const length = selectedItems ? selectedItems.length : 0;

    if (notes.length === 0) {
        return (
            <div className="multiselect-footer">
                <ul className="multiselect-items">
                    <li className="multiselect-empty-message">{emptyMessage} </li>
                </ul>
            </div>
        );
    } else {
        return (
            <div className="multiselect-footer">
                <b>{length}</b> {itemName}{length !== 1 ? 's' : ''} selected.
            </div>
        );
    }
}

export const getFormErrorMessage = (errors, name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>
};

