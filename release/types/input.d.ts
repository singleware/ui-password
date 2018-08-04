import * as Control from '@singleware/ui-control';
import { Properties } from './properties';
import { Element } from './element';
/**
 * Password input class.
 */
export declare class Input extends Control.Component<Properties> {
    /**
     * Input states.
     */
    private states;
    /**
     * Password element.
     */
    private passwordSlot;
    /**
     * Confirmation element.
     */
    private confirmationSlot;
    /**
     * Strength element.
     */
    private strengthSlot;
    /**
     * Field element.
     */
    private field;
    /**
     * Wrapper element.
     */
    private wrapper;
    /**
     * Input styles.
     */
    private styles;
    /**
     * Input skeleton.
     */
    private skeleton;
    /**
     * Input elements.
     */
    private elements;
    /**
     * Validates the confirmation password.
     */
    private validateConfirmation;
    /**
     * Validates the password strength.
     */
    private validateStrength;
    /**
     * Change event handler.
     */
    private changeHandler;
    /**
     * Bind event handlers to update the custom element.
     */
    private bindHandlers;
    /**
     * Bind exposed properties to the custom element.
     */
    private bindProperties;
    /**
     * Assign all elements properties.
     */
    private assignProperties;
    /**
     * Default constructor.
     * @param properties Form properties.
     * @param children Form children.
     */
    constructor(properties: Properties, children?: any[]);
    /**
     * Get input name.
     */
    /**
    * Set input name.
    */
    name: string;
    /**
     * Get input value.
     */
    /**
    * Set input value.
    */
    value: string;
    /**
     * Get empty state.
     */
    readonly empty: any;
    /**
     * Get required state.
     */
    /**
    * Set required state.
    */
    required: boolean;
    /**
     * Get read-only state.
     */
    /**
    * Set read-only state.
    */
    readOnly: boolean;
    /**
     * Get disabled state.
     */
    /**
    * Set disabled state.
    */
    disabled: boolean;
    /**
     * Get orientation mode.
     */
    /**
    * Set orientation mode.
    */
    orientation: string;
    /**
     * Input element.
     */
    readonly element: Element;
}