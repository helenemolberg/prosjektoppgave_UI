import React, { useCallback, useState} from 'react';
import CreatableSelect from 'react-select/creatable';
import './MultiSelect.css';


function arrayMove(array, from, to) {
    array = array.slice();
    array.slice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
    return array;
}

export default function MultiSelect() {
    const [selected, setSelected] = React.useState([]);
    const [options, setOptions] = useState([
        {value: 'vvs', label: 'VVS'},
        {value: 'bro', label: 'Bro'},
        {value: 'veg', label: 'Veg'},
        {value: 'ruh', label: 'RUH'},
        {value: 'parsellnr', label: 'Parsellnummer'},
        {value: 'marked', label: 'Marked/Annonsebilder'},
    ]);

    const onChange = selectedOptions => setSelected(selectedOptions);

    const onSortEnd = ({oldIndex, newIndex}) => {
        const newValue = arrayMove(selected, oldIndex, newIndex);
        setSelected(newValue);
        console.log('Values sorted:', newValue.map(i => i.value));
    };

    const handleCreate = useCallback(
        (inputValue) => {
            const newValue = {value: inputValue.toLowerCase(), label: inputValue};
            setOptions([...options, newValue]);
            setSelected(newValue);
        },
        [options]
    );

    return(
        <CreatableSelect
            className="multi-select"
            isClearable
            onSortEnd={onSortEnd}
            isMulti
            value={selected}
            options={options}
            onChange={onChange}
            onCreateOption={handleCreate}
            placeholder="velg kategori"
            closeMenuOnSelect={false}
        />
    )
}