import React, { useContext } from 'react';
import GlobalContext, { GlobalContextType } from '../context/GlobalContext';

const Labels = () => {
    const { labels, setLabels } = useContext<GlobalContextType>(GlobalContext);

    const handleLabelChange = (label: string) => {
        const updatedLabels = labels.map((lbl: any) => {
            if (lbl.label === label) {
                return { ...lbl, checked: !lbl.checked };
            }
            return lbl;
        });

        setLabels(updatedLabels);
    };

    return (
        <React.Fragment>
            <p className='text-gray-500 font-bold mt-10'></p>
            {labels.map(({ label, checked }: any, idx: string | number) => (
                <label
                    htmlFor='label'
                    key={idx}
                    className='items-center mt-3 block'
                >
                    <input
                        onChange={() => handleLabelChange(label)}
                        type='checkbox'
                        checked={checked}
                        className={`form-checkbox h-5 w-5 text-${label}-400 rounded focus:ring-0 cursor-pointer`}
                    />
                    <span className='ml-2 text-gray-700 capitalize'>{label}</span>
                </label>
            ))}
        </React.Fragment>
    );
};

export default Labels;
