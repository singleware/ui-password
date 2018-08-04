"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Input_1;
"use strict";
/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
const Class = require("@singleware/class");
const DOM = require("@singleware/jsx");
const Control = require("@singleware/ui-control");
/**
 * Password input class.
 */
let Input = Input_1 = class Input extends Control.Component {
    /**
     * Default constructor.
     * @param properties Form properties.
     * @param children Form children.
     */
    constructor(properties, children) {
        super(properties, children);
        /**
         * Input states.
         */
        this.states = {
            name: '',
            required: false,
            readOnly: false,
            disabled: false
        };
        /**
         * Password element.
         */
        this.passwordSlot = DOM.create("slot", { name: "password", class: "password" });
        /**
         * Confirmation element.
         */
        this.confirmationSlot = DOM.create("slot", { name: "confirmation", class: "confirmation" });
        /**
         * Strength element.
         */
        this.strengthSlot = DOM.create("slot", { name: "strength", class: "strength" });
        /**
         * Field element.
         */
        this.field = (DOM.create("div", { class: "field" },
            this.passwordSlot,
            this.confirmationSlot));
        /**
         * Wrapper element.
         */
        this.wrapper = (DOM.create("div", { class: "wrapper" },
            this.field,
            this.strengthSlot));
        /**
         * Input styles.
         */
        this.styles = (DOM.create("style", null, `:host > .wrapper {
  display: flex;
  flex-direction: column;
}
:host > .wrapper > .field {
  display: flex;
}
:host > .wrapper > .field::slotted(*) {
  width: 100%;
  min-width: 0px;
}
:host > .wrapper > .field[data-orientation='row'] {
  flex-direction: row;
}
:host > .wrapper > .field,
:host > .wrapper > .field[data-orientation='column'] {
  flex-direction: column;
}`));
        /**
         * Input skeleton.
         */
        this.skeleton = (DOM.create("div", { slot: this.properties.slot, class: this.properties.class }, this.children));
        /**
         * Input elements.
         */
        this.elements = DOM.append(this.skeleton.attachShadow({ mode: 'closed' }), this.styles, this.wrapper);
        this.bindHandlers();
        this.bindProperties();
        this.assignProperties();
    }
    /**
     * Validates the confirmation password.
     */
    validateConfirmation() {
        const confirmation = Control.getChildByProperty(this.confirmationSlot, 'value');
        if (confirmation) {
            confirmation.setCustomValidity(this.value !== confirmation.value ? `Password string must be equal.` : ``);
        }
    }
    /**
     * Validates the password strength.
     */
    validateStrength() {
        const password = Control.getChildByProperty(this.passwordSlot, 'value');
        const progress = Control.getChildByProperty(this.strengthSlot, 'value');
        let current = 0;
        let maximum = 0;
        for (const strength in this.properties.patterns) {
            const level = parseInt(strength);
            if (this.properties.patterns[strength].test(password.value)) {
                current = Math.max(current, level);
            }
            maximum = Math.max(maximum, level);
        }
        if (progress) {
            progress.total = maximum;
            progress.value = current;
        }
        password.setCustomValidity(this.properties.strength > current ? `Password strength too weak.` : ``);
    }
    /**
     * Change event handler.
     */
    changeHandler() {
        this.validateConfirmation();
        this.validateStrength();
    }
    /**
     * Bind event handlers to update the custom element.
     */
    bindHandlers() {
        this.skeleton.addEventListener('keyup', Class.bindCallback(this.changeHandler));
    }
    /**
     * Bind exposed properties to the custom element.
     */
    bindProperties() {
        Object.defineProperties(this.skeleton, {
            name: super.bindDescriptor(Input_1.prototype, 'name'),
            value: super.bindDescriptor(Input_1.prototype, 'value'),
            empty: super.bindDescriptor(Input_1.prototype, 'empty'),
            required: super.bindDescriptor(Input_1.prototype, 'required'),
            readOnly: super.bindDescriptor(Input_1.prototype, 'readOnly'),
            disabled: super.bindDescriptor(Input_1.prototype, 'disabled'),
            orientation: super.bindDescriptor(Input_1.prototype, 'orientation')
        });
    }
    /**
     * Assign all elements properties.
     */
    assignProperties() {
        Control.assignProperties(this, this.properties, ['name', 'value']);
        this.orientation = this.properties.orientation || 'row';
        this.changeHandler();
    }
    /**
     * Get input name.
     */
    get name() {
        return this.states.name;
    }
    /**
     * Set input name.
     */
    set name(name) {
        this.states.name = name;
    }
    /**
     * Get input value.
     */
    get value() {
        return Control.getChildProperty(this.passwordSlot, 'value');
    }
    /**
     * Set input value.
     */
    set value(value) {
        Control.setChildProperty(this.passwordSlot, 'value', value);
    }
    /**
     * Get empty state.
     */
    get empty() {
        return this.value.length === 0;
    }
    /**
     * Get required state.
     */
    get required() {
        return this.states.required;
    }
    /**
     * Set required state.
     */
    set required(state) {
        this.states.required = state;
        Control.setChildProperty(this.passwordSlot, 'required', state);
        Control.setChildProperty(this.confirmationSlot, 'required', state);
    }
    /**
     * Get read-only state.
     */
    get readOnly() {
        return this.states.readOnly;
    }
    /**
     * Set read-only state.
     */
    set readOnly(state) {
        this.states.readOnly = state;
        Control.setChildProperty(this.passwordSlot, 'readOnly', state);
        Control.setChildProperty(this.confirmationSlot, 'readOnly', state);
    }
    /**
     * Get disabled state.
     */
    get disabled() {
        return this.states.disabled;
    }
    /**
     * Set disabled state.
     */
    set disabled(state) {
        this.states.disabled = state;
        Control.setChildProperty(this.passwordSlot, 'disabled', state);
        Control.setChildProperty(this.confirmationSlot, 'disabled', state);
    }
    /**
     * Get orientation mode.
     */
    get orientation() {
        return this.field.dataset.orientation || 'row';
    }
    /**
     * Set orientation mode.
     */
    set orientation(mode) {
        this.field.dataset.orientation = mode;
    }
    /**
     * Input element.
     */
    get element() {
        return this.skeleton;
    }
};
__decorate([
    Class.Private()
], Input.prototype, "states", void 0);
__decorate([
    Class.Private()
], Input.prototype, "passwordSlot", void 0);
__decorate([
    Class.Private()
], Input.prototype, "confirmationSlot", void 0);
__decorate([
    Class.Private()
], Input.prototype, "strengthSlot", void 0);
__decorate([
    Class.Private()
], Input.prototype, "field", void 0);
__decorate([
    Class.Private()
], Input.prototype, "wrapper", void 0);
__decorate([
    Class.Private()
], Input.prototype, "styles", void 0);
__decorate([
    Class.Private()
], Input.prototype, "skeleton", void 0);
__decorate([
    Class.Private()
], Input.prototype, "elements", void 0);
__decorate([
    Class.Private()
], Input.prototype, "validateConfirmation", null);
__decorate([
    Class.Private()
], Input.prototype, "validateStrength", null);
__decorate([
    Class.Private()
], Input.prototype, "changeHandler", null);
__decorate([
    Class.Private()
], Input.prototype, "bindHandlers", null);
__decorate([
    Class.Private()
], Input.prototype, "bindProperties", null);
__decorate([
    Class.Private()
], Input.prototype, "assignProperties", null);
__decorate([
    Class.Public()
], Input.prototype, "name", null);
__decorate([
    Class.Public()
], Input.prototype, "value", null);
__decorate([
    Class.Public()
], Input.prototype, "empty", null);
__decorate([
    Class.Public()
], Input.prototype, "required", null);
__decorate([
    Class.Public()
], Input.prototype, "readOnly", null);
__decorate([
    Class.Public()
], Input.prototype, "disabled", null);
__decorate([
    Class.Public()
], Input.prototype, "orientation", null);
__decorate([
    Class.Public()
], Input.prototype, "element", null);
Input = Input_1 = __decorate([
    Class.Describe()
], Input);
exports.Input = Input;