import { useState } from "react";

export function useItemForm() {
    const [category, setCategory] = useState('');
    const [itemname, setItemname] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [etc, setEtc] = useState('');

    const resetForm = () => {
        setCategory('');
        setItemname('');
        setManufacturer('');
        setQuantity(0);
        setEtc('');
    };

    return {
        category,
        setCategory,
        itemname,
        setItemname,
        manufacturer,
        setManufacturer,
        quantity,
        setQuantity,
        etc,
        setEtc,
        resetForm,
    };
}