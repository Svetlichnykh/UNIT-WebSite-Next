"use client";

import React from "react";

/**
 * Props:
 * - block: original data object (checkbox or radio group)
 * - inputs: object map { [id]: { id, value, checked, disabled } }
 * - onToggle(id, checked) - called for checkbox
 * - onRadioChange(groupName, selectedId) - called for radio group
 * - currentValues - used to display computed values (after relations applied)
 */
export default function CalculatorBlock({
                                            block,
                                            inputs,
                                            onToggle,
                                            onRadioChange,
                                            currentValues,
                                        }) {
    // Detect type
    const isRadioGroup = !!block.radioName || !!block.subblocks;
    if (isRadioGroup) {
        const name = block.radioName;
        // find selected input id
        const options = block.subblocks || [];
        const selected = options.map((_, i) => `${name}-${i + 1}`).find(id => inputs[id]?.checked);

        const groupPriceDisplay = selected ? `+${(currentValues[selected] || inputs[selected]?.value || 0).toLocaleString()} ₽` : "+0 ₽";

        return (
            <div className="calculator__block-radio">
                <div className="block-choice__title">
                    <div className="block__price">
                        <h4 className="h4">{block.title}</h4>
                        <span className="h4 price-display">{groupPriceDisplay}</span>
                    </div>
                    <p className="text">{block.subTitle || ""}</p>
                </div>

                {options.map((sub, idx) => {
                    const inputId = `${name}-${idx + 1}`;
                    const input = inputs[inputId] || {};
                    const effectiveValue = currentValues[inputId] ?? input.value ?? 0;
                    return (
                        <div className="block-choice indent-30L" key={inputId}>
                            <div className="block-choice__check">
                                <input
                                    type="radio"
                                    name={name}
                                    id={inputId}
                                    value={sub.optionPrice}
                                    data-title={sub.dataTitle}
                                    checked={!!input.checked}
                                    onChange={() => onRadioChange(name, inputId)}
                                    data-local-sum-name={block.localSumName || undefined}
                                />
                                <label htmlFor={inputId}></label>
                            </div>

                            <div className="block-choice__title">
                                <div className="block__price">
                                    <h5 className="h5">{sub.optionTitle}</h5>
                                    <span className="h5 price-value">{`+${effectiveValue.toLocaleString()} ₽`}</span>
                                </div>
                                <p className="text">{sub.optionText}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    // checkbox block
    const id = block.checkboxName;
    const input = inputs[id] || {};
    const effectiveValue = currentValues[id] ?? input.value ?? 0;
    const isForever = block.default === "forever";

    return (
        <div className="block-choice" key={id}>
            <div className="block-choice__check">
                <input
                    type="checkbox"
                    id={id}
                    name={block.checkboxName}
                    checked={!!input.checked}
                    disabled={isForever}
                    onChange={(e) => onToggle(id, e.target.checked)}
                    value={block.price}
                    data-title={block.dataTitle}
                    data-local-sum-name={block.localSumName || undefined}
                />
                <label htmlFor={id}></label>
            </div>

            <div className="block-choice__title">
                <div className="block__price">
                    <h4 className="h4">{block.title}</h4>
                    <span className="h4 price-value">{`+${effectiveValue.toLocaleString()} ₽`}</span>
                </div>

                <p className="text">{block.subTitle || ""}</p>
            </div>
        </div>
    );
}
