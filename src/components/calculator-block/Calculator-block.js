// components/CalculatorBlock.js
import React, { useState, useEffect } from 'react';

// Это компонент для одного блока калькулятора
const CalculatorBlock = ({ data }) => {
    const [selectedValue, setSelectedValue] = useState(null);
    const [price, setPrice] = useState(0);
    const [relationsMap, setRelationsMap] = useState({});
    const [requirementsMap, setRequirementsMap] = useState({});

    useEffect(() => {
        // Заполнение зависимостей (relations) и требований (requirements)
        const localRelationsMap = {};
        const localRequirementsMap = {};

        if (data.relations) {
            data.relations.forEach((relation) => {
                localRelationsMap[relation.id] = relation.change;
            });
        }

        if (data.require) {
            data.require.forEach(({ id, alert }) => {
                localRequirementsMap[id] = { alert };
            });
        }

        setRelationsMap(localRelationsMap);
        setRequirementsMap(localRequirementsMap);
    }, [data]);

    // Проверка, удовлетворяют ли все требования
    const checkRequirements = (input) => {
        const requirements = requirementsMap[input.id];
        if (!requirements) return true;

        let allMet = true;

        Object.values(requirements).forEach(({ id, alert }) => {
            const target = document.getElementById(id);
            const alertElement = document.getElementById(alert);

            if (!target?.checked) {
                alertElement?.classList.add('show');
                allMet = false;
            } else {
                alertElement?.classList.remove('show');
            }
        });

        return allMet;
    };

    // Обработчик изменения радиокнопки или чекбокса
    const handleChange = (e) => {
        const { value, name, checked } = e.target;

        if (checked && !checkRequirements(e.target)) {
            e.preventDefault();
            return;
        }

        setSelectedValue(value);

        if (name === 'radioName') {
            setPrice(parseInt(value, 10) || 0);
        }
    };

    return (
        <div className="block-choice">
            <div className="block-choice__check">
                <input
                    type={data.radio ? 'radio' : 'checkbox'}
                    name={data.checkboxName || data.radioName}
                    id={data.checkboxName}
                    value={data.price}
                    checked={selectedValue === data.price.toString()}
                    onChange={handleChange}
                    data-relations={JSON.stringify(data.relations)}
                />
                <label htmlFor={data.checkboxName}></label>
            </div>

            <div className="block-choice__title">
                <div className="block__price">
                    <h4>{data.title}</h4>
                    <span className="price-value">+{price.toLocaleString()} ₽</span>
                </div>
                <p>{data.subTitle}</p>
            </div>
        </div>
    );
};

export default CalculatorBlock;
